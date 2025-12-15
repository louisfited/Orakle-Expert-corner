'use client'
import React, { FC, useEffect, useState } from 'react'
import { useCaseContext } from '@/lib/context/caseContext'
import { RenderHTML } from '@/components/RenderHTML'
import { Subtitle, Title } from '@/components/Title'
import { checkEmptyRichText } from '@/lib/utils'
import Cookies from 'js-cookie'
import languageTexts from '@/lib/utils/language'
interface Props {}

const Introduction: FC<Props> = () => {
  const { medicalCase } = useCaseContext()
  const lang: 'en' | 'fr' | 'de' | undefined = Cookies.get('language') as 'en' | 'fr' | 'de' | undefined
  const [isMounted, setIsMounted] = useState<boolean>(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (medicalCase === null) {
    return <SkeletonIntroduction />
  }
  return (
    <div>
      <Title title={isMounted ? languageTexts(lang).introduction : ''} />
      {medicalCase?.historyOfPresentIllness && !checkEmptyRichText(medicalCase?.historyOfPresentIllness.html) && (
        <div className="mt-8">
          <Subtitle title={isMounted ? languageTexts(lang).historyOfPresentIllness : 'History of Present Illness'} />
          <div className="mt-2 mb-4 text-textDark text-sm richtext">
            <RenderHTML htmlString={medicalCase?.historyOfPresentIllness?.html!} />
          </div>
        </div>
      )}
      {medicalCase?.familyAndSocialHistory && !checkEmptyRichText(medicalCase?.familyAndSocialHistory.html) && (
        <div>
          <Subtitle title={isMounted ? languageTexts(lang).familyAndSocialHistory : 'Family and Social History'} />
          <div className="mt-2 mb-4 text-textDark text-sm richtext">
            <RenderHTML htmlString={medicalCase?.familyAndSocialHistory.html!} />
          </div>
        </div>
      )}
      {medicalCase?.physicalExaminationNotes && !checkEmptyRichText(medicalCase?.physicalExaminationNotes.html) && (
        <div>
          <Subtitle title={isMounted ? languageTexts(lang).physicalExamNotes : 'Physical Examination Notes'} />
          <div className="mt-2 mb-4 text-textDark text-sm richtext">
            <RenderHTML htmlString={medicalCase?.physicalExaminationNotes.html!} />
          </div>
        </div>
      )}
    </div>
  )
}

export default Introduction

function SkeletonIntroduction() {
  return (
    <div className="items-center p-2 min-h-screen w-full">
      <div className="flex flex-row justify-between gap-4 w-full md:gap-2">
        <div className="flex flex-col w-full">
          <div className="skeleton-loader h-8 max-w-48 mb-16"></div>
          <div className="skeleton-loader h-4 max-w-48 mb-8"></div>
        </div>
      </div>
      <div className="flex flex-row justify-between gap-4 w-full md:gap-2">
        <div className="flex flex-col w-full">
          <div className="flex flex-row w-full gap-2">
            <div className="flex flex-col w-full">
              <div className="skeleton-loader h-6 max-w-1/2 mb-4"></div>
              <div className="skeleton-loader h-6 max-w-1/2 mb-4"></div>
              <div className="skeleton-loader h-6 max-w-1/2 mb-4"></div>
              <div className="skeleton-loader h-6 max-w-1/2 mb-4"></div>
              <div className="skeleton-loader h-6 max-w-1/2 mb-4"></div>
              <div className="skeleton-loader h-6 max-w-1/2 mb-4"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-between gap-4 w-full md:gap-2 mt-4">
        <div className="flex flex-col w-full">
          <div className="skeleton-loader h-4 max-w-48 mb-8 mt-4"></div>
        </div>
      </div>
      <div className="flex flex-row justify-between gap-4 w-full md:gap-2">
        <div className="flex flex-col w-full">
          <div className="flex flex-row w-full gap-2">
            <div className="flex flex-col w-full">
              <div className="skeleton-loader h-6 max-w-1/2 mb-4"></div>
              <div className="skeleton-loader h-6 max-w-1/2 mb-4"></div>
              <div className="skeleton-loader h-6 max-w-1/2 mb-4"></div>
              <div className="skeleton-loader h-6 max-w-1/2 mb-4"></div>
              <div className="skeleton-loader h-6 max-w-1/2 mb-4"></div>
              <div className="skeleton-loader h-6 max-w-1/2 mb-4"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-between gap-4 w-full md:gap-2 mt-4">
        <div className="flex flex-col w-full">
          <div className="skeleton-loader h-4 max-w-48 mb-8 mt-4"></div>
        </div>
      </div>
      <div className="flex flex-row justify-between gap-4 w-full md:gap-2">
        <div className="flex flex-col w-full">
          <div className="flex flex-row w-full gap-2">
            <div className="flex flex-col w-full">
              <div className="skeleton-loader h-6 max-w-1/2 mb-4"></div>
              <div className="skeleton-loader h-6 max-w-1/2 mb-4"></div>
              <div className="skeleton-loader h-6 max-w-1/2 mb-4"></div>
              <div className="skeleton-loader h-6 max-w-1/2 mb-4"></div>
              <div className="skeleton-loader h-6 max-w-1/2 mb-4"></div>
              <div className="skeleton-loader h-6 max-w-1/2 mb-4"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
