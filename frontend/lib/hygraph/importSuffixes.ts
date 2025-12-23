import { HYGRAPH_URL } from '@/lib/hygraph/hygraph'
import email_suffixes from '@/lib/email_suffixes.json'

const importSuffixes = async (value: string) => {
  const response = await fetch(HYGRAPH_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    cache: 'no-store',
    body: JSON.stringify({
      query: `mutation {
                createValidatedSuffix(data: {suffix: "${value}"}){
                suffix
            }
        }`,
    }),
  })

  const res = await response.json()

  const { data } = res
  if (data && data.validatedSuffix) {
    return data.validatedSuffix
  }

  return null
}
const delay = (ms: any) => new Promise((resolve) => setTimeout(resolve, ms))

const importSuffixesWithDelay = async (value: string, delayTime = 1000) => {
  await delay(delayTime)
  return importSuffixes(value)
}

export const runSuffixesImport = async () => {
  const validEmailSuffixes = email_suffixes.validEmailSuffixes

  // Added 1 sec delay to avoid error by too many requests
  for (const suffix of validEmailSuffixes) {
    await importSuffixesWithDelay(suffix, 1000)
  }

  console.log('All suffixes have been imported with delay')
}
