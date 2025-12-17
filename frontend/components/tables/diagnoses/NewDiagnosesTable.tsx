import React, { useEffect, useState } from 'react'
import { useDisclose } from '@/lib/hooks/useDisclose'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { GenericDialog } from '@/components/custom/GenericDialog'
import { RenderHTML } from '@/components/RenderHTML'
import { GuidanceIcon, GuidanceTitle } from '@/components/GuidanceTitle'
import { useCaseContext } from '@/lib/context/caseContext'
import Cookies from 'js-cookie'
import languageTexts from '@/lib/utils/language'
import { MinusIcon, PlusIcon } from 'lucide-react'

type NewDiagnoseTableProps = {
  newDiagnoses: {
    name: string
    guidanceText: {
      html: any
    }
    startDate: number
    endDate: number
    guidance: boolean
    isExisting: boolean
    showGuidance?: boolean
  }[]
  setDisabledNext: (state: boolean) => void
}

export const NewDiagnosesTable = ({ newDiagnoses, setDisabledNext }: NewDiagnoseTableProps) => {
  const [diagnoseHtmlText, setDiagnoseHtmlText] = useState<string>('')
  const [currentSelectedDiagnose, setCurrentSelectedDiagnose] = useState<any>(null)
  const [newDiagnosesState, setNewDiagnosesState] = useState(newDiagnoses)
  const { isOpen, onToggle } = useDisclose()
  const { updateItemToReview, removeItemFromReview } = useCaseContext()

  const [isMounted, setIsMounted] = useState<boolean>(false)

  const lang: 'en' | 'fr' | 'de' | undefined = Cookies.get('language') as 'en' | 'fr' | 'de' | undefined

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Function to check whether to disable the "Next" button
  useEffect(() => {
    const shouldDisableNext = newDiagnosesState.some((diagnose) => diagnose.showGuidance && !diagnose.guidance)
    setDisabledNext(shouldDisableNext)
  }, [newDiagnosesState, setDisabledNext])

  const handleAddDiagnoseClick = (nD: any) => {
    setDiagnoseHtmlText(nD.guidanceText.html) //Sets the text for the popup when clicking
    setCurrentSelectedDiagnose(nD) //Changes some info on the popup, a check and title accordingly

    // Changes the table state to show the "!" signal and change the button appearance to remove
    const currentDiagnoses = newDiagnosesState.map((o) => {
      if (o.name === nD.name) {
        return { ...o, showGuidance: true }
      }
      return o
    })

    setNewDiagnosesState(currentDiagnoses) // Updates the state to reflect the changes
    updateItemToReview(nD, 'diagnose') // Updates the case context
    onToggle() // Opens the dialog
  }

  const handleRemoveDiagnoseClick = (nD: any) => {
    const updatedDiagnoses = newDiagnosesState.map((o) => {
      if (o.name === nD.name) {
        return { ...o, showGuidance: false, isExisting: false }
      }
      return o
    })

    setNewDiagnosesState(updatedDiagnoses)
    removeItemFromReview(nD, 'diagnose')
  }

  const diagnosesSearchData = newDiagnosesState.map((nD) => {
    return {
      label: nD.name,
      value: nD,
    }
  })
  return (
    <>
      {/* Removed SearchBox */}
      {/* <InputDropdownSearch placeholder="Search diagnoses" data={diagnosesSearchData} onClick={handleAddDiagnoseClick} /> */}

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">{isMounted && languageTexts(lang).name}</TableHead>
            <TableHead className="capitalize">{isMounted && languageTexts(lang).action}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {newDiagnosesState.map((nD, index) => {
            return (
              <TableRow key={index}>
                <TableCell className="font-medium w-2/3">{nD.name}</TableCell>
                <TableCell className="flex flex-row gap-6 items-center justify-end">
                  {nD.showGuidance || (nD.guidance && nD.isExisting) ? (
                    <Button
                      variant="primary"
                      onClick={() => handleRemoveDiagnoseClick(nD)}
                    >
                      {languageTexts(lang).remove}
                      <MinusIcon className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      variant="primary"
                      onClick={() => handleAddDiagnoseClick(nD)}
                    >
                      {isMounted && languageTexts(lang).add}
                      <PlusIcon className="h-4 w-4" />
                    </Button>
                  )}

                  {(nD.showGuidance || (nD.guidance && nD.isExisting)) && (
                    <div
                      onClick={onToggle}
                      className="cursor-pointer"
                    >
                      <GuidanceIcon guidance={nD.guidance} />
                    </div>
                  )}
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>

      <GenericDialog
        open={isOpen}
        onOpenChange={onToggle}
        title={<GuidanceTitle guidance={currentSelectedDiagnose?.guidance} />}
        icon={<GuidanceIcon guidance={currentSelectedDiagnose?.guidance} />}
        content={<RenderHTML htmlString={diagnoseHtmlText} />}
        showButton
      />
    </>
  )
}
