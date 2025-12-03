const XLSX = require('xlsx')
const dotenv = require('dotenv')
const path = require('path')

dotenv.config({
  path: path.resolve(__dirname, '../../.env'),
})
const HYGRAPH_URL = (() => {
  const url = process.env.NEXT_PUBLIC_HYGRAPH_URL
  if (!url) {
    throw new Error('Environment variable NEXT_PUBLIC_HYGRAPH_URL is not set')
  }
  return url
})()

const HYGRAPH_TOKEN = (() => {
  const token = process.env.HYGRAPH_API_KEY
  if (!token) {
    throw new Error('Environment variable NEXT_PUBLIC_HYGRAPH_URL is not set')
  }
  return token
})()

// Load parentFields and references from external JSON file
const referenceModelsPath = path.resolve(__dirname, 'reference_models.json')
let parentFields: string[] = []
let references: Reference[] = []
try {
  // Use require to load JSON at runtime
  const refData = require(referenceModelsPath) as { parentFields: string[]; references: Reference[] }
  parentFields = refData.parentFields
  references = refData.references
} catch (err) {
  throw new Error(`Failed to load reference models from ${referenceModelsPath}: ${err}`)
}

interface Reference {
  fieldName: string
  parent: string[]
  modelName: string
}

interface HygraphEntity {
  id: string
  [key: string]: any
}

function findParentFieldsForReference(ref: Reference, parentFields: string[]): string[] {
  return parentFields.filter((field) => ref.parent.includes(field))
}

