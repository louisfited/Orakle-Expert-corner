import React, { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Drawer, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle } from '@/components/ui/drawer'
import { ChevronsRight } from 'lucide-react'
import Cookies from 'js-cookie'
import languageTexts from '@/lib/utils/language'

type RationalesDialogProps = {
  asDrawer?: boolean
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string | React.ReactNode
  icon?: React.ReactNode
  content: React.ReactNode
  showButton?: boolean
  isRationale?: boolean
  rationales?: string[]
}

const formatText = (key: string): string => {
  return key
    .replace(/([A-Z])/g, ' $1') // Add space before uppercase letters
    .replace(/^./, (str) => str.toUpperCase()) // Capitalize the first letter
}

export const RationalesDialog = (props: RationalesDialogProps) => {
  const [step, setStep] = useState(1) // Track which step is being displayed
  const [isMounted, setIsMounted] = useState<boolean>(false)

  const lang: 'en' | 'fr' | 'de' | undefined = Cookies.get('language') as 'en' | 'fr' | 'de' | undefined

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Reset step to 1 when the dialog/drawer is closed
  useEffect(() => {
    if (!props.open) {
      setStep(1)
    } else if (!props.rationales || props.rationales.length === 0) {
      setStep(2)
    }
  }, [props.open, props.rationales, props.isRationale])

  const [selectedOptions, setSelectedOptions] = useState<string[]>([])
  const handleOptionChange = (rationale: string) => {
    setSelectedOptions((prevSelected) =>
      prevSelected.includes(rationale)
        ? prevSelected.filter((item) => item !== rationale)
        : [...prevSelected, rationale]
    )
  }
  const handleNextStep = () => setStep(2)
  const handleBack = () => setStep(1)
  const handleClose = () => {
    setStep(1) // Reset the step when closing
    setSelectedOptions([])
    props.onOpenChange(false) // Notify parent to close the dialog
  }

  if (props.asDrawer) {
    return (
      <Drawer
        open={props.open}
        onOpenChange={handleClose}
      >
        <DrawerContent>
          <div
            className="cursor-pointer px-4 "
            onClick={handleClose}
          >
            <ChevronsRight
              className="text-textPrimary"
              size={48}
            />
          </div>
          {props.isRationale && step === 1 ? (
            <DrawerHeader>
              <DrawerTitle className="flex items-center gap-2 mb-4">
                {isMounted && languageTexts(lang).selectAnOption}
              </DrawerTitle>
              {/* Radio Button List */}
              <div className="flex flex-col gap-4">
                {props.rationales?.map((rationale, index) => (
                  <label
                    key={index}
                    className="flex items-center gap-2"
                  >
                    <input
                      type="checkbox"
                      value={rationale}
                      checked={selectedOptions.includes(rationale)}
                      onChange={() => handleOptionChange(rationale)}
                      className="form-checkbox"
                    />
                    {formatText(rationale)}
                  </label>
                ))}
              </div>
              <DrawerFooter>
                <Button
                  variant="primary"
                  className="py-6"
                  onClick={handleNextStep}
                >
                  {isMounted && languageTexts(lang).next}
                </Button>
              </DrawerFooter>
            </DrawerHeader>
          ) : (
            <>
              <DrawerHeader>
                <DrawerTitle className="flex items-center gap-2 mb-4">
                  {props.icon}
                  {props.title}
                </DrawerTitle>
                {props.content}
              </DrawerHeader>
              <DrawerFooter>
                {props.isRationale && (
                  <Button
                    variant="outline"
                    className="py-6 mr-4 capitalize"
                    onClick={handleBack}
                  >
                    {isMounted && languageTexts(lang).back}
                  </Button>
                )}
                <Button
                  variant="primary"
                  className="py-6 capitalize"
                  onClick={handleClose}
                >
                  {isMounted && languageTexts(lang).close}
                </Button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <Dialog
      open={props.open}
      onOpenChange={handleClose}
    >
      <DialogContent className="p-10">
        {step === 1 ? (
          <>
            <DialogHeader>
              <DialogTitle>{isMounted && languageTexts(lang).selectRationales}</DialogTitle>
            </DialogHeader>
            {/* Radio Button List */}
            <div className="flex flex-col gap-4">
              {props.rationales?.map((rationale, index) => (
                <label
                  key={index}
                  className="flex items-center gap-2"
                >
                  <input
                    type="checkbox"
                    value={rationale}
                    checked={selectedOptions.includes(rationale)}
                    onChange={() => handleOptionChange(rationale)}
                    className="form-checkbox"
                  />
                  {formatText(rationale)}
                </label>
              ))}
            </div>
            <Button
              variant="primary"
              className="py-6 mt-6"
              onClick={handleNextStep}
            >
              {isMounted && languageTexts(lang).next}
            </Button>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 mb-4">
                {props.icon}
                {props.title}
              </DialogTitle>
            </DialogHeader>
            <div className="max-h-[50vh] gap-8 flex flex-col overflow-y-auto">{props.content}</div>
            {props.showButton && (
              <Button
                variant="primary"
                className="py-6 mt-6"
                onClick={handleClose}
              >
                {isMounted && languageTexts(lang).gotIt}
              </Button>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
