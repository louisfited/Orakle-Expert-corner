'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import {
  fullAccountSchema,
  loginSchema,
  resetPasswordFormSchema,
  updatePasswordSchema,
} from '@/lib/schemas/auth-schemas'

import { z } from 'zod'
import { Tables } from '@/lib/types/database.types'
import { getIsUserAdmin } from '@/lib/data/repository/user-profile'
import { RequestEvidenceEmailTemplate } from '@/components/email-templates/request-evidence-email-template'
import { resend } from '@/lib/resend'
import { getAllValidatedSuffixes } from '../hygraph/getAllValidatedSuffixes'
import { getSafeUser } from '@/lib/auth/safe-user'
import { cookies } from 'next/headers'

export async function loginAction(formData: FormData, originalUrl: string | null) {
  const supabase = createSupabaseServerClient()

  const { data, error: parsingError } = loginSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (parsingError) {
    return {
      status: 'error',
      message: 'Invalid input',
    }
  }

  const {
    error,
    data: { user },
  } = await supabase.auth.signInWithPassword(data)

  if (error || !user?.id) {
    return {
      status: 'error',
      message: 'Invalid email or password',
    }
  }

  const { error: isApplicationError, data: profileData } = await supabase
    .from('profiles')
    .select('is_application')
    .eq('id', user?.id)
    .single()

  if (isApplicationError) {
    return {
      status: 'error',
      message: 'An error occurred',
    }
  }

  if (profileData?.is_application) {
    await supabase.auth.signOut()
    return {
      status: 'error',
      message: 'Your application is still pending approval',
    }
  }

  revalidatePath('/', 'layout')

  const prevAddress:string | null = cookies().get("redirect")?.value as string | null

  if (prevAddress ) {
    redirect(prevAddress)
  }

  if (originalUrl) {
    redirect(originalUrl)
  } else {
    redirect('/')
  }

  return {
    status: 'success',
    message: 'Logged in',
  }
}

export async function createAccountAction(formData: FormData) {
  const supabase = createSupabaseServerClient()

  const { data, error: parsingError } = fullAccountSchema?.safeParse({
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    countryOfPractice: formData.get('countryOfPractice'),
    licenseNumber: formData.get('licenseNumber'),
    qualifications: formData.get('qualifications'),
    occupation: formData.get('occupation'),
    primarySpecialization: formData.get('primarySpecialization'),
    secondarySpecialization: formData.get('secondarySpecialization'),
    email: formData.get('email'),
    password: formData.get('password'),
    phoneNumber: formData.get('phoneNumber'),
  })

  const validEmailSuffixes = await getAllValidatedSuffixes()

  let is_application = true
  if (validEmailSuffixes) {
    const suffixList = validEmailSuffixes.map((obj: any) => obj.suffix)

    const emailDomain = '@' + data?.email.split('@')[1]

    if (suffixList.includes(emailDomain)) {
      is_application = false
    }
  }

  if (parsingError) {
    return {
      status: 'error',
      message: 'Invalid input',
    }
  }

  const { error: signupError, data: newUserData } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        first_name: data.firstName,
        last_name: data.lastName,
        country_of_practice: data.countryOfPractice,
        license_number: data.licenseNumber,
        qualifications: data.qualifications,
        occupation: data.occupation,
        primary_specialization: data.primarySpecialization,
        secondary_specialization: data.secondarySpecialization,
        phone_number: data.phoneNumber,
      },
    },
  })

  if (signupError) {
    console.error('error', signupError)
    return {
      status: 'error',
      message: signupError.message || 'An error occurred',
    }
  }

  const profileData = {
    id: newUserData.user?.id,
    first_name: data.firstName,
    last_name: data.lastName,
    country_of_practice: data.countryOfPractice,
    license_number: data.licenseNumber,
    qualifications: data.qualifications,
    occupation: data.occupation,
    primary_specialization: data.primarySpecialization,
    secondary_specialization: data.secondarySpecialization,
    phone_number: data.phoneNumber,
    is_application,
    is_admin: false,
  }

  const { error: profileUpdateError } = await supabase.from('profiles').insert(profileData as Tables<'profiles'>)

  if (profileUpdateError) {
    console.log('error', profileUpdateError)
    return {
      status: 'error',
      message: profileUpdateError.message || 'An error occurred',
    }
  }

  // We ensure the user is not logged in.
  if (is_application) {
    await supabase.auth.signOut()

    const { data: sendEmailData, error: sendEmailError } = await resend.emails.send({
      from: 'Experts Corner <support@orakleinc.com>',
      to: [data.email],
      subject: "Access to Expert's Corner",
      react: RequestEvidenceEmailTemplate({ firstName: profileData.first_name }),
    })

    if (sendEmailError) {
      console.error('error', sendEmailError)
      return {
        status: 'error',
        message: 'An error occurred while sending e-mail.',
      }
    }

    return {
      status: 'success',
      message: 'Your application will be reviewed.',
    }
  }

  revalidatePath('/', 'layout')
  redirect('/')

  return {
    status: 'success',
    message: 'Account created',
  }
}

