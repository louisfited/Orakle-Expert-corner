'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { Check, ChevronDown, Cog, Download, LogOut, User } from 'lucide-react'
import { createSupabaseBrowserClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { getUserProfile } from '@/lib/data/repository/user-profile'
import * as XLSX from 'xlsx'
import getSimulationsLog from '@/lib/hygraph/getSimulationsLog'
import { useRouter, usePathname } from 'next/navigation'
import { useCaseContext } from '@/lib/context/caseContext'
import { Skeleton } from '@/components/ui/skeleton'

interface UserProfile {
  country_of_practice: string
  created_at: string
  first_name: string
  id: string
  is_admin: boolean
  is_application: boolean
  last_name: string
  license_number: string
  occupation: string
  phone_number: string
  primary_specialization: string
  qualifications: string
  secondary_specialization: string
}

interface UserFields {
  user: any
  email: string
}

export const UserDropdown = () => {
  const supabase = createSupabaseBrowserClient()
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [user, setUser] = useState<any>(null)
  const [email, setEmail] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()
  const { isFormDirty } = useCaseContext()

  const handleNavigation = (targetPath: string, isFormDirty: boolean) => {
    const isCases = pathname?.split('/').filter(Boolean).slice(-2, -1)[0] === 'cases'
    if (isCases && isFormDirty) {
      const confirmLeave = window.confirm('You have unsaved changes. Are you sure you want to leave?')
      if (!confirmLeave) {
        // Prevent navigation
        router.push(pathname!)
        return false
      }
    }
    router.push(targetPath)
  }

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const [userResult, profileResult] = await Promise.all([supabase.auth.getUser(), getUserProfile()])

        if (userResult.error || !userResult.data?.user) {
          setIsLoading(false)
          router.push('/login')
          return
        }

        setUser(userResult.data.user)
        setEmail(userResult.data.user.email || '')
        setIsLoading(false)

        if (profileResult.error || !profileResult.data) {
          return
        }

        setUserProfile(profileResult.data)
      } catch (err) {
        console.error('Error in fetchUserData:', err)
        setIsLoading(false)
        router.push('/login')
      }
    }

    fetchUserData()

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setUser(session.user)
        setEmail(session.user.email || '')
      } else {
        setUser(null)
        setEmail('')
        setUserProfile(null)
        router.push('/login')
      }
    })

    return () => subscription.unsubscribe()
  }, [supabase.auth, router])

  async function handleSignOut() {
    try {
      try {
        Cookies.remove('language')
      } catch (e) {
        document.cookie = 'language=; path=/;'
      }

      const { error } = await supabase.auth.signOut()
      if (error) {
        console.error('Sign out error', error)
      }

      router.refresh()
    } catch (err) {
      console.error('Error in handleSignOut:', err)
    }
  }

  const exportExcel = async (fileType: 'xlsx' | 'csv') => {
    const currentSimulationLog = await getSimulationsLog()

    if (!currentSimulationLog || !currentSimulationLog.data) {
      alert('No simulation log data available to export.')
      return
    }

    let dataToExport = currentSimulationLog.data
    if (typeof dataToExport === 'string') {
      try {
        dataToExport = JSON.parse(dataToExport)
      } catch (error) {
        console.error('Error parsing simulation log data:', error)
        alert('Error parsing simulation log data.')
        return
      }
    }

    const mappedData = dataToExport.map((item) => ({
      Date: item.date,
      Practitioner: item.user,
      'Case Title': item.case_title,
    }))

    const worksheet = XLSX.utils.json_to_sheet(mappedData)

    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'SimulationSummary')

    if (fileType === 'xlsx') {
      XLSX.writeFile(workbook, 'SimulationsSummary.xlsx')
    } else if (fileType === 'csv') {
      XLSX.writeFile(workbook, 'SimulationsSummary.csv', { bookType: 'csv' })
    }
  }

  // If loading or no user, show skeleton
  if (isLoading || !user) {
    return <UserDropdownSkeleton />
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MenuTrigger
          user={user}
          email={email}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem asChild>
          <div onClick={() => handleNavigation('/account', isFormDirty)}>
            <div className="flex items-center gap-2">
              <User size={18} />
              My Account
            </div>
          </div>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <div onClick={() => handleNavigation('/tests', isFormDirty)}>
            <div className="flex items-center gap-2">
              <Check size={18} />
              Bookmarked Simulations
            </div>
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        {userProfile?.is_admin && (
          <DropdownMenuItem asChild>
            <div onClick={() => handleNavigation('/admin', isFormDirty)}>
              <div className="flex items-center gap-2">
                <Cog size={18} />
                Admin
              </div>
            </div>
          </DropdownMenuItem>
        )}
        {userProfile?.is_admin && (
          <DropdownMenuItem asChild>
            <Link
              href={''}
              onClick={() => exportExcel('xlsx')}
            >
              <div className="flex items-center gap-2">
                <Download size={18} />
                Simulation Log Download
              </div>
            </Link>
          </DropdownMenuItem>
        )}

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={handleSignOut}
          asChild
        >
          <div className="flex items-center gap-2">
            <LogOut
              size={18}
              className="text-red-500"
            />
            <p className="text-red-600">Sign out</p>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const MenuTrigger = ({ user, email }: UserFields) => {
  const firstName = user?.user_metadata?.first_name || ''
  const lastName = user?.user_metadata?.last_name || ''
  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()

  return (
    <>
      {/* Mobile: Avatar with initials and chevron */}
      <div className="flex lg:hidden items-center gap-1">
        <div className="w-8 h-8 rounded-full bg-textDark text-white flex items-center justify-center text-xs font-semibold">
          {initials}
        </div>
        <ChevronDown
          size={14}
          className="text-textDark"
        />
      </div>

      {/* Desktop: Full info */}
      <div className="hidden lg:flex gap-3 items-center w-fit px-3 py-2 rounded-lg">
        <div className="flex flex-col items-end gap-0.5">
          <p className="font-medium text-sm text-textPrimary">
            {firstName} {lastName}
          </p>
          <p className="text-xs text-textPrimary">{email}</p>
        </div>
        <ChevronDown
          size={18}
          className="text-textPrimary"
        />
      </div>
    </>
  )
}

const UserDropdownSkeleton = () => {
  return (
    <>
      {/* Mobile Skeleton: Avatar circle and chevron */}
      <div className="flex lg:hidden items-center gap-1">
        <Skeleton className="w-8 h-8 rounded-full" />
        <Skeleton className="w-3 h-3" />
      </div>

      {/* Desktop Skeleton: Full info */}
      <div className="hidden lg:flex gap-3 items-center w-fit px-3 py-2">
        <div className="flex flex-col items-end gap-1.5">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-40" />
        </div>
        <Skeleton className="w-12 h-12 rounded-full" />
      </div>
    </>
  )
}
