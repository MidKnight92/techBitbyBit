import { kv } from '@vercel/kv'
import { type NextRequest, NextResponse } from 'next/server'
import { currentUser } from '@clerk/nextjs/server'

const verifyUser = async () => {
  const user = await currentUser()
  if (!user){
    throw new Error('Not Signed in')
  }

  if (user.banned){
    throw new Error('User is banned')
  }
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  try {
    await verifyUser()
    const likes = await kv.get<number>(`likes:${slug}`)
    return NextResponse.json({ slug, likes: likes || 0 })
  } catch (error) {
    console.error('KV GET Error:', error)
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
    const newLikes = await kv.incr(`likes:${slug}`)
    return NextResponse.json({ slug, likes: newLikes })
  } catch (error) {
    console.error('KV INCR Error:', error)
    const currentLikes = await kv.get<number>(`likes:${slug}`)
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
    const newLikes = await kv.decr(`likes:${slug}`)
    return NextResponse.json({ slug, likes: Math.max(0, newLikes) })
  } catch (error) {
    console.error('KV DEL Error:', error)
    const currentLikes = await kv.get<number>(`likes:${slug}`)
    return NextResponse.json(
      { slug, likes: currentLikes || 'error', error: 'Failed to decrement likes' },
      { status: 500 }
    )
  }
}
