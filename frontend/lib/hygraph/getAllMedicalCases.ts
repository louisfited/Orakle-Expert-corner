import { HYGRAPH_URL } from '@/lib/hygraph/hygraph'
import { cookies } from 'next/headers'

export type MergedMedicalCase = {
  version: '15m' | '5m'
  id: string
  title: string
  contentType: string
  supporter: string
  faculty: string
  countries?: string[]
  categories?: string[]
  likes: number
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
  shortDescription?: string
  thumbnailBackground: { url: string }
  status?: string
  isBookmarked?: boolean
}

export const getAllMedicalCases = async (): Promise<MergedMedicalCase[]> => {
  const languageValue: string | undefined = cookies().get('language')?.value

  const response = await fetch(HYGRAPH_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    cache: 'no-store',
    body: JSON.stringify({
      query: `{
webinarVideos(first: 1000,orderBy: createdAt_DESC){
  id
  name
  createdAt
}

  medicalCases(locales:[${languageValue ? languageValue : 'en'}], first: 1000, orderBy: createdAt_DESC) {
  id
  title
  supporter
  faculty
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
  thumbnailBackground { url }
  patient {
  profileImage { url }
  }

}


medicalCasesV2(locales:[${languageValue ? languageValue : 'en'}],first: 1000, orderBy: createdAt_DESC) {
  id
  title
  supporter
  faculty
  createdAt
  categories
  caseDescription { html }
  shortDescription
  likes
  patient {
    id
    profileImage { url }
  }
  thumbnailBackground { url }
}


      }`,
    }),
  })

  const res = await response.json()

  if (res?.errors) {
    console.error('getAllMedicalCases - GraphQL Errors:', res.errors)
  }

  console.log('getAllMedicalCases - webinarVideos:', res?.data?.webinarVideos?.length || 0)
  console.log('getAllMedicalCases - medicalCases:', res?.data?.medicalCases?.length || 0)
  console.log('getAllMedicalCases - medicalCasesV2:', res?.data?.medicalCasesV2?.length || 0)

  const video = (res?.data?.webinarVideos || []).map((v: any) => ({ version: '20m', ...v }))
  const v1 = (res?.data?.medicalCases || []).map((c: any) => ({ version: '15m', ...c }))
  const v2 = (res?.data?.medicalCasesV2 || []).map((c: any) => ({ version: '5m', ...c }))

  const data = [...video, ...v2, ...v1]
  const sorted = data.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })

  console.log('getAllMedicalCases - Total sorted:', sorted.length)

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

export const getAllMedicalCasesForStaging = async (ids?: string[]): Promise<MergedMedicalCase[]> => {
  const languageValue: string | undefined = cookies().get('language')?.value

  const whereClause = ids && ids.length ? `, where: { id_in: [${ids.map((id) => `"${id}"`).join(',')}] }` : ''

  const response = await fetch(HYGRAPH_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    cache: 'no-store',
    body: JSON.stringify({
      query: `{
        medicalCases(locales:[${
          languageValue ? languageValue : 'en'
        }], first: 150, orderBy: createdAt_DESC${whereClause}) {
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
        medicalCasesV2(locales:[${
          languageValue ? languageValue : 'en'
        }],first: 150, orderBy: createdAt_DESC${whereClause}) {
          id
          title
          supporter
          faculty
          categories
          caseDescription { html }
          shortDescription
          likes
          patient {
            id
            profileImage { url }
          }
            thumbnailBackground { url }
        }
      }`,
    }),
  })

  const res = await response.json()
  const v1 = (res?.data?.medicalCases || []).map((c: any) => ({ version: '15 min', ...c }))
  const v2 = (res?.data?.medicalCasesV2 || []).map((c: any) => ({ version: '5 min', ...c }))
  return [...v1, ...v2]
}
