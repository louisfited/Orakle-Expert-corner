'use client'

import { createAccountSchemaTwo } from '@/lib/schemas/auth-schemas'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import React, { useMemo, useState } from 'react'
import { partialUpdateUserProfile } from '@/lib/actions/userActions'
import { useToast } from '@/components/ui/use-toast'
import { InlineEditInput, TriggerEditInput } from '@/components/page-content/account/forms/custom-input-fields'
import {
  hasSecondarySpecializations,
  OccupationSelector,
  SpecializationSelector,
} from '@/components/auth/create-account/custom-selectors'

type IsEditing = {
  licenseNumber: boolean
  qualifications: boolean
  occupation: boolean
  otherOccupation: boolean
  primarySpecialization: boolean
  secondarySpecialization: boolean
}
type GeneralInformationFormProps = {
  defaultValues: z.infer<typeof createAccountSchemaTwo>
}
export const ProfessionalInformationForm = ({ defaultValues }: GeneralInformationFormProps) => {
  const { toast } = useToast()
  const [isEditing, setIsEditing] = useState<IsEditing>({
    licenseNumber: false,
    qualifications: false,
    occupation: false,
    otherOccupation: false,
    primarySpecialization: false,
    secondarySpecialization: false,
  })

  const form = useForm<z.infer<typeof createAccountSchemaTwo>>({
    resolver: zodResolver(createAccountSchemaTwo),
    defaultValues,
  })

  async function onSubmit(values: z.infer<typeof createAccountSchemaTwo>) {
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
      description: 'Professional information updated',
    })

    setIsEditing({
      licenseNumber: false,
      qualifications: false,
      occupation: false,
      otherOccupation: false,
      primarySpecialization: false,
      secondarySpecialization: false,
    })
  }

  function handleResetField(
    fieldName: 'licenseNumber' | 'qualifications' | 'occupation' | 'primarySpecialization' | 'secondarySpecialization'
  ) {
    form.setValue(fieldName, defaultValues[fieldName])
    setIsEditing((prev) => {
      return { ...prev, [fieldName]: false }
    })
  }

  const primarySpecialization = form.watch('primarySpecialization')
  const hasSecondarySpecialization = useMemo(
    () => hasSecondarySpecializations(primarySpecialization),
    [primarySpecialization]
  )

  return (
    <div
      className="space-y-4 w-full"
      id="professional-information"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8"
        >
          <FormField
            control={form.control}
            name="licenseNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>License Number</FormLabel>
                <FormControl>
                  {isEditing.licenseNumber ? (
                    <InlineEditInput
                      {...field}
                      onCancel={() => handleResetField('licenseNumber')}
                      isSubmitting={form.formState.isSubmitting}
                    />
                  ) : (
                    <TriggerEditInput
                      field={field}
                      onClick={() =>
                        setIsEditing((prev) => {
                          return { ...prev, licenseNumber: true }
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
            name="qualifications"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Qualifications</FormLabel>
                <FormControl>
                  {isEditing.qualifications ? (
                    <InlineEditInput
                      {...field}
                      onCancel={() => handleResetField('qualifications')}
                      isSubmitting={form.formState.isSubmitting}
                    />
                  ) : (
                    <TriggerEditInput
                      field={field}
                      onClick={() =>
                        setIsEditing((prev) => {
                          return { ...prev, qualifications: true }
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
            name="occupation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Occupation</FormLabel>
                {isEditing.occupation ? (
                  <InlineEditInput
                    {...field}
                    onCancel={() => handleResetField('occupation')}
                    isSubmitting={form.formState.isSubmitting}
                    customRender={<OccupationSelector field={field} />}
                  />
                ) : (
                  <TriggerEditInput
                    field={field}
                    onClick={() =>
                      setIsEditing((prev) => {
                        return { ...prev, occupation: true }
                      })
                    }
                  />
                )}
                <FormMessage />
              </FormItem>
            )}
          />

          {form.watch('occupation') === 'Other' && (
            <FormField
              control={form.control}
              name="otherOccupation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Other occupation</FormLabel>
                  <FormControl></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="primarySpecialization"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Primary specialization</FormLabel>
                {isEditing.primarySpecialization ? (
                  <InlineEditInput
                    {...field}
                    onCancel={() => handleResetField('primarySpecialization')}
                    isSubmitting={form.formState.isSubmitting}
                    customRender={
                      <SpecializationSelector
                        field={field}
                        isSecondary={false}
                      />
                    }
                  />
                ) : (
                  <TriggerEditInput
                    field={field}
                    onClick={() =>
                      setIsEditing((prev) => {
                        return { ...prev, primarySpecialization: true, secondarySpecialization: true }
                      })
                    }
                  />
                )}
                <FormMessage />
              </FormItem>
            )}
          />

          {primarySpecialization && hasSecondarySpecialization && (
            <FormField
              control={form.control}
              name="secondarySpecialization"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Secondary specialization</FormLabel>
                  {isEditing.secondarySpecialization ? (
                    <InlineEditInput
                      {...field}
                      onCancel={() => handleResetField('secondarySpecialization')}
                      isSubmitting={form.formState.isSubmitting}
                      customRender={
                        <SpecializationSelector
                          field={field}
                          isSecondary
                          selectedPrimarySpecialization={primarySpecialization}
                        />
                      }
                    />
                  ) : (
                    <TriggerEditInput
                      field={field}
                      onClick={() =>
                        setIsEditing((prev) => {
                          return { ...prev, secondarySpecialization: true }
                        })
                      }
                    />
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </form>
      </Form>
    </div>
  )
}
