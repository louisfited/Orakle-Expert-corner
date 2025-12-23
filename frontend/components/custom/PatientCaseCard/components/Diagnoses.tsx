import React, { forwardRef, useEffect, useState } from 'react'
import { Diagnose } from '@/interface'
import { Accordion } from '@/components/Accordion'
import PastDiagnosesList from '@/components/tables/diagnoses/PastDiagnosesTable'
import Cookies from 'js-cookie'
import languageTexts from '@/lib/utils/language'

export const Diagnoses = forwardRef<HTMLDivElement, { pastDiagnoses: Diagnose[] }>(({ pastDiagnoses }, ref) => {
  const lang: 'en' | 'fr' | 'de' | undefined = Cookies.get('language') as 'en' | 'fr' | 'de' | undefined

  const [isMounted, setIsMounted] = useState<boolean>(false)
  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <div ref={ref}>
      <Accordion title={isMounted ? languageTexts(lang).diagnoses : ''}>
        <PastDiagnosesList pastDiagnoses={pastDiagnoses} />
      </Accordion>
    </div>
  )
})

Diagnoses.displayName = 'Diagnoses'
