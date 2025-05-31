'use client'
import { ReactCusdis } from 'react-cusdis'
import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'

type Theme = 'dark' | 'light' | 'auto' | undefined

export default function Comments({
  slug,
  title,
  url,
}: {
  slug: string
  title: string
  url: string
}) {
  const [commentsTheme, setCommentsTheme] = useState<Theme>(undefined)
  const { resolvedTheme } = useTheme()
  useEffect(() => {
    const theme = resolvedTheme === 'system' ? 'auto' : resolvedTheme
    setCommentsTheme(theme as Theme)
  }, [resolvedTheme])

  return (
    <>
      {process.env.NEXT_PUBLIC_CUSDIS_APP_ID && (
        <div className="mt-4">
          <ReactCusdis
            key={commentsTheme}
            attrs={{
              host: 'https://cusdis.com',
              appId: process.env.NEXT_PUBLIC_CUSDIS_APP_ID,
              pageId: slug,
              pageTitle: title,
              pageUrl: url,
              theme: commentsTheme,
            }}
          />
        </div>
      )}
    </>
  )
}
