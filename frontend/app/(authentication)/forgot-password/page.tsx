import Image from 'next/image'
import { ForgotPasswordForm } from '@/components/auth/forgot-password-form'
import Link from 'next/link'

export default function ForgotPassword() {
  return (
    <div className="w-full">
      <Link href="/">
        <Image
          src={'/experts-corner-new.png'}
          alt={'Logo'}
          style={{ objectFit: 'contain' }}
          width={149}
          height={46}
          className="absolute top-20"
        />
      </Link>
      <ForgotPasswordForm />
    </div>
  )
}
