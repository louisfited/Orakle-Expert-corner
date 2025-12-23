import { MedicalCaseV2 } from '@/interface'
import { HYGRAPH_URL } from '@/lib/hygraph/hygraph'

// TODO: Keeping these incase we have to split it up
const BASIC_QUERY = `
{
  medicalCaseV2(where: {id: "<ID>"}) {
    id,
    title,
    finishUrl,
    medicalCaseInformation {
      id,
      title,
      clinicalBackground {
        html
      },
      followUp {
        html
      },
      audioUrl {
        audioTitle,
        url
      },
    },
    diagnose {
      id
      name
      startDate
      guidance
      isExisting
      guidanceText {
        html  
      }
    },
    cidpTreatment {
      id
      name
      guidanceType
      rationales
      actionText {
        text {
          html
        }
      }
    },
    patient {
      id,
      firstName,
      lastName,
      patientDescription,
      age,
      gender,
      profileImage {
        url
      }
    },
    silhouette { url },
    likes,
  }
}`

async function getMedicalCaseV2ById(id: string, { email, password }: any): Promise<MedicalCaseV2 | null> {
  let type = ''
  if (email && password) {
    type = ', stage: DRAFT'
  }
  // category

  const response = await fetch(HYGRAPH_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    cache: 'no-store',
    body: JSON.stringify({
      query: `{
                    medicalCaseV2(where: {id: "${id}"}${type}) {
                      id,
                      title,
                      finishUrl,
                      medicalCaseInformation {
                        id,
                        title,
                        clinicalBackground {
                          html
                        },
                        followUp {
                          html
                        },
                        audioUrl {
                          audioTitle,
                          url
                        },
                      },
                      diagnose(first: 150) {
                        id
                        name
                        startDate
                        guidance
                        isExisting
                        guidanceText {
                          html  
                        }
                      },
                      cidpTreatment(first: 150) {
                        id
                        name
                        guidanceType
                        rationales
                        actionText {
                          text {
                            html
                          }
                        }
                      }
                      patient {
                        id,
                        firstName,
                        lastName,
                        patientDescription,
                        age,
                        gender,
                        profileImage {
                          url
                        }
                      },
                      silhouette { url }
                      likes,
                    }
                }`,
    }),
  })
  const res = await response.json()
  const { data } = res
  if (data && data.medicalCaseV2) {
    return data.medicalCaseV2
  }

  return null
}

export async function getCombinedMedicalCaseV2ById(id: string): Promise<MedicalCaseV2 | null> {
  const basicResponse = await fetch(HYGRAPH_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    cache: 'no-store',
    body: JSON.stringify({
      query: BASIC_QUERY.replace('<ID>', id),
    }),
  })

  const basicRes = await basicResponse.json()

  const basicData = basicRes.data?.medicalCase || null

  return basicData
}

export default getMedicalCaseV2ById

// {
//   medicalCaseV2(where: {id: "${id}"}${type}) {
//     id,
//     title,
//     finishUrl,
//     medicalCaseInformation {
//       id,
//       title,
//       clinicalBackground {
//         html
//       },
//       followUp {
//         html
//       },
//       audioUrl {
//         audioTitle,
//         url
//       },
//     },
//     diagnose(first: 150) {
//       id
//       name
//       startDate
//       guidance
//       isExisting
//       guidanceText {
//         html
//       }
//     },
//     cidpTreatment(first: 150) {
//       id
//       name
//       guidanceType
//       rationales
//       actionText {
//         text {
//           html
//         }
//       }
//     }
//     patient {
//       id,
//       firstName,
//       lastName,
//       patientDescription,
//       age,
//       gender,
//       profileImage {
//         url
//       }
//     },
//     silhouette { url }
//     likes,
//   }
// }
