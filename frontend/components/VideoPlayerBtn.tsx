'use client'
import React from 'react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'

const VideoPlayerBtn = ({ finishUrl }: { finishUrl: string }) => {
  const router = useRouter()
  return (
    <>
      <div className="py-4 flex justify-end">
        <Button
          onClick={() => {
            if (!finishUrl) {
              return
            }
            router.push(finishUrl)
          }}
        >
          Next
        </Button>
      </div>
    </>
  )
}

export default VideoPlayerBtn
