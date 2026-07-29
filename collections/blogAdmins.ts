import type { CollectionConfig } from "payload";

export const Admins: CollectionConfig = {
  slug: "admins",
  admin: {
    useAsTitle: "username", // <--- THIS controls what appears in dropdowns across Payload
    hidden: true,
  },
  fields: [
    {
      name: "username",
      type: "text",
    },
    {
      name: "email",
      type: "email",
      required: true,
      // unique: true,
    },
    {
      name: "avatar",
      type: "upload",
      relationTo: "media",
    },
  ],
  auth: {
    tokenExpiration: 7200, // How many seconds to keep the user logged in
    verify: true, // Require email verification before being allowed to authenticate
    maxLoginAttempts: 5, // Automatically lock a user out after X amount of failed logins
    lockTime: 600 * 1000, // Time period to allow the max login attempts
    // More options are available
  },
};
