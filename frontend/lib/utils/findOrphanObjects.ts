const HYGRAPH_URL = 'https://eu-central-1-shared-euc1-02.cdn.hygraph.com/content/clyexuxwo029m07ursj09ra8o/master'
const HYGRAPH_TOKEN =
  'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE3MjY5MzI2MDYsImF1ZCI6WyJodHRwczovL2FwaS1ldS1jZW50cmFsLTEtc2hhcmVkLWV1YzEtMDIuaHlncmFwaC5jb20vdjIvY2x5ZXh1eHdvMDI5bTA3dXJzajA5cmE4by9tYXN0ZXIiLCJtYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC1ldS1jZW50cmFsLTEtc2hhcmVkLWV1YzEtMDIuaHlncmFwaC5jb20vIiwic3ViIjoiYzNlNmQzMGEtYThlZS00MDg3LWI3ZTUtMGJhMmRjY2FjYzhlIiwianRpIjoiY20xY2IzM2gxMDhxcDA3dXFiYWZvNGxpOSJ9.O_xpMHcAHH2DzRZ5A4XG0rY3dViquLQNCnS3hlvxF4wMV7INVr1gFdC7wv-mZ2lN8RLMwUTKTgaOOQpeUxMYqXDAvqVh2FgBZ8296P2k_pcZz8fO7SXut2OqLpL0JDkKkESkCQcIGeq0moSp6SjpsdRkQQOwm_b7xu2k2E8ZZ33xYZTOLG6eOJ_olmBKw4_R3wHdIK6_lMB1SIR0QDwVoPvpIt3I_Alm4XiQCfIkLs-MO1UeRBQdaPPndgi7ystih_5u8G7xVJN0gHBJ-ip7rbdiDAOS6ykr3YLEnE0DOId6K4KF0RP6wpax6_fhlr4A8XdGTvCIwMk4T1Lr3mcKE5Y5ccNkvq-716vWyKpTGU3li9T3P6iuUzhcYahiiZm_tiAADXzWtGsOUzBVFQ9PN7rLwiJav1DFfC8axziIl4YKJ8FjfaL8-n--g-gGtFSV-Hm0a9zXGzABcx7alNjZd2QlfP-JTuyeOECiXpaMeAG_QrKuhPz4pcV4wNIibPN2NSiKmqJuUkoRIcKl6Dmi9Oi3xTK84GlMvOYUm1ddH9iwMdlsCTJp-CjDgcj1i_1r4AtScMG_naL2T4DUEpIakNRJ1loHzG031SRtwr93ph99X9VNLtoH0poHapqpVnpKhhT8Q5Eupi1Hdj7Ye2gey46chWzfQbUVdTWRgaFv2co'

const parentFields = ['medicalCases', 'pastTests', 'medicationSelections']
const references = [
  { fieldName: 'patient', parent: ['medicalCases'], modelName: 'patients' },
  { fieldName: 'medicationSelection', parent: ['medicalCases'], modelName: 'medicationSelections' },
  { fieldName: 'pastTests', parent: ['medicalCases'], modelName: 'pastTests' },
  { fieldName: 'pastVisits', parent: ['medicalCases'], modelName: 'pastVisits' },
  { fieldName: 'tests', parent: ['medicalCases'], modelName: 'tests' },
  { fieldName: 'diagnose', parent: ['medicalCases'], modelName: 'diagnoses' },
  { fieldName: 'order', parent: ['medicalCases'], modelName: 'orders' },
  { fieldName: 'nonMedicationOrder', parent: ['medicalCases'], modelName: 'nonMedicationOrders' },
  { fieldName: 'actionText', parent: ['pastTests', 'medicationSelection'], modelName: 'actionTexts' },
]

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

function buildAllModelsQuery(references: Reference[]): string {
  const modelQueries = references
    .map((ref) => {
      return `${ref.modelName}: ${ref.modelName} { id }`
    })
    .join('\n    ')

  return `
    query {
      ${modelQueries}
    }
  `
}

function buildAllParentsQuery(parentFields: string[], references: Reference[]): string {
  const parentQueries = parentFields
    .map((parentField) => {
      const relevantRefs = references.filter((ref) => ref.parent.includes(parentField))

      if (relevantRefs.length === 0) {
        return ''
      }

      const fields = relevantRefs.map((ref) => `${ref.fieldName} { id }`).join('\n      ')

      return `${parentField}: ${parentField} {
      id
      ${fields}
    }`
    })
    .filter(Boolean)
    .join('\n    ')

  return `
    query {
      ${parentQueries}
    }
  `
}

function buildModelQuery(modelName: string): string {
  return `
    query {
      ${modelName} {
        id
      }
    }
  `
}

async function findOrphanEntities(
  parentFields: string[],
  references: Reference[]
): Promise<Record<string, HygraphEntity[]>> {
  const orphans: Record<string, HygraphEntity[]> = {}

  const allModelsQuery = buildAllModelsQuery(references)
  const allModelsData = await executeGraphQL<Record<string, HygraphEntity[]>>(allModelsQuery)

  const allParentsQuery = buildAllParentsQuery(parentFields, references)
  const allParentsData = await executeGraphQL<Record<string, any[]>>(allParentsQuery)

  for (const ref of references) {
    console.log(`\nProcessing ${ref.modelName}...`)

    const allEntities = allModelsData[ref.modelName] || []

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

async function main() {
  try {
    console.log('Starting orphan entity search...')
    const orphans = await findOrphanEntities(parentFields, references)

    console.log('\n=== RESULTS ===')
    const totalOrphans = Object.values(orphans).reduce((sum, arr) => sum + arr.length, 0)

    if (totalOrphans === 0) {
      console.log('✓ No orphaned entities found!')
    } else {
      Object.entries(orphans).forEach(([modelName, entities]) => {
        console.log(`${modelName}: ${entities.length} orphans`)
        console.log(`  IDs: ${entities.map((e) => e.id).join(', ')}`)
      })
    }

    return orphans
  } catch (error) {
    console.error('Error finding orphan entities:', error)
    throw error
  }
}

// Execute
main()
