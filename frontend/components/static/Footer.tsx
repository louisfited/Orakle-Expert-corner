'use client'

import { useState } from 'react'
import Link from 'next/link'
import { PopupPrivacy } from '@/components/auth/create-account/popup_privacy'
import { PopupTerms } from '@/components/auth/create-account/popup_terms'

export default function Footer() {
  const [showPrivacy, setShowPrivacy] = useState(false)
  const [showTerms, setShowTerms] = useState(false)

  return (
    <>
      <footer className="w-full bg-grayBg py-6 px-8 mt-auto">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-4 lg:gap-8 text-textGray text-[13px] font-normal">
            {/* Links group */}
            <div className="flex flex-row items-center gap-4 lg:gap-6 lg:flex-1 lg:justify-start">
              <button
                onClick={() => setShowPrivacy(true)}
                className="underline"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => setShowTerms(true)}
                className="underline"
              >
                Terms of Use
              </button>
            </div>

            {/* Copyright */}
            <div className="text-center lg:flex-1">
              Orakle©{new Date().getFullYear()}. All material on this website is protected by copyright.
            </div>

            {/* Contact */}
            <div className="lg:flex-1 lg:text-right">
              <Link
                href="https://www.orakle.digital/#contact"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {showPrivacy && <PopupPrivacy onClose={() => setShowPrivacy(false)} />}
      {showTerms && <PopupTerms onClose={() => setShowTerms(false)} />}
    </>
  )
}
