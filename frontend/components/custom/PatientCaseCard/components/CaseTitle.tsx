import React, { forwardRef } from 'react'
import { MedicalCase } from '@/interface'
import { RenderHTML } from '@/components/RenderHTML'
import { Accordion } from '@/components/Accordion'

export const CaseTitle = forwardRef<HTMLDivElement, { medicalCase: MedicalCase }>(({ medicalCase }, ref) => {
  return (
    <div ref={ref}>
      <Accordion title="Case Title">
        <div className="richtext">
          <RenderHTML htmlString={medicalCase?.title} />
        </div>
      </Accordion>
    </div>
  )
})

CaseTitle.displayName = 'CaseTitle'
