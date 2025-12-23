import { Export } from '@/interface'
import { HYGRAPH_URL } from '@/lib/hygraph/hygraph'

interface UpdateExportInput {
  name: string | null
  data: Array<any> | null
}

async function updateExport(input: UpdateExportInput): Promise<Export | null> {
  const { name, data } = input

  if (name == null || data == null) {
    return null
  }

  const mutationQuery = `
    mutation UpdateExport($name: String!, $data: Json!) {
      updateExport(
        where: { name: $name }
        data: { data: $data }
      ) {
        name
        data
      }
      publishExport(where: { name: $name }) {
        name
      }
    }
  `

  const response = await fetch(HYGRAPH_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    cache: 'no-store',
    body: JSON.stringify({
      query: mutationQuery,
      variables: {
        name: name,
        data: data,
      },
    }),
  })

  const json = await response.json()
  if (json.data && json.data.updateExport) {
    return json.data.updateExport
  }

  return null
}

export default updateExport
