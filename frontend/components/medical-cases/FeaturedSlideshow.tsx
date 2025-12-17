'use client'
import { useState } from 'react'
import { ChevronLeft, ChevronRight, Bookmark } from 'lucide-react'
import { MergedMedicalCase } from '@/lib/hygraph/getAllMedicalCases'
import SlideshowBackground from '../../public/slideshow-bg.png'
import { useDisclose } from '@/lib/hooks/useDisclose'
import { StartTestModal } from './StartTestModal'
import { MedicalCaseThumbnail } from './MedicalCaseThumbnail'

interface FeaturedSlideshowProps {
  medicalCases: MergedMedicalCase[]
}

export const FeaturedSlideshow = ({ medicalCases }: FeaturedSlideshowProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState<'left' | 'right'>('right')
  const { isOpen: isConfirmationOpen, onToggle: onConfirmationToggle } = useDisclose()
  const currentCase = medicalCases[currentIndex]

  const goToNext = () => {
    setDirection('right')
    setCurrentIndex((prev) => (prev + 1) % medicalCases.length)
  }

  const goToPrevious = () => {
    setDirection('left')
    setCurrentIndex((prev) => (prev - 1 + medicalCases.length) % medicalCases.length)
  }

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 'right' : 'left')
    setCurrentIndex(index)
  }

  if (!currentCase) return null

  return (
    <>
      <div
        className="w-full h-[412px] px-8 py-8 bg-cover bg-center rounded-3xl"
        style={{ backgroundImage: `url(${SlideshowBackground.src})` }}
      >
        <div className="max-w-[1400px] mx-auto h-full flex items-center gap-6">
          {/* Left side - Featured Card */}
          <div className="flex flex-col items-center gap-4 flex-shrink-0">
            <div
              className={direction === 'right' ? 'animate-slideInRight' : 'animate-slideInLeft'}
              key={currentIndex}
            >
              <MedicalCaseThumbnail
                medicalCase={currentCase}
                avatarSize="w-40 h-40"
                showHoverButtons={true}
                onStartTest={onConfirmationToggle}
              />
            </div>

            {/* Dot indicators */}
            <div className="flex gap-2">
              {medicalCases.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex ? 'bg-white w-8' : 'bg-gray-400'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Middle - Description and Navigation */}
          <div className="flex flex-col justify-center gap-6 py-8 flex-shrink-0 w-[300px]">
            <div className="flex flex-col gap-4">
              <p className="text-xl text-white font-medium">{currentCase.shortDescription}</p>
              <div className="flex items-center gap-4 text-textPrimaryFaded">
                <span className="text-sm font-medium text-white">{currentCase.version}</span>
              </div>
            </div>

            {/* Navigation Arrows and Start Button */}
            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                <button
                  onClick={goToPrevious}
                  className="w-12 h-12 bg-transparent border-2 border-white hover:bg-white/10 rounded-full flex items-center justify-center transition-all"
                  aria-label="Previous slide"
                >
                  <ChevronLeft
                    size={24}
                    className="text-white"
                  />
                </button>
                <button
                  onClick={goToNext}
                  className="w-12 h-12 bg-transparent border-2 border-white hover:bg-white/10 rounded-full flex items-center justify-center transition-all"
                  aria-label="Next slide"
                >
                  <ChevronRight
                    size={24}
                    className="text-white"
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Right side - Preview Cards */}
          <div className="flex flex-col gap-4 justify-center flex-shrink-0">
            {medicalCases.slice(1, 4).map((previewCase, index) => {
              const previewIndex = (currentIndex + index + 1) % medicalCases.length
              const displayCase = medicalCases[previewIndex]
              return (
                <div
                  key={`${previewIndex}-${currentIndex}`}
                  className={direction === 'right' ? 'animate-slideInRight' : 'animate-slideInLeft'}
                >
                  <MedicalCaseThumbnail
                    medicalCase={displayCase}
                    width="w-[350px]"
                    height="h-[250px]"
                    titleSize="text-xl"
                    avatarSize="w-36 h-36"
                    showVersion={false}
                    opacity="opacity-70"
                    interactive={false}
                  />
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <StartTestModal
        medicalCase={currentCase}
        open={isConfirmationOpen}
        onOpenChange={onConfirmationToggle}
      />
    </>
  )
}
