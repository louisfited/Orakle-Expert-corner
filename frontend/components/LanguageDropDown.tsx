'use client'
import React, { useEffect, useState } from 'react'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import Cookies from 'js-cookie'
import languageTexts from '@/lib/utils/language'

const LanguageDropDown = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const lang: 'en' | 'fr' | 'de' | undefined = Cookies.get('language') as 'en' | 'fr' | 'de' | undefined
  return (
    <>
      <div className="inline-block fixed bottom-[5%] left-[5%] z-50 ">
        <Select
          onValueChange={(value) => {
            document.cookie = `language=${value};`
            window.location.reload()
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={isMounted ? languageTexts(lang).selectLanguage : ''} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>{isMounted ? languageTexts(lang).selectLanguage : ''}</SelectLabel>
              <SelectItem value="en">Multi Language</SelectItem>
              <SelectItem value="fr">French</SelectItem>
              <SelectItem value="de">German</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </>
  )
}

export default LanguageDropDown
