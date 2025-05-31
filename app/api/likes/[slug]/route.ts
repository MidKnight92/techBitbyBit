import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'
import { type NextRequest, NextResponse } from 'next/server'
import { currentUser, User } from '@clerk/nextjs/server'

const MAX_LIKE_TOGGLES = 3

const redis = Redis.fromEnv()

const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(10, '10 s'),
  analytics: true,
  prefix: '@upstash/ratelimit',
})

const verifyUser = async (): Promise<User> => {
  const user = await currentUser()
  if (!user) {
    throw new Error('Not Signed in')
  }

  if (user.banned) {
    throw new Error('User is banned')
  }
  return user
}

const checkRateLimit = async (userId: string): Promise<void | NextResponse<unknown>> => {
  const { success } = await ratelimit.limit(userId)
  if (!success) {
    return new NextResponse('Too many requests', { status: 429 })
  }
}

const updateRedis = async (
  userId: string,
  slug: string
): Promise<
  | number
  | NextResponse<{
      error: string
    }>
> => {
  const userLikesKey = `user:likes:${userId}`
  const toggleCountKey = `like:toggles:${userId}:${slug}`
  const articleLikesKey = `likes:${slug}`

  const toggles = (await redis.get<number>(toggleCountKey)) || 0
  if (Number(toggles) >= MAX_LIKE_TOGGLES) {
    return NextResponse.json(
      { error: 'User implemented too many toggles for the like button for this article' },
      { status: 403 }
    )
  }

  const hasLiked = await redis.sismember(userLikesKey, slug)

  let newLikes: number

  if (hasLiked) {
    newLikes = await redis.decr(articleLikesKey)
    await redis.srem(userLikesKey, slug)
  } else {
    newLikes = await redis.incr(articleLikesKey)
    await redis.sadd(userLikesKey, slug)
  }
  await redis.incr(toggleCountKey)

  return newLikes
}

// Http handlers

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  try {
    const { id: userId } = await verifyUser()
    await checkRateLimit(userId)
    const likes = await redis.get<number>(`likes:${slug}`)
    return NextResponse.json({ slug, likes: likes || 0 })
  } catch (error) {
    console.error('redis GET Error:', error)
    return NextResponse.json({ slug, likes: 0, error: 'Failed to fetch likes' }, { status: 500 })
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  try {
    const { id: userId } = await verifyUser()
    await checkRateLimit(userId)

    const newLikes = await updateRedis(userId, slug)

    return NextResponse.json({ slug, likes: newLikes })
  } catch (error) {
    console.error('redis INCR Error:', error)
    const currentLikes = await redis.get<number>(`likes:${slug}`)
    return NextResponse.json(
      { slug, likes: currentLikes || 'error', error: 'Failed to increment likes' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  try {
    const { id: userId } = await verifyUser()
    await checkRateLimit(userId)
    const newLikes = await updateRedis(userId, slug)
    if (typeof newLikes === 'number') {
      return NextResponse.json({ slug, likes: Math.max(0, newLikes) })
    }
  } catch (error) {
    console.error('redis DEL Error:', error)
    const currentLikes = await redis.get<number>(`likes:${slug}`)
    return NextResponse.json(
      { slug, likes: currentLikes || 'error', error: 'Failed to decrement likes' },
      { status: 500 }
    )
  }
}
