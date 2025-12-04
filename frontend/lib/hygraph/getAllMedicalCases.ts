import { HYGRAPH_URL } from '@/lib/hygraph/hygraph'
import { cookies } from 'next/headers'

type MergedMedicalCase = {
  version: '15m' | '5m'
  id: string
  title: string
  contentType:string
  supporter: string
  faculty: string
  countries?: string[]
  categories?: string[]
  likes?: number
  caseDescription?: { html: string }
  preCaseInformation?: { html: string }
  closingRemarks?: { html: string }
  literatureReview?: { html: string }
  references?: { html: string }
  historyOfPresentIllness?: { html: string }
  familyAndSocialHistory?: { html: string }
  importantInformation?: { html: string }
  physicalExaminationNotes?: { html: string }
  bannerTopBarImage?: { url: string }
  showBannerTopBarImage?: boolean
  patient: {
    id?: string
    profileImage?: { url: string }
  }
}

export const getAllMedicalCases = async (): Promise<MergedMedicalCase[]> => {
  const languageValue:string | undefined = cookies().get("language")?.value

  console.log('Language value:', languageValue)
  
  const response = await fetch(HYGRAPH_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    cache: 'no-store',
    body: JSON.stringify({
      query: `{
webinarVideos(first: 150,orderBy: createdAt_DESC){
  id
  name
  description
  videoUrl
  contentType
  createdAt
  countries
  categories
  supporter
  faculty
  preCaseInformation { html }
  title
  caseDescription {html}
  patient {
  profileImage { url }
  }
  
  }

  medicalCases(locales:[${languageValue ? languageValue : "en"}], first: 150, orderBy: createdAt_DESC) {
  id
  title
  supporter
  faculty
  contentType
  countries
  categories
  createdAt
  likes
  caseDescription { html }
  preCaseInformation { html }
  historyOfPresentIllness { html }
  familyAndSocialHistory { html }
  importantInformation { html }
  physicalExaminationNotes { html }
  closingRemarks { html }
  literatureReview { html }
  references { html }
  bannerTopBarImage { url }
  showBannerTopBarImage
  patient {
  profileImage { url }
  }

}


medicalCasesV2(locales:[${languageValue ? languageValue : "en"}],first: 150, orderBy: createdAt_DESC) {
  id
  title
  supporter
  contentType
  faculty
  createdAt
  caseDescription { html }
  patient {
    id
    profileImage { url }
  }
}


      }`,
    }),
  })

  const res = await response.json()
  
  console.log('=== HYGRAPH RESPONSE ===')
  console.log('Full response:', JSON.stringify(res, null, 2))
  console.log('Errors:', res.errors)
  console.log('webinarVideos:', res?.data?.webinarVideos?.length)
  console.log('medicalCases:', res?.data?.medicalCases?.length)
  console.log('medicalCasesV2:', res?.data?.medicalCasesV2?.length)

  console.log(res?.data?.webinarVideos);
  
  
  const video = (res?.data?.webinarVideos || []).map((v: any) => ({ version: '20m', ...v }))
  const v1 = (res?.data?.medicalCases || []).map((c: any) => ({ version: '15m', ...c }))
  const v2 = (res?.data?.medicalCasesV2 || []).map((c: any) => ({ version: '5m', ...c }))

  // console.log([...video,...v2,...v1,]);
  // console.log(res?.data?.medicalCasesV2);
  const data = [...video,...v2,...v1,]
  const sorted = data.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
  
  return sorted
}

// medicalCases(locales:[${languageValue ? languageValue : "en"}], first: 150, orderBy: createdAt_DESC) {
//   id
//   title
//   supporter
//   faculty
//   contentType
//   countries
//   categories
//   likes
//   caseDescription { html }
//   preCaseInformation { html }
//   historyOfPresentIllness { html }
//   familyAndSocialHistory { html }
//   importantInformation { html }
//   physicalExaminationNotes { html }
//   closingRemarks { html }
//   literatureReview { html }
//   references { html }
//   bannerTopBarImage { url }
//   showBannerTopBarImage
//   patient {
//   profileImage { url }
//   }


// }


// medicalCasesV2(locales:[${languageValue ? languageValue : "en"}],first: 150, orderBy: createdAt_DESC) {
//   id
//   title
//   supporter
//   faculty
//   caseDescription { html }
//   patient {
//     id
//     profileImage { url }
//   }
// }




// Testings{
//   id
//   name
//   }
// medicalCasesV2(locales:[${languageValue ? languageValue : "en"}],first: 150, orderBy: createdAt_DESC) {
//   id
//   title
//   supporter
//   faculty
//   caseDescription { html }
//   patient {
//     id
//     profileImage { url }
//   }
// }

// medicalCases(locales:[${languageValue ? languageValue : "en"}], first: 150, orderBy: createdAt_DESC) {
//   id
//   title
//   supporter
//   faculty
//   contentType
//   countries
//   categories
//   likes
//   caseDescription { html }
//   preCaseInformation { html }
//   historyOfPresentIllness { html }
//   familyAndSocialHistory { html }
//   importantInformation { html }
//   physicalExaminationNotes { html }
//   closingRemarks { html }
//   literatureReview { html }
//   references { html }
//   bannerTopBarImage { url }
//   showBannerTopBarImage
//   patient {
//   profileImage { url }
//   }


// }

export const getAllMedicalCasesForStaging = async (): Promise<MergedMedicalCase[]> => {
  const languageValue:string | undefined = cookies().get("language")?.value


  const response = await fetch(HYGRAPH_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    cache: 'no-store',
    body: JSON.stringify({
      query: `{
        medicalCases(locales:[${languageValue ? languageValue : "en"}], first: 150, orderBy: createdAt_DESC, where: { countries_contains_some: [STAGING] }) {
          id
          title
          supporter
          faculty
          countries
          categories
          likes
          caseDescription { html }
          preCaseInformation { html }
          historyOfPresentIllness { html }
          familyAndSocialHistory { html }
          importantInformation { html }
          physicalExaminationNotes { html }
          closingRemarks { html }
          literatureReview { html }
          references { html }
          bannerTopBarImage { url }
          showBannerTopBarImage
          patient {
            profileImage { url }
          }
        }
        medicalCasesV2(locales:[${languageValue ? languageValue : "en"}],first: 150, orderBy: createdAt_DESC, where: { countries_contains_some: [STAGING] }) {
          id
          title
          supporter
          faculty
          caseDescription { html }
          patient {
            id
            profileImage { url }
          }
        }
      }`,
    }),
  })

  const res = await response.json()
  const v1 = (res?.data?.medicalCases || []).map((c: any) => ({ version: '15m', ...c }))
  const v2 = (res?.data?.medicalCasesV2 || []).map((c: any) => ({ version: '5m', ...c }))
  return [...v1, ...v2]
}
