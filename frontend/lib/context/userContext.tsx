'use client'

import { Session, User } from '@supabase/supabase-js'
import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { createSupabaseBrowserClient } from '@/lib/supabase/client'
import { Tables } from '@/lib/types/database.types'

type UserContextType = {
  user: User | null
  session: Session | null
  userProfile: Tables<'profiles'> | null
}

const UserContext = createContext<UserContextType>({
  user: null,
  session: null,
  userProfile: null,
})

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [userProfile, setUserProfile] = useState<Tables<'profiles'> | null>(null)
  const value = { user, session, userProfile }

  const supabase = createSupabaseBrowserClient()

  useEffect(() => {
    let isMounted = true

    // Get initial session
    const getInitialSession = async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession()

        if (error) {
          console.error('Error getting session:', error)
          return
        }

        if (!isMounted) return

        setSession(session)
        setUser(session?.user ?? null)

        // Get user profile if user exists
        if (session?.user) {
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .maybeSingle()

          if (profileError) {
            console.error('Error getting profile:', profileError)
          } else if (isMounted) {
            setUserProfile(profile)
          }
        } else {
          if (isMounted) setUserProfile(null)
        }
      } catch (err) {
        console.error('Error in getInitialSession:', err)
      }
    }

    getInitialSession()

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!isMounted) return

      setSession(session)
      setUser(session?.user ?? null)

      if (session?.user) {
        // Get user profile when user signs in
        try {
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .maybeSingle()

          if (profileError) {
            console.error('Error getting profile:', profileError)
          } else if (isMounted) {
            setUserProfile(profile)
          }
        } catch (err) {
          console.error('Error fetching profile in auth state change:', err)
        }
      } else {
        if (isMounted) setUserProfile(null)
      }
    })

    return () => {
      isMounted = false
      subscription.unsubscribe()
    }
  }, [supabase])

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export const useUser = () => {
  const context = useContext(UserContext)

  if (context === undefined) {
    throw new Error('useUser must be used within a UserContextProvider')
  }

  return context
}
