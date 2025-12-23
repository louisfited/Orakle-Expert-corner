import Container from '@/components/general/Container'
import { ReactNode } from 'react'
import { TestsNavigation } from '@/components/page-content/tests/TestsNavigation'

export default async function TestsLayout({ children }: { children: ReactNode }) {
  return (
    <Container>
      <div className="grid grid-cols-1 lg:grid-cols-4 justify-center gap-8 min-h-screen">
        <TestsNavigation />
        <div className="col-span-3">{children}</div>
      </div>
    </Container>
  )
}
