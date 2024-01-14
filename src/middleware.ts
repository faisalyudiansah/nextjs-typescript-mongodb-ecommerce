import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import * as jose from 'jose'
import { PayloadJwt } from './type/typeUser'

export async function middleware(request: NextRequest) {
  //========================================================================= AUTHEN PAGE
  if (
    request.nextUrl.pathname.startsWith('/login') ||
    request.nextUrl.pathname.startsWith('/register')
  ) {
    let cookie: { name: string, value: string } = request.cookies.get('Authorization') || { name: "", value: "" }
    let splitedToken = cookie.value.split(' ')
    if (splitedToken[0] === 'Bearer' && splitedToken[1]) {
      try {
        let secret = new TextEncoder().encode(process.env.NEXT_JWT_SECRET as string)
        let data = await jose.jwtVerify<PayloadJwt>(splitedToken[1], secret)
        if (data) {
          let message = "You already login"
          return NextResponse.redirect(new URL(`/?error=${message}`, request.url))
        }
      } catch (error) {
        // kalo token invalid, go to login
        return NextResponse.redirect(new URL(`/login`, request.url))
      }
    }
    return NextResponse.next()
  }

  //========================================================================= AUTHEN PAGE
  if (request.nextUrl.pathname.startsWith('/wishlist')) {
    try {
      let cookie: { name: string, value: string } = request.cookies.get('Authorization') || { name: "", value: "" }
      let splitedToken = cookie.value.split(' ')
      if (splitedToken[0] !== 'Bearer') {
        return NextResponse.redirect(new URL('/login', request.url))
      }
      let secret = new TextEncoder().encode(process.env.NEXT_JWT_SECRET as string)
      let data = await jose.jwtVerify<PayloadJwt>(splitedToken[1], secret)
      if (!data) {
        console.log('data')
        return NextResponse.redirect(new URL('/login', request.url))
      }
    } catch (error) {
      // kalo token invalid, go to login
      return NextResponse.redirect(new URL('/login', request.url))
    }
    return NextResponse.next()
  }

  //========================================================================= AUTHEN API
  if (request.nextUrl.pathname.startsWith('/api/wishlist')) {
    try {
      let authorizationHeader = request.headers.get('Authorization')  // ini bearer dari cookie di component button
      if (!authorizationHeader) {
        return NextResponse.json({ error: "Invalid Token" }, { status: 401 })
      }
      let splitedToken = authorizationHeader.split(' ')
      if (splitedToken[0] !== 'Bearer') {
        return NextResponse.json({ error: "Invalid Token" }, { status: 401 })
      }
      let secret = new TextEncoder().encode(process.env.NEXT_JWT_SECRET as string)
      let { payload, protectedHeader } = await jose.jwtVerify<PayloadJwt>(splitedToken[1], secret)
      if (!payload) {
        return NextResponse.json({ error: "Invalid Token" }, { status: 401 })
      }
      let requestHeaders = new Headers(request.headers)
      requestHeaders.set('x-user-id-login', payload._id)
      requestHeaders.set('x-user-username-login', payload.username)
      requestHeaders.set('x-user-email-login', payload.email)
      let response = NextResponse.next({
        request: {
          headers: requestHeaders
        }
      })
      return response
    } catch (error) {
      if (error instanceof Error) {
        return NextResponse.json({ error: "Invalid Token" }, { status: 401 })
      }
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
  }
}