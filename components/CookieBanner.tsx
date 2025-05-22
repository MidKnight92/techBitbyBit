'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import CookieWrapper from './CookieWrapper'

const KEY = 'cookie-consent-tbbb'

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState<boolean>(true)

  useEffect(() => {
    setIsVisible(!(localStorage.getItem(KEY) === 'true'))
  }, [])

  return (
    <>
      <CookieWrapper isVisible={isVisible} setIsVisible={setIsVisible}>
        <div className="flex justify-between">
          <h2>Your Personalized Web Experience 🍪</h2>
          <button onClick={() => setIsVisible(false)}>
            <p className="!important text-md text-primary-500 hover:text-primary-400 p-1">X</p>
          </button>
        </div>
        <p>This website and selected third parties use cookies or similar technologies.</p>
        <p>
          Ever wondered what a cookie is? You're in the right place! Think of a{' '}
          <strong>cookie</strong> as a small text file that helps websites, like this one, remember
          you. It's similar to your car's personalized <strong>driver settings</strong> – your seat,
          mirrors, and even the radio all adjust just for you when you get in. Cookies do the same
          for your online experience, making sure everything is just how you like it for a smoother,
          more enjoyable visit.
        </p>
        <p>
          By continuing to use this site, you agree to our use of cookies. For more information,
          check out our{' '}
          <Link
            href="/privacy-policy"
            className="hover:text-primary-500 !important font-sans text-xs underline"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </CookieWrapper>
    </>
  )
}
