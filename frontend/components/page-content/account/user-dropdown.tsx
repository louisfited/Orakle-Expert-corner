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
  userProfile: UserProfile
  email: string
}

export const UserDropdown = () => {
  const supabase = createSupabaseBrowserClient()
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [user, setUser] = useState<any>(null)
  const [email, setEmail] = useState<string>('')
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
        // Fetch both user and profile data
        const [userResult, profileResult] = await Promise.all([supabase.auth.getUser(), getUserProfile()])

        // Handle user data
        if (userResult.error) {
          console.error('Error fetching user:', userResult.error)
        } else if (userResult.data?.user) {
          setUser(userResult.data.user)
          setEmail(userResult.data.user.email || '')
        }

        // Handle profile data
        if (profileResult.error) {
          console.error('Error fetching user profile:', profileResult.error)
        } else {
          setUserProfile(profileResult.data)
        }
      } catch (err) {
        console.error('Error in fetchUserData:', err)
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
      }
    })

    return () => subscription.unsubscribe()
  }, [supabase.auth])

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

  if (!userProfile) {
    return null
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MenuTrigger
          userProfile={userProfile}
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

const MenuTrigger = ({ userProfile, email }: UserFields) => {
  return (
    <div className="flex gap-2 bg-[#1026C40A] items-center w-fit px-2 py-1 lg:px-4 lg:py-3 rounded-lg">
      <div className="flex flex-col items-end gap-1 lg:gap-2">
        <p className="font-medium text-sm md:text-base">
          {userProfile?.first_name} {userProfile?.last_name}
        </p>
        <p className="text-xs md:text-base">{email}</p>
      </div>
      <ChevronDown
        size={20}
        className="text-gray-500"
      />
    </div>
  )
}
