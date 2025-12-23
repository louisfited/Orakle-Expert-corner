import React, { forwardRef, useEffect, useState } from 'react'
import { Order, NonMedicationOrder, MedicationSelection } from '@/interface'
import { Accordion } from '@/components/Accordion'
import OrdersTable from '@/components/tables/orders/OrdersTable'
import Cookies from 'js-cookie'
import languageTexts from '@/lib/utils/language'
type CombinedOrder = Order | NonMedicationOrder | MedicationSelection

export const PastOrders = forwardRef<HTMLDivElement, { orders: CombinedOrder[] }>(({ orders }, ref) => {
  const lang: 'en' | 'fr' | 'de' | undefined = Cookies.get('language') as 'en' | 'fr' | 'de' | undefined

  const [isMounted, setIsMounted] = useState<boolean>(false)
  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <div ref={ref}>
      {orders && orders.length > 0 && (
        <>
          <Accordion title={isMounted ? languageTexts(lang).pastOrders : ''}>
            <OrdersTable
              orders={orders}
              type={'past'}
            />
          </Accordion>
        </>
      )}
    </div>
  )
})

PastOrders.displayName = 'PastOrders'
