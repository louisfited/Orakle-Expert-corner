import getMedicalCaseById from '@/lib/hygraph/getMedicalCaseById'
import React, { FC } from 'react'
import getPatientById from '@/lib/hygraph/getPatientById'
import { SimulationPageWrapper } from '@/components/simulation-page-wrapper'
import { getBookmarkByCaseIdAction } from '@/lib/data/repository/bookmarks'
import { getLikesByMedicalCaseId } from '@/lib/data/repository/likes'
import { cookies } from 'next/headers'
import languageTexts from '@/lib/utils/language'
import getWebinarVideoById from '@/lib/hygraph/getWebinarVideoById'
import VideoPlayer from '@/components/VideoPlayer'
import VideoPlayerBtn from '@/components/VideoPlayerBtn'



interface Props {
  params: {
    id: string;
  }
}
async function Page({searchParams, params}: {  searchParams: Promise<{password: string, email: string }>, params: Promise<{ id: string}>})
{  
  const { id } = await params
  const { email, password } = await searchParams; 

  

const lang = cookies().get("language")?.value as "en" | "fr" | "de"| undefined

  const webinarVideo = await getWebinarVideoById(id, {email, password})

  if (!webinarVideo) {
    return <div>{languageTexts(lang).webinarVidoeNotFound}</div>
  }

//   const patientId = medicalCase?.patient?.id
//   if (!patientId) {
//     return (
//       <div className="flex items-center justify-center ">
//         <h3>{languageTexts(lang).forgotToAddPatient}</h3>
//       </div>
//     )
//   }

//   const patientCase = medicalCase?.patient || null;
//   if (!patientCase) {
//     return <div className="min-h-screen">{languageTexts(lang).patientCaseNotFound}</div>
//   }

//   const { data: bookmark, error } = await getBookmarkByCaseIdAction(id)

//   if (error) {
//     return <div className="min-h-screen">{languageTexts(lang).somethingWentWrong}</div>
//   }

//   const { data: likes } = await getLikesByMedicalCaseId(id)

  return <div className='lg:px-16 px-4 my-4 '>
     <h1 className="text-textPrimary font-semibold text-3xl text-center my-6">{webinarVideo.title}</h1>
   
<VideoPlayer
  url= {webinarVideo.videoUrl}
  finishUrl = {webinarVideo.finishUrl}
  className = "shadow-2xl shadow-black"
  aspectRatio = "16/9"

/>
<VideoPlayerBtn 
finishUrl={webinarVideo.finishUrl}
/>

  </div>
}

export default Page


{/* <SimulationPageWrapper
    medicalCase={medicalCase}
    patientCase={patientCase}
    medicalCaseId={id}
    bookmark={bookmark as any}
    likes={likes as any}
  /> */}