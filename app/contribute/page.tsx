import { Contribute, allContributes } from 'contentlayer/generated'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import PostSimple from '@/layouts/PostSimple'
import { coreContent } from 'pliny/utils/contentlayer'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'Contribute' })

export default async function Page() {
  const contributeContent = allContributes.find((p) => p.slug === 'contribute') as Contribute
  const mainContent = coreContent(contributeContent)

  return (
    <>
      <PostSimple content={mainContent}>
        <MDXLayoutRenderer code={contributeContent.body.code} />
      </PostSimple>
    </>
  )
}
