'use client'
import React, { forwardRef, useEffect, useState } from 'react'
import { MedicalCase } from '@/interface'
import { RenderHTML } from '@/components/RenderHTML'
import { Accordion } from '@/components/Accordion'
import Cookies from 'js-cookie'
import languageTexts from '@/lib/utils/language'

export const CaseDescription = forwardRef<HTMLDivElement, { medicalCase: MedicalCase }>(({ medicalCase }, ref) => {
  const lang: 'en' | 'fr' | 'de' | undefined = Cookies.get('language') as 'en' | 'fr' | 'de' | undefined

  const [isMounted, setIsMounted] = useState<boolean>(false)
  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <div ref={ref}>
      <Accordion title={isMounted ? languageTexts(lang).caseDescription : ''}>
        <div className="richtext">
          <RenderHTML htmlString={medicalCase?.caseDescription?.html!} />
        </div>
      </Accordion>
    </div>
  )
})

CaseDescription.displayName = 'CaseDescription'