async function executeGraphQL<T>(query: string): Promise<T> {
  const response = await fetch(HYGRAPH_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${HYGRAPH_TOKEN}`,
    },
    body: JSON.stringify({ query }),
  })

  if (!response.ok) {
    throw new Error(`GraphQL request failed: ${response.statusText}`)
  }

  const result = await response.json()

  if (result.errors) {
    throw new Error(`GraphQL errors: ${JSON.stringify(result.errors)}`)
  }

  return result.data
}

function buildAllModelsQuery(references: Reference[], skip: number): string {
  const modelQueries = references
    .map((ref) => {
      return `${ref.modelName}: ${ref.modelName}(first: 100, skip: ${skip}) { id }`
    })
    .join('\n    ')

  return `
    query {
      ${modelQueries}
    }
  `
}

function buildAllParentsQuery(parentFields: string[], references: Reference[], skip: number): string {
  const parentToFieldNames = new Map<string, Set<string>>()

  for (const ref of references) {
    for (const parent of ref.parent) {
      if (parentFields.includes(parent)) {
        if (!parentToFieldNames.has(parent)) {
          parentToFieldNames.set(parent, new Set())
        }
        parentToFieldNames.get(parent)!.add(ref.fieldName)
      }
    }
  }

  const parentQueries = Array.from(parentToFieldNames.entries())
    .map(([parentField, fieldNames]) => {
      const fields = Array.from(fieldNames)
        .map((fieldName) => `${fieldName} { id }`)
        .join('\n      ')

      return `${parentField}: ${parentField}(first: 100, skip: ${skip}) {
      id
      ${fields}
    }`
    })
    .join('\n    ')

  return `
    query {
      ${parentQueries}
    }
  `
}
async function fetchAllModels(references: Reference[]): Promise<Record<string, HygraphEntity[]>> {
  const allData: Record<string, HygraphEntity[]> = {}
  references.forEach((ref) => {
    allData[ref.modelName] = []
  })

  let skip = 0
  let hasMore = true

  while (hasMore) {
    console.log(`  Fetching models (skip: ${skip})...`)
    const query = buildAllModelsQuery(references, skip)
    const pageData = await executeGraphQL<Record<string, HygraphEntity[]>>(query)

    hasMore = false

    for (const ref of references) {
      const items = pageData[ref.modelName] || []
      if (items.length > 0) {
        allData[ref.modelName].push(...items)
        if (items.length === 100) {
          hasMore = true
        }
      }
    }

    skip += 100
  }

  return allData
}

async function fetchAllParents(parentFields: string[], references: Reference[]): Promise<Record<string, any[]>> {
  const allData: Record<string, any[]> = {}
  parentFields.forEach((field) => {
    allData[field] = []
  })

  let skip = 0
  let hasMore = true

  while (hasMore) {
    console.log(`  Fetching parents (skip: ${skip})...`)
    const query = buildAllParentsQuery(parentFields, references, skip)
    const pageData = await executeGraphQL<Record<string, any[]>>(query)

    hasMore = false

    for (const field of parentFields) {
      const items = pageData[field] || []
      if (items.length > 0) {
        allData[field].push(...items)
        if (items.length === 100) {
          hasMore = true
        }
      }
    }

    skip += 100
  }

  return allData
}

async function findOrphanEntities(
  parentFields: string[],
  references: Reference[]
): Promise<Record<string, HygraphEntity[]>> {
  const orphans: Record<string, HygraphEntity[]> = {}

  // CHANGE v14: Use paginated fetch functions
  console.log('\nFetching all child models...')
  const allModelsData = await fetchAllModels(references)

  console.log('Fetching all parent entities...')
  const allParentsData = await fetchAllParents(parentFields, references)

  for (const ref of references) {
    console.log(`\nProcessing ${ref.modelName}...`)

    const allEntities = allModelsData[ref.modelName] || []
    console.log(`  Found ${allEntities.length} total ${ref.modelName}`)

    const referencedIds = new Set<string>()

    const matchingParentFields = ref.parent.filter((p) => parentFields.includes(p))

    if (matchingParentFields.length > 0) {
      for (const matchingParentField of matchingParentFields) {
        const parents = allParentsData[matchingParentField] || []

        parents.forEach((parent) => {
          const childRef = parent[ref.fieldName]
          if (childRef) {
            if (Array.isArray(childRef)) {
              childRef.forEach((child) => referencedIds.add(child.id))
            } else {
              referencedIds.add(childRef.id)
            }
          }
        })
      }
    } else {
      console.warn(`  ⚠️  No matching parent field found for ${ref.parent.join(', ')}`)
    }

    console.log(`  Found ${referencedIds.size} referenced ${ref.modelName}`)

    const orphanEntities = allEntities.filter((entity) => !referencedIds.has(entity.id))

    if (orphanEntities.length > 0) {
      orphans[ref.modelName] = orphanEntities
      console.log(`  ⚠️  Found ${orphanEntities.length} orphaned ${ref.modelName}`)
    } else {
      console.log(`  ✓ No orphans found for ${ref.modelName}`)
    }
  }

  return orphans
}
function generateExcelReport(orphans: Record<string, HygraphEntity[]>): void {
  const workbook = XLSX.utils.book_new()

  if (Object.keys(orphans).length === 0) {
    const summarySheet = XLSX.utils.aoa_to_sheet([['No orphaned entities found']])
    XLSX.utils.book_append_sheet(workbook, summarySheet, 'Summary')
  } else {
    Object.entries(orphans).forEach(([modelName, entities]) => {
      const sheetData = [['ID'], ...entities.map((entity) => [entity.id])]

      const worksheet = XLSX.utils.aoa_to_sheet(sheetData)

      const safeSheetName = modelName.length > 31 ? modelName.substring(0, 31) : modelName
      XLSX.utils.book_append_sheet(workbook, worksheet, safeSheetName)
    })

    const summaryData = [
      ['Model Name', 'Orphan Count'],
      ...Object.entries(orphans).map(([modelName, entities]) => [modelName, entities.length]),
    ]
    const summarySheet = XLSX.utils.aoa_to_sheet(summaryData)
    XLSX.utils.book_append_sheet(workbook, summarySheet, 'Summary')
  }

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('T')[0]
  const filename = `orphan-entities-${timestamp}.xlsx`

  XLSX.writeFile(workbook, filename)
  console.log(`\n✓ Excel report generated: ${filename}`)
}

async function main() {
  try {
    console.log('Starting orphan entity search...')
    const orphans = await findOrphanEntities(parentFields, references)

    console.log('done')

    generateExcelReport(orphans)

    return orphans
  } catch (error) {
    console.error('Error finding orphan entities:', error)
    throw error
  }
}

// Execute
main()
