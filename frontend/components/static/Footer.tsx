import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="w-full bg-grayBg py-6 px-8 mt-auto">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-4 lg:gap-8 text-textGray text-[13px] font-normal">
          {/* Links group */}
          <div className="flex flex-row items-center gap-4 lg:gap-6 lg:flex-1 lg:justify-start">
            <Link
              href="/privacy-policy"
              className="underline"
            >
              Privacy Policy
            </Link>
            <Link
              href="/cookies"
              className="underline"
            >
              Cookies
            </Link>
            <Link
              href="/terms-of-use"
              className="underline"
            >
              Terms of Use
            </Link>
          </div>

          {/* Copyright */}
          <div className="text-center lg:flex-1">
            Orakle©{new Date().getFullYear()}. All material on this website is protected by copyright.
          </div>

          {/* Contact */}
          <div className="lg:flex-1 lg:text-right">
            <Link
              href="/contact"
              className="underline"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
