'use client'
import siteMetadata from '@/data/siteMetadata'
import Script from 'next/script'
import { CookieValues, useConsent } from 'app/cookie-provider'

export default function ConditionalScripts() {
  const { isConsentGiven } = useConsent()

  if (isConsentGiven !== CookieValues.ACCEPTED) {
    return null
  }
  return (
    <>
      <Script
        defer
        src="https://cloud.umami.is/script.js"
        data-website-id={siteMetadata.analytics?.umamiAnalytics?.umamiWebsiteId}
      />
      <Script src="/scripts/umamiEvent.js" strategy="lazyOnload" id="umami-script" />
    </>
  )
}
