// app/blog/[slug]/page.tsx
import { notFound } from "next/navigation";
import Image from "next/image";
import { getPayload } from "payload";
import config from "@payload-config";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { LikeButton } from "@/components/ui/LikeButton";

type Args = {
  params: Promise<{ slug: string }>;
};

export default async function BlogPostPage({ params }: Args) {
  const { slug } = await params;
  const payload = await getPayload({ config });

  // 1. Fetch post matching slug
  const { docs } = await payload.find({
    collection: "posts",
    where: {
      slug: { equals: slug },
    },
    depth: 1,
  });

  const post = docs[0];
  console.log(post.content);

  // 2. Return 404 if post doesn't exist
  if (!post) {
    notFound();
  }

  const image =
    typeof post.featuredImage === "object" ? post.featuredImage : null;

  return (
    <article className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-extrabold tracking-tight mb-4">
        {post.title}
      </h1>

      {post.publishedAt && (
        <p className="text-sm text-gray-500 mb-8">
          Published on {new Date(post.publishedAt).toLocaleDateString()}
        </p>
      )}

      {image?.url && (
        <div className="mb-8 overflow-hidden rounded-lg">
          <Image
            src={image.url}
            alt={image.alt || post.title}
            width={1200}
            height={630}
            priority
            className="w-full h-auto object-cover"
          />
        </div>
      )}

      {/* 3. Render Rich Text Content */}
      <div className="prose lg:prose-xl max-w-none">
        <RichText data={post.content} />
      </div>

      <div className="mt-8 pt-4 border-t flex items-center justify-between">
        <LikeButton postId={String(post.id)} initialLikes={post.likes || 0} />
      </div>
    </article>
  );
}
