'use client'
import { useState } from 'react'
import { ChevronLeft, ChevronRight, Bookmark } from 'lucide-react'
import { MergedMedicalCase } from '@/lib/hygraph/getAllMedicalCases'
import SlideshowBackground from '../../public/slideshow-bg.png'
import { useDisclose } from '@/lib/hooks/useDisclose'
import { StartTestModal } from './StartTestModal'
import { MedicalCaseThumbnail } from './MedicalCaseThumbnail'
import categoriesData from '@/lib/categories.json'
import { RenderHTML } from '../RenderHTML'
import { shortenString } from '@/lib/utils'

interface FeaturedSlideshowProps {
  medicalCases: MergedMedicalCase[]
}

export const FeaturedSlideshow = ({ medicalCases }: FeaturedSlideshowProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState<'left' | 'right'>('right')
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
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

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      // Swipe left - go to next
      goToNext()
    }

    if (touchStart - touchEnd < -75) {
      // Swipe right - go to previous
      goToPrevious()
    }
  }

  if (!currentCase) return null

  return (
    <>
      <div
        className="w-full h-[412px] px-4 py-6 lg:pl-[72px] lg:pt-[66px] lg:pb-[44px] bg-cover bg-center rounded-3xl overflow-hidden"
        style={{ backgroundImage: `url(${SlideshowBackground.src})` }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="mx-auto h-full flex flex-col lg:flex-row gap-6 items-center">
          {/* Wrapper for Featured Card + Middle Description (first two divs) */}
          <div className="flex flex-col lg:flex-row gap-6 items-center w-full lg:w-auto flex-shrink-0">
            {/* Left side - Featured Card */}
            <div className="flex flex-col items-center gap-4 lg:gap-[22px] flex-shrink-0">
              <div
                className={direction === 'right' ? 'animate-slideInRight' : 'animate-slideInLeft'}
                key={currentIndex}
              >
                <MedicalCaseThumbnail
                  medicalCase={currentCase}
                  width="w-[270px] xl:w-[450px]"
                  height="h-[160px] xl:h-[270px]"
                  avatarSize="w-40 h-40"
                  showVersion={false}
                  showHoverButtons={true}
                  onStartTest={onConfirmationToggle}
                  onClick={onConfirmationToggle}
                />
              </div>

              {/* Mobile description - shown below card on mobile */}
              <div className="flex lg:hidden flex-col gap-2 text-center">
                {/* Categories */}
                {currentCase.categories && currentCase.categories.length > 0 && (
                  <p className="text-sm text-white/80">
                    {currentCase.categories
                      .slice(0, 3)
                      .map((cat) => categoriesData.categories[cat as keyof typeof categoriesData.categories] || cat)
                      .join(' • ')}
                  </p>
                )}

                {/* Title */}
                <p className="text-xl text-white font-medium">{(currentCase as any).name || currentCase.title}</p>

                {/* Version */}
                <div className="flex items-center gap-4 text-textPrimaryFaded justify-center">
                  <span className="text-sm font-medium text-white">{currentCase.version}</span>
                </div>
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

            {/* Middle - Description and Navigation - Desktop only */}
            <div className="hidden lg:flex flex-col justify-center gap-6 py-8 flex-shrink-0 w-[300px]">
              <div className="flex flex-col gap-4 mb-auto">
                {/* Categories */}
                {currentCase.categories && currentCase.categories.length > 0 && (
                  <p className="text-sm text-white/80">
                    {currentCase.categories
                      .slice(0, 3)
                      .map((cat) => categoriesData.categories[cat as keyof typeof categoriesData.categories] || cat)
                      .join(' • ')}
                  </p>
                )}

                {/* Description */}
                {currentCase.caseDescription?.html || currentCase.shortDescription ? (
                  <div
                    className="text-xl !text-white font-medium [&>*]:!text-white"
                    dangerouslySetInnerHTML={{
                      __html: shortenString(currentCase.caseDescription?.html ?? currentCase.shortDescription ?? ''),
                    }}
                  />
                ) : null}

                {/* Version */}
                <div className="flex items-center gap-4 text-textPrimaryFaded">
                  <span className="text-sm font-medium text-white">{currentCase.version}</span>
                </div>
              </div>

              {/* Navigation Arrows */}
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
          </div>

          {/* Right side - Preview Cards */}
          <div className="hidden lg:flex flex-row gap-4 justify-center flex-shrink-0">
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
                    width="w-[395px]"
                    height="h-[236px]"
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
