import { ReactNode } from 'react'
import Image from 'next/image'

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 justify-center gap-8 h-screen">
      <div className="hidden md:block relative">
        <Image
          src={'/create-account.png'}
          objectFit="contain"
          alt={'Login Image'}
          width={500}
          height={500}
          priority
          className="w-full h-full max-h-screen object-cover"
        />
      </div>
      <div className="p-8 flex items-center px-8 lg:px-24 xl:px-44 xl:max-w-5xl">{children}</div>
    </div>
  )
}
