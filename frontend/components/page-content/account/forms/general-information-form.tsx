'use client'

import { createAccountSchemaOne } from '@/lib/schemas/auth-schemas'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { CountrySelector } from '@/components/auth/create-account/country-selector'
import React, { useState } from 'react'
import { partialUpdateUserProfile } from '@/lib/actions/userActions'
import { useToast } from '@/components/ui/use-toast'
import { InlineEditInput, TriggerEditInput } from '@/components/page-content/account/forms/custom-input-fields'

type IsEditing = {
  firstName: boolean
  lastName: boolean
  countryOfPractice: boolean
}
type GeneralInformationFormProps = {
  defaultValues: z.infer<typeof createAccountSchemaOne>
}
export const GeneralInformationForm = ({ defaultValues }: GeneralInformationFormProps) => {
  const { toast } = useToast()
  const [isEditing, setIsEditing] = useState<IsEditing>({
    firstName: false,
    lastName: false,
    countryOfPractice: false,
  })

  const form = useForm<z.infer<typeof createAccountSchemaOne>>({
    resolver: zodResolver(createAccountSchemaOne),
    defaultValues,
  })

  async function onSubmit(values: z.infer<typeof createAccountSchemaOne>) {
    const { status, message } = await partialUpdateUserProfile(values)

    if (status === 'error') {
      toast({
        variant: 'destructive',
        description: message,
      })
      return
    }

    toast({
      variant: 'default',
      description: 'General information updated',
    })

    setIsEditing({
      firstName: false,
      lastName: false,
      countryOfPractice: false,
    })
  }

  function handleResetField(fieldName: 'firstName' | 'lastName' | 'countryOfPractice') {
    form.setValue(fieldName, defaultValues[fieldName])
    setIsEditing((prev) => {
      return { ...prev, [fieldName]: false }
    })
  }

  return (
    <div
      className="space-y-4 w-full"
      id="general-information"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8"
        >
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First name</FormLabel>
                <FormControl>
                  {isEditing.firstName ? (
                    <InlineEditInput
                      {...field}
                      onCancel={() => handleResetField('firstName')}
                      isSubmitting={form.formState.isSubmitting}
                    />
                  ) : (
                    <TriggerEditInput
                      field={field}
                      onClick={() =>
                        setIsEditing((prev) => {
                          return { ...prev, firstName: true }
                        })
                      }
                    />
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last name</FormLabel>
                <FormControl>
                  {isEditing.lastName ? (
                    <InlineEditInput
                      {...field}
                      onCancel={() => handleResetField('lastName')}
                      isSubmitting={form.formState.isSubmitting}
                    />
                  ) : (
                    <TriggerEditInput
                      field={field}
                      onClick={() =>
                        setIsEditing((prev) => {
                          return { ...prev, lastName: true }
                        })
                      }
                    />
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="countryOfPractice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country of practice</FormLabel>
                {isEditing.countryOfPractice ? (
                  <InlineEditInput
                    {...field}
                    onCancel={() => handleResetField('countryOfPractice')}
                    isSubmitting={form.formState.isSubmitting}
                    customRender={<CountrySelector field={field} />}
                  />
                ) : (
                  <TriggerEditInput
                    field={field}
                    onClick={() =>
                      setIsEditing((prev) => {
                        return { ...prev, countryOfPractice: true }
                      })
                    }
                  />
                )}
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  )
}
