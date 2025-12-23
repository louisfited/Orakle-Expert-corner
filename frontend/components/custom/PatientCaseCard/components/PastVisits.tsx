import React, { forwardRef, useEffect, useState } from 'react'
import { PastVisit } from '@/interface'
import PastVisitsTable from '@/components/tables/visits/PastVisitsTable'
import { Accordion } from '@/components/Accordion'
import Cookies from 'js-cookie'
import languageTexts from '@/lib/utils/language'

export const PastVisits = forwardRef<HTMLDivElement, { pastVisits: PastVisit[] }>(({ pastVisits }, ref) => {
  const lang: 'en' | 'fr' | 'de' | undefined = Cookies.get('language') as 'en' | 'fr' | 'de' | undefined

  const [isMounted, setIsMounted] = useState<boolean>(false)
  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <div ref={ref}>
      <Accordion title={isMounted ? languageTexts(lang).pastVisits : ''}>
        <PastVisitsTable pastVisits={pastVisits} />
      </Accordion>
    </div>
  )
})

PastVisits.displayName = 'PastVisits'
