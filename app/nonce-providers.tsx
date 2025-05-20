'use client'

import { createContext, useContext } from 'react'

interface Props {
  children: React.ReactNode
  nonce: string | undefined
}

const NonceContext = createContext<string | undefined>(undefined)

export function NonceProvider({ children, nonce }: Props) {
  return <NonceContext.Provider value={nonce}>{children}</NonceContext.Provider>
}

export const useNonce = () => {
  const nonce = useContext(NonceContext)
  if (!nonce) throw new Error('Nonce is missing')
  return nonce
}
