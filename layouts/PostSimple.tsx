import { ReactNode } from 'react'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Contribute, Terms, Privacy, Conduct } from 'contentlayer/generated'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import { Props } from 'types/childrenOnly'

interface LayoutProps extends Props {
  content: CoreContent<Contribute | Terms | Privacy | Conduct>
}

export default function PostLayout({ content, children }: LayoutProps) {
  const { title } = content

  return (
    <SectionContainer>
      <article>
        <div>
          <header>
            <div className="space-y-1 border-b border-gray-200 pb-10 text-center dark:border-gray-700">
              <div>
                <PageTitle>{title}</PageTitle>
              </div>
            </div>
          </header>
          <div className="grid-rows-[auto_1fr] divide-y divide-gray-200 pb-8 xl:divide-y-0 dark:divide-gray-700">
            <div className="divide-y divide-gray-200 xl:col-span-3 xl:row-span-2 xl:pb-0 dark:divide-gray-700">
              <div className="prose dark:prose-invert max-w-none pt-10 pb-8">{children}</div>
            </div>
          </div>
        </div>
      </article>
    </SectionContainer>
  )
}
