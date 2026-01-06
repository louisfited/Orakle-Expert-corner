'use client'

import React, { FC, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

interface Props {
  className?: string
  children: ReactNode
  onClick?: () => void
  disabled?: boolean
}

const Button: FC<Props> = ({ className, children, onClick, disabled }) => {
  if (disabled) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <button
              disabled={disabled}
              onClick={onClick}
              className={twMerge(
                'rounded-[5px] border border-sei-standard text-sei-standard bg-white bg-opacity-10 font-normal text-base flex justify-center px-3 py-1',
                disabled ? 'bg-gray-100 border-gray-500 text-gray-500' : '',
                className
              )}
            >
              {children}
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>You cannot return, as you&apos;ve already started on the decision review.</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={twMerge(
        'rounded-[5px] border border-sei-standard text-sei-standard bg-white bg-opacity-10 font-normal text-base flex justify-center px-3 py-1',
        disabled ? 'bg-gray-100 border-gray-500 text-gray-500' : '',
        className
      )}
    >
      {children}
    </button>
  )
}

export default Button
