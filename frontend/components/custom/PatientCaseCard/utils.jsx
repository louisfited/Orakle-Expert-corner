import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Cookies from 'js-cookie'
import languageTexts from '@/lib/utils/language'

const useDebounce = (callback, delay) => {
  const timeoutRef = useRef(null)

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return useCallback(
    (...args) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      timeoutRef.current = setTimeout(() => {
        callback(...args)
      }, delay)
    },
    [callback, delay]
  )
}

const useIntersectionObserver = (sectionRefs) => {
  const [activeTab, setActiveTab] = useState(null)
  const intersectionRatios = useRef({})

  const debouncedSetActiveTab = useDebounce((newActiveTab) => {
    setActiveTab(newActiveTab)
  }, 200) // Increased debounce delay

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -20% 0px', // Adjusted rootMargin
      threshold: [0, 0.25, 0.5, 0.75, 1],
    }

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        const sectionId = Object.keys(sectionRefs).find((key) => sectionRefs[key].current === entry.target)
        if (sectionId) {
          intersectionRatios.current[sectionId] = entry.intersectionRatio
        }
      })

      const maxVisibleSection = Object.entries(intersectionRatios.current).reduce((max, [sectionId, ratio]) => {
        return ratio > (max?.ratio || 0) ? { id: sectionId, ratio } : max
      }, null)

      if (maxVisibleSection && maxVisibleSection.ratio > 0.5) {
        debouncedSetActiveTab(maxVisibleSection.id)
      }
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current)
      }
    })

    return () => {
      observer.disconnect()
    }
  }, [sectionRefs, debouncedSetActiveTab])

  return activeTab
}

export const TabNavigation = ({ caseDescriptionRef, pastVisitsRef, labsImagingRef, diagnosesRef, pastOrdersRef }) => {
  const tabs = ['Demographics', 'Visits', 'Tests', 'Diagnoses', 'Orders']
  const lang = Cookies.get('language')
  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => {
    setIsMounted(true)
  }, [])

  const sectionRefs = useMemo(
    () => ({
      Demographics: caseDescriptionRef,
      Visits: pastVisitsRef,
      Tests: labsImagingRef,
      Diagnoses: diagnosesRef,
      Orders: pastOrdersRef,
    }),
    [caseDescriptionRef, pastVisitsRef, labsImagingRef, diagnosesRef, pastOrdersRef]
  )

  const activeTab = useIntersectionObserver(sectionRefs)

  const debouncedScrollToSection = useDebounce((section) => {
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, 100)

  const handleScrollToSection = useCallback(
    (tab) => {
      const section = sectionRefs[tab]?.current
      debouncedScrollToSection(section)
    },
    [sectionRefs, debouncedScrollToSection]
  )

  return (
    <div className="flex justify-center mt-4 w-full">
      <div className="flex justify-between w-full max-w-4xl p-2 bg-white rounded-full shadow-sm flex-wrap">
        {tabs.map((tab) => {
          return (
            <button
              key={tab}
              onClick={() => handleScrollToSection(tab)}
              className={`capitalize flex-grow text-center px-1 lg:px-4 py-2 rounded-full transition-colors duration-300 tiny ${
                activeTab === tab ? 'bg-textPrimary text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {isMounted && languageTexts(lang)[tab.toLocaleLowerCase()]}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default TabNavigation
