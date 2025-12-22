'use client'
import { useSearchParams } from 'next/navigation'
import { useState, useMemo, useEffect, useCallback } from 'react'
import { MedicalCaseCard } from '@/components/medical-cases/MedicalCaseCard'
import { MergedMedicalCase } from '@/lib/hygraph/getAllMedicalCases'
import categories from '@/lib/categories.json'
import { Search, X, Filter } from 'lucide-react'
import { CategoryPillList } from '@/components/CategoryPill'

interface SearchPageContentProps {
  medicalCases: MergedMedicalCase[]
}

export default function SearchPageContent({ medicalCases }: SearchPageContentProps) {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [tempSelectedCategories, setTempSelectedCategories] = useState<string[]>([])
  const [categorySearch, setCategorySearch] = useState('')
  const [debouncedCategorySearch, setDebouncedCategorySearch] = useState('')
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  // Debounce category search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedCategorySearch(categorySearch)
    }, 300)

    return () => clearTimeout(timer)
  }, [categorySearch])

  // Update temp categories when drawer opens
  useEffect(() => {
    if (isDrawerOpen) {
      setTempSelectedCategories(selectedCategories)
    }
  }, [isDrawerOpen, selectedCategories])

  const handleCategoryToggle = useCallback((categoryKey: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryKey) ? prev.filter((c) => c !== categoryKey) : [...prev, categoryKey]
    )
  }, [])

  const handleTempCategoryToggle = useCallback((categoryKey: string) => {
    setTempSelectedCategories((prev) =>
      prev.includes(categoryKey) ? prev.filter((c) => c !== categoryKey) : [...prev, categoryKey]
    )
  }, [])

  const handleApplyFilters = useCallback(() => {
    setSelectedCategories(tempSelectedCategories)
    setIsDrawerOpen(false)
  }, [tempSelectedCategories])

  const handleClearAllFilters = useCallback(() => {
    setTempSelectedCategories([])
  }, [])

  const handleRemoveCategory = useCallback((categoryKey: string) => {
    setSelectedCategories((prev) => prev.filter((c) => c !== categoryKey))
  }, [])

  const selectedCategoryPills = useMemo(() => {
    return selectedCategories.map((key) => ({
      key,
      label: categories.categories[key as keyof typeof categories.categories] || key,
    }))
  }, [selectedCategories])

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

  // Category sidebar content for desktop
  const categorySidebarContent = useMemo(
    () => (
      <>
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
      </>
    ),
    [categorySearch, filteredCategories, selectedCategories, categoryCounts, handleCategoryToggle]
  )

  // Mobile drawer content with 2 columns
  const mobileDrawerContent = useMemo(
    () => (
      <div className="flex flex-col h-full">
        {/* Header with close button */}
        <div className="flex items-center justify-between mb-2 pb-2">
          <h2 className="text-xl font-semibold text-textDark">Categories</h2>
          <button
            onClick={() => setIsDrawerOpen(false)}
            className="p-2 bg-gray-100 rounded-full transition-colors"
            aria-label="Close filters"
          >
            <X className="w-5 h-5 text-textDark" />
          </button>
        </div>

        {/* Category Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            value={categorySearch}
            onChange={(e) => setCategorySearch(e.target.value)}
            placeholder="Search categories"
            className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Scrollable categories in 2 columns on md+, 1 column on smaller */}
        <div className="flex-1 overflow-y-auto mb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
            {filteredCategories.map(([key, label]) => (
              <label
                key={key}
                className="flex items-center justify-between cursor-pointer p-2 rounded hover:bg-white/50"
              >
                <div className="flex items-center flex-1 min-w-0">
                  <input
                    type="checkbox"
                    checked={tempSelectedCategories.includes(key)}
                    onChange={() => handleTempCategoryToggle(key)}
                    className="w-4 h-4 text-textDark border-gray-300 rounded-lg focus:text-textPrimary flex-shrink-0"
                  />
                  <span className="text-sm text-textDark ml-2 flex-1 min-w-0 truncate">{label}</span>
                </div>
                <span className="text-xs text-gray-400 ml-2">{categoryCounts[key] || 0}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Bottom buttons */}
        <div className="flex gap-3 pt-4 border-t">
          <button
            onClick={handleClearAllFilters}
            className="flex-1 px-4 py-3 border-2 border-gray-300 text-textDark rounded-full hover:bg-gray-50 transition-colors font-medium"
          >
            Clear all filters
          </button>
          <button
            onClick={handleApplyFilters}
            className="flex-1 px-4 py-3 bg-textDark text-white rounded-full hover:bg-textDark/90 transition-colors font-medium"
          >
            Apply
          </button>
        </div>
      </div>
    ),
    [
      categorySearch,
      filteredCategories,
      tempSelectedCategories,
      categoryCounts,
      handleTempCategoryToggle,
      handleClearAllFilters,
      handleApplyFilters,
      setIsDrawerOpen,
    ]
  )

  return (
    <div className="px-4 py-8">
      {/* Mobile Filter Button & Results Count */}
      <div className="lg:hidden mb-4 flex items-center justify-between">
        <div className="text-textDark text-lg font-normal">
          {filteredResults.length} test{filteredResults.length !== 1 ? 's' : ''}
        </div>
        <button
          onClick={() => setIsDrawerOpen(!isDrawerOpen)}
          className="flex items-center gap-2 px-4 py-2 text-textDark rounded-full hover:opacity-90 transition-opacity"
          style={{ backgroundColor: '#1026C40D' }}
          aria-label={isDrawerOpen ? 'Close category filters' : 'Open category filters'}
        >
          {isDrawerOpen ? (
            <>
              <X className="w-4 h-4" />
              <span className="text-[15px] font-normal">Close</span>
            </>
          ) : (
            <>
              <Filter className="w-4 h-4" />
              <span className="text-[15px] font-normal">Category Filters</span>
              {selectedCategories.length > 0 && (
                <span className="text-xs text-gray-400">{selectedCategories.length}</span>
              )}
            </>
          )}
        </button>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-x-0 bottom-0 bg-white z-50 lg:hidden overflow-hidden transition-transform duration-300 ease-in-out ${
          isDrawerOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{ top: 'var(--header-height, 80px)' }}
      >
        <div className="p-6 h-full">{mobileDrawerContent}</div>
      </div>

      {/* Mobile Backdrop */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsDrawerOpen(false)}
          style={{ top: 'var(--header-height, 80px)' }}
        />
      )}

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        {/* Desktop Categories Sidebar */}
        <div className="hidden lg:block w-full lg:w-[362px] flex-shrink-0">
          <div className="rounded-2xl shadow-sm p-6 lg:sticky lg:top-4 bg-lightBlueFaded">{categorySidebarContent}</div>
        </div>

        {/* Results Grid */}
        <div className="flex-1 min-w-0">
          {/* Counter and Categories Pills - Same row on desktop */}
          <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-4">
            {/* Results Count - Hidden on mobile, shown on desktop */}
            <div className="hidden lg:block text-textDark text-lg font-normal whitespace-nowrap flex-shrink-0">
              {filteredResults.length} test{filteredResults.length !== 1 ? 's' : ''}
            </div>

            {/* Selected Categories Pills - Scrollable */}
            {selectedCategories.length > 0 && (
              <div className="flex-1 min-w-0">
                <CategoryPillList
                  categories={selectedCategoryPills}
                  onRemove={handleRemoveCategory}
                />
              </div>
            )}
          </div>

          {filteredResults.length === 0 ? (
            <div className="rounded-lg shadow-sm p-12 text-center bg-gray-50">
              <p className="text-gray-600 text-lg">No medical cases found matching your criteria.</p>
              {(query || selectedCategories.length > 0) && (
                <p className="text-gray-500 mt-2">Try adjusting your search or filters.</p>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6 justify-items-center">
              {filteredResults.map((medicalCase) => (
                <MedicalCaseCard
                  key={medicalCase.id}
                  medicalCase={medicalCase}
                  hasDescription
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
