'use client'
import Navbar from '@/components/static/Navbar'
import Footer from '@/components/static/Footer'
import { CaseContextProvider } from '@/lib/context/caseContext'
import { ReactNode } from 'react'

export default function Home({ children }: { children: ReactNode }) {
  return (
    <CaseContextProvider>
      <div
        className="min-h-screen bg-cover bg-center bg-no-repeat bg-lightBlue flex flex-col"
        style={{ backgroundImage: 'url(/gradient.png)' }}
      >
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
      </div>
    </CaseContextProvider>
  )
}
