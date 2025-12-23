/* eslint-disable react/no-unescaped-entities */
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { partialUpdateUserProfile } from '@/lib/actions/userActions'

interface CookiesBannerProps {
  cookiesAccepted: boolean | undefined
}

const CookiesBanner: React.FC<CookiesBannerProps> = ({ cookiesAccepted }) => {
  const [visible, setVisible] = useState(!cookiesAccepted)
  const { toast } = useToast()

  const handleAccept = async () => {
    try {
      const { status, message } = await partialUpdateUserProfile({ cookiesAccepted: true })

      if (status === 'error') {
        toast({
          variant: 'destructive',
          description: message || 'Failed to update cookies acceptance.',
        })
        return
      }

      toast({
        variant: 'default',
        description: 'Cookies accepted.',
      })

      setVisible(false) // Hide the banner
    } catch (error) {
      toast({
        variant: 'destructive',
        description: 'An unexpected error occurred. Please try again.',
      })
    }
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-10 left-4 right-4 bg-white border rounded-md py-4 px-8 flex items-center justify-between z-50 opacity-100">
      <p className="text-sm">
        We use cookies to enhance your browsing experience. By clicking "Accept", you agree to our use of cookies.
      </p>
      <Button
        className="ml-4"
        onClick={handleAccept}
      >
        Accept
      </Button>
    </div>
  )
}

export default CookiesBanner
