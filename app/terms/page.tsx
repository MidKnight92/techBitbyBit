import { Terms, allTerms } from 'contentlayer/generated'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import PostSimple from '@/layouts/PostSimple'
import { coreContent } from 'pliny/utils/contentlayer'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'Terms of Use' })

export default async function Page() {
  const termContent = allTerms.find((p) => p.slug === 'terms') as Terms
  const mainContent = coreContent(termContent)

  return (
    <>
      <PostSimple content={mainContent}>
        <MDXLayoutRenderer code={termContent.body.code} />
      </PostSimple>
    </>
  )
}
