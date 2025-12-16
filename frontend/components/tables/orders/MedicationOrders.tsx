import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import { useDisclose } from '@/lib/hooks/useDisclose'
import { GenericDialog } from '@/components/custom/GenericDialog'
import { MedicationSelection } from '@/interface'
import { RenderHTML } from '@/components/RenderHTML'
import { GuidanceIconStrings, GuidanceTitleStrings } from '@/components/GuidanceTitle'
import { useCaseContext } from '@/lib/context/caseContext'
import { H2, Label, MedicationLabel } from '@/components/Title'
import { RationalesDialog } from '@/components/custom/RationalesDialog'
import Cookies from 'js-cookie'
import languageTexts from '@/lib/utils/language'
import { MinusIcon, PlusIcon } from 'lucide-react'

type AddMedicationSelectionProps = {
  medicationSelectionData?: MedicationSelection[]
  setDisabledNext: (state: boolean) => void
  medicationAmount: number
}

type ExtendedOrder = MedicationSelection & { showGuidance?: boolean }

export const AddMedicationSelection = ({
  medicationSelectionData,
  setDisabledNext,
  medicationAmount,
}: AddMedicationSelectionProps) => {
  const [currentMedicationSelection, setCurrentMedicationSelection] = React.useState<MedicationSelection | null>(null)
  const [medications, setMedications] = React.useState<ExtendedOrder[]>(medicationSelectionData as ExtendedOrder[])
  const { isOpen, onToggle } = useDisclose()
  const { updateItemToReview, removeItemFromReview } = useCaseContext()
  const [isMounted, setIsMounted] = useState<boolean>(false)

  const lang: 'en' | 'fr' | 'de' | undefined = Cookies.get('language') as 'en' | 'fr' | 'de' | undefined

  useEffect(() => {
    setIsMounted(true)
  }, [])
  function handleIconClick(medication: ExtendedOrder) {
    setCurrentMedicationSelection(medication)
    onToggle()
  }

  function handleMedicationButtonClick(medication: ExtendedOrder) {
    setCurrentMedicationSelection(medication)

    const currentOrders = medications.map((o) => {
      if (o.name === medication?.name) {
        return { ...o, showGuidance: !medication?.showGuidance }
      }
      return o
    })

    setMedications(currentOrders)

    if (medication?.showGuidance) {
      removeItemFromReview(medication, 'selectedMedication')
    } else {
      updateItemToReview(medication, 'selectedMedication')
    }

    if (!medication?.showGuidance) {
      onToggle()
    }
  }

  return (
    <div className="mt-8">
      <H2 title={isMounted ? languageTexts(lang).addMedications : 'Add Medications'} />
      <div className="flex justify-end font-bold">
        <MedicationLabel
          title={
            isMounted && medicationAmount > 0
              ? languageTexts(lang).pleaseSelect +
                ' ' +
                medicationAmount +
                ' ' +
                (medicationAmount > 1 ? languageTexts(lang).medications : languageTexts(lang).medication) +
                ' ' +
                languageTexts(lang).toProceedToNextPage
              : languageTexts(lang).dontSelectAnyMedicationToProceed
          }
        />
      </div>

      <ul>
        {medications?.map((medication) => (
          <li
            key={medication.name}
            className="border-b border-gray-300 py-4"
          >
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <span className="font-medium text-black text-md">{medication?.name}</span>
              </div>

              <div className="flex items-center gap-4">
                <Button
                  variant="primary"
                  className="capitalize"
                  onClick={() => handleMedicationButtonClick(medication)}
                >
                  {isMounted && medication.showGuidance ? languageTexts(lang).remove : languageTexts(lang).add}
                  {isMounted && medication.showGuidance ? (
                    <MinusIcon className="h-4 w-4" />
                  ) : (
                    <PlusIcon className="h-4 w-4" />
                  )}
                </Button>

                {medication.showGuidance && (
                  <div
                    onClick={() => handleIconClick(medication)}
                    className="hover:cursor-pointer"
                  >
                    <GuidanceIconStrings guidanceType={medication.guidanceType} />
                  </div>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>

      <RationalesDialog
        open={isOpen}
        onOpenChange={onToggle}
        isRationale={
          currentMedicationSelection?.guidanceType === 'partiallyCorrect' ||
          currentMedicationSelection?.guidanceType === 'correct'
        }
        rationales={currentMedicationSelection?.rationales}
        title={<GuidanceTitleStrings guidanceType={currentMedicationSelection?.guidanceType} />}
        icon={<GuidanceIconStrings guidanceType={currentMedicationSelection?.guidanceType} />}
        content={<RenderHTML htmlString={currentMedicationSelection?.actionText[0]?.text.html} />}
      />
    </div>
  )
}
