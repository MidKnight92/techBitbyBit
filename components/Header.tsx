import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Image from 'next/image'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import SearchButton from './SearchButton'
import { SignedIn, SignedOut, SignInButton, SignOutButton } from '@clerk/nextjs'

const Header = () => {
  let headerClass = 'flex items-center w-full bg-[#f9fafb] dark:bg-[#111111] justify-between py-10'
  if (siteMetadata.stickyNav) {
    headerClass += ' sticky top-0 z-50'
  }

  return (
    <header className={headerClass}>
      <Link href="/" aria-label={siteMetadata.headerTitle}>
        <div className="mr-3 hidden hover:brightness-175 active:brightness-135 md:block">
          <Image
            src="/static/images/logo.png"
            alt="Logo"
            width={800}
            height={800}
            className="h-20 w-auto"
          />
        </div>
        <div className="text-md mr-3 h-6 font-semibold sm:block md:hidden">
          {siteMetadata.headerTitle}
        </div>
      </Link>
      <div className="flex items-center space-x-4 leading-5 sm:-mr-6 sm:space-x-6">
        <div className="no-scrollbar hidden max-w-40 items-center gap-x-4 overflow-x-auto sm:flex md:max-w-72 lg:max-w-96">
          {headerNavLinks
            .filter((link) => link.href !== '/')
            .map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="hover:text-primary-500 dark:hover:text-primary-400 m-1 font-medium text-gray-900 dark:text-gray-100"
              >
                {link.title}
              </Link>
            ))}
        </div>
        <SearchButton />
        <ThemeSwitch />
        <div className="font-orbitron hover:text-primary-500 dark:hover:text-primary-400 text-md mr-3 hidden tracking-widest text-gray-900 md:block dark:text-gray-100">
          <SignedOut>
            <SignInButton mode="modal" />
          </SignedOut>
          <SignedIn>
            <SignOutButton />
          </SignedIn>
        </div>
        <MobileNav />
      </div>
    </header>
  )
}

export default Header
