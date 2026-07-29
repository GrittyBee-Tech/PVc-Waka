import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import { Admins } from "./collections/blogAdmins";
import { Media } from "./collections/media";
import { Posts } from "./collections/blogs";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  collections: [
    Admins,
    Media,
    Posts
    // {
    //   slug: "posts",
    //   admin: {
    //     useAsTitle: "title",
    //   },
    //   fields: [
    //     { name: "title", type: "text", required: true },
    //     {
    //       name: "slug",
    //       type: "text",
    //       required: true,
    //       unique: true,
    //       admin: {
    //         position: "sidebar",
    //         description: "URL-friendly version of the title. Must be unique.",
    //       },
    //       hooks: {
    //         beforeValidate: [
    //           ({ value, siblingData }) => {
    //             // If a custom slug was typed, slugify it.
    //             // Otherwise, fallback to slugifying the post title.
    //             if (value) return slugify(value);
    //             if (siblingData?.title) return slugify(siblingData.title);
    //             return value;
    //           },
    //         ],
    //       },
    //     },
    //     {
    //       name: "featuredImage",
    //       type: "upload",
    //       relationTo: "media", // maps to the media collection slug
    //       required: false,
    //     },
    //     { name: "content", type: "richText", required: true },
    //     {
    //       name: "publishedAt",
    //       type: "date",
    //       defaultValue: new Date().toISOString(),
    //     },
    //     {
    //       name: "author",
    //       type: "relationship",
    //       relationTo: "admins",
    //       required: true,
    //       defaultValue: ({ user }) => user?.username,
    //     },
    //   ],
    // },
  ],
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || "",
  // MongoDB Adapter Configuration
  db: mongooseAdapter({
    url: process.env.MONGODB_URI || "",
  }),
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
});
