import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { getAllFilesFrontMatter } from '@/lib/mdx' // Or a similar path/function name

export async function getStaticProps() {
  // 1. Fetch all blog post frontmatter
  const posts = await getAllFilesFrontMatter('blog') // 'blog' is usually the folder name for posts

  const tagCounts = {} // Object to store tag names and their counts

  // 2. Iterate through each post to extract and count tags
  posts.forEach((post) => {
    if (post.tags && Array.isArray(post.tags)) {
      post.tags.forEach((tag) => {
        const formattedTag = kebabCase(tag) // Normalize the tag name
        if (tagCounts[formattedTag]) {
          tagCounts[formattedTag] += 1 // Increment count
        } else {
          tagCounts[formattedTag] = 1 // Initialize count
        }
      })
    }
  })

  // 3. The 'tagCounts' object is now populated, e.g., { 'next-js': 5, 'react': 10, ... }
  // This is passed as props to the page component.
  return { props: { tags: tagCounts } }
}

export default function Tags({ tags }) {
  const sortedTags = Object.keys(tags).sort((a, b) => tags[b] - tags[a]) // Sort tags by count

  return (
    <>
      <PageSEO title={`Tags - ${siteMetadata.author}`} description="Things I blog about" />
      <div className="flex flex-col items-start justify-start divide-y divide-gray-200 dark:divide-gray-700 md:mt-24 md:flex-row md:items-center md:justify-center md:space-x-6 md:divide-y-0">
        <div className="space-x-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:border-r-2 md:px-6 md:text-6xl md:leading-14">
            Tags
          </h1>
        </div>
        <div className="flex max-w-lg flex-wrap">
          {Object.keys(tags).length === 0 && 'No tags found.'}
          {sortedTags.map((t) => {
            return (
              <div key={t} className="mb-2 mr-5 mt-2">
                <Tag text={t} />
                <Link
                  href={`/tags/${kebabCase(t)}`}
                  className="-ml-2 text-sm font-semibold uppercase text-gray-600 dark:text-gray-300"
                  aria-label={`View posts tagged ${t}`}
                >
                  {` (${tags[t]})`}
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}