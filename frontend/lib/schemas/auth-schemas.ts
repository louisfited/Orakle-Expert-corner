import { z } from 'zod'

// TODO: Should contain all values from the registration form
export const createAccountSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export const forgotPasswordSchema = z.object({
  email: z.string().email(),
})

export const loginSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address',
  }),
  password: z
    .string({
      message: 'Please enter a valid password',
    })
    .min(8, 'Password must be at least 8 characters long'),
})

// Schemas for steps.
export const createAccountSchemaOne = z.object({
  firstName: z
    .string({
      message: 'Please enter a valid first name',
    })
    .min(2, 'First name must be at least 2 characters long'),
  lastName: z
    .string({
      message: 'Please enter a valid last name',
    })
    .min(2, 'Last name must be at least 2 characters long'),
  countryOfPractice: z
    .string({
      message: 'Please enter a valid country',
    })
    .min(2, 'Please enter a valid country'),
})

export const createAccountSchemaTwo = z.object({
  licenseNumber: z.string().min(2, {
    message: 'Please enter a valid license number',
  }),
  qualifications: z.string().min(2, {
    message: 'Please enter a valid qualifications',
  }),
  occupation: z.string().min(2, {
    message: 'Please enter a valid occupation',
  }),
  otherOccupation: z.string().optional(),
  primarySpecialization: z.string().min(2, {
    message: 'Please enter a valid specialization',
  }),
  secondarySpecialization: z.string().optional(),
})

export const createAccountSchemaThree = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  phoneNumber: z.string().min(8),
})

export const fullAccountSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  countryOfPractice: z.string().min(2),
  cookiesAccepted: z.boolean().optional(),
  licenseNumber: z.string().min(2),
  qualifications: z.string().min(2),
  occupation: z.string().min(2),
  primarySpecialization: z.string().min(2),
  secondarySpecialization: z.string().optional(),
  email: z.string().email(),
  password: z.string().min(8),
  phoneNumber: z.string().min(8),
})

export const updatePasswordSchema = z
  .object({
    oldPassword: z.string().min(8),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      // @ts-expect-error
      ctx.addIssue({
        path: ['confirmPassword'],
        message: 'Passwords do not match',
      })
    }
  })

export const resetPasswordFormSchema = z
  .object({
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      // @ts-expect-error
      ctx.addIssue({
        path: ['confirmPassword'],
        message: 'Passwords do not match',
      })
    }
  })
