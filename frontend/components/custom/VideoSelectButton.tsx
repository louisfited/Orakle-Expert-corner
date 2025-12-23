import React, { FC } from 'react'
import { twMerge } from 'tailwind-merge'
import { Button } from '@/components/ui/button'
import { shortenString } from '@/lib/utils'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

interface Props {
  title: string
  onClick: () => void
}

const VideoSelectButton: FC<Props> = ({ title, onClick }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={onClick}
            className={twMerge('bg-white text-center text-black hover:bg-white/90')}
          >
            {shortenString(title, 48)}
          </Button>
        </TooltipTrigger>
        <TooltipContent>{title}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default VideoSelectButton
