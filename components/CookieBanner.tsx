'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const KEY = 'cookie-consent-tbbb'

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState<boolean>(true)

  useEffect(() => {
    setIsVisible(!(localStorage.getItem(KEY) === 'true'))
  }, [])

  const handleClick = (value: 'true' | 'false'): void => {
    setIsVisible(false)
    localStorage.setItem(KEY, value)
  }
  return (
    <>
      {isVisible && (
        <div className="fixed right-0 bottom-0 left-0 z-50 m-8 flex flex-col gap-y-2 bg-gray-900 px-4 py-3 text-xs text-white shadow-md shadow-gray-600 outline-2 outline-offset-2 outline-[#5b87cf] outline-solid">
          <h1>Your Personalized Web Experience 🍪</h1>
          <p>This website and selected third parties use cookies or similar technologies.</p>
          <p>
            Ever wondered what a cookie is? You're in the right place! Think of a{' '}
            <strong>cookie</strong> as a small text file that helps websites, like this one,
            remember you. It's similar to your car's personalized <strong>driver settings</strong> –
            your seat, mirrors, and even the radio all adjust just for you when you get in. Cookies
            do the same for your online experience, making sure everything is just how you like it
            for a smoother, more enjoyable visit.
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
          <div className="m-auto mt-2 flex text-center">
            <div>
              <button
                className="text-primary-500 hover:text-primary-400 mr-4 px-4"
                onClick={() => handleClick('true')}
              >
                Accept
              </button>
            </div>
            <div>
              <button
                className="text-primary-500 hover:text-primary-400 ml-4 px-4"
                onClick={() => handleClick('false')}
              >
                Decline
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
