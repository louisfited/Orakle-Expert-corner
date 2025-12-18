import { createSupabaseServerClient } from '@/lib/supabase/server'
import { Tables } from '@/lib/types/database.types'
import { getSafeUser } from '@/lib/auth/safe-user'

export const getCasesStartedForUser = async (): Promise<{
  status: 'success' | 'error'
  message: string
  data: Tables<'case_status_per_user'>[] | null
}> => {
  const supabase = createSupabaseServerClient()

  try {
    const { data: user, error: userError } = await getSafeUser()
    if (!user) {
      return {
        status: 'error',
        message: 'no user',
        data: [],
      }
    }
    if (userError || !user) throw new Error(userError?.message || 'User not found')

    const { data: medicalCasesStarted, error } = await supabase
      .from('case_status_per_user')
      .select('*')
      .eq('user_id', user.id)

    if (error) throw new Error(error.message)

    return {
      status: 'success',
      message: '',
      data: medicalCasesStarted,
    }
  } catch (err) {
    return {
      status: 'error',
      message: 'An error occurred',
      data: null,
    }
  }
}
