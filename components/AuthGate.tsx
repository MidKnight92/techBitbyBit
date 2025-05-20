import { Props } from 'types/childrenOnly'
import { SignInButton, SignUpButton, SignedIn, SignedOut } from '@clerk/nextjs'

export default function AuthGate({ children }: Props) {
  return (
    <>
      <SignedOut>
        <SignInButton />
        <SignUpButton />
      </SignedOut>
      <SignedIn>{children}</SignedIn>
    </>
  )
}
