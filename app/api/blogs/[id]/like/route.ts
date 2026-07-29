// app/api/posts/[id]/like/route.ts
import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const payload = await getPayload({ config });

    // 1. Fetch current post
    const post = await payload.findByID({
      collection: "posts",
      id,
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
    console.log("Post", post);

    // 2. Increment current like count safely
    const currentLikes = post.likes || 0;
    const updatedPost = await payload.update({
      collection: "posts",
      id,
      data: {
        likes: currentLikes + 1,
      },
    });

    return NextResponse.json({ likes: updatedPost.likes });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to process like" },
      { status: 500 },
    );
  }
}
