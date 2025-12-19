'use client'
import { MergedMedicalCase } from '@/lib/hygraph/getAllMedicalCases'
import { MedicalCasePortraitCard } from './MedicalCasePortraitCard'
import { useState, useRef, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface MedicalCasesPortraitRowProps {
  medicalCases: MergedMedicalCase[]
}

export const MedicalCasesPortraitRow = ({ medicalCases }: MedicalCasesPortraitRowProps) => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(false)

  useEffect(() => {
    const checkScroll = () => {
      if (!scrollRef.current) return
      const { scrollWidth, clientWidth } = scrollRef.current
      setShowRightArrow(scrollWidth > clientWidth)
    }

    checkScroll()
    window.addEventListener('resize', checkScroll)
    return () => window.removeEventListener('resize', checkScroll)
  }, [medicalCases])

  if (!medicalCases || medicalCases.length === 0) {
    return <div className="text-red-500">No medical cases to display</div>
  }

  console.log('MedicalCasesPortraitRow - medicalCases count:', medicalCases?.length)

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return

    const scrollAmount = 800

    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    })
  }

  const handleScroll = () => {
    if (!scrollRef.current) return

    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
    setShowLeftArrow(scrollLeft > 0)
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10)
  }

  return (
    <div className="relative group/row">
      {/* Left Fade */}
      {showLeftArrow && (
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-lightBlue to-transparent z-40 pointer-events-none" />
      )}

      {/* Right Fade */}
      {showRightArrow && (
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-lightBlue to-transparent z-40 pointer-events-none" />
      )}

      {/* Left Arrow */}
      {showLeftArrow && (
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-[60] bg-black/70 hover:bg-black/90 text-white p-2 rounded-full opacity-0 group-hover/row:opacity-100 transition-opacity duration-300"
        >
          <ChevronLeft size={32} />
        </button>
      )}

      {/* Right Arrow */}
      {showRightArrow && (
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-[60] bg-black/70 hover:bg-black/90 text-white p-2 rounded-full opacity-0 group-hover/row:opacity-100 transition-opacity duration-300"
        >
          <ChevronRight size={32} />
        </button>
      )}

      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="scroll-smooth no-scrollbar overflow-x-auto overflow-y-clip"
        style={{ height: '650px' }}
      >
        <div className="flex flex-row flex-nowrap gap-6 py-8">
          {medicalCases.map((medicalCase) => (
            <div
              key={medicalCase.id}
              className="first:pl-8 cursor-default flex-shrink-0"
            >
              <MedicalCasePortraitCard medicalCase={medicalCase} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
