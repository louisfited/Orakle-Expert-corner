import React, { useEffect, useState } from 'react'
import PastVisitsTableRow from './PastVisitsTableRow'
import { PastVisit } from '@/interface'
import Cookies from 'js-cookie'
import languageTexts from '@/lib/utils/language'

const thClassName = 'py-2 text-left text-xs font-semibold text-textGray opacity-50 uppercase tracking-wide'
const PastVisitsTable = ({ pastVisits }: { pastVisits?: PastVisit[] }) => {
  const lang: 'en' | 'fr' | 'de' | undefined = Cookies.get('language') as 'en' | 'fr' | 'de' | undefined

  const [isMounted, setIsMounted] = useState<boolean>(false)
  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <div className="overflow-x-auto">
      <div className="min-w-full shadow-sm rounded-lg">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className={thClassName}>{isMounted ? languageTexts(lang).date : ''}</th>
              <th className={thClassName}>{isMounted ? languageTexts(lang).rr : ''}</th>
              <th className={thClassName}>{isMounted ? languageTexts(lang).kg : ''}</th>
              <th className={thClassName}>{isMounted ? languageTexts(lang).bmi : ''}</th>
              <th className="py-2"></th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {pastVisits?.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="text-center py-4 text-textDark"
                >
                  {isMounted ? languageTexts(lang).noData : ''}
                </td>
              </tr>
            )}
            {pastVisits?.map((item, index) => (
              <PastVisitsTableRow
                key={index}
                item={item}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default PastVisitsTable
