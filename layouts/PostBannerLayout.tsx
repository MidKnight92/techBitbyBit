import { ReactNode } from 'react'
import Image from '@/components/Image'
import Bleed from 'pliny/ui/Bleed'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { About } from 'contentlayer/generated'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import img from '../public/static/images/tbbb-banner-patreon.png'
import { Props } from 'types/childrenOnly'

interface LayoutProps extends Props {
  content: CoreContent<About>
}

export default function PostMinimal({ content, children }: LayoutProps) {
  const { title, images } = content
  const displayImage = images && images.length > 0 ? images[0] : img
  return (
    <SectionContainer>
      <article>
        <div>
          <div className="space-y-1 pb-10 text-center dark:border-gray-700">
            <div className="w-full">
              <Bleed>
                <div className="relative aspect-2/1 w-full">
                  <Image src={displayImage} alt={title} fill className="object-cover" />
                </div>
              </Bleed>
            </div>
            <div className="relative pt-10">
              <PageTitle>{title}</PageTitle>
            </div>
          </div>
          <div className="prose dark:prose-invert max-w-none py-4">{children}</div>
        </div>
      </article>
    </SectionContainer>
  )
}
