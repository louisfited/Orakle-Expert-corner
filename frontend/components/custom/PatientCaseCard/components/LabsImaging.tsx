import React, { forwardRef, useEffect, useState } from 'react'
import { PastTest } from '@/interface'
import PastTestsTable from '@/components/tables/tests/PastTestsTable'
import { Accordion } from '@/components/Accordion'
import Cookies from 'js-cookie'
import languageTexts from '@/lib/utils/language'

export const LabsImaging = forwardRef<HTMLDivElement, { pastTests: PastTest[] }>(({ pastTests }, ref) => {
  const lang: 'en' | 'fr' | 'de' | undefined = Cookies.get('language') as 'en' | 'fr' | 'de' | undefined

  const [isMounted, setIsMounted] = useState<boolean>(false)
  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <div ref={ref}>
      <Accordion title={isMounted ? languageTexts(lang).labsImaging : ''}>
        <PastTestsTable pastTests={pastTests} />
      </Accordion>
    </div>
  )
})

LabsImaging.displayName = 'LabsImaging'
