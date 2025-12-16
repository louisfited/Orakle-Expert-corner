import React, { FC, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { useDisclose } from '@/lib/hooks/useDisclose'
import { GenericDialog } from '@/components/custom/GenericDialog'
import { useCaseContext } from '@/lib/context/caseContext'
import { Test } from '@/interface'
import { GuidanceIcon, GuidanceTitle } from '@/components/GuidanceTitle'
import { RenderHTML } from '@/components/RenderHTML'
import { H2, Label, Title } from '@/components/Title'
import { Import } from 'lucide-react'
import Cookies from 'js-cookie'
import languageTexts from '@/lib/utils/language'
import { PlusIcon, ChevronRightIcon, CheckIcon } from '@radix-ui/react-icons'

const Tests = ({ setDisabledNext }: { setDisabledNext: (state: boolean) => void }) => {
  const { medicalCase } = useCaseContext()
  const [isMounted, setIsMounted] = useState<boolean>(false)

  const lang: 'en' | 'fr' | 'de' | undefined = Cookies.get('language') as 'en' | 'fr' | 'de' | undefined

  useEffect(() => {
    setIsMounted(true)
  }, [])
  return (
    <div className="flex flex-col gap-4">
      <Title title={isMounted ? languageTexts(lang).tests : 'Tests'} />
      <Label
        title={isMounted ? languageTexts(lang).selectAppropriateTests : 'Select appropriate tests for the patient.'}
      />
      {medicalCase && (
        <TestsTable
          setDisabledNext={setDisabledNext}
          tests={medicalCase?.tests}
        />
      )}
    </div>
  )
}

type ExtendedTest = Test & { showGuidance?: boolean }

type TestsTableProps = {
  tests?: ExtendedTest[]
  setDisabledNext: (state: boolean) => void
}

const TestsTable = ({ tests, setDisabledNext }: TestsTableProps) => {
  const { isOpen, onToggle } = useDisclose()
  const { isOpen: isOnlyGuidanceOpen, onToggle: onOnlyGuidanceToggle } = useDisclose()
  const { isOpen: isOnlyFindingOpen, onToggle: onOnlyFindingToggle } = useDisclose()

  const [selectedTestContent, setSelectedTestContent] = React.useState<any>(null)
  const [testsState, setTestsState] = useState<ExtendedTest[]>(tests as ExtendedTest[])
  const { updateItemToReview, removeItemFromReview } = useCaseContext()
  const [isMounted, setIsMounted] = useState<boolean>(false)

  const lang: 'en' | 'fr' | 'de' | undefined = Cookies.get('language') as 'en' | 'fr' | 'de' | undefined

  useEffect(() => {
    setIsMounted(true)
  }, [])
  // Function to check whether to disable the "Next" button
  useEffect(() => {
    const shouldDisableNext = testsState?.some((test) => test.showGuidance && !test.guidance)
    setDisabledNext(shouldDisableNext)
  }, [testsState, setDisabledNext])

  const handleTestClick = (test: Test) => {
    const _tests = testsState?.map((o) => {
      if (o.id === test.id) {
        return { ...o, showGuidance: true, reviewed: true }
      }
      return o
    })
    setTestsState(_tests)
    updateItemToReview({ ...test, reviewed: true }, languageTexts(lang).test || 'test')
    setSelectedTestContent(test)
    onToggle()
  }

  const handleFindingsClick = (test: Test) => {
    setSelectedTestContent(test)
    onOnlyFindingToggle()
  }

  const buttonOnClick = (test: ExtendedTest) => {
    if (test.showGuidance) {
      handleFindingsClick(test)
    } else {
      handleTestClick(test)
    }
  }

  const guidanceOnClick = (test: ExtendedTest) => {
    setSelectedTestContent(test)
    onOnlyGuidanceToggle()
  }

  const handleRemoveTestClick = (test: Test) => {
    const updatedTests = testsState?.map((o) => {
      if (o.id === test.id) {
        return { ...o, showGuidance: false }
      }
      return o
    })
    setTestsState(updatedTests)
    removeItemFromReview(test, 'test')
  }

  return (
    <>
      <TestList
        tests={testsState}
        onClick={buttonOnClick}
        guidanceOnClick={guidanceOnClick}
        handleRemoveTestClick={handleRemoveTestClick}
      />

      <GenericDialog
        open={isOpen}
        onOpenChange={onToggle}
        icon={<GuidanceIcon guidance={selectedTestContent?.guidance} />}
        title={<GuidanceTitle guidance={selectedTestContent?.guidance} />}
        content={
          <div>
            <RenderHTML htmlString={selectedTestContent?.findings.html || ''} />
            <RenderHTML htmlString={selectedTestContent?.guidanceText.html || ''} />
          </div>
        }
      />

      <GenericDialog
        asDrawer
        open={isOnlyGuidanceOpen}
        onOpenChange={onOnlyGuidanceToggle}
        title={
          <H2
            title={
              selectedTestContent?.guidance
                ? languageTexts(lang).providedForYourBenefit
                : languageTexts(lang).somethingDoesNotLookRight
            }
          />
        }
        content={
          <div>
            <RenderHTML htmlString={selectedTestContent?.guidanceText.html || ''} />
          </div>
        }
      />

      <GenericDialog
        open={isOnlyFindingOpen}
        onOpenChange={onOnlyFindingToggle}
        icon={<GuidanceIcon guidance={selectedTestContent?.guidance} />}
        title={<p className="capitalize">{languageTexts(lang).findings}</p>}
        content={
          !selectedTestContent?.guidance ? (
            <div>
              <RenderHTML htmlString={selectedTestContent?.findings.html || ''} />
            </div>
          ) : (
            <div>
              <RenderHTML htmlString={selectedTestContent?.findings.html || ''} />
            </div>
          )
        }
      />
    </>
  )
}

type TestListProps = {
  tests: ExtendedTest[]
  onClick: (test: ExtendedTest) => void
  guidanceOnClick: (test: ExtendedTest) => void
  handleRemoveTestClick: (test: Test) => void
}

const TestList = ({ tests, onClick, guidanceOnClick, handleRemoveTestClick }: TestListProps) => {
  const [isMounted, setIsMounted] = useState<boolean>(false)

  const lang: 'en' | 'fr' | 'de' | undefined = Cookies.get('language') as 'en' | 'fr' | 'de' | undefined

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <ul>
      {tests?.map((test, index) => (
        <li
          key={index}
          className="flex justify-between items-center border-b border-borderBottom py-4"
        >
          <span className="text-lg font-semibold w-3/5 ">{test.name}</span>
          <div className="flex items-center gap-4">
            {test?.showGuidance ? (
              test.guidance ? (
                <>
                  <div className="flex items-center gap-2 text-sm text-textPrimary font-medium">
                    {isMounted && languageTexts(lang).ordered}
                    <CheckIcon className="h-4 w-4" />
                  </div>
                  <Button
                    variant="primary"
                    onClick={() => onClick(test)}
                    className="gap-1"
                  >
                    {isMounted && languageTexts(lang).viewResults}
                    <ChevronRightIcon className="h-4 w-4" />
                  </Button>
                </>
              ) : (
                <Button
                  variant="outline"
                  onClick={() => handleRemoveTestClick(test)}
                >
                  {isMounted && languageTexts(lang).remove}
                </Button>
              )
            ) : (
              <Button
                variant="primary"
                className="capitalize gap-1"
                onClick={() => onClick(test)}
              >
                {isMounted && languageTexts(lang).order}
                <PlusIcon className="h-4 w-4" />
              </Button>
            )}
            <div
              className={`flex items-center gap-4 cursor-pointer ${test.showGuidance ? 'visible' : 'invisible'}`}
              onClick={() => test.showGuidance && guidanceOnClick(test)}
            >
              <GuidanceIcon guidance={test.guidance} />
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default Tests
