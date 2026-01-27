'use client'
import { useComparisonStore } from '@/store/useComparisonStore'
import { ImgComparisonSlider } from '@img-comparison-slider/react'
import { X } from 'lucide-react'

const ComparisonSlide = () => {
  const { isOpen, closeModal } = useComparisonStore()
  return (
    <div
      className={`fixed h-screen w-screen ${isOpen ? 'flex' : 'hidden'} flex-col items-center justify-center inset-0  bg-gray-500/50 `}
      style={{ zIndex: '200' }}
    >
      <div className="font-bold flex justify-end text-4xl w-[80%] text-black  cursor-pointer">
        <button
          type="button"
          onClick={() => {
            console.log('kyeap')
            closeModal()
          }}
        >
          <X className="h-8 w-8 text-white" />
        </button>
      </div>
      <div className="w-[50%] h-[70vh] bg-red-500 mx-auto rounded-2xl overflow-hidden">
        <ImgComparisonSlider
          className="block w-full h-full"
          style={{ width: '100%', height: '100%' }}
        >
          <img
            slot="first"
            src="/hand-before.png"
            alt="Before"
            className="w-full h-full object-cover"
          />
          <img
            slot="second"
            src="/hand-after.png"
            alt="After"
            className="w-full h-full object-cover"
          />
        </ImgComparisonSlider>
      </div>
    </div>
  )
}

export default ComparisonSlide
