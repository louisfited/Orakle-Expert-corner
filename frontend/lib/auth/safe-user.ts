import { createSupabaseServerClient } from '@/lib/supabase/server'
import { User } from '@supabase/supabase-js'

// Simple in-memory cache for user data to prevent race conditions
let userCache: { user: User | null; timestamp: number; requestId: string } | null = null
const CACHE_DURATION = 5000 // 5 seconds cache
let activeRequest: Promise<{ data: User | null; error: any }> | null = null

export async function getSafeUser(): Promise<{ data: User | null; error: any }> {
  try {
    // Generate a unique request ID
    const requestId = Math.random().toString(36).substring(7)

    // Check if we have a valid cached result
    if (userCache && Date.now() - userCache.timestamp < CACHE_DURATION) {
      return {
        data: userCache.user,
        error: null,
      }
    }

    // If there's already an active request, wait for it
    if (activeRequest) {
      return await activeRequest
    }

    // Create a new request
    activeRequest = (async () => {
      try {
        const supabase = createSupabaseServerClient()

        const { data, error } = await supabase.auth.getUser()
        // if (error?.message?.includes("Auth session missing")) {
        //   // No session → safe to ignore
        //   activeRequest = null
        //   return {
        //     data:null,
        //     error,
        //   }
        // }

        if (error) {
          // Don't cache errors
          activeRequest = null
          return {
            data: null,
            error,
          }
        }

        // Update cache
        userCache = {
          user: data.user,
          timestamp: Date.now(),
          requestId,
        }

        const result = {
          data: data.user,
          error: null,
        }

        // Clear the active request after a short delay to allow for concurrent usage
        setTimeout(() => {
          activeRequest = null
        }, 100)

        return result
      } catch (err) {
        activeRequest = null
        return {
          data: null,
          error: err instanceof Error ? err : new Error('Unknown error occurred'),
        }
      }
    })()

    return await activeRequest
  } catch (err) {
    activeRequest = null
    return {
      data: null,
      error: err instanceof Error ? err : new Error('Unknown error occurred'),
    }
  }
}

export function clearUserCache() {
  userCache = null
  activeRequest = null
}
