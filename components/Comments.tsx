export default function Comments({
  slug,
  title,
  url,
}: {
  slug: string
  title: string
  url: string
}) {
  return (
    <>
      <p>Comments</p>
      <div
        id="cusdis_thread"
        data-host="https://cusdis.com"
        data-app-id="2c87461c-4fcf-447a-90df-51b6ed9b5c9f"
        data-page-id={slug}
        data-page-url={url}
        data-page-title={title}
      ></div>
    </>
  )
}
