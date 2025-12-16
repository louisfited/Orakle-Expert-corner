'use client'
import { MergedMedicalCase } from '@/lib/hygraph/getAllMedicalCases'
import { MedicalCaseCard } from './MedicalCaseCard'
import { useState, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Select from 'react-dropdown-select'
import categoriesJson from '@/lib/categories.json'

interface MedicalCaseRowProps {
  medicalCases: MergedMedicalCase[]
  filter?: string
}

export const MedicalCasesRow = ({ medicalCases, filter }: MedicalCaseRowProps) => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState<{
    index: number
    rect: DOMRect
  } | null>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return

    const scrollAmount = 300

    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    })
  }

  const [filteredCases, setFilteredCases] = useState<MergedMedicalCase[]>(medicalCases)
  const uniqueCategories = new Set(medicalCases?.flatMap((c) => c.categories) || [])
  const categoryOptions = [
    { value: '', label: 'All Categories' },
    ...Object.entries(categoriesJson.categories)
      .filter(([key]) => uniqueCategories.has(key))
      .map(([key, label]) => ({ value: key, label })),
  ]

  return (
    <div className=" scroll-smooth no-scrollbar h-[400px]">
      <div className="flex flex-row gap-3 min-h-[350px] overflow-visible ">
        {filteredCases.map((medicalCase) => (
          <div
            key={medicalCase.id}
            className="mb-8 mt-12 first:pl-8"
          >
            <MedicalCaseCard
              medicalCase={medicalCase}
              hasDescription={true}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
