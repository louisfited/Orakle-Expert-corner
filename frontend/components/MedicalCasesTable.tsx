'use client'

import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Select from 'react-dropdown-select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Input } from './ui/input'
import { RenderHTML } from '@/components/RenderHTML'
import { GenericDialog } from '@/components/custom/GenericDialog'
import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'
import { shortenString, checkEmptyRichText } from '@/lib/utils'
import { useDisclose } from '@/lib/hooks/useDisclose'
import countriesJson from '@/lib/countries.json'
import categoriesJson from '@/lib/categories.json'
import Cookies from "js-cookie"
import languageTexts from '@/lib/utils/language'

interface MedicalCase {
  id: string
  version: string
  title: string
  contentType:string
  supporter: string
  faculty: string
  caseDescription: {
    html: string
  }
  patient: {
    profileImage: {
      url: string
    }
  }
  likes: number
  countries: string[]
  categories: Array<string>
  preCaseInformation: {
    html: string
  }
  closingRemarks: {
    html: string
  }
  literatureReview: {
    html: string
  }
  references: {
    html: string
  }
  historyOfPresentIllness: {
    html: string
  }
  familyAndSocialHistory: {
    html: string
  }
  importantInformation: {
    html: string
  }
  physicalExaminationNotes: {
    html: string
  }
}

interface MedicalCasesTableProps {
  medicalCases: MedicalCase[] | null
  bookmarks: { case_id: string }[] | null
  likes: { case_id: string | null }[] | null
  user: { country_of_practice?: string }
}

