import { createMiddlewareSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

export async function middleware(req) {
  let res = NextResponse.next()

  const supabase = createMiddlewareSupabaseClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (session && req.nextUrl.pathname.startsWith('/signin')) {
    console.log("please logout before new signin")
    res = NextResponse.redirect(new URL('/', req.url))
  }

  if (req.nextUrl.pathname.startsWith('/user')) {
    if (!session || session.user.user_metadata.role != 1) {
      console.log("you not user")
      res = NextResponse.redirect(new URL('/', req.url))
    }
  }

  if (req.nextUrl.pathname.startsWith('/shelter')) {
    if (!session || session.user.user_metadata.role != 2) {
      console.log("you not shelter")
      res = NextResponse.redirect(new URL('/', req.url))
    }
  }

  return res
}

export const config = {
  matcher: ['/user/:path*', '/shelter/:path*', '/signin/:path*'],
}