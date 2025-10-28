'use server'

import Container from '@/components/general/Container'
import { getAllMedicalCases, getAllMedicalCasesForStaging } from '@/lib/hygraph/getAllMedicalCases'
import MedicalCasesTable from '@/components/MedicalCasesTable'
import { getBookmarks } from '@/lib/data/repository/bookmarks'
import { getUserProfile } from '@/lib/data/repository/user-profile'
import { getAllLikes } from '@/lib/data/repository/likes'
import Link from 'next/link'
import CookiesBanner from '@/components/CookiesBanner'
import LanguageDropDown from '@/components/LanguageDropDown'
import languageTexts from '@/lib/utils/language'
import { cookies } from 'next/headers'


const staging_invite_only = 'Staging - Invite Only'

export default async function Home() {
  const { data: bookmarks } = await getBookmarks()

  const { data: likes } = await getAllLikes()
  const { data: userProfile } = await getUserProfile()

  let medicalCases = undefined



const lang = cookies().get("language")?.value as "en" | "fr" | "de"| undefined


  
  // if (userProfile?.country_of_practice === staging_invite_only) {
  //   medicalCases = await getAllMedicalCasesForStaging()
  // } else {
  // }
  medicalCases = await getAllMedicalCases()
  // console.log(medicalCases);
  

  
  
  // Ensure caseDescription is always defined
  medicalCases = medicalCases?.map((mc: any) => ({
    ...mc,
    caseDescription: mc.caseDescription ?? { html: '' },
  }))
 

  return (
    <div className="h-full flex flex-col">
     
      <LanguageDropDown/>
      <Container className="flex-grow">
        <div className="flex items-center justify-between my-4">
         {userProfile?.first_name && <h2 className="text-xl font-medium">{languageTexts(lang).welcomeBack}, {userProfile?.first_name}</h2>}
        </div>

        <MedicalCasesTable
          medicalCases={medicalCases}
          bookmarks={bookmarks}
          likes={likes}
          user={userProfile ?? {}}
        />
      </Container>

      <footer className="mx-8 my-4">
        <Link
          href="https://www.orakle.digital/clinics"
          target="_blank"
          className="flex flex-wrap justify-center mb-8"
        ></Link>
      </footer>

      {userProfile && <CookiesBanner cookiesAccepted={userProfile?.cookies_accepted} />}
    </div>
  )
}
