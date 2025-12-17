import type { Metadata } from 'next'
import { Inter, Ubuntu } from 'next/font/google'
import './globals.scss'
import { UserContextProvider } from '@/lib/context/userContext'
import { Toaster } from '@/components/ui/toaster'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })
const ubuntu = Ubuntu({ weight: ['300', '400', '500', '700'], subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Orakle Expert's Corner",
  description: 'Patient Case Simulation',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <UserContextProvider>
      <html
        lang="en"
        className="bg-grayBg"
      >
        <head>
          <Script
            id="hotjar"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
            (function(h,o,t,j,a,r){
    h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
    h._hjSettings={hjid:${process.env.HOTJAR_ID},hjsv:6};
    a=o.getElementsByTagName('head')[0];
    r=o.createElement('script');r.async=1;
    r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
    a.appendChild(r);
})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
          `,
            }}
          />
        </head>
        <body className={inter.className}>
          <div className="relative">{children}</div>
          <Toaster />
        </body>
      </html>
    </UserContextProvider>
  )
}
