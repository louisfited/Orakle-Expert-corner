'use client'
import { useDisclose } from '@/lib/hooks/useDisclose'
import { StartTestModal } from './StartTestModal'
import { MergedMedicalCase } from '@/lib/hygraph/getAllMedicalCases'
import { MedicalCaseThumbnail } from './MedicalCaseThumbnail'
import { useRef, useEffect, useState } from 'react'
import categoriesData from '@/lib/categories.json'
import { StatusEnum } from '@/lib/types/types'

interface MedicalCaseLandscapeCardProps {
  medicalCase: MergedMedicalCase
  hasDescription?: boolean
}

export const MedicalCaseLandscapeCard = ({ medicalCase, hasDescription }: MedicalCaseLandscapeCardProps) => {
  const { isOpen: isConfirmationOpen, onToggle: onConfirmationToggle } = useDisclose()
  const cardRef = useRef<HTMLDivElement>(null)
  const [transformOrigin, setTransformOrigin] = useState('center center')

  useEffect(() => {
    const handleMouseEnter = () => {
      if (!cardRef.current) return

      const card = cardRef.current
      const rect = card.getBoundingClientRect()

      const cardRight = rect.right
      const cardLeft = rect.left
      const viewportWidth = window.innerWidth

      // Check if card is near right edge
      if (cardRight > viewportWidth - 100) {
        setTransformOrigin('right center')
      }
      // Check if card is near left edge
      else if (cardLeft < 100) {
        setTransformOrigin('left center')
      }
      // Middle cards
      else {
        setTransformOrigin('center center')
      }
    }

    const card = cardRef.current
    if (card) {
      card.addEventListener('mouseenter', handleMouseEnter)
      return () => card.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [])

  return (
    <>
      <div
        ref={cardRef}
        className="flex flex-col w-[343px] md:w-[348px] xl:w-[270px] 2xl:w-[395px] max-w-[395px] transition-all duration-300 hover:scale-105 hover:-translate-y-2 hover:z-50 group overflow-visible hover:rounded-2xl relative "
        style={{ transformOrigin }}
      >
        <div className="relative mb-2">
          <MedicalCaseThumbnail
            medicalCase={medicalCase}
            width="w-full"
            height="h-[205px] md:h-[208px] xl:h-[160px] 2xl:h-[236px]"
            avatarSize="w-40 h-40"
            showHoverButtons={true}
            isStarted={medicalCase.status === StatusEnum.started}
            onStartTest={onConfirmationToggle}
            onClick={onConfirmationToggle}
          />
        </div>
        <div>
          {hasDescription && (
            <span className="text-lg text-darkBlue font-semibold line-clamp-2">{medicalCase.shortDescription}</span>
          )}
        </div>
        <div className="text-base text-textGray text-opacity-65">
          {medicalCase.categories &&
            medicalCase.categories.length > 0 &&
            medicalCase.categories
              .slice(0, 3)
              .map((cat) => categoriesData.categories[cat as keyof typeof categoriesData.categories] || cat)
              .join(' • ')}
        </div>
      </div>
      <StartTestModal
        medicalCase={medicalCase}
        open={isConfirmationOpen}
        onOpenChange={onConfirmationToggle}
      />
    </>
  )
}
