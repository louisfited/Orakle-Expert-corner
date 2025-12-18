'use client'
import { useEffect, useState } from 'react'
import { TagChip } from '@/components/tag-chip'
import { MergedMedicalCase } from '@/lib/hygraph/getAllMedicalCases'
import { getAllMedicalCasesForStaging } from '@/lib/hygraph/getAllMedicalCases'
import { MedicalCaseCard } from '@/components/medical-cases/MedicalCaseCard'
import { StatusEnum } from '@/lib/types/types'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

const PAGE_SECTIONS = [
  { label: 'All', value: 'ALL' },
  { label: 'Started', value: StatusEnum.started },
  { label: 'Completed', value: StatusEnum.completed },
  { label: 'Bookmarked', value: 'BOOKMARK' },
]

interface MyTestsContentProps {
  medicalCases?: MergedMedicalCase[]
}

export const MyTestsContent = ({ medicalCases = [] }: MyTestsContentProps) => {
  const [selectedSection, setSelectedSection] = useState(PAGE_SECTIONS[0].value)
  const [filteredCases, setFilteredCases] = useState<MergedMedicalCase[]>(medicalCases)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    const fetchMedicalCases = async () => {
      let sectionCases
      switch (selectedSection) {
        case PAGE_SECTIONS[0].value:
          const biggerArray = Array.from({ length: 10 }, () => medicalCases).flat()

          setFilteredCases(medicalCases)
          break
        case PAGE_SECTIONS[1].value:
          sectionCases = medicalCases.filter((medicalCase) => medicalCase.status === PAGE_SECTIONS[1].value)
          setFilteredCases(sectionCases)
          break
        case PAGE_SECTIONS[2].value:
          sectionCases = medicalCases.filter((medicalCase) => medicalCase.status === PAGE_SECTIONS[2].value)
          setFilteredCases(sectionCases)
          break
        case PAGE_SECTIONS[3].value:
          sectionCases = medicalCases.filter((medicalCase) => medicalCase.isBookmarked)
          setFilteredCases(sectionCases)
          break
      }
    }

    fetchMedicalCases()
  }, [isMounted, selectedSection, medicalCases])

  const handleSectionChange = (value: string) => {
    setSelectedSection(value)
  }

  return (
    <div className="flex flex-col">
      <span className="font-medium text-[28px] text-textDark mb-4 mt-6 md:mt-12">My Tests</span>
      <div className="hidden md:flex flex-row gap-2 items-center lg:items-start">
        {PAGE_SECTIONS.map((section) => (
          <div key={section.value}>
            <TagChip
              title={section.label}
              pressed={section.value === selectedSection}
              onClick={() => handleSectionChange(section.value)}
            />
          </div>
        ))}
      </div>
      <div className="block sm:hidden">
        <Tabs defaultValue={PAGE_SECTIONS[0].value}>
          <TabsList variant="mobile">
            {PAGE_SECTIONS.map((section) => (
              <TabsTrigger
                key={section.value}
                value={section.value}
                onClick={() => handleSectionChange(section.value)}
                variant="mobile"
              >
                {section.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
      {filteredCases && filteredCases.length > 0 && (
        <div className="flex flex-row flex-wrap gap-2 mt-8 items-center md:items-start">
          {filteredCases.map((medicalCase) => (
            <MedicalCaseCard
              medicalCase={medicalCase}
              hasDescription={true}
              key={medicalCase.id}
            />
          ))}
        </div>
      )}
    </div>
  )
}
