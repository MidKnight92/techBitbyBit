import { Privacy, allPrivacies } from 'contentlayer/generated'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import PostSimple from '@/layouts/PostSimple'
import { coreContent } from 'pliny/utils/contentlayer'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'Privacy Policy' })

export default async function Page() {
  const privacyContent = allPrivacies.find((p) => p.slug === 'privacy-policy') as Privacy
  const mainContent = coreContent(privacyContent)

  return (
    <>
      <PostSimple content={mainContent}>
        <MDXLayoutRenderer code={privacyContent.body.code} />
      </PostSimple>
    </>
  )
}
