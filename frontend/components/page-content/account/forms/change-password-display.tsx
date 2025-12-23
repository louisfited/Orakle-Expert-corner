'use client'

import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import React from 'react'
import { HStack } from '@/components/h-stack'
import Link from 'next/link'
import { Separator } from '@radix-ui/react-separator'

export const ChangePasswordDisplay = () => {
  const form = useForm()

  return (
    <>
      <Form {...form}>
        <form className="flex w-full items-center justify-between space-y-4">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <HStack className="items-center w-full justify-between">
                    <p className="security">••••••••</p>
                    <Button
                      variant="link"
                      className="text-textPrimary"
                      asChild
                    >
                      <Link href="/change-password">Edit</Link>
                    </Button>
                  </HStack>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      <Separator className="w-full bg-[#1026C41A] h-[0.1px] my-4" />
    </>
  )
}
