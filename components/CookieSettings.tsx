'use client'

import { useState } from 'react'
import CookieWrapper from './CookieWrapper'

export default function CookieSettings() {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  return (
    <>
      <button onClick={() => setIsVisible(true)}>Cookie Settings</button>
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
          You’re about to update your cookie preferences. Select your new choices below and confirm
          to save your updated settings. Please note: you’ll need to refresh the page for changes to
          take effect.
        </p>
      </CookieWrapper>
    </>
  )
}
