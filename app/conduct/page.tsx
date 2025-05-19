import { Conduct, allConducts } from 'contentlayer/generated'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import PostSimple from '@/layouts/PostSimple'
import { coreContent } from 'pliny/utils/contentlayer'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'Code of Conduct' })

export default async function Page() {
  const conductContent = allConducts.find((p) => p.slug === 'conduct') as Conduct
  const mainContent = coreContent(conductContent)

  return (
    <>
      <PostSimple content={mainContent}>
        <MDXLayoutRenderer code={conductContent.body.code} />
      </PostSimple>
    </>
  )
}
