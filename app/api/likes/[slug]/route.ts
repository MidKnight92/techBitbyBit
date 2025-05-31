import { Redis } from '@upstash/redis';
import { type NextRequest, NextResponse } from 'next/server'
import { currentUser } from '@clerk/nextjs/server'

const redis = Redis.fromEnv();

const verifyUser = async () => {
  const user = await currentUser()
  if (!user) {
    throw new Error('Not Signed in')
  }

  if (user.banned) {
    throw new Error('User is banned')
  }
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  try {
    await verifyUser()
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
    await verifyUser()
    const newLikes = await redis.incr(`likes:${slug}`)
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
    await verifyUser()
    const newLikes = await redis.decr(`likes:${slug}`)
    return NextResponse.json({ slug, likes: Math.max(0, newLikes) })
  } catch (error) {
    console.error('redis DEL Error:', error)
    const currentLikes = await redis.get<number>(`likes:${slug}`)
    return NextResponse.json(
      { slug, likes: currentLikes || 'error', error: 'Failed to decrement likes' },
      { status: 500 }
    )
  }
}
