// import React from 'react'

// const slides = [
//     {id:1,
//         before:"",
//         after:""
//     },
// ]

// const ComparisonSlide = () => {
//   return <div>ComparisonSlide</div>
// }

// export default ComparisonSlide

'use client'

import { useRef, useState } from 'react'

type Slide = {
  id: number
  before: string
  after: string
}

const slides: Slide[] = [
  {
    id: 1,
    before: '/com-one.jpg',
    after: '/com-two.jpg',
  },
  {
    id: 2,
    before: '/com-one.jpg',
    after: '/com-two.jpg',
  },
  {
    id: 3,
    before: '/com-one.jpg',
    after: '/com-two.jpg',
  },
]

export default function ComparisonSlide() {
  const [index, setIndex] = useState(0)

  const next = () => {
    setIndex((prev) => (prev + 1) % slides.length)
  }

  const prev = () => {
    setIndex((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <div className="relative w-full max-w-5xl mx-auto overflow-hidden rounded-xl">
      {/* Track */}
      <h1 className="font-bold text-3xl text-center">Radiological Images</h1>
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="min-w-full grid grid-cols-2"
          >
            {/* Before */}
            <div className="relative">
              <img
                src={slide.before}
                alt="Before"
                className="w-full h-full object-cover"
                draggable={false}
              />
              <span className="absolute bottom-3 left-3 bg-black/60 text-white text-xs px-2 py-1 rounded">Before</span>
            </div>

            {/* After */}
            <div className="relative">
              <img
                src={slide.after}
                alt="After"
                className="w-full h-full object-cover"
                draggable={false}
              />
              <span className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded">After</span>
            </div>
          </div>
        ))}
      </div>

      {/* Center navigation button */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="flex gap-2 pointer-events-auto">
          <button
            onClick={prev}
            className="w-11 h-11 rounded-full bg-white shadow-lg flex items-center justify-center"
            aria-label="Previous"
          >
            ←
          </button>

          <button
            onClick={next}
            className="w-11 h-11 rounded-full bg-white shadow-lg flex items-center justify-center"
            aria-label="Next"
          >
            →
          </button>
        </div>
      </div>
    </div>
  )
}
