import { MedicalCase, WebinarVideo } from '@/interface'
import { HYGRAPH_URL } from '@/lib/hygraph/hygraph'

// TODO: Keeping these incase we have to split it up
const BASIC_QUERY = `
{
  medicalCase(where: {id: "<ID>"}) {
    id
    title
    caseDescription {
      html
    }
    historyOfPresentIllness {
      html
    }
    familyAndSocialHistory {
      html
    }
    physicalExaminationNotes {
      html
    }
    closingRemarks {
      html
    }
    literatureReview {
      html
    }
    references {
      html
    }
    bannerTopBarImage {
      url
    }
    showBannerTopBarImage
    patient {
      id
    }
    videoUrl {
      videoTitle
      transcript {
        html
      }
      url
    }
    pastTests {
      date
      name
      findingsText {
        html
      }
      actionText {
        text {
          html
        }
      }
      actionResult {
        result
        units
        rangeStart
        rangeEnd
      }
      actionFinding {
        name
        value {
          html
        }
        range
      }
    }
    pastVisits {
      date
      rr
      kg
      bmi
      actionText {
        text {
          html
        }
      }
    }
  }
}`

const ADDITIONAL_QUERY = `
{
  medicalCase(where: {id: "<ID>"}) {
    tests {
      date
      name
      findings {
        html
      }
      guidanceText {
        html
      }
      guidance
    }
    diagnose {
      id
      name
      startDate
      guidance
      isExisting
      guidanceText {
        html  
      }
    }
    medicationSelection {
      name
      guidanceType
      actionText {
        text {
          html
        }
      }
    }
    order {
      name
      startDate
      endDate
      continue
      actionText {
        text {
          html
        }
      }
    }
    prescribingInformation {
      html
    }
    nonMedicationOrder {
      name
      category
      actionText {
        text {
          html
        }
      }
      guidance
    }
  }
}`

async function getWebinarVideoById(id: string, { email, password }: any): Promise<WebinarVideo | null> {
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
                    webinarVideo(where: {id: "${id}"}) {
                    id
                    name
                    description
                    videoUrl
                    contentType
                    supporter
                    faculty
                    title
                    caseDescription {html}
                    finishUrl
    }
                }`,
    }),
  })

  const res = await response.json()
  const { data } = res
  if (data && data.webinarVideo) {
    return data.webinarVideo
  }

  return null
}

// export async function getCombinedMedicalCaseById(id: string): Promise<MedicalCase | null> {
//   const basicResponse = await fetch(HYGRAPH_URL, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       Accept: 'application/json',
//     },
//     cache: 'no-store',
//     body: JSON.stringify({
//       query: BASIC_QUERY.replace('<ID>', id),
//     }),
//   })

//   const basicRes = await basicResponse.json()

//   const additionalResponse = await fetch(HYGRAPH_URL, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       Accept: 'application/json',
//     },
//     cache: 'no-store',
//     body: JSON.stringify({
//       query: ADDITIONAL_QUERY.replace('<ID>', id),
//     }),
//   })

//   const additionalRes = await additionalResponse.json()

//   const basicData = basicRes.data?.medicalCase || null
//   const additionalData = additionalRes.data?.medicalCase || null

//   if (basicData && additionalData) {
//     // Combine the results
//     const combinedData = {
//       ...basicData,
//       ...additionalData,
//     }
//     return combinedData
//   }

//   return null
// }

export default getWebinarVideoById
