"use client";

import { useState, useEffect } from "react";

type LikeButtonProps = {
  postId: string;
  initialLikes: number;
};

export function LikeButton({ postId, initialLikes }: LikeButtonProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [hasLiked, setHasLiked] = useState(false);
  const [loading, setLoading] = useState(false);

  // Check localStorage on render to see if user already liked this post
  useEffect(() => {
    const likedPosts = JSON.parse(localStorage.getItem("liked_posts") || "[]");
    if (likedPosts.includes(postId)) {
      setHasLiked(true);
    }
  }, [postId]);

  const handleLike = async () => {
    if (hasLiked || loading) return;

    setLoading(true);

    // Optimistic UI update (update button immediately before network response)
    setLikes((prev) => prev + 1);
    setHasLiked(true);

    try {
      const res = await fetch(`/api/blogs/${postId}/like`, { method: "POST" });
      const data = await res.json();

      if (res.ok) {
        setLikes(data.likes);
        // Store liked state locally
        const likedPosts = JSON.parse(
          localStorage.getItem("liked_posts") || "[]",
        );
        localStorage.setItem(
          "liked_posts",
          JSON.stringify([...likedPosts, postId]),
        );
      } else {
        // Revert on API error
        setLikes((prev) => prev - 1);
        setHasLiked(false);
      }
    } catch {
      setLikes((prev) => prev - 1);
      setHasLiked(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLike}
      disabled={hasLiked || loading}
      className={`px-4 py-2 rounded-full border transition-all ${
        hasLiked
          ? "bg-red-500/10 text-red-500 border-red-500"
          : "hover:border-red-500 hover:text-red-500"
      }`}
    >
      ❤️ {likes} {hasLiked ? "Liked" : "Like"}
    </button>
  );
}
