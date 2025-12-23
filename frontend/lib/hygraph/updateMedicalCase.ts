import { HYGRAPH_URL } from '@/lib/hygraph/hygraph'
import { MedicalCase } from '@/interface'

interface UpdateMedicalCaseInput {
  id: string
  table?: string
  data?: any
}

async function updateMedicalCase(input: UpdateMedicalCaseInput): Promise<MedicalCase | null> {
  const { id, table, data } = input
  let mutationQuery: string

  if (table === 'diagnose') {
    mutationQuery = `
    mutation {
      updateMedicalCase(
        where: {id: "${id}"}
        data: {diagnose: {update: 
          {
            where: {id: "${data?.id}"},
            data: {isExisting: ${data?.isExisting}, startDate: "${data?.startDate}"}
          }
        }}
        )
        {
          id
          diagnose{
              id
              isExisting
              startDate
          }
        }
    }
  `
  } else if (table === 'nonMedicationOrder') {
    mutationQuery = `
    mutation {
      updateMedicalCase(
        where: {id: "${id}"}
        data: {nonMedicationOrder: {update: 
          {
            where: {id: "${data?.id}"},
            data: {isExisting: ${data?.isExisting}}
          }
        }}
        )
        {
          id
          nonMedicationOrder{
              id
              isExisting
          }
        }
    }
  `
  } else if (table === 'order') {
    mutationQuery = `
    mutation {
      updateMedicalCase(
        where: {id: "${id}"}
        data: {order: {update: 
          {
            where: {id: "${data?.id}"},
            data: {isExisting: ${data?.isExisting}}
          }
        }}
        )
        {
          id
          order{
              id
              isExisting
          }
        }
    }
  `
    return null
  } else {
    return null
  }

  const response = await fetch(HYGRAPH_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    cache: 'no-store',
    body: JSON.stringify({ query: mutationQuery }),
  })

  const json = await response.json()
  if (json.data && json.data.updateMedicalCase) {
    return json.data.updateMedicalCase
  }

  return null
}

export default updateMedicalCase
