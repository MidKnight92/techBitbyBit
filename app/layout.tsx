import 'css/tailwind.css'
import 'remark-github-blockquote-alert/alert.css'
import { Orbitron, Work_Sans } from 'next/font/google'
import { Analytics, AnalyticsConfig } from 'pliny/analytics'
import { SearchProvider, SearchConfig } from 'pliny/search'
import Header from '@/components/Header'
import SectionContainer from '@/components/SectionContainer'
import Footer from '@/components/Footer'
import siteMetadata from '@/data/siteMetadata'
import { ThemeProviders } from './theme-providers'
import { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import { Props } from 'types/childrenOnly'
import React from 'react'
import { neobrutalism } from '@clerk/themes'
import ScrollBottom from '@/components/ScrollBottom'
import ScrollTop from '@/components/ScrollTop'
import CookieBanner from '@/components/CookieBanner'
import ConditionalScripts from '@/components/ConditionalScripts'
import { CookieProvider } from './cookie-provider'

const workSans = Work_Sans({
  subsets: ['latin'],
  variable: '--font-work-sans',
  display: 'swap',
})

const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-orbitron',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    default: siteMetadata.title,
    template: `%s | ${siteMetadata.title}`,
  },
  description: siteMetadata.description,
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: './',
    siteName: siteMetadata.title,
    images: [siteMetadata.socialBanner],
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: './',
    types: {
      'application/rss+xml': `${siteMetadata.siteUrl}/feed.xml`,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default async function RootLayout({ children }: Props) {
  // const nonce = (await headers()).get('x-nonce') || ''

  const basePath = process.env.BASE_PATH || ''

  return (
    <ClerkProvider
      appearance={{
        baseTheme: [neobrutalism],
        variables: {
          colorPrimary: 'blue',
          fontWeight: { medium: 500 },
          fontFamilyButtons: 'Orbitron',
          fontFamily: 'Orbitron',
        },
        captcha: {
          theme: 'light',
          size: 'compact',
        },
      }}
      dynamic
    >
      <html
        lang={siteMetadata.language}
        className={`${orbitron.variable} ${workSans.variable} scroll-smooth`}
        suppressHydrationWarning
      >
        <head>
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href={`${basePath}/static/favicons/favicon-16x16.png`}
          />
          <link rel="manifest" href={`${basePath}/site.webmanifest`} />
          <meta name="msapplication-TileColor" content="#111111" />
          <meta name="theme-color" media="(prefers-color-scheme: light)" content="#f9fafb" />
          <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#111111" />
          <link rel="alternate" type="application/rss+xml" href={`${basePath}/feed.xml`} />
        </head>
        <body className="bg-[#f9fafb] pl-[calc(100vw-100%)] text-black antialiased dark:bg-[#111111] dark:text-white">
          <ThemeProviders>
            <Analytics analyticsConfig={siteMetadata.analytics as AnalyticsConfig} />
            <SectionContainer>
              <CookieProvider>
                <SearchProvider searchConfig={siteMetadata.search as SearchConfig}>
                  <Header />
                  <ScrollBottom />
                  <main className="mb-auto">{children}</main>
                  <ScrollTop />
                  <CookieBanner />
                </SearchProvider>
                <Footer />
              </CookieProvider>
            </SectionContainer>
          </ThemeProviders>
        </body>
      </html>
    </ClerkProvider>
  )
}
