import { MetadataRoute } from 'next'
import { allBits, Bits } from 'contentlayer/generated'
import siteMetadata from '@/data/siteMetadata'
import { filterByDate } from 'lib/filterPosts'
import { PRODUCTION, REVALIDATE_INTERVAL_DEV, REVALIDATE_INTERVAL_PROD } from 'lib/constants'

export const revalidate = process.env.NODE_ENV === PRODUCTION ? REVALIDATE_INTERVAL_PROD : REVALIDATE_INTERVAL_DEV

const filteredBits: Bits[] = filterByDate(allBits)

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = siteMetadata.siteUrl

  const bitsRoutes = filteredBits
    .filter((post) => !post.draft)
    .map((post) => ({
      url: `${siteUrl}/${post.path}`,
      lastModified: post.lastmod || post.date,
    }))

  const routes = ['', 'bits', 'tags'].map((route) => ({
    url: `${siteUrl}/${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...routes, ...bitsRoutes]
}
