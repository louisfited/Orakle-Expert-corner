import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'
import categories from '@/lib/categories.json'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Extract the first path segment
  const pathSegments = pathname.split('/').filter(Boolean)
  
  // Only check single-segment paths (e.g., /test, not /cases/123)
  if (pathSegments.length === 1) {
    const potentialCategory = pathSegments[0]
    
    // Check if this matches a category key
    if (potentialCategory in categories.categories) {
      // Redirect to categories page with the category selected
      const url = request.nextUrl.clone()
      url.pathname = '/categories'
      url.searchParams.set('categories', potentialCategory)
      return NextResponse.redirect(url)
    }
  }

  return await updateSession(request)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
