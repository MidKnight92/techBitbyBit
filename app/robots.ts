import { MetadataRoute } from 'next'
import siteMetadata from '@/data/siteMetadata'

export const revalidate = 604800

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
