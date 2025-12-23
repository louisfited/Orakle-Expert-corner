import getMedicalCaseById from '@/lib/hygraph/getMedicalCaseById'
import React from 'react'
import { SimulationPageWrapper } from '@/components/simulation-page-wrapper'
import { getBookmarkByCaseIdAction } from '@/lib/data/repository/bookmarks'
import { getLikesByMedicalCaseId } from '@/lib/data/repository/likes'
import { cookies } from 'next/headers'
import languageTexts from '@/lib/utils/language'

interface Props {
  params: {
    id: string
  }
}
async function Page({
  searchParams,
  params,
}: {
  searchParams: Promise<{ password: string; email: string }>
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const { email, password } = await searchParams

  const lang = cookies().get('language')?.value as 'en' | 'fr' | 'de' | undefined

  const medicalCase = await getMedicalCaseById(id, { email, password })

  if (!medicalCase) {
    return <div>{languageTexts(lang).medicalCaseNotFound}</div>
  }

  const patientId = medicalCase?.patient?.id
  if (!patientId) {
    return (
      <div className="flex items-center justify-center ">
        <h3>{languageTexts(lang).forgotToAddPatient}</h3>
      </div>
    )
  }

  const patientCase = medicalCase?.patient || null
  if (!patientCase) {
    return <div className="min-h-screen">{languageTexts(lang).patientCaseNotFound}</div>
  }

  const { data: bookmark, error } = await getBookmarkByCaseIdAction(id)

  if (error) {
    return <div className="min-h-screen">{languageTexts(lang).somethingWentWrong}</div>
  }

  const { data: likes } = await getLikesByMedicalCaseId(id)

  return (
    <SimulationPageWrapper
      medicalCase={medicalCase}
      patientCase={patientCase}
      medicalCaseId={id}
      bookmark={bookmark as any}
      likes={likes as any}
    />
  )
}

export default Page
