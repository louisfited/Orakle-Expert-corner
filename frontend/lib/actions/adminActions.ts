'use server'

import { acceptApplication, getApplications, rejectApplication } from '@/lib/data/repository/user-profile'
import { ApplicationsWithEmail } from '@/lib/types/types'
import { revalidatePath } from 'next/cache'
import { resend } from '@/lib/resend'
import { RequestEvidenceEmailTemplate } from '@/components/email-templates/request-evidence-email-template'

export const getApplicationsAction = async (): Promise<{
  status: 'success' | 'error'
  data: ApplicationsWithEmail[] | null
}> => {
  try {
    const applications = await getApplications()

    return {
      status: 'success',
      data: applications,
    }
  } catch (e) {
    console.error(e)
    return {
      status: 'error',
      data: null,
    }
  }
}

export const acceptApplicationAction = async (
  userId: string
): Promise<{
  status: 'success' | 'error'
  message: string
}> => {
  try {
    await acceptApplication(userId)
    revalidatePath('/admin')
    return {
      status: 'success',
      message: 'Application accepted',
    }
  } catch (e: any) {
    console.error(e)
    return {
      status: 'error',
      message: 'Failed to accept application',
    }
  }
}

export const rejectApplicationAction = async (userId: string) => {
  try {
    await rejectApplication(userId)
    revalidatePath('/admin')
    return {
      status: 'success',
      message: 'Application rejected',
    }
  } catch (e: any) {
    console.error(e)
    return {
      status: 'error',
      message: 'Failed to reject application',
    }
  }
}

export const requestEvidenceAction = async (email: string, firstName: string) => {
  const { error: sendEmailError } = await resend.emails.send({
    from: 'Experts Corner <support@orakleinc.com>',
    to: [email],
    subject: "Access to Expert's Corner",
    react: RequestEvidenceEmailTemplate({ firstName: firstName }),
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
    message: 'Request for evidence has been sent',
  }
}
