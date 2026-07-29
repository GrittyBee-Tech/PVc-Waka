import { CollectionConfig } from "payload";
import path from "path";
import { fileURLToPath } from "url";
// import {} from '../p'

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export const Media: CollectionConfig = {
  slug: "media",
  access: {
    read: () => true, // Allows anyone to read/view images
  },
  upload: {
    staticDir: path.resolve(dirname, "../public/media"),
    adminThumbnail: "thumbnail",
    imageSizes: [
      {
        name: "card",
        width: 600,
        height: 400,
        position: "centre",
      },
      {
        name: "tablet",
        width: 1024,
        // height omitted: preserves original aspect ratio
      },
    ],
    mimeTypes: ["image/*"], // restricts uploads to images
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
    },
  ],
};
