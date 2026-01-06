'use server'

import { createSupabaseServerClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { Tables } from '@/lib/types/database.types'
import { getSafeUser } from '@/lib/auth/safe-user'

export const getBookmarks = async (): Promise<{
  status: 'success' | 'error'
  message: string
  data: Tables<'bookmarks'>[] | null
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

    const { data: bookmarks, error } = await supabase.from('bookmarks').select('*').eq('user_id', user.id)
    if (error) throw new Error(error.message)

    return {
      status: 'success',
      message: 'Bookmark updated',
      data: bookmarks,
    }
  } catch (err) {
    return {
      status: 'error',
      message: 'An error occurred',
      data: null,
    }
  }
}

export async function createBookmarkAction(caseId: string, bookmarked: boolean, caseTitle: string) {
  try {
    const supabase = createSupabaseServerClient()
    const { data: user, error } = await getSafeUser()

    if (error || !user) throw error || new Error('User not found')

    const { id } = user

    if (bookmarked) {
      const { error: deleteError } = await supabase.from('bookmarks').delete().match({ user_id: id, case_id: caseId })
      if (deleteError) throw deleteError
    } else {
      const { error: insertError } = await supabase.from('bookmarks').insert({
        user_id: id,
        case_id: caseId,
        // TODO: Why case title?
        case_title: caseTitle,
      })

      if (insertError) throw insertError
    }

    revalidatePath('/', 'layout')
    return {
      status: 'success',
      message: 'Bookmark updated',
    }
  } catch (err) {
    throw err instanceof Error ? err : new Error('Unknown error occurred')
  }
}

export async function getBookmarkByCaseIdAction(caseId: string) {
  try {
    const supabase = createSupabaseServerClient()
    const { data: user, error } = await getSafeUser()

    if (!user) {
      return {
        data: [],
        error: null,
      }
    }

    if (error || !user) {
      return {
        data: null,
        error: error || new Error('User not found'),
      }
    }

    const { id } = user

    const { data: bookmark, error: bookmarkError } = await supabase
      .from('bookmarks')
      .select()
      .eq('user_id', id)
      .eq('case_id', caseId)

    if (bookmarkError)
      return {
        data: null,
        error: bookmarkError,
      }

    return {
      data: bookmark,
      error: null,
    }
  } catch (err) {
    return {
      data: null,
      error: err instanceof Error ? err : new Error('Unknown error occurred'),
    }
  }
}
