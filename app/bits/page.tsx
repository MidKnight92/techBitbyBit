import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBits, Bits } from 'contentlayer/generated'
import { genPageMetadata } from 'app/seo'
import ListLayout from '@/layouts/ListLayoutWithTags'
import { filterByDate } from 'lib/filterPosts'
import { PRODUCTION, REVALIDATE_INTERVAL_PROD, REVALIDATE_INTERVAL_DEV } from 'lib/constants'

const POSTS_PER_PAGE = 5

export const revalidate = process.env.NODE_ENV === PRODUCTION ? REVALIDATE_INTERVAL_PROD : REVALIDATE_INTERVAL_DEV
export const metadata = genPageMetadata({ title: 'Bits' })

const filteredBits: Bits[] = filterByDate(allBits)

export default async function BitsPage(props: { searchParams: Promise<{ page: string }> }) {
  const posts = allCoreContent(sortPosts(filteredBits))
  const pageNumber = 1
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE)
  const initialDisplayPosts = posts.slice(0, POSTS_PER_PAGE * pageNumber)
  const pagination = {
    currentPage: pageNumber,
    totalPages: totalPages,
  }

  return (
    <ListLayout
      posts={posts}
      initialDisplayPosts={initialDisplayPosts}
      pagination={pagination}
      title="All Posts"
    />
  )
}
