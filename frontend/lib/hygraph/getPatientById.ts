import { HYGRAPH_URL } from '@/lib/hygraph/hygraph'
import { PatientCase } from '@/interface'

async function getPatientById(id: string): Promise<PatientCase | null> {
  const response = await fetch(HYGRAPH_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    cache: 'no-store',
    body: JSON.stringify({
      query: `{
                    patient(where: {id: "${id}"}) {
                        firstName
                        lastName
                        patientDescription
                        age
                        showAgeAsMonths
                        weight
                        bmi
                        gender
                        height
                        allergies
                        profileImage {
                            url
                        }
                    }
                }`,
    }),
  })

  const json = await response.json()
  if (json.data && json.data.patient) {
    return json.data.patient
  }

  return null
}

export default getPatientById
