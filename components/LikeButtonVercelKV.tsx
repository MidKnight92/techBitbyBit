'use client'
import { useState, useEffect, useCallback } from 'react'

export default function LikeButtonVercelKV({ slug }) {
  const [likes, setLikes] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const storageKey = `user_liked_${slug}`

  const fetchLikes = useCallback(async () => {
    setIsLoading(true)
    try {
      const res = await fetch(`/api/likes/${slug}`)
      if (res.ok) {
        const data = await res.json()
        setLikes(data.likes)
      }
    } catch (error) {
      console.error('Failed to fetch likes', error)
    }
    setIsLoading(false)
  }, [slug])

  useEffect(() => {
    fetchLikes()
    console.info(likes)
    if (localStorage.getItem(storageKey) === 'true') {
      setIsLiked(true)
    }
  }, [fetchLikes, storageKey])

  const handleLike = async () => {
    if (isLiked) return

    setIsLiked(true)
    localStorage.setItem(storageKey, 'true')
    setLikes((prevLikes) => prevLikes + 1)

    try {
      const res = await fetch(`/api/likes/${slug}`, { method: 'POST' })
      if (res.ok) {
        const data = await res.json()
        setLikes(data.likes)
      } else {
        setIsLiked(false)
        localStorage.removeItem(storageKey)
        setLikes((prevLikes) => prevLikes - 1)
        console.error('Failed to record like')
      }
    } catch (error) {
      setIsLiked(false)
      localStorage.removeItem(storageKey)
      setLikes((prevLikes) => prevLikes - 1)
      console.error('Failed to record like', error)
    }
  }

  if (isLoading) return <span>Loading likes...</span>

  return (
    <div className="flex space-x-4">
      <button onClick={handleLike} disabled={isLiked}>
        {isLiked ? '💙 Liked' : '🩵 Like'}
      </button>
      {likes > 0 && (
        <>
          <div>{` • `}</div>
          <div>{likes} Likes</div>
        </>
      )}
    </div>
  )
}
