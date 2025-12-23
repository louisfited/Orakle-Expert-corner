'use client'

import { Button } from '@/components/ui/button'
import { Bookmark, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { useToast } from '@/components/ui/use-toast'
import { createBookmarkAction } from '@/lib/data/repository/bookmarks'
import { checkUserAuth } from '@/lib/data/repository/likes'
import { useRouter } from 'next/navigation'
import { BookmarkFilledIcon } from '@radix-ui/react-icons'

export const BookmarkButton = ({
  caseId,
  bookmarked,
  caseTitle,
  iconColor = '#454A6C',
  variant = 'default',
}: {
  caseId: string | null
  bookmarked: boolean
  caseTitle: string
  iconColor?: string
  variant?: 'default' | 'white'
}) => {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(bookmarked)
  const router = useRouter()

  async function handleBookmark() {
    const { userSignedIn } = await checkUserAuth()

    if (!userSignedIn) {
      router.push('/login')
      return
    }

    if (!caseId) {
      return {
        status: 'error',
        message: 'Case ID is required',
      }
    }

    // Optimistic update
    setIsBookmarked(!isBookmarked)
    setIsLoading(true)

    try {
      await createBookmarkAction(caseId, isBookmarked, caseTitle)

      toast({
        variant: 'default',
        description: isBookmarked ? 'Bookmark removed' : 'Bookmark added',
      })
    } catch (e: any) {
      console.error('Failed to update bookmark', e)
      // Revert on error
      setIsBookmarked(isBookmarked)
      return {
        status: 'error',
        message: e.message,
      }
    }

    setIsLoading(false)
  }

  return (
    <Button
      variant="link"
      onClick={handleBookmark}
      className={variant === 'white' ? 'px-0' : 'px-1'}
    >
      <div
        className={
          variant === 'white'
            ? 'flex items-center'
            : 'flex items-center gap-1 mr-2 text-textGray bg-grayBg01 p-2 rounded-full'
        }
      >
        {isLoading ? (
          <Loader2 className={variant === 'white' ? 'animate-spin text-white' : 'animate-spin'} />
        ) : isBookmarked ? (
          <BookmarkFilledIcon className={variant === 'white' ? 'text-white h-6 w-6' : 'text-fadedIcon h-6 w-6'} />
        ) : (
          <Bookmark
            size={24}
            color={variant === 'white' ? 'white' : iconColor}
            strokeWidth={2}
          />
        )}
      </div>
    </Button>
  )
}
