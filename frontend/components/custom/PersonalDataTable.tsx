import React, { FC, useEffect, useState } from 'react'
import { PatientCase } from '@/interface'
import Cookies from 'js-cookie'
import languageTexts from '@/lib/utils/language'

interface Props {
  patientCase: PatientCase
}

const PersonalDataTable: FC<Props> = ({ patientCase }) => {
  const [isMounted, setIsMounted] = useState<boolean>(false)
  useEffect(() => {
    setIsMounted(true)
  }, [])
  const lang: 'en' | 'fr' | 'de' | undefined = Cookies.get('language') as 'en' | 'fr' | 'de' | undefined

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 p-6 bg-white rounded-3xl text-left text-gray-900">
      {/* Age */}
      <div className="flex flex-col">
        <span className="text-xs text-textPrimaryFaded uppercase font-medium">
          {isMounted && languageTexts(lang).age}
        </span>
        <span className="font-semibold text-textDark">
          {patientCase?.age}{' '}
          {isMounted && patientCase?.showAgeAsMonths ? languageTexts(lang).months : languageTexts(lang).years}
        </span>
      </div>

      {/* Gender */}
      <div className="flex flex-col">
        <span className="text-xs text-textPrimaryFaded uppercase font-medium">
          {isMounted && languageTexts(lang).gender}
        </span>
        <span className="font-semibold text-textDark">{patientCase?.gender}</span>
      </div>

      {/* BMI */}
      <div className="flex flex-col">
        <span className="text-xs text-textPrimaryFaded uppercase font-medium">
          {isMounted && languageTexts(lang).bmi}
        </span>
        <span className="font-semibold text-textDark">{patientCase?.bmi > 0 ? patientCase?.bmi : ''}</span>
      </div>

      {/* Weight */}
      <div className="flex flex-col">
        <span className="text-xs text-textPrimaryFaded uppercase font-medium">
          {isMounted && languageTexts(lang).weight}
        </span>
        <span className="font-semibold text-textDark">{patientCase?.weight} kg</span>
      </div>

      {/* Height */}
      <div className="flex flex-col">
        <span className="text-xs text-textPrimaryFaded uppercase font-medium">
          {isMounted && languageTexts(lang).height}
        </span>
        <span className="font-semibold text-textDark">{patientCase?.height} cm</span>
      </div>

      {/* Allergies */}
      <div className="flex flex-col">
        <span className="text-xs text-textPrimaryFaded uppercase font-medium">
          {isMounted && languageTexts(lang).allergies}
        </span>
        <span className="font-semibold text-textDark">
          {patientCase?.allergies || (isMounted && languageTexts(lang).none)}
        </span>
      </div>
    </div>
  )
}

export default PersonalDataTable
