import { LoginForm } from '@/components/auth/login-form'
import Image from 'next/image'
import Link from 'next/link'

export default function LoginPage() {
  return (
    <div className="w-full">
      <Link href="/">
        <div className="flex flex-col gap-1 absolute top-20">
          <Image
            src={'/experts-corner-new.png'}
            alt={'Logo'}
            style={{ objectFit: 'contain' }}
            width={149}
            height={46}
          />
        </div>
      </Link>
      <LoginForm />
    </div>
  )
}
