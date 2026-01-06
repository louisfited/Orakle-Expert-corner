'use client'

import { SimulationPage } from '@/components/simulation-page'
import { MedicalCase, PatientCase } from '@/interface'
import { Tables } from '@/lib/types/database.types'

/*
 * Wrapper to initialize the CaseContextProvider
 * */

type SimulationPageWrapperProps = {
  medicalCase: MedicalCase | null
  patientCase: PatientCase | null
  medicalCaseId: string
  bookmark: Tables<'bookmarks'>
  likes: Tables<'likes'>
}

export const SimulationPageWrapper = ({
  medicalCase,
  patientCase,
  medicalCaseId,
  bookmark,
  likes,
}: SimulationPageWrapperProps) => {
  return (
    <>
      {/* NOTE: Likes is from supabase. The number of likes comes from the medical case. */}
      <SimulationPage
        medicalCase={medicalCase}
        patientCase={patientCase}
        medicalCaseId={medicalCaseId}
        bookmark={bookmark}
        likes={likes}
      />
    </>
  )
}
