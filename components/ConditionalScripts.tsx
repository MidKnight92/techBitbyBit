'use client'
import { useEffect, useState } from 'react'
import siteMetadata from '@/data/siteMetadata'
import Script from 'next/script'

const KEY = 'cookie-consent-tbbb'
export default function ConditionalScripts() {
  const [isConsentGiven, setIsConsentGiven] = useState(false)

  useEffect(() => {
    setIsConsentGiven(localStorage.getItem(KEY) === 'true')
  }, [])
  return (
    <>
      {isConsentGiven && (
        <>
          <Script
            defer
            src="https://cloud.umami.is/script.js"
            data-website-id={siteMetadata.analytics?.umamiAnalytics?.umamiWebsiteId}
          />
          <Script src="/scripts/umamiEvent.js" strategy="lazyOnload" id="umami-script" />
        </>
      )}
    </>
  )
}
