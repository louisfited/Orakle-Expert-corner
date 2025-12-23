import { MedicalCaseV2, PatientCase } from '@/interface'
import { LikesButton } from '@/components/likes-button'
import { BookmarkButton } from '@/components/bookmark-button'
import Image from 'next/image'
import React from 'react'
import { Button } from '@/components/ui/button'
import { useCaseContext } from '@/lib/context/caseContext'

export const TopProfileMedicalCaseV2 = ({
  patientCase,
}: {
  patientCase: PatientCase
  medicalCaseV2: MedicalCaseV2
}) => {
  const fullName = `${patientCase?.firstName} ${patientCase?.lastName}`
  const { bookmark, likes, medicalCaseV2Id, medicalCaseV2 } = useCaseContext()

  const handleRestart = () => {
    window.location.reload()
  }
  return (
    <div>
      <div className="flex justify-between">
        <div className="flex flex-wrap text-textGray ml-auto">
          <LikesButton
            medicalCaseId={medicalCaseV2Id!}
            likes={medicalCaseV2?.likes ?? 0}
            isLiked={likes?.length}
            isMedicalCaseV2={true}
          />
          <BookmarkButton
            caseId={medicalCaseV2Id}
            bookmarked={bookmark?.length > 0}
            caseTitle={'none'}
          />
        </div>
      </div>
      <div className="flex items-center justify-start gap-4 p-4">
        <Image
          src={patientCase?.profileImage.url || ''}
          alt="patient image"
          width={100}
          height={100}
          className="rounded-full border-2 border-textGray object-cover w-[100px] h-[100px]"
        />
        <div className="flex flex-col justify-center text-left">
          <h2 className="text-lg font-semibold">{fullName}</h2>
          <p className="text-gray-500 text-sm">{patientCase?.patientDescription}</p>
        </div>
      </div>
    </div>
  )
}
