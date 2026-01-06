import { HYGRAPH_URL } from '@/lib/hygraph/hygraph'
import { cookies } from 'next/headers'
import { getBookmarks } from '@/lib/data/repository/bookmarks'
import { getUserProfile } from '@/lib/data/repository/user-profile'
import countriesJson from '@/lib/countries.json'

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
  isRecommended?: boolean
}

export const getAllMedicalCases = async (ids?: string[]): Promise<MergedMedicalCase[]> => {
  const languageValue: string | undefined = cookies().get('language')?.value
  const { data: userProfile } = await getUserProfile()
  const userCountry = userProfile?.country_of_practice
    ? countriesJson.find((c) => c.name === userProfile.country_of_practice)?.code ?? null
    : null

  const whereFilters: string[] = []

  if (ids?.length) {
    whereFilters.push(`{ id_in: [${ids.map((id) => `"${id}"`).join(', ')}] }`)
  }

  if (userCountry) {
    if (userCountry === 'STAGING') {
      whereFilters.push(`{
       countries_contains_all: ${userCountry} 

  }`)
    } else {
      whereFilters.push(`{
    OR: [
      { countries: [] }
      { countries_contains_all: ${userCountry} }
    ]
  }`)
    }
  }

  const whereClause =
    whereFilters.length === 0
      ? ''
      : `where: ${whereFilters.length === 1 ? whereFilters[0] : `{ AND: [${whereFilters.join(', ')}] }`}`

  const response = await fetch(HYGRAPH_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    cache: 'no-store',
    body: JSON.stringify({
      query: `{
        webinarVideos(first: 1000,orderBy: createdAt_DESC ${whereClause}){
          id
          name
          title
          description
          videoUrl
          contentType
          supporter
          faculty
          createdAt
          categories
          countries
          caseDescription { html }
          preCaseInformation { html }
          patient {
            profileImage { url }
          }
          finishUrl
          isRecommended
        }
        medicalCases(locales:[${
          languageValue ? languageValue : 'en'
        }], first: 150, orderBy: createdAt_DESC ${whereClause}) {
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
          thumbnailBackground { url }
          shortDescription
          isRecommended
        }
        medicalCasesV2(locales:[${
          languageValue ? languageValue : 'en'
        }],first: 150, orderBy: createdAt_DESC ${whereClause}) {
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
          isRecommended
          countries
        }
      }`,
    }),
  })

  const res = await response.json()
  const video = (res?.data?.webinarVideos || []).map((v: any) => ({ version: 'webinar', ...v }))
  const v1 = (res?.data?.medicalCases || []).map((c: any) => ({ version: '15m', ...c }))
  const v2 = (res?.data?.medicalCasesV2 || []).map((c: any) => ({ version: '5m', ...c }))
  const data = [...video, ...v1, ...v2]

  const sorted = data.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })

  return sorted
}

export const getAllMedicalCasesWithBookmarks = async (): Promise<MergedMedicalCase[]> => {
  const medicalCases = await getAllMedicalCases()
  const bookmarksResult = await getBookmarks()
  const bookmarkIds = bookmarksResult?.data?.map((bookmark) => bookmark.case_id) ?? []

  return medicalCases.map((medicalCase) => ({
    ...medicalCase,
    isBookmarked: bookmarkIds.includes(medicalCase.id),
  }))
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
