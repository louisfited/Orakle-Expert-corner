'use client'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { partialUpdateUserProfile } from '@/lib/actions/userActions'
import React, { useState } from 'react'
import { useToast } from '@/components/ui/use-toast'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { InlineEditInput, TriggerEditInput } from '@/components/page-content/account/forms/custom-input-fields'

const phoneSchema = z.object({
  phoneNumber: z.string().min(8),
})

type AccountSettingsFormProps = {
  defaultValues: z.infer<typeof phoneSchema>
}
export const AccountSettingsForm = ({ defaultValues }: AccountSettingsFormProps) => {
  const { toast } = useToast()
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const form = useForm<z.infer<typeof phoneSchema>>({
    resolver: zodResolver(phoneSchema),
    defaultValues,
  })

  async function onSubmit(data: z.infer<typeof phoneSchema>) {
    const { status, message } = await partialUpdateUserProfile(data)

    if (status === 'error') {
      toast({
        variant: 'destructive',
        description: message,
      })
      return
    }

    toast({
      variant: 'default',
      description: 'Phone number updated',
    })

    setIsEditing(false)
  }

  return (
    <div id="account-settings">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full items-center justify-between space-y-4"
        >
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  {isEditing ? (
                    <InlineEditInput
                      {...field}
                      onCancel={() => form.resetField('phoneNumber')}
                      isSubmitting={form.formState.isSubmitting}
                    />
                  ) : (
                    <TriggerEditInput
                      field={field}
                      onClick={() => setIsEditing(true)}
                    />
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  )
}
