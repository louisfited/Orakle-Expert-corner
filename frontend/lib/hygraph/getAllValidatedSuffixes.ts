import { HYGRAPH_URL } from '@/lib/hygraph/hygraph'

type SuffixValidationResponse = {
  [suffix: string]: any
}

export const getAllValidatedSuffixes = async (): Promise<SuffixValidationResponse | null> => {
  const batchSize = 50
  let skip = 0
  let hasMore = true
  let allSuffixes: SuffixValidationResponse[] = []
  while (hasMore) {
    const response = await fetch(HYGRAPH_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      cache: 'no-store',
      body: JSON.stringify({
        query: `{
            validatedSuffixes (first: ${batchSize}, skip: ${skip}){
              suffix
            }
        }`,
      }),
    })

    const res = await response.json()
    const { data } = res
    if (skip === 0 && !data) {
      return null
    }

    const currentBatch = data?.validatedSuffixes || []
    allSuffixes = allSuffixes.concat(currentBatch)
    if (currentBatch.length < batchSize) {
      hasMore = false
    } else {
      skip += batchSize
    }
  }
  return allSuffixes
}
