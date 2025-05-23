'use client'
import { Dispatch, SetStateAction } from 'react'
import { Props } from 'types/childrenOnly'
import ConditionalScripts from './ConditionalScripts'
import { CookieSettings, CookieValues, useConsent } from 'app/cookie-provider'

interface CookieProps extends Props {
  acceptButton?: string
  declineButton?: string
  isVisible: boolean
  setIsVisible: Dispatch<SetStateAction<boolean>>
}

export default function CookieWrapper({
  children,
  acceptButton = 'Accept',
  declineButton = 'Decline',
  isVisible,
  setIsVisible,
}: CookieProps) {
  const { setConsent } = useConsent()

  const handleClick = (value: CookieSettings): void => {
    setIsVisible(false)
    setConsent(value)
  }
  return (
    <>
      {isVisible && (
        <div className="fixed right-0 bottom-0 left-0 z-50 m-8 flex flex-col gap-y-2 bg-gray-900 px-4 py-3 text-left text-xs text-white shadow-md shadow-gray-600 outline-2 outline-offset-2 outline-[#5b87cf] outline-solid">
          {children}
          <div className="m-auto mt-2 flex text-center">
            <div>
              <button
                className="text-primary-500 hover:text-primary-400 mr-4 px-4"
                onClick={() => handleClick(CookieValues.ACCEPTED)}
              >
                {acceptButton}
              </button>
            </div>
            <div>
              <button
                className="text-primary-500 hover:text-primary-400 ml-4 px-4"
                onClick={() => handleClick(CookieValues.DENIED)}
              >
                {declineButton}
              </button>
            </div>
          </div>
        </div>
      )}
      <ConditionalScripts />
    </>
  )
}
