import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import { Admins } from "./collections/blogAdmins";
import { Media } from "./collections/media";
import { Posts } from "./collections/blogs";
import { Comments } from "./collections/comments";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  collections: [Admins, Media, Posts, Comments],
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
