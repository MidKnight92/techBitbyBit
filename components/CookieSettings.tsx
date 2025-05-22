'use client'

import { useState } from 'react'
import CookieWrapper from './CookieWrapper'

export default function CookieSettings() {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  return (
    <>
      <button onClick={() => setIsVisible(true)}>Cookie Settings</button>
      {isVisible && (
        <CookieWrapper
          acceptButton="All Cookies"
          declineButton="Only necessary"
          isVisible={isVisible}
          setIsVisible={setIsVisible}
        >
          <div className="flex justify-between">
            <h2>Change Your Cookie Settings 🍪</h2>
            <button onClick={() => setIsVisible(false)}>
              <p className="!important text-md text-primary-500 hover:text-primary-400 p-1">X</p>
            </button>
          </div>
          <p className="font-sans">
            You're about to modify your current cookie settings. Make your new selections below and
            confirm your choices to update your preferences for this site.
          </p>
        </CookieWrapper>
      )}
    </>
  )
}
