'use client'
import Script from 'next/script'
import { CookieValues, useConsent } from 'app/cookie-provider'

export default function UmaniScriptAfterHtml() {
  const { isConsentGiven } = useConsent()

  if (isConsentGiven !== CookieValues.ACCEPTED) {
    return null
  }

  return <Script src="/scripts/umamiEvent.js" strategy="lazyOnload" id="umami-script" />
}
