'use client'
import React, { FC, useState, FormEvent, useTransition } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { UserDropdown } from '@/components/page-content/account/user-dropdown'
import { cn } from '@/lib/utils'
import { useRouter, usePathname } from 'next/navigation'
import { useCaseContext } from '@/lib/context/caseContext'
import { Search, Loader2, Menu, X, ChevronDown } from 'lucide-react'
import { createSupabaseBrowserClient } from '@/lib/supabase/client'

interface Props {}

const Navbar: FC<Props> = () => {
  const router = useRouter()
  const pathname = usePathname()
  const { isFormDirty, medicalCase, navbarTitle } = useCaseContext()
  const [searchQuery, setSearchQuery] = useState('')
  const [isPending, startTransition] = useTransition()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false)
  const supabase = createSupabaseBrowserClient()
  const [user, setUser] = useState<any>(null)

  // Get user info for mobile avatar
  React.useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()
  }, [])

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
        setIsMobileSearchOpen(false)
      })
    }
    shouldHaveWhiteBg
  }

  const firstName = user?.user_metadata?.first_name || ''
  const lastName = user?.user_metadata?.last_name || ''
  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()

  return (
    <nav className={cn('w-full z-50 mx-auto shrink-0', !noWhiteBgPages && 'bg-white')}>
      <div className="flex items-center justify-between px-4 py-3 lg:py-0 lg:h-20">
        {/* Mobile Layout (< lg) */}
        <div className="flex lg:hidden items-center w-full">
          {/* Hamburger Menu */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6 text-textDark" />
          </button>{' '}
          <button
            onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
            className="p-2"
            aria-label="Search"
          >
            <Search className="w-5 h-5 text-textDark" />
          </button>
          {/* Logo */}
          <div
            className="cursor-pointer mx-auto"
            onClick={() => handleNavigation(isFormDirty)}
          >
            <Image
              src={'/experts-corner-new.png'}
              style={{ objectFit: 'contain' }}
              alt="SEI-healthcare-logo"
              width={140}
              height={26}
            />
          </div>
        </div>

        {/* Desktop Layout (>= lg) */}
        <div className="hidden lg:flex items-center justify-between">
          <div
            className="cursor-pointer"
            onClick={() => handleNavigation(isFormDirty)}
          >
            <Image
              src={'/experts-corner-new.png'}
              style={{ objectFit: 'contain' }}
              alt="SEI-healthcare-logo"
              width={180}
              height={34}
            />
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
            <h1 className="text-xl font-semibold text-textDark text-center">{navbarTitle}</h1>
          </div>
        ) : (
          <div className="flex flex-1 justify-end items-center gap-4 min-w-[76px]">
            {/* Navigation Links */}
            <div className="hidden lg:flex items-center gap-6 mr-auto ml-8">
              <Link
                href="/"
                className={cn(
                  'font-medium transition-colors',
                  pathname === '/' ? 'text-textPrimary' : 'text-textDark hover:text-textPrimary'
                )}
              >
                Home
              </Link>
              <Link
                href="/categories"
                className={cn(
                  'font-medium transition-colors',
                  pathname?.includes('/categories') ? 'text-textPrimary' : 'text-textDark hover:text-textPrimary'
                )}
              >
                Categories
              </Link>
              <Link
                href="/my-tests"
                className={cn(
                  'font-medium transition-colors',
                  pathname?.includes('/my-tests') ? 'text-textPrimary' : 'text-textDark hover:text-textPrimary'
                )}
              >
                My Tests
              </Link>
            </div>

            <form
              onSubmit={handleSearch}
              className="hidden lg:flex lg:relative w-full max-w-md"
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

        {(medicalCase?.showBannerTopBarImage || navbarTitle) && <UserDropdown />}
      </div>

      {/* Mobile Search Bar */}
      {isMobileSearchOpen && (
        <div className="lg:hidden px-4 pb-3">
          <form
            onSubmit={handleSearch}
            className="relative"
          >
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search medical cases..."
              disabled={isPending}
              autoFocus
              className="w-full pl-9 pr-9 py-2 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
            />
            {isPending && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <Loader2 className="text-blue-600 w-4 h-4 animate-spin" />
              </div>
            )}
          </form>
        </div>
      )}

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed inset-y-0 left-0 w-[80%] bg-white z-50 lg:hidden transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full p-6">
          {/* Close button */}
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="self-end p-2 mb-6"
            aria-label="Close menu"
          >
            <X className="w-6 h-6 text-textDark" />
          </button>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-4">
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className={cn(
                'text-lg font-medium transition-colors py-2',
                pathname === '/' ? 'text-textPrimary' : 'text-textDark hover:text-textPrimary'
              )}
            >
              Home
            </Link>
            <Link
              href="/categories"
              onClick={() => setIsMobileMenuOpen(false)}
              className={cn(
                'text-lg font-medium transition-colors py-2',
                pathname?.includes('/categories') ? 'text-textPrimary' : 'text-textDark hover:text-textPrimary'
              )}
            >
              Categories
            </Link>
            <Link
              href="/my-tests"
              onClick={() => setIsMobileMenuOpen(false)}
              className={cn(
                'text-lg font-medium transition-colors py-2',
                pathname?.includes('/my-tests') ? 'text-textPrimary' : 'text-textDark hover:text-textPrimary'
              )}
            >
              My Tests
            </Link>
          </nav>
        </div>
      </div>

      {/* Mobile Menu Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </nav>
  )
}

export default Navbar
