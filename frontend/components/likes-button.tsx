'use client'

import { updateLikesHygraph } from '@/lib/hygraph/updateLikes'
import { Button } from '@/components/ui/button'
import { Heart } from 'lucide-react'
import React from 'react'
import { checkUserAuth, createLikeAction } from '@/lib/data/repository/likes'
import { HeartFilledIcon } from '@radix-ui/react-icons'
import { cn, formatNumber } from '@/lib/utils'
import { useRouter } from 'next/navigation'

export const LikesButton = ({
  medicalCaseId,
  likes,
  isLiked = false,
  isMedicalCaseV2 = false,
}: {
  medicalCaseId: string
  likes: number
  isLiked: boolean
  isMedicalCaseV2?: boolean
}) => {
  const [isUpdating, setIsUpdating] = React.useState(false)
  const router = useRouter()

  const onClick = async () => {
    // check if user is signedIn
    const { userSignedIn } = await checkUserAuth()

    if (!userSignedIn) {
      router.push('/login')
      return
    }

    try {
      setIsUpdating(true)

      let likeCounter = likes
      if (isLiked) {
        likeCounter -= 1
      } else {
        likeCounter += 1
      }

      await updateLikesHygraph(medicalCaseId, likeCounter, isMedicalCaseV2)

      // Update like counter in supabase
      await createLikeAction(medicalCaseId, isLiked)
    } catch (e: any) {
      console.error('Failed to update likes', e)
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <Button
      onClick={onClick}
      variant="unstyled"
      className="px-1"
    >
      <div className="flex items-center gap-1 mr-2 text-textGray bg-grayBg01 p-2 rounded-full">
        {formatNumber(likes)}
        {isLiked ? (
          <HeartFilledIcon className={cn('h-6 w-6 text-textPrimary', isUpdating ? 'animate-pulse' : '')} />
        ) : (
          <HeartFilledIcon className={cn('h-6 w-6 text-fadedIcon', isUpdating ? 'animate-pulse' : '')} />
        )}
      </div>
    </Button>
  )
}
