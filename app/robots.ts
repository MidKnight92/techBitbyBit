import { MetadataRoute } from 'next'
import siteMetadata from '@/data/siteMetadata'
import { PRODUCTION, REVALIDATE_INTERVAL_PROD, REVALIDATE_INTERVAL_DEV } from 'lib/constants'

export const revalidate = process.env.NODE_ENV === PRODUCTION ? REVALIDATE_INTERVAL_PROD : REVALIDATE_INTERVAL_DEV

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${siteMetadata.siteUrl}/sitemap.xml`,
    host: siteMetadata.siteUrl,
  }
}
