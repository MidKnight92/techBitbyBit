import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import { allBits, Bits } from 'contentlayer/generated'
import Main from './Main'
import { filterByDate } from 'lib/filterPosts'
import { PRODUCTION, REVALIDATE_INTERVAL_PROD, REVALIDATE_INTERVAL_DEV } from 'lib/constants'

export const revalidate = process.env.NODE_ENV === PRODUCTION ? REVALIDATE_INTERVAL_PROD : REVALIDATE_INTERVAL_DEV

const filteredBits: Bits[] = filterByDate(allBits)

export default async function Page() {
  const sortedPosts = sortPosts(filteredBits)
  const posts = allCoreContent(sortedPosts)
  return <Main posts={posts} />
}