export const getCurrentUserId = async () => {
  try {
    const { data: user, error } = await getSafeUser()

    if (error) {
      return {
        data: null,
        error,
      }
    }

    return {
      data: user?.id,
      error: null,
    }
  } catch (err) {
    return {
      data: null,
      error: err instanceof Error ? err : new Error('Unknown error occurred'),
    }
  }
}

export const partialUpdateUserProfile = async (data: Partial<z.infer<typeof fullAccountSchema>>) => {
  const supabase = createSupabaseServerClient()
  const { data: userId, error: userIdError } = await getCurrentUserId()

  if (userIdError || !userId) {
    return {
      status: 'error',
      message: 'Failed to get user id',
    }
  }

  const mappedData = {
    first_name: data.firstName,
    last_name: data.lastName,
    country_of_practice: data.countryOfPractice,
    cookies_accepted: data.cookiesAccepted,
    license_number: data.licenseNumber,
    qualifications: data.qualifications,
    occupation: data.occupation,
    primary_specialization: data.primarySpecialization,
    secondary_specialization: data.secondarySpecialization,
    phone_number: data.phoneNumber,
  }
  const { error } = await supabase.from('profiles').update(mappedData).eq('id', userId)

  console.log('error', error)
  if (error) {
    return {
      status: 'error',
      message: 'Failed to update profile',
    }
  }

  revalidatePath('/account')

  return {
    status: 'success',
    message: 'Profile updated',
  }
}

export const resetUserPassword = async (
  data: z.infer<typeof resetPasswordFormSchema>
): Promise<{
  status: 'success' | 'error'
  message: string
}> => {
  try {
    const supabase = createSupabaseServerClient()

    const { error } = await supabase.auth.updateUser({ password: data.password })

    if (error?.code === 'same_password') {
      console.error('error', error)
      return {
        status: 'error',
        message: 'You cannot use the same password',
      }
    }

    if (error) {
      return {
        status: 'error',
        message: 'An error occurred',
      }
    }

    return {
      status: 'success',
      message: 'Password has been reset.',
    }
  } catch (err) {
    console.error('Error in resetUserPassword:', err)
    return {
      status: 'error',
      message: 'An error occurred',
    }
  }
}

export const updateUserPassword = async (
  data: z.infer<typeof updatePasswordSchema>
): Promise<{
  status: 'success' | 'error'
  message: string
}> => {
  try {
    // 1. Check if the old password is correct
    const supabase = createSupabaseServerClient()

    const { error: getUserError } = await supabase.auth.getUser()

    if (getUserError) {
      return {
        status: 'error',
        message: 'Failed to get user data',
      }
    }

    const { error } = await supabase.auth.updateUser({ password: data.password })

    if (error?.code === 'same_password') {
      console.error('error', error)
      return {
        status: 'error',
        message: 'You cannot use the same password',
      }
    }

    if (error) {
      console.error('error', error)
      return {
        status: 'error',
        message: 'An error occurred',
      }
    }

    return {
      status: 'success',
      message: 'Password updated',
    }
  } catch (err) {
    console.error('Error in updateUserPassword:', err)
    return {
      status: 'error',
      message: 'An error occurred',
    }
  }
}

const getURL = () => {
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
    process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
    'http://localhost:3000/'
  // Make sure to include `https://` when not localhost.
  url = url.startsWith('http') ? url : `https://${url}`
  // Make sure to include a trailing `/`.
  url = url.endsWith('/') ? url : `${url}/`
  return url
}

export const resendPasswordResetEmail = async (email: string) => {
  const supabase = createSupabaseServerClient()

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${getURL()}reset-password`,
  })

  if (error) {
    return {
      status: 'error',
      message: 'An error occurred',
    }
  }

  return {
    status: 'success',
    message: 'Email sent, please check your inbox.',
  }
}

export const isCurrentUserAdmin = async () => {
  try {
    const isAdmin = await getIsUserAdmin()

    return {
      status: 'success',
      message: 'Success',
      data: isAdmin,
    }
  } catch (e: any) {
    return {
      status: 'error',
      message: e.message || 'An error occured',
      data: null,
    }
  }
}
