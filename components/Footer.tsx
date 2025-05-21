import Link from './Link'
import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'

export default function Footer() {
  return (
    <footer>
      <div className="mt-16 flex flex-col items-center text-center">
        <div className="mb-3 flex space-x-4">
          <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} size={6} />
          <SocialIcon kind="youtube" href={siteMetadata.youtube} size={6} />
          <SocialIcon kind="buyMeACoffee" href={siteMetadata.buyMeACoffee} size={6} />
          {/* <SocialIcon kind="podcast" href={siteMetadata.podcast} size={6} /> */}
        </div>
        <div className="sm:track-tighter mb-2 flex space-x-1 text-xs text-gray-500 md:space-x-2 dark:text-gray-400">
          <div className="hover:text-primary-500 dark:hover:text-primary-400">
            <Link href={'/authors/Stephanie_Viveros'}>{siteMetadata.author}</Link>
          </div>
          <div>{` • `}</div>
          <div>{`© ${new Date().getFullYear()}`}</div>
          <div>{` • `}</div>
          <Link href="/" className="hover:text-primary-500 dark:hover:text-primary-400">
            {siteMetadata.title}
          </Link>
        </div>
        <div className="sm:track-tighter mb-4 flex items-center space-x-0.5 text-xs text-gray-500 md:space-x-2 dark:text-gray-400">
          <div className="hover:text-primary-500 dark:hover:text-primary-400">
            <Link href="/privacy-policy">Privacy Policy</Link>
          </div>
          <div>{` • `}</div>
          <div className="hover:text-primary-500 dark:hover:text-primary-400">
            <Link href="/terms">Terms of Service</Link>
          </div>
          <div>{` • `}</div>
          <div className="hover:text-primary-500 dark:hover:text-primary-400">
            <Link href="/conduct">Code of Conduct</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
