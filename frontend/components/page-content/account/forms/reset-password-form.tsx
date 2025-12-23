'use client'

import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { z } from 'zod'
import { useToast } from '@/components/ui/use-toast'
import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { resetUserPassword } from '@/lib/actions/userActions'
import { resetPasswordFormSchema } from '@/lib/schemas/auth-schemas'
import { HStack } from '@/components/h-stack'
import { Button } from '@/components/ui/button'
import { useRouter, useSearchParams } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'

export const ResetPasswordForm = () => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const params = useSearchParams()

  const form = useForm<z.infer<typeof resetPasswordFormSchema>>({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  })

  async function onSubmit(data: z.infer<typeof resetPasswordFormSchema>) {
    setLoading(true)
    const { status, message } = await resetUserPassword(data)
    if (status === 'error') {
      toast({
        variant: 'destructive',
        description: message || 'An error occurred',
      })

      setLoading(false)
      return
    }

    toast({
      variant: 'default',
      description: 'Password updated!',
    })
    setLoading(false)

    router.push('/account')
  }

  const resetCode = params.get('code')
  if (!resetCode) {
    return (
      <div className="space-y-6 bg-white p-4 w-5/6 md:w-2/3 lg:w-1/3 rounded-md">
        <h1 className="text-2xl font-bold">Reset password</h1>
        <p>Invalid reset link</p>
      </div>
    )
  }

  return (
    <div className="space-y-6 bg-white p-4 w-5/6 md:w-2/3 lg:w-1/3 rounded-md">
      <h1 className="text-2xl font-bold">Reset password</h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    placeholder="Enter your new password, min 8 characters"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Repeat password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    placeholder="Re-enter your new password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <HStack className="self-end mt-4">
            <Button
              className="text-textPrimary"
              variant="link"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              variant="primary"
            >
              {loading ? 'Resetting...' : 'Reset password'}
            </Button>
          </HStack>
        </form>
      </Form>
    </div>
  )
}
