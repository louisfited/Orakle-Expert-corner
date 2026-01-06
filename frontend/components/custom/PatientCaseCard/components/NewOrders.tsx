import React, { forwardRef, useEffect, useState } from 'react'
import { Order, NonMedicationOrder, MedicationSelection } from '@/interface'
import { Accordion } from '@/components/Accordion'
import OrdersTable from '@/components/tables/orders/OrdersTable'
import Cookies from 'js-cookie'
import languageTexts from '@/lib/utils/language'

type CombinedOrder = Order | NonMedicationOrder | MedicationSelection

export const NewOrders = forwardRef<HTMLDivElement, { orders: CombinedOrder[] }>(({ orders }, ref) => {
  const lang: 'en' | 'fr' | 'de' | undefined = Cookies.get('language') as 'en' | 'fr' | 'de' | undefined

  const [isMounted, setIsMounted] = useState<boolean>(false)
  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <div ref={ref}>
      <Accordion title={isMounted ? languageTexts(lang).newOrders : ''}>
        <OrdersTable
          orders={orders}
          type={'new'}
        />
      </Accordion>
    </div>
  )
})

NewOrders.displayName = 'NewOrders'
