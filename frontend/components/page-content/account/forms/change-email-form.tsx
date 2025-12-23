'use client'

import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { z } from 'zod'
import { createSupabaseBrowserClient } from '@/lib/supabase/client'
import { useUser } from '@/lib/context/userContext'
import { useToast } from '@/components/ui/use-toast'
import React, { useState } from 'react'
import { InlineEditInput, TriggerEditInput } from '@/components/page-content/account/forms/custom-input-fields'

const emailSchema = z.object({
  email: z.string().email(),
})

export const ChangeEmailForm = () => {
  const [isEditing, setIsEditing] = useState(false)
  const supabase = createSupabaseBrowserClient()

  const { toast } = useToast()
  const { user } = useUser()

  const defaultValues = {
    email: user?.email,
  }
  const form = useForm<z.infer<typeof emailSchema>>({
    defaultValues,
  })

  async function onSubmit(data: z.infer<typeof emailSchema>) {
    const { error } = await supabase.auth.updateUser({ email: data.email })
    if (error) {
      console.error('error', error)
      toast({
        variant: 'destructive',
        description: error.message || 'An error occurred',
      })
      return
    }

    toast({
      title: 'Email updated',
      description: 'Please check your e-mail to confirm the e-mail change.',
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full items-center justify-between space-y-4"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>New e-mail</FormLabel>
              <FormControl>
                {isEditing ? (
                  <InlineEditInput
                    {...field}
                    isSubmitting={form.formState.isSubmitting}
                    onCancel={() => setIsEditing(false)}
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
  )
}
