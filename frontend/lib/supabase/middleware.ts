import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  // Check if request URL starts with /cases and has a `key` query parameter
  const url = new URL(request.url)

  const hasKeyParam = url.searchParams.has('password')
  const password = url.searchParams.get('password') || ''
  const isCasesPath = request.nextUrl.pathname.startsWith('/cases')
  const email = url.searchParams.get('email') || ''

  // if (request.nextUrl.pathname == "/") {
  //   NextResponse.next()

  // }

  // Skip auth check for API routes and static files to avoid conflicts
  const isApiRoute = request.nextUrl.pathname.startsWith('/api')
  const isStaticFile = request.nextUrl.pathname.match(/\.(ico|png|jpg|jpeg|gif|svg|css|js|woff|woff2|ttf|eot)$/)
  // authcheck for landing page
  const isLandingPage = request.nextUrl.pathname == '/'
  const isCasesPage = request.nextUrl.pathname.startsWith('/cases')
  const isWebinarVideoPage = request.nextUrl.pathname.startsWith('/webinar-video')

  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options))
        },
      },
    }
  )

  // IMPORTANT: Avoid writing any logic between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  if (isCasesPath && hasKeyParam) {
    try {
      await supabase.auth.signInWithPassword({
        email,
        password,
      })
    } catch (error) {
      console.error('Error in middleware auth:', error)
    }
    return supabaseResponse
  }

  // Skip auth check for landing page, static files and API routes to prevent conflicts
  if (isWebinarVideoPage || isCasesPage || isLandingPage || isApiRoute || isStaticFile) {
    return supabaseResponse
  }

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (
      !user &&
      !request.nextUrl.pathname.startsWith('/create-account') &&
      !request.nextUrl.pathname.startsWith('/login') &&
      !request.nextUrl.pathname.startsWith('/auth') &&
      !request.nextUrl.pathname.startsWith('/forgot-password') &&
      !request.nextUrl.pathname.startsWith('/change-password') &&
      !request.nextUrl.pathname.startsWith('/reset-password')
    ) {
      // no user, potentially respond by redirecting the user to the create-account page
      const url = request.nextUrl.clone()

      url.pathname = '/login'
      url.searchParams.set('redirect', request.nextUrl.pathname)
      return NextResponse.redirect(url)
    }
  } catch (error) {
    console.error('Error getting user in middleware:', error)
    // Don't redirect on auth error, let the request continue to avoid blocking the user
  }

  // IMPORTANT: You *must* return the supabaseResponse object as it is. If you're
  // creating a new response object with NextResponse.next() make sure to:
  // 1. Pass the request in it, like so:
  //    const myNewResponse = NextResponse.next({ request })
  // 2. Copy over the cookies, like so:
  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. Change the myNewResponse object to fit your needs, but avoid changing
  //    the cookies!
  // 4. Finally:
  //    return myNewResponse
  // If this is not done, you may be causing the browser and server to go out
  // of sync and terminate the user's session prematurely!

  return supabaseResponse
}
