import Home from '@/components/static/Home'
import { ReactNode } from 'react'

export default function ApplicationLayout({ children }: { children: ReactNode }) {
  return <Home>{children}</Home>
}
