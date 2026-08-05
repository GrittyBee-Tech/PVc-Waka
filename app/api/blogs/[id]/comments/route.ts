// app/api/blogs/[id]/comments/route.ts
import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: postId } = await params
    const body = await req.json()
    const { authorName, content, honeypot } = body

    // 1. Honeypot check: If hidden field is filled, silently drop or mark as spam
    if (honeypot) {
      return NextResponse.json(
        { message: 'Comment submitted for moderation.' },
        { status: 201 }
      )
    }

    // 2. Validate input fields
    if (!authorName?.trim() || !content?.trim()) {
      return NextResponse.json(
        { error: 'All fields are required.' },
        { status: 400 }
      )
    }

    const payload = await getPayload({ config })

    // 3. Verify post exists
    const post = await payload.findByID({ collection: 'posts', id: postId })
    if (!post) {
      return NextResponse.json({ error: 'Post not found.' }, { status: 404 })
    }

    // 4. Create the comment using Local API (bypasses default collection access rules)
    const newComment = await payload.create({
      collection: 'comments',
      data: {
        post: postId,
        authorName: authorName.trim(),
        // authorEmail: authorEmail.trim().toLowerCase(),
        content: content.trim(),
        status: 'pending', // Auto-flag for review, or set to 'approved' if you trust the submission
      },
    })

    return NextResponse.json(
      {
        message: 'Comment submitted successfully and is awaiting moderation.',
        commentId: newComment.id,
      },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to submit comment.' },
      { status: 500 }
    )
  }
}