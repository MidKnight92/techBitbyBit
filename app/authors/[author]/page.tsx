import { Authors, allAuthors } from 'contentlayer/generated'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import AuthorLayout from '@/layouts/AuthorLayout'
import { coreContent } from 'pliny/utils/contentlayer'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'Author' })

export default async function Page(props: { params: Promise<{ author: string }> }) {
  const params = await props.params
  const { author } = params
  const authorContent = allAuthors.find((p) => p.slug === author) as Authors
  const mainContent = coreContent(authorContent)

  return (
    <>
      <AuthorLayout content={mainContent}>
        <MDXLayoutRenderer code={authorContent.body.code} />
      </AuthorLayout>
    </>
  )
}
