'use client'
import { useAuth } from '@clerk/nextjs'
import { useState, useEffect, useCallback } from 'react'

enum LikeAction {
  Increment = 'increment',
  Decrement = 'decrement',
}

export default function LikeButton({ slug }) {
  const [likes, setLikes] = useState(0)
  const [limit, setLimit] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isProcessing, setIsProcessing] = useState(false)
  const { isSignedIn } = useAuth()
  const storageKey = `user_liked_${slug}`

  const fetchLikes = useCallback(async () => {
    setIsLoading(true)
    try {
      const res = await fetch(`/api/likes/${slug}`)
      if (res.ok) {
        const { likes } = await res.json()
        setLikes(likes)
      }
    } catch (error) {
      console.error('Failed to fetch likes', error)
    }
    setIsLoading(false)
  }, [slug])

  useEffect(() => {
    fetchLikes()
    if (localStorage.getItem(storageKey) === 'true') {
      setIsLiked(true)
    }
  }, [fetchLikes, storageKey])

  const rollback = useCallback(
    (action: LikeAction) => {
      setIsLiked((prevLiked) => !prevLiked)
      localStorage.removeItem(storageKey)
      setLikes((prevLikes) => Math.max(0, prevLikes + (action === LikeAction.Increment ? -1 : 1)))
    },
    [storageKey]
  )

  const handleLike = async (action: LikeAction) => {
    if (!isSignedIn || isProcessing) return
    setIsProcessing(true)
    const nextLiked = !isLiked
    setIsLiked(nextLiked)
    setLimit((currentLimit) => currentLimit + 1)
    localStorage.setItem(storageKey, `${nextLiked}`)
    setLikes((prevLikes) => Math.max(0, prevLikes + (action === LikeAction.Increment ? 1 : -1)))
    try {
      const res =
        action === LikeAction.Increment
          ? await fetch(`/api/likes/${slug}`, { method: 'POST' })
          : await fetch(`/api/likes/${slug}`, { method: 'DELETE' })
      if (res.ok) {
        const data = await res.json()
        setLikes(data.likes)
      } else {
        rollback(action)
        console.error('Failed to record like')
      }
    } catch (error) {
      rollback(action)
      console.error('Failed to record like', error)
    } finally {
      setTimeout(() => setIsProcessing(false), 1000)
    }
  }

  if (isLoading) return <span>Loading likes...</span>

  return (
    <div className="flex space-x-4">
      <button
        aria-pressed={isLiked}
        aria-label={isLiked ? 'Unlike this post' : 'Like this post'}
        onClick={() => handleLike(isLiked ? LikeAction.Decrement : LikeAction.Increment)}
        disabled={isProcessing || limit === 3}
      >
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
