'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import { Props } from 'types/childrenOnly'

export enum CookieValues {
  ACCEPTED = 'accepted',
  DENIED = 'denied',
  UNKOWNN = 'unkown',
}

export type CookieSettings = CookieValues.ACCEPTED | CookieValues.DENIED | CookieValues.UNKOWNN

const KEY = 'cookie-consent-tbbb'

const CookieContext = createContext<{
  isConsentGiven: CookieSettings
  setConsent: (prefs: CookieSettings) => void
}>({
  isConsentGiven: CookieValues.UNKOWNN,
  setConsent: () => {},
})

export function CookieProvider({ children }: Props) {
  const [isConsentGiven, setIsConsentGiven] = useState<CookieSettings>(CookieValues.UNKOWNN)

  useEffect(() => {
    const consent = localStorage.getItem(KEY)
    setIsConsentGiven(!consent ? CookieValues.UNKOWNN : (consent as CookieSettings))
  }, [])

  const setConsent = (prefs: CookieSettings) => {
    setIsConsentGiven(prefs)
    localStorage.setItem(KEY, prefs)
  }

  return (
    <CookieContext.Provider value={{ isConsentGiven, setConsent }}>
      {children}
    </CookieContext.Provider>
  )
}

export const useConsent = () => useContext(CookieContext)
