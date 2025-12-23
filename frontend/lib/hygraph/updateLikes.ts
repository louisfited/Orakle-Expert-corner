'use server'

import { HYGRAPH_URL } from '@/lib/hygraph/hygraph'
import { revalidatePath } from 'next/cache'

export const updateLikesHygraph = async (
  id: string,
  likes: number,
  isMedicalCaseV2: boolean = false
): Promise<void> => {
  const updateMutation = isMedicalCaseV2 ? 'updateMedicalCaseV2' : 'updateMedicalCase'
  const publishMutation = isMedicalCaseV2 ? 'publishMedicalCaseV2' : 'publishMedicalCase'

  const updateRes = await fetch(HYGRAPH_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${process.env.HYGRAPH_API_KEY}`,
    },
    cache: 'no-store',
    body: JSON.stringify({
      query: `
        mutation ($id: ID!, $likes: Int!) {
          ${updateMutation}(where: { id: $id }, data: { likes: $likes }) {
            id
            likes
          }
        }
      `,
      variables: { id, likes },
    }),
  })
  if (!updateRes.ok) {
    const text = await updateRes.text()
    console.error('Failed to update likes:', text)
    throw new Error(`Update failed: ${updateRes.statusText}`)
  }

  const publishRes = await fetch(HYGRAPH_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${process.env.HYGRAPH_API_KEY}`,
    },
    cache: 'no-store',
    body: JSON.stringify({
      query: `
        mutation ($id: ID!) {
          ${publishMutation}(where: { id: $id }, to: PUBLISHED) {
            id
          }
        }
      `,
      variables: { id },
    }),
  })
  if (!publishRes.ok) {
    const text = await publishRes.text()
    console.error('Failed to publish:', text)
    throw new Error(`Publish failed: ${publishRes.statusText}`)
  }

  const path = isMedicalCaseV2 ? `/cases-v2/${id}` : `/cases/${id}`
  revalidatePath(path)
}
