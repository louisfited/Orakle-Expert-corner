import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export const HStack = ({ children, className }: { children: ReactNode; className?: string }) => {
  return <div className={cn('flex items-center gap-4', className)}>{children}</div>
}
