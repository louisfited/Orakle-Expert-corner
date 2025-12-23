import { HYGRAPH_URL } from '@/lib/hygraph/hygraph'
import { Export } from '@/interface'

async function getSimulationsLog(): Promise<Export | null> {
  const response = await fetch(HYGRAPH_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    cache: 'no-store',
    body: JSON.stringify({
      query: `{
                  export(where: {name: "Simulations Log"}) 
                    {
                      name
                      data
                    }
                }`,
    }),
  })

  const json = await response.json()
  if (json.data && json.data.export) {
    return json.data.export
  }

  return null
}

export default getSimulationsLog
