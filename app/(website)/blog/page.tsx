// app/blog/page.tsx
import Link from "next/link";
import Image from "next/image";
import { getPayload } from "payload";
import config from "@payload-config";

export default async function BlogIndex() {
  const payload = await getPayload({ config });

  const { docs: posts } = await payload.find({
    collection: "posts",
    where: {
      publishedAt: { exists: true },
    },
    depth: 1, // Populates media objects
  });

  return (
    <main className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8">Blog</h1>
      <div className="grid gap-6 md:grid-cols-2">
        {posts.map((post) => {
          const image =
            typeof post.featuredImage === "object" ? post.featuredImage : null;
          const thumbnailUrl = image?.sizes?.thumbnail?.url || image?.url;

          return (
            <article
              key={post.id}
              className="border rounded-lg overflow-hidden shadow-sm relative"
            >
              {thumbnailUrl && (
                <Link href={`/blog/${post.slug}`}>
                  <Image
                    src={thumbnailUrl}
                    alt={image?.alt || post.title}
                    width={600}
                    height={400}
                    className="w-full h-48 object-cover"
                    loading="eager"
                  />
                </Link>
              )}
              <div className="absolute top-2 right-2 bg-white/40 rounded-full p-1">
                ❤️{" "}
                <span className="text-sm font-semibold">{post.likes || 0}</span>{" "}
                {/* ❤️ */}
              </div>

              <div className="p-4">
                <h2 className="text-xl font-semibold hover:underline">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>
              </div>
            </article>
          );
        })}
      </div>
    </main>
  );
}
