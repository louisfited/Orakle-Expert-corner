'use client'

import { HStack } from '@/components/h-stack'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { Separator } from '@radix-ui/react-separator'
import React, { ReactNode } from 'react'

export const InlineEditInput = ({
  onCancel,
  isSubmitting,
  customRender,
  ...field
}: {
  isSubmitting: boolean
  customRender?: ReactNode
  onCancel: () => void
}) => {
  return (
    <HStack className="w-full items-center justify-between">
      {customRender && customRender}
      {!customRender && (
        <Input
          placeholder="John Doe"
          {...field}
        />
      )}
      <HStack className="gap-2">
        <Button
          variant="outline"
          className="text-textPrimary"
          onClick={(e) => {
            e.preventDefault()
            onCancel()
          }}
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          type="submit"
        >
          {isSubmitting && <Loader2 className="mr-2 animate-spin" />}
          {isSubmitting ? 'Saving...' : 'Save'}
        </Button>
      </HStack>
    </HStack>
  )
}

export const TriggerEditInput = ({ field, onClick }: { field: any; onClick: () => void }) => {
  return (
    <div>
      <HStack className="items-center w-full justify-between">
        <p>{field.value}</p>
        <Button
          variant="link"
          className="text-textPrimary"
          onClick={onClick}
        >
          Edit
        </Button>
      </HStack>
      <Separator className="w-full bg-[#1026C41A] h-[0.1px] my-4" />
    </div>
  )
}
