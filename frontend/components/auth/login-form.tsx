'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { loginSchema } from '@/lib/schemas/auth-schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginAction } from '@/lib/actions/userActions'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'

export const LoginForm = () => {
  const [originalUrl, setOriginalUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      setOriginalUrl(params.get('redirect'))
    }
  }, [])

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    setIsLoading(true)
    const formData = new FormData()
    formData.append('email', values.email)
    formData.append('password', values.password)

    const response = await loginAction(formData, originalUrl)

    if (response?.status === 'error') {
      form.setError('email', {
        type: 'manual',
        message: response.message,
      })
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4 w-full">
      <h1 className="text-textPrimary mb-8 font-medium">Log in</h1>
      <Form {...form}>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            form.handleSubmit(onSubmit)()
          }}
          className="space-y-8"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="example@email.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    {...field}
                  />
                </FormControl>
                <div>
                  <Link
                    href="/forgot-password"
                    className="mt-2 underline"
                  >
                    Forgot password?
                  </Link>
                </div>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            variant="primary"
            type="submit"
            className="w-full py-8"
            disabled={form.formState.isSubmitting || isLoading}
          >
            {(form.formState.isSubmitting || isLoading) && <Loader2 className="animate-spin mr-2" />}
            {form.formState.isSubmitting || isLoading ? 'Logging in...' : 'Log in'}
          </Button>
        </form>
      </Form>
      <div className="text-center">
        <Link
          href={'/create-account'}
          className="underline text-textPrimary"
        >
          Create Account
        </Link>
      </div>
    </div>
  )
}
