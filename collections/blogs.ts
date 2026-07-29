import { slugify } from "@/utils/slugify";
import type { CollectionConfig } from "payload";

export const Posts: CollectionConfig = {
  slug: "posts",
  admin: {
    useAsTitle: "title",
  },
  fields: [
    { name: "title", type: "text", required: true },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      admin: {
        position: "sidebar",
        description: "URL-friendly version of the title. Must be unique.",
      },
      hooks: {
        beforeValidate: [
          ({ value, siblingData }) => {
            // If a custom slug was typed, slugify it.
            // Otherwise, fallback to slugifying the post title.
            if (value) return slugify(value);
            if (siblingData?.title) return slugify(siblingData.title);
            return value;
          },
        ],
      },
    },
    {
      name: "featuredImage",
      type: "upload",
      relationTo: "media", // maps to the media collection slug
      required: false,
    },
    { name: "content", type: "richText", required: true },
    {
      name: "publishedAt",
      type: "date",
      defaultValue: new Date().toISOString(),
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "author",
      type: "relationship",
      relationTo: "admins",
      required: true,
      admin: {
        position: "sidebar",
      },
      defaultValue: ({ user }) => user?.id,
    },
    {
      name: "likes",
      type: "number",
      defaultValue: 0,
      admin: {
        position: "sidebar",
        readOnly: true, // Prevents manual override in CMS form
      },
    },
  ],
};
