import { SignedIn, SignedOut, SignInButton, SignOutButton } from '@clerk/nextjs'
import { Props } from 'types/childrenOnly'

export default function AuthGate({ children }: Props) {
  return (
    <>
      <SignedOut>
        <SignInButton mode="modal">
          <p className="hover:text-[#8cb9ff]">Please sign in to like and comment.</p>
        </SignInButton>
      </SignedOut>
      <SignedIn>{children}</SignedIn>
    </>
  )
}