const MedicalCasesTable: React.FC<MedicalCasesTableProps> = ({ medicalCases, bookmarks, likes, user }) => {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState('')
  const [isMounted,setIsMounted] = useState<boolean>(false)
  const [searchInput, setSearchInput] = useState('')
  const [filteredMedicalCases, setFilteredMedicalCases] = useState<MedicalCase[] | null>(medicalCases)
  const [selectedMedicalCase, setSelectedMedicalCase] = useState<MedicalCase | null>(null)


  
  const { isOpen: isConfirmationOpen, onToggle: onConfirmationToggle } = useDisclose()

  const countryCode = countriesJson.find((c) => c.name === user?.country_of_practice)?.code || ''


  const checkForSearchTerms = (term: string, value: any): boolean => {
    if (!value) return false
    if (typeof value === 'string') return value.toLowerCase().includes(term.toLowerCase())
    if (typeof value === 'object' && 'html' in value) {
      return value.html.toLowerCase().includes(term.toLowerCase())
    }
    return false
  }

const lang: "en" | "fr" | "de"| undefined = Cookies.get("language") as "en" | "fr" | "de"| undefined




  const filterCases = useCallback(
    (term: string, allCases: MedicalCase[]) => {
      let result = allCases

      if (term) {
        result = result.filter((medicalCase) =>
          Object.values(medicalCase).some((val) => checkForSearchTerms(term, val))
        )
      }

      if (selectedCategory) {
        result = result.filter((c) => c.categories && c.categories.includes(selectedCategory))
      }

      setFilteredMedicalCases(result)
    },
    [selectedCategory]
  )
  useEffect(()=>{
setIsMounted(true)
  },[])

  useEffect(() => {
    const handler = setTimeout(() => {
      filterCases(searchInput, medicalCases || [])
    }, 300)

    return () => clearTimeout(handler)
  }, [searchInput, selectedCategory, medicalCases, filterCases])

  const handleRowClick = (id: string, version: string) => {
    const selectedCase = filteredMedicalCases?.find((medicalCase) => medicalCase.id === id)

    const isV2 = version === '5m'

    const isVideo = version === "20m"
    
    
    
    

    if (!selectedCase) return

    if (isVideo) {
      
      
      router.push(`/webinar-video/${id}`)
      return
      
    }

    if (isV2) {
      router.push(`/cases-v2/${id}`)
    } else if (selectedCase.preCaseInformation && !checkEmptyRichText(selectedCase.preCaseInformation.html)) {
      setSelectedMedicalCase(selectedCase)
      onConfirmationToggle()
    } else {
      router.push(`/cases/${id}`)
    }
  }

  const handlePreCaseDialogButton = () => {
    onConfirmationToggle()
    router.push(`/cases/${selectedMedicalCase?.id}`)
  }

  const getCategoryLabel = (key: string): string | null => {
    return (categoriesJson.categories as Record<string, string>)[key] || null
  }

  const uniqueCategories = new Set(medicalCases?.flatMap((c) => c.categories) || [])

  const categoryOptions = [
    { value: '', label: 'All Categories' },
    ...Object.entries(categoriesJson.categories)
      .filter(([key]) => uniqueCategories.has(key))
      .map(([key, label]) => ({ value: key, label })),
  ]

  return (
    <>
      <div className="mb-4">
        <label
          htmlFor="categoryFilter"
          className="block text-sm font-medium text-gray-700"
        >
          {/* Select Category */}
          {isMounted && languageTexts(lang)?.selectCategory}
        </label>
        <Select
          options={categoryOptions}
          onChange={(selected: any) => setSelectedCategory(selected[0]?.value || '')}
          values={categoryOptions.filter((opt) => opt.value === selectedCategory)}
          searchable
          placeholder="Search or select a category"
          className="mt-1 mb-4 block w-full border-gray-300 rounded-md shadow-sm"
        />
        <Input
          placeholder={languageTexts(lang)?.search}
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableCell />
            <TableHead className="w-[100px]">{isMounted && languageTexts(lang)?.tableHeader.name}</TableHead>
            <TableHead className="w-2/5">{isMounted && languageTexts(lang)?.tableHeader.description}</TableHead>
            <TableHead className='w-[150px] text-center'>{isMounted && languageTexts(lang)?.tableHeader.contentType}</TableHead>
            <TableHead>{isMounted && languageTexts(lang)?.tableHeader.supporter}</TableHead>
            <TableHead>{isMounted && languageTexts(lang)?.tableHeader.faculty}</TableHead>
            <TableCell />
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredMedicalCases?.map((medicalCase) => {
            const isVisibleToUser = !medicalCase.countries?.length || medicalCase.countries.includes(countryCode)

            
            
            if (!isVisibleToUser) return null

            return (
              <TableRow
                key={medicalCase.id}
                className="cursor-pointer hover:bg-gray-100"
                onClick={() => handleRowClick(medicalCase.id, medicalCase.version)}
              >
                <TableCell>
                  <Image
                    src={medicalCase.patient?.profileImage.url || ''}
                    alt="patient"
                    width={90}
                    height={90}
                    className="rounded-full border-2 border-sei-standard"
                  />
                </TableCell>
                <TableCell className="text-sm md:text-lg">{medicalCase.title}</TableCell>
                <TableCell>
                  <RenderHTML
                    className="no-margin"
                    htmlString={shortenString(medicalCase.caseDescription.html)}
                  />
                </TableCell>
                <TableCell className='capitalize  text-center'>{medicalCase.contentType}</TableCell>
                <TableCell>{medicalCase.supporter}</TableCell>
                <TableCell>{medicalCase.faculty}</TableCell>

                <TableCell>
                  <ChevronRight />
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>

      <GenericDialog
        open={isConfirmationOpen}
        onOpenChange={onConfirmationToggle}
        content={
          <div>
            <RenderHTML htmlString={selectedMedicalCase?.preCaseInformation?.html!} />
            <div className="flex flex-row gap-4 items-center w-full mt-6">
              <Button
                variant="primary"
                onClick={handlePreCaseDialogButton}
                className="p-6"
              >
                Got It
              </Button>
            </div>
          </div>
        }
      />
    </>
  )
}

export default MedicalCasesTable
