'use client'

import React, { useEffect, useState } from 'react'
import { PastTest } from '@/interface'
import { useDisclose } from '@/lib/hooks/useDisclose'
import { formatDate } from '@/lib/utils'
import { RenderHTML } from '@/components/RenderHTML'
import { Button } from '@/components/ui/button'
import { GenericDialog } from '@/components/custom/GenericDialog'
import { calculateDate } from '@/lib/utils'
import languageTexts from '@/lib/utils/language'
import Cookies from 'js-cookie'

type PastTestsTableProps = {
  pastTests?: PastTest[]
}

const PastTestsTable = ({ pastTests }: PastTestsTableProps) => {
  const lang: 'en' | 'fr' | 'de' | undefined = Cookies.get('language') as 'en' | 'fr' | 'de' | undefined

  const [isMounted, setIsMounted] = useState<boolean>(false)
  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <div className="mt-4 space-y-1">
      {(!pastTests || pastTests?.length === 0) && (
        <div className="py-4 text-sm text-textDark">{isMounted && languageTexts(lang).noPreviousTests}</div>
      )}
      {pastTests?.map((item, index) => (
        <PastTestsCard
          key={index}
          item={item}
        />
      ))}
    </div>
  )
}

const PastTestsCard = ({ item }: { item: PastTest }) => {
  const lang: 'en' | 'fr' | 'de' | undefined = Cookies.get('language') as 'en' | 'fr' | 'de' | undefined

  const [isMounted, setIsMounted] = useState<boolean>(false)
  useEffect(() => {
    setIsMounted(true)
  }, [])

  const { isOpen, onToggle } = useDisclose()
  const htmlString = item.findingsText.html

  return (
    <>
      <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm ">
        {/* Date */}
        <div className="text-gray-500 text-sm w-1/4">{calculateDate(item.startDate)}</div>

        <div className="text-gray-900 text-sm w-1/2">{item.name}</div>

        <Button
          onClick={onToggle}
          variant="outline"
        >
          {isMounted && languageTexts(lang).view}
        </Button>
      </div>

      {/* Dialog for showing details */}
      {isOpen && (
        <GenericDialog
          open={isOpen}
          onOpenChange={onToggle}
          title={isMounted ? languageTexts(lang).labsImaging : 'Labs/Imaging'}
          content={<RenderHTML htmlString={htmlString} />}
        />
      )}
    </>
  )
}

export default PastTestsTable
