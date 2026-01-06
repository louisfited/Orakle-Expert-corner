'use client'

import { PastVisit } from '@/interface'
import React from 'react'
import { RenderHTML } from '@/components/RenderHTML'
import { useDisclose } from '@/lib/hooks/useDisclose'
import dayjs from 'dayjs'
import { calculateDate } from '@/lib/utils'

interface Props {
  item: PastVisit
}

const PastVisitsTableRow = ({ item }: Props) => {
  const { isOpen, onToggle } = useDisclose()
  const htmlString = item.actionText[0]?.text.html

  return (
    <>
      <tr
        onClick={onToggle}
        className="cursor-pointer hover:bg-gray-100"
      >
        <td className="py-3 text-sm">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-900">{calculateDate(item.startDate)}</p>
            </div>
          </div>
        </td>
        <td className="py-3  text-sm">
          <p className="text-gray-900">{item.rr}</p>
        </td>
        <td className="py-3 text-sm">
          <p className="text-gray-900">{item.kg}</p>
        </td>
        <td className="py-3  text-sm">
          <p className="text-gray-900">{item.bmi}</p>
        </td>
        <td>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-4 w-4 text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </td>
      </tr>

      {isOpen ? (
        <tr>
          <td
            colSpan={4}
            className="bg-white rounded-lg p-4"
          >
            <RenderHTML
              htmlString={htmlString}
              className="text-sm text-gray-600"
            />
          </td>
        </tr>
      ) : null}
    </>
  )
}

export default PastVisitsTableRow
