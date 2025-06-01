import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import { allBits, Bits } from 'contentlayer/generated'
import Main from './Main'
import { filterByDate } from 'lib/filterPosts'

export const revalidate = 604800

const filteredBits: Bits[] = filterByDate(allBits)

export default async function Page() {
  const sortedPosts = sortPosts(filteredBits)
  const posts = allCoreContent(sortedPosts)
  return <Main posts={posts} />
}
