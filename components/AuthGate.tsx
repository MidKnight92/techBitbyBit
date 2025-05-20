'use client'
import { useAuth } from '@clerk/nextjs'
import Link from 'next/link'
import { Props } from 'types/childrenOnly'

export default function AuthGate({ children }: Props) {
  const { isSignedIn } = useAuth()

  if (!isSignedIn) {
    return (
      <p className="hover:text-blue-800"> {/*fix hover color*/}
        <Link href="/sign-in">Please Sign in to like or comment.</Link>
      </p>
    )
  }

  return <>{children}</>
}
