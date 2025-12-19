'use server'

import { createSupabaseServerClient } from '@/lib/supabase/server'
import { Tables } from '@/lib/types/database.types'
import { getSafeUser } from '@/lib/auth/safe-user'
import { StatusEnum } from '@/lib/types/types'

export const getCasesStartedForUser = async (
  caseId?: string
): Promise<{
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

    let getCasesQuery = supabase.from('case_status_per_user').select('*').eq('user_id', user.id)

    if (caseId) {
      getCasesQuery = getCasesQuery.eq('case_id', caseId ? caseId : '')
    }

    const { data: medicalCasesStarted, error } = await getCasesQuery

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

export async function startTestAction(caseId: string) {
  try {
    const supabase = createSupabaseServerClient()
    const { data: user, error } = await getSafeUser()

    if (error || !user) throw error || new Error('User not found')

    const { id } = user

    const { error: insertError } = await supabase.from('case_status_per_user').insert({
      user_id: id,
      case_id: caseId,
      status: StatusEnum.started,
    })

    if (insertError) throw insertError
    return {
      status: 'success',
      message: 'Case status created',
    }
  } catch (err) {
    console.log(err)
    throw err instanceof Error ? err : new Error('Unknown error occurred')
  }
}

export async function finishTestAction(caseId: string) {
  try {
    const supabase = createSupabaseServerClient()
    const { data: user, error } = await getSafeUser()

    if (error || !user) throw error || new Error('User not found')

    const { id } = user

    const { error: insertError } = await supabase
      .from('case_status_per_user')
      .update({
        status: StatusEnum.completed,
      })
      .eq('case_id', caseId)

    if (insertError) throw insertError
    return {
      status: 'success',
      message: 'Case status updated',
    }
  } catch (err) {
    console.log(err)
    throw err instanceof Error ? err : new Error('Unknown error occurred')
  }
}
