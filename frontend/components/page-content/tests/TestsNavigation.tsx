'use client'

import { ArrowLeft, User } from 'lucide-react'
import { useState } from 'react'
import { HStack } from '@/components/h-stack'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const routes = [
  {
    name: 'My bookmarks',
    icon: User,
    href: '#booksmarks',
  },
]
export const TestsNavigation = () => {
  const [currentRoute, setCurrentRoute] = useState(routes[0].name)

  function onClickRoute(routeName: string) {
    setCurrentRoute(routeName)
  }

  return (
    <div>
      <Button
        variant="link"
        asChild
      >
        <Link href="/">
          <HStack>
            <ArrowLeft />
            <p>Back to Overview</p>
          </HStack>
        </Link>
      </Button>

      <div className="mt-8">
        {routes.map((route) => {
          const isSelected = route.name === currentRoute
          return (
            <Button
              variant="unstyled"
              key={route.name}
              className={cn(
                'gap-4 mt-4 rounded-md w-full justify-start cursor-pointer px-4 py-6 hover:bg-70/[#1026C40D]',
                isSelected ? 'bg-[#1026C40D] text-textPrimary' : ''
              )}
              onClick={() => onClickRoute(route.name)}
            >
              <Link href={route.href}>
                <HStack className="w-full">
                  <route.icon />
                  {route.name}
                </HStack>
              </Link>
            </Button>
          )
        })}
      </div>
    </div>
  )
}
