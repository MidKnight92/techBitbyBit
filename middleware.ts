import { clerkMiddleware } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

// https://clerk.com/docs/security/clerk-csp#default-configuration
export default clerkMiddleware((auth, req) => {
  return applyCsp(req)
})

function applyCsp(req) {
  const nonceFromCookie = req.cookies.get('nonce')?.value
  // create a randomly generated nonce value
  const nonce = nonceFromCookie || Buffer.from(crypto.randomUUID()).toString('base64')

  // format the CSP header
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'strict-dynamic' 'nonce-${nonce}' ${
      process.env.NODE_ENV === 'production' ? '' : `'unsafe-inline'`
    } https: http: ${process.env.NODE_ENV === 'production' ? '' : `'unsafe-eval'`};
    connect-src 'self' https://real-moth-1.clerk.accounts.dev https://cusdis.com;
    img-src 'self' https://img.clerk.com;
    worker-src 'self' blob:;
    style-src 'self' https://fonts.googleapis.com https://cusdis.com 'nonce-${nonce}' 'unsafe-inline';
    frame-src 'self' giscus.app cusdis.com https://challenges.cloudflare.com;
    form-action 'self';
    font-src 'self' https://fonts.gstatic.com;
    manifest-src 'self';
    frame-ancestors 'none';
  `

  const contentSecurityPolicyHeaderValue = cspHeader.replace(/\s{2,}/g, ' ').trim()

  const response = NextResponse.next()
  response.headers.set('Content-Security-Policy', contentSecurityPolicyHeaderValue)

  if (!nonceFromCookie) {
    response.cookies.set('nonce', nonce, {
      path: '/',
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
    })
  }

  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
