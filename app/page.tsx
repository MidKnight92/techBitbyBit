import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import { allBits } from 'contentlayer/generated'
import Main from './Main'

export default async function Page() {
  const sortedPosts = sortPosts(allBits)
  const posts = allCoreContent(sortedPosts)
  return <Main posts={posts} />
}
