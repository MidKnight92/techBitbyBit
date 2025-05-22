import { clerkMiddleware, ClerkMiddlewareAuth, createRouteMatcher } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'

// https://clerk.com/docs/references/nextjs/custom-sign-in-or-up-page
// In future, if I have routes I want to be private I would need to list all my public routes in the below array
// const isPublicRoute = createRouteMatcher([])

export default clerkMiddleware((auth: ClerkMiddlewareAuth, req: NextRequest) => {
  // This blocks public routes from unauthenticated users, since createRouteMatcher is an empty array there aren't any routes to block
  // if (!isPublicRoute(req)) {
  //   await auth.protect()
  // }
  return applyCsp(req)
})

const applyCsp = (req: NextRequest) => {
  // create a randomly generated nonce value
  // const nonce = Buffer.from(crypto.randomUUID()).toString('base64')

  // format the CSP header
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-inline' https://real-moth-1.clerk.accounts.dev https://challenges.cloudflare.com https://cusdis.com/js/cusdis.es.js https://cusdis.com/js/iframe.umd.js https: http: ${
      process.env.NODE_ENV === 'production' ? '' : `'unsafe-eval'`
    };
    connect-src 'self' https://cusdis.com https://real-moth-1.clerk.accounts.dev https://api-gateway.umami.dev/api/send;
    img-src 'self' https://img.clerk.com data: https:;
    worker-src 'self' blob:;
    style-src 'self' https://fonts.googleapis.com https://cusdis.com 'unsafe-inline';
    style-src-elem 'self' https://fonts.googleapis.com https://cusdis.com 'unsafe-inline';
    style-src-attr 'self' 'unsafe-inline';
    font-src 'self' https://fonts.gstatic.com;
    frame-src https://cusdis.com giscus.app https://challenges.cloudflare.com;
    form-action 'self';
    frame-ancestors 'none';
  `

  const contentSecurityPolicyHeaderValue = cspHeader.replace(/\n/g, '')

  const requestHeaders = new Headers(req.headers)
  // requestHeaders.set('x-nonce', nonce)

  requestHeaders.set('Content-Security-Policy', contentSecurityPolicyHeaderValue)

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
  response.headers.set('Content-Security-Policy', contentSecurityPolicyHeaderValue)

  return response
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
