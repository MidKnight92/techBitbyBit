import { About, allAbouts } from 'contentlayer/generated'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import PostBannerLayout from '@/layouts/PostBannerLayout'
import { coreContent } from 'pliny/utils/contentlayer'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'About' })

export default function Page() {
  const about = allAbouts.find((p) => p.slug === 'about') as About
  const mainContent = coreContent(about)

  return (
    <>
      <PostBannerLayout content={mainContent}>
        <MDXLayoutRenderer code={about.body.code} />
      </PostBannerLayout>
    </>
  )
}
