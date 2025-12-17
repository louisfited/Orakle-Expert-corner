'use client'

import React, { useEffect, useState } from 'react'
import { Order, NonMedicationOrder, MedicationSelection } from '@/interface'
import OrdersTableRow from './OrdersTableRow'
import Cookies from 'js-cookie'
import languageTexts from '@/lib/utils/language'
type CombinedOrder = Order | NonMedicationOrder | MedicationSelection

type OrdersTableProps = {
  orders?: CombinedOrder[]
  type?: string
}

const OrdersTable = ({ orders, type }: OrdersTableProps) => {
  const lang: 'en' | 'fr' | 'de' | undefined = Cookies.get('language') as 'en' | 'fr' | 'de' | undefined

  const [isMounted, setIsMounted] = useState<boolean>(false)
  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <div>
      <div className="overflow-x-auto">
        <div className="min-w-full shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="w-1/3 py-3 text-left text-xs font-semibold text-textGray opacity-50 uppercase tracking-wider">
                  {isMounted && languageTexts(lang).name}
                </th>
                <th className="w-1/3 py-3 text-left text-xs font-semibold text-textGray opacity-50  uppercase tracking-wider">
                  {isMounted && languageTexts(lang).startDate}
                </th>
                <th className="w-1/3 py-3 text-left text-xs font-semibold text-textGray opacity-50  uppercase tracking-wider">
                  {isMounted && languageTexts(lang).endDate}
                </th>
              </tr>
            </thead>
            <tbody>
              {orders?.length === 0 && (
                <tr>
                  <td
                    colSpan={3}
                    className="text-center text-sm text-textDark"
                  >
                    {isMounted && type !== 'past' ? languageTexts(lang).noNewOrders : languageTexts(lang).noPastOrders}
                  </td>
                </tr>
              )}
              {orders?.map((item) => (
                <OrdersTableRow
                  key={item.name}
                  item={item}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default OrdersTable
