'use client'

import { Button } from '@/components/ui/button'
import { Bookmark, BookmarkCheck, Loader2 } from 'lucide-react'
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
}: {
  caseId: string | null
  bookmarked: boolean
  caseTitle: string
}) => {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  async function handleBookmark() {
    const { userSignedIn } = await checkUserAuth()
    console.log('check user SignediN', userSignedIn)

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
    setIsLoading(true)
    try {
      await createBookmarkAction(caseId, bookmarked, caseTitle)

      toast({
        variant: 'default',
        description: bookmarked ? 'Bookmark removed' : 'Bookmark added',
      })
    } catch (e: any) {
      console.error('Failed to update bookmark', e)
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
      className="px-1"
    >
      <div className="flex items-center gap-1 mr-2 text-textGray bg-grayBg01 p-2 rounded-full">
        {isLoading ? (
          <Loader2 className="animate-spin" />
        ) : bookmarked ? (
          <BookmarkCheck color="#454A6C" />
        ) : (
          <BookmarkFilledIcon className="text-fadedIcon  h-6 w-6" />
        )}
      </div>
    </Button>
  )
}
