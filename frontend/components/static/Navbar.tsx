'use client'
import React, { FC, useState, FormEvent, useTransition } from 'react'
import Image from 'next/image'
import { UserDropdown } from '@/components/page-content/account/user-dropdown'
import { cn } from '@/lib/utils'
import { useRouter, usePathname } from 'next/navigation'
import { useCaseContext } from '@/lib/context/caseContext'
import { Search, Loader2 } from 'lucide-react'

interface Props {}

const Navbar: FC<Props> = () => {
  const router = useRouter()
  const pathname = usePathname()
  const { isFormDirty, medicalCase, navbarTitle } = useCaseContext()
  const [searchQuery, setSearchQuery] = useState('')
  const [isPending, startTransition] = useTransition()

  // Pages that should NOT have white background on header
  const noWhiteBgPages = ['/cases-v2']
  const shouldHaveWhiteBg = !noWhiteBgPages.some((page) => pathname?.includes(page))

  const handleNavigation = (isFormDirty: boolean) => {
    const isCases = pathname?.split('/').filter(Boolean).slice(-2, -1)[0] === 'cases'
    if (isCases && isFormDirty) {
      const confirmLeave = window.confirm('You have unsaved changes. Are you sure you want to leave?')
      if (!confirmLeave && isCases) {
        // Prevent navigation by reverting to current path
        router.push(pathname!)
        return false
      }
      router.push('/')
    }
    router.push('/')
  }

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      startTransition(() => {
        router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      })
    }
    shouldHaveWhiteBg
  }

  return (
    <nav className={cn('w-full z-50 mx-auto shrink-0', !noWhiteBgPages && 'bg-white')}>
      <div className="flex flex-col lg:flex-row items-center justify-between px-4 py-2 lg:py-0 lg:h-24 gap-2 lg:gap-4">
        <div className="flex flex-row items-center justify-between w-full lg:w-auto gap-2 sm:gap-4">
          <div
            className="cursor-pointer"
            onClick={() => handleNavigation(isFormDirty)}
          >
            <Image
              src={'/experts-corner-new.png'}
              style={{ objectFit: 'contain' }}
              alt="SEI-healthcare-logo"
              width={240}
              height={45}
            />
          </div>
          <div className="flex lg:hidden">
            <UserDropdown />
          </div>
        </div>

        {medicalCase?.showBannerTopBarImage ? (
          <div className="w-full lg:w-auto">
            <Image
              src={medicalCase?.bannerTopBarImage?.url}
              alt="SEI-healthcare-logo"
              width={728}
              height={90}
              className="mx-auto"
            />
          </div>
        ) : navbarTitle ? (
          <div className="hidden lg:flex flex-1 justify-center">
            <h1 className="text-xl font-semibold text-textPrimary">{navbarTitle}</h1>
          </div>
        ) : (
          <div className="hidden lg:flex flex-1 justify-end items-center gap-4">
            <form
              onSubmit={handleSearch}
              className="relative w-full max-w-md"
            >
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search medical cases..."
                disabled={isPending}
                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
              />
              {isPending && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <Loader2 className="text-blue-600 w-5 h-5 animate-spin" />
                </div>
              )}
            </form>
            <UserDropdown />
          </div>
        )}

        {(medicalCase?.showBannerTopBarImage || navbarTitle) && (
          <div className="hidden lg:flex">
            <UserDropdown />
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
