'use client'
import Navbar from '@/components/static/Navbar'
import { CaseContextProvider } from '@/lib/context/caseContext'
import { ReactNode } from 'react'

export default function Home({ children }: { children: ReactNode }) {
  return (
    <CaseContextProvider>
      <div
        className="min-h-screen bg-cover bg-center bg-no-repeat bg-lightBlue"
        style={{ backgroundImage: 'url(/gradient.png)' }}
      >
        <Navbar />
        {children}
      </div>
    </CaseContextProvider>
  )
}
