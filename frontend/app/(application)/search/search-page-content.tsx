'use client'
import { useSearchParams } from 'next/navigation'
import { useState, useMemo, useEffect } from 'react'
import { MedicalCaseCard } from '@/components/medical-cases/MedicalCaseCard'
import { MergedMedicalCase } from '@/lib/hygraph/getAllMedicalCases'
import categories from '@/lib/categories.json'
import { Search } from 'lucide-react'

interface SearchPageContentProps {
  medicalCases: MergedMedicalCase[]
}

export default function SearchPageContent({ medicalCases }: SearchPageContentProps) {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [categorySearch, setCategorySearch] = useState('')
  const [debouncedCategorySearch, setDebouncedCategorySearch] = useState('')

  // Debounce category search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedCategorySearch(categorySearch)
    }, 300)

    return () => clearTimeout(timer)
  }, [categorySearch])

  const handleCategoryToggle = (categoryKey: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryKey) ? prev.filter((c) => c !== categoryKey) : [...prev, categoryKey]
    )
  }

  const categoryEntries = Object.entries(categories.categories)

  const filteredResults = useMemo(() => {
    let results = medicalCases

    // Filter by search query
    if (query) {
      const lowerQuery = query.toLowerCase()
      results = results.filter(
        (medicalCase) =>
          medicalCase.title?.toLowerCase().includes(lowerQuery) ||
          medicalCase.shortDescription?.toLowerCase().includes(lowerQuery) ||
          medicalCase.supporter?.toLowerCase().includes(lowerQuery) ||
          medicalCase.faculty?.toLowerCase().includes(lowerQuery)
      )
    }

    // Filter by categories
    if (selectedCategories.length > 0) {
      results = results.filter((medicalCase) => selectedCategories.some((cat) => medicalCase.categories?.includes(cat)))
    }

    return results
  }, [medicalCases, query, selectedCategories])

  // Filter categories based on search
  const filteredCategories = useMemo(() => {
    if (!debouncedCategorySearch) return categoryEntries
    const searchLower = debouncedCategorySearch.toLowerCase()
    return categoryEntries.filter(([, label]) => label.toLowerCase().includes(searchLower))
  }, [categoryEntries, debouncedCategorySearch])

  // Count results per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    filteredResults.forEach((medicalCase) => {
      medicalCase.categories?.forEach((cat) => {
        counts[cat] = (counts[cat] || 0) + 1
      })
    })
    return counts
  }, [filteredResults])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        {/* Categories Sidebar */}
        <div className="w-full lg:w-[362px] flex-shrink-0">
          <div className="rounded-2xl shadow-sm p-6 lg:sticky lg:top-4 bg-lightBlueFaded">
            <h2 className="font-semibold text-textDark mb-4">Categories</h2>

            {/* Category Search Bar */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                value={categorySearch}
                onChange={(e) => setCategorySearch(e.target.value)}
                placeholder="Search categories..."
                className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="space-y-2 max-h-[300px] lg:max-h-[calc(100vh-250px)] overflow-y-auto">
              {filteredCategories.map(([key, label]) => (
                <label
                  key={key}
                  className="flex items-center justify-between cursor-pointer p-2 rounded hover:bg-white/50"
                >
                  <div className="flex items-center space-x-2 flex-1">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(key)}
                      onChange={() => handleCategoryToggle(key)}
                      className="w-4 h-4 text-textDark border-gray-300 rounded-lg focus:text-textPrimary"
                    />
                    <span className="text-sm text-textDark">{label}</span>
                  </div>
                  <span className="text-xs text-gray-400 ml-2">{categoryCounts[key] || 0}</span>
                </label>
              ))}
            </div>

            {selectedCategories.length > 0 && (
              <button
                onClick={() => setSelectedCategories([])}
                className="mt-4 text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                Clear all filters
              </button>
            )}
          </div>
        </div>

        {/* Results Grid */}
        <div className="flex-1 min-w-0">
          {filteredResults.length === 0 ? (
            <div className="rounded-lg shadow-sm p-12 text-center bg-gray-50">
              <p className="text-gray-600 text-lg">No medical cases found matching your criteria.</p>
              {(query || selectedCategories.length > 0) && (
                <p className="text-gray-500 mt-2">Try adjusting your search or filters.</p>
              )}
            </div>
          ) : (
            <>
              <div className="mb-4 text-textDark text-lg font-normal">
                {filteredResults.length} test{filteredResults.length !== 1 ? 's' : ''}
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6 justify-items-center">
                {filteredResults.map((medicalCase) => (
                  <MedicalCaseCard
                    key={medicalCase.id}
                    medicalCase={medicalCase}
                    hasDescription
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
