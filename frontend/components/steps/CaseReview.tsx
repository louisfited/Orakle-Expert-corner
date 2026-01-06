import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import React, { useEffect, useState } from 'react'
import { useCaseContext } from '@/lib/context/caseContext'
import { RenderHTML } from '../RenderHTML'
import { Title } from '@/components/Title'
import { checkEmptyRichText } from '@/lib/utils'
import Cookies from 'js-cookie'
import languageTexts from '@/lib/utils/language'

export const CaseReview = ({ setDiagnosisUrl }: { setDiagnosisUrl: React.Dispatch<React.SetStateAction<string>> }) => {
  const { medicalCase } = useCaseContext()
  const [isMounted, setIsMounted] = useState<boolean>(false)

  const lang: 'en' | 'fr' | 'de' | undefined = Cookies.get('language') as 'en' | 'fr' | 'de' | undefined

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    // Check medication selection first (higher priority)
    let urlFound = false
    medicalCase?.medicationSelection?.forEach((medication) => {
      console.log(medication)
      if (medication.reviewed && medication.url) {
        setDiagnosisUrl(medication.url)
        urlFound = true
      }
    })

    // Only check diagnoses if no medication selection URL was found
    if (!urlFound) {
      medicalCase?.diagnose.forEach((diagnosis) => {
        if (diagnosis.reviewed) {
          setDiagnosisUrl(diagnosis.url)
        }
      })
    }
  }, [medicalCase, setDiagnosisUrl])
  return (
    <div>
      <CaseReviewTabs />
    </div>
  )
}

const CaseReviewTabs = () => {
  const { medicalCase } = useCaseContext()
  const [isMounted, setIsMounted] = useState<boolean>(false)

  const lang: 'en' | 'fr' | 'de' | undefined = Cookies.get('language') as 'en' | 'fr' | 'de' | undefined

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const hasClosingRemarks = () => {
    return medicalCase?.closingRemarks && !checkEmptyRichText(medicalCase?.closingRemarks.html)
  }

  const hasLiteratureReview = () => {
    return medicalCase?.literatureReview && !checkEmptyRichText(medicalCase?.literatureReview.html)
  }

  const hasReferences = () => {
    return medicalCase?.references && !checkEmptyRichText(medicalCase?.references.html)
  }

  return (
    <>
      <Title title={isMounted ? languageTexts(lang).caseReview : 'Case Review'} />
      <Tabs
        defaultValue={
          hasClosingRemarks() ? 'closing-remarks' : hasLiteratureReview() ? 'literature-review' : 'references'
        }
        className="mt-4"
      >
        <TabsList variant="default">
          {hasClosingRemarks() && (
            <TabsTrigger value="closing-remarks">{isMounted && languageTexts(lang).closingRemarks}</TabsTrigger>
          )}
          {hasLiteratureReview() && (
            <TabsTrigger value="literature-review">{isMounted && languageTexts(lang).literatureReview}</TabsTrigger>
          )}
          {hasReferences() && (
            <TabsTrigger value="references">{isMounted && languageTexts(lang).references}</TabsTrigger>
          )}
        </TabsList>
        {hasClosingRemarks() && (
          <TabsContent value="closing-remarks">
            <RenderHTML htmlString={medicalCase?.closingRemarks?.html!} />
          </TabsContent>
        )}
        {hasLiteratureReview() && (
          <TabsContent value="literature-review">
            <RenderHTML htmlString={medicalCase?.literatureReview?.html!} />{' '}
          </TabsContent>
        )}
        {hasReferences() && (
          <TabsContent value="references">
            {' '}
            <RenderHTML
              htmlString={medicalCase?.references?.html!}
              className="references"
            />
          </TabsContent>
        )}

        {/* <TabsContent value="performance-analysis">
        <PerformanceAnalysisContent  />
      </TabsContent> */}
        {/* <TabsContent value="peer-stats">
        <PeerStats  />
        <CaseReviewPeersTestTable />
      </TabsContent> */}
      </Tabs>
    </>
  )
}
