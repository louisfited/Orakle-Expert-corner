'use client'

import * as React from 'react'
import * as ProgressPrimitive from '@radix-ui/react-progress'

import { cn } from '@/lib/utils'

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value = 0, ...props }, ref) => {
  const progressValue = Math.min(Math.max(value!, 0), 100)

  return (
    <div className="relative w-full">
      {/* Progress bar */}
      <ProgressPrimitive.Root
        ref={ref}
        className={cn('relative h-2 w-full overflow-hidden bg-gray-200 rounded-full dark:bg-gray-50/20', className)}
        {...props}
      >
        {/* Filled progress */}
        <ProgressPrimitive.Indicator
          className="h-full bg-textPrimary transition-all dark:bg-gray-50"
          style={{ width: `${progressValue}%` }} // Updated width
        />
      </ProgressPrimitive.Root>

      {/* Circular indicator */}
      <div
        className="absolute top-[-4px] h-4 w-4 rounded-full bg-textPrimary border-4 border-[#CBD2FF]"
        style={{ left: `calc(${progressValue}% - 8px)` }} // Centering the circle
      ></div>
    </div>
  )
})
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
