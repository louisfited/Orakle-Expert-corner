import { Asterisk, Check, CheckCheck } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { IonAlert } from '@/components/icons/ion_alert'
import Cookies from 'js-cookie'
import languageTexts from '@/lib/utils/language'

export const GuidanceTitle = ({ guidance }: { guidance?: boolean }) => {
  const [isMounted, setIsMounted] = useState<boolean>(false)

  const lang: 'en' | 'fr' | 'de' | undefined = Cookies.get('language') as 'en' | 'fr' | 'de' | undefined

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <div className="flex items-center">
      <p className="ml-2">
        {isMounted && guidance
          ? languageTexts(lang).consistentWithGuidance
          : languageTexts(lang).inconsistentWithGuidance}
      </p>
    </div>
  )
}

export const GuidanceIcon = ({ guidance, clickEvent }: { guidance?: boolean; clickEvent?: any }) => (
  <div
    onClick={clickEvent ? clickEvent : undefined}
    className="flex items-center"
  >
    {guidance ? <CheckIcon /> : <AsteriskIcon />}
  </div>
)

export const GuidanceTitleStrings = ({ guidanceType }: { guidanceType?: string }) => {
  const [isMounted, setIsMounted] = useState<boolean>(false)

  const lang: 'en' | 'fr' | 'de' | undefined = Cookies.get('language') as 'en' | 'fr' | 'de' | undefined

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <div className="flex items-center">
      <p className="ml-2">
        {isMounted && guidanceType === 'correct'
          ? languageTexts(lang).consistentWithGuidance
          : guidanceType === 'incorrect'
          ? languageTexts(lang).inconsistentWithGuidance
          : guidanceType === 'partiallyCorrect'
          ? languageTexts(lang).lessOptimal
          : ''}
      </p>
    </div>
  )
}

export const GuidanceIconStrings = ({ guidanceType, clickEvent }: { guidanceType?: string; clickEvent?: any }) => (
  <div
    onClick={clickEvent ? clickEvent : undefined}
    className="flex items-center"
  >
    {guidanceType === 'correct' ? (
      <CheckCheckIcon />
    ) : guidanceType === 'incorrect' ? (
      <AsteriskIcon />
    ) : (
      <PartiallyCorrectIcon />
    )}
  </div>
)

const CheckIcon = () => <Check className="text-green bg-greenBg rounded-full p-0.5 cursor-pointer" />
const AsteriskIcon = () => <IonAlert className="text-red bg-redBg rounded-full p-0.5 cursor-pointer" />
const PartiallyCorrectIcon = () => <Check className="text-orange-500 bg-orange-100 rounded-full p-0.5 cursor-pointer" />
const CheckCheckIcon = () => <CheckCheck className="text-green bg-greenBg rounded-full p-0.5 cursor-pointer" />
