import { PatientCase } from '@/interface'
import { useCaseContext } from '@/lib/context/caseContext'
import { LikesButton } from '@/components/likes-button'
import { BookmarkButton } from '@/components/bookmark-button'
import Image from 'next/image'
import React from 'react'

export const TopProfile = ({ patientCase }: { patientCase: PatientCase }) => {
  const fullName = `${patientCase?.firstName} ${patientCase?.lastName}`
  const { bookmark, medicalCaseId, likes, medicalCase } = useCaseContext()

  return (
    <div>
      <div className="flex justify-between">
        <div className="flex flex-wrap text-textGray ml-auto">
          <LikesButton
            medicalCaseId={medicalCaseId!}
            likes={medicalCase?.likes ?? 0}
            isLiked={likes?.length}
          />
          <BookmarkButton
            caseId={medicalCaseId}
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
          <h2 className="text-lg font-semibold text-textPrimary">{fullName}</h2>
          <p className="text-gray-500 text-sm">{patientCase?.patientDescription}</p>
        </div>
      </div>
    </div>
  )
}
