import { CoreContent } from 'pliny/utils/contentlayer'
import type { Authors, Bits } from 'contentlayer/generated'
import Link from 'next/link'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import Image from '@/components/Image'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import ScrollComment from '@/components/ScrollComment'
import LikeButton from '@/components/LikeButton'
import Comments from '@/components/Comments'
import { Props } from 'types/childrenOnly'
import AuthGate from '@/components/AuthGate'

const postDateTemplate: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}

interface LayoutProps extends Props {
  content: CoreContent<Bits>
  authorDetails: CoreContent<Authors>[]
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
}

export default function PostLayout({ authorDetails, content, next, prev, children }: LayoutProps) {
  const { path, slug, date, title, tags, canonicalUrl } = content
  const basePath = path.split('/')[0]
  return (
    <SectionContainer>
      <ScrollComment />
      <article>
        <div className="xl:divide-y xl:divide-gray-200 xl:dark:divide-gray-700">
          <header className="pt-6 xl:pb-6">
            <div className="space-y-1 text-center">
              <dl className="space-y-10">
                <div>
                  <dt className="sr-only">Published on</dt>
                  <dd className="text-base leading-6 font-medium text-gray-500 dark:text-gray-400">
                    <time dateTime={date}>
                      {new Date(date).toLocaleDateString(siteMetadata.locale, postDateTemplate)}
                    </time>
                  </dd>
                </div>
              </dl>
              <div>
                <PageTitle>{title}</PageTitle>
              </div>
            </div>
          </header>
          <div className="grid-rows-[auto_1fr] divide-y divide-gray-200 pb-8 xl:grid xl:grid-cols-4 xl:gap-x-6 xl:divide-y-0 dark:divide-gray-700">
            <dl className="pt-6 pb-10 xl:border-b xl:border-gray-200 xl:pt-11 xl:dark:border-gray-700">
              <dt className="sr-only">Authors</dt>
              <dd>
                <ul className="flex flex-wrap justify-center gap-4 sm:space-x-12 xl:block xl:space-y-8 xl:space-x-0">
                  {authorDetails.map((author, idx) => (
                    <li className="flex items-center space-x-2" key={`${author.name}-${idx}`}>
                      <Image
                        src={author.avatar || '/static/images/defaultAvatar.png'}
                        width={38}
                        height={38}
                        alt="avatar"
                        className="h-10 w-10 rounded-full"
                      />
                      <Link href={`/authors/${author.slug}`}>
                        <dl className="text-sm leading-5 font-light tracking-normal whitespace-nowrap">
                          <dt className="sr-only">Name</dt>
                          <dd className="hover:text-primary-500 dark:hover:text-primary-400 m-1 text-gray-900 dark:text-gray-100">
                            {author.name}
                          </dd>
                        </dl>
                      </Link>
                    </li>
                  ))}
                </ul>
              </dd>
            </dl>
            <div className="divide-y divide-gray-200 xl:col-span-3 xl:row-span-2 xl:pb-0 dark:divide-gray-700">
              <div className="prose dark:prose-invert max-w-none pt-10 pb-8">{children}</div>
              <div
                id="comment"
                className="pt-6 pb-6 text-center text-sm text-gray-700 dark:text-gray-300"
              >
                <AuthGate>
                  <LikeButton slug={slug} />
                  <p className="my-6 text-sm text-gray-600">
                    Be kind, stay constructive, and follow our{' '}
                    <Link href="/conduct" className="text-blue-600 underline hover:text-blue-800">
                      Code of Conduct
                    </Link>
                    .
                  </p>
                  <Comments slug={slug} title={title} url={canonicalUrl} />
                </AuthGate>
              </div>
            </div>
            <footer>
              <div className="divide-gray-200 text-sm leading-5 font-medium xl:col-start-1 xl:row-start-2 xl:divide-y dark:divide-gray-700">
                {tags && (
                  <div className="py-4 xl:py-8">
                    <h2 className="text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">
                      Tags
                    </h2>
                    <div className="flex flex-wrap">
                      {tags.map((tag) => (
                        <Tag key={tag} text={tag} />
                      ))}
                    </div>
                  </div>
                )}
                {(next || prev) && (
                  <div className="flex justify-between py-4 xl:block xl:space-y-8 xl:py-8">
                    {prev && prev.path && (
                      <div>
                        <h2 className="text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">
                          Previous Bit
                        </h2>
                        <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                          <Link href={`/${prev.path}`}>{prev.title}</Link>
                        </div>
                      </div>
                    )}
                    {next && next.path && (
                      <div>
                        <h2 className="text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">
                          Next Bit
                        </h2>
                        <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                          <Link href={`/${next.path}`}>{next.title}</Link>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="pt-4 xl:pt-8">
                <Link
                  href={`/${basePath}`}
                  className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                  aria-label="Back to the bits"
                >
                  &larr; Back to the bits
                </Link>
              </div>
            </footer>
          </div>
        </div>
      </article>
    </SectionContainer>
  )
}
