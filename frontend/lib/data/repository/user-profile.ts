'use server'

import { createSupabaseServerClient } from '@/lib/supabase/server'
import { getCurrentUserId } from '@/lib/actions/userActions'
import { Tables } from '@/lib/types/database.types'
import { ApplicationsWithEmail, ServerActionReturn } from '@/lib/types/types'
import { revalidatePath } from 'next/cache'
import { getSafeUser } from '@/lib/auth/safe-user'

export async function getUserProfile(): Promise<ServerActionReturn<Tables<'profiles'>>> {
  try {
    const supabase = createSupabaseServerClient()


    const { data: userId, error: userIdError } = await getCurrentUserId()

    
    if (userIdError || !userId) {
     
      return {
        error: { message: 'Failed to get user id' },
        data: null,
      }
    }

    const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).maybeSingle()

    if (error) {
      return {
        error: { message: 'Failed to get profile' },
        data: null,
      }
    }

    revalidatePath('/', 'layout')

    return {
      error: null,
      data: data,
    }
  } catch (err) {
    return {
      error: { message: err instanceof Error ? err.message : 'Unknown error occurred' },
      data: null,
    }
  }
}

export async function getIsUserAdmin(): Promise<boolean> {
  try {
    const supabase = createSupabaseServerClient()

    const { data: userId, error: userIdError } = await getCurrentUserId()

    if (userIdError || !userId) {
      throw userIdError || new Error('User ID not found')
    }

    const { data, error } = await supabase.from('profiles').select('is_admin').eq('id', userId).maybeSingle()

    if (error) throw error

    return data?.is_admin || false
  } catch (err) {
    console.error('Error in getIsUserAdmin:', err)
    return false
  }
}

export const getApplications = async (): Promise<ApplicationsWithEmail[]> => {
  const supabase = createSupabaseServerClient()

  const { data, error } = await supabase.rpc('get_profiles_with_emails')
  if (error) throw error

  const { data: profileData, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('is_application', true)

  if (profileError) throw profileError

  const combined = profileData.map((profile) => {
    const email = data.find((d) => d.profile_id === profile.id)?.email

    return {
      ...profile,
      email,
    }
  }) as ApplicationsWithEmail[]

  return combined
}

export async function acceptApplication(id: string): Promise<boolean> {
  const supabase = createSupabaseServerClient()

  const { error } = await supabase.from('profiles').update({ is_application: false }).eq('id', id)

  if (error) throw error

  return true
}

export const rejectApplication = async (id: string): Promise<boolean> => {
  const supabase = createSupabaseServerClient()
  const { error } = await supabase.from('profiles').delete().eq('id', id)
  if (error) throw error

  return true
}
