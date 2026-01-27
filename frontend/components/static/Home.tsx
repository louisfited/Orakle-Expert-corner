'use client'
import Navbar from '@/components/static/Navbar'
import Footer from '@/components/static/Footer'
import { CaseContextProvider } from '@/lib/context/caseContext'
import { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import ComparisonSlide from '../ComparisonSlide'

export default function Home({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  // Pages that should NOT display the footer
  const noFooterPages = ['/cases-v2']
  const shouldShowFooter = !noFooterPages.some((page) => pathname?.includes(page))

  // Only simulator v2 should have gradient background
  const hasGradientBg = pathname?.includes('/cases-v2')

  return (
    <CaseContextProvider>
      <div
        className={cn(
          'min-h-screen flex flex-col',
          hasGradientBg ? 'bg-cover bg-center bg-no-repeat bg-lightBlue' : 'bg-white'
        )}
        style={hasGradientBg ? { backgroundImage: 'url(/gradient.png)' } : undefined}
      >
        <Navbar />
        <ComparisonSlide />
        <div className="flex-1">{children}</div>
        {shouldShowFooter && <Footer />}
      </div>
    </CaseContextProvider>
  )
}
