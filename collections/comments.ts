// models/comments.ts
import { CollectionConfig } from 'payload'

export const Comments: CollectionConfig = {
  slug: 'comments',
  // Keep admin access restricted so admins can moderate comments
  access: {
    read: () => true, // Publicly readable
    create: () => false, // Block direct public API writes; enforce going through our Next.js API route
  },
  admin: {
    useAsTitle: 'authorName',
    defaultColumns: ['authorName', 'content', 'post', 'status', 'createdAt'],
  },
  fields: [
    {
      name: 'post',
      type: 'relationship',
      relationTo: 'posts',
      required: true,
      index: true, // Speeds up fetching comments for a specific post
    },
    {
      name: 'authorName',
      type: 'text',
      required: true,
    },
    // {
    //   name: 'authorEmail',
    //   type: 'email',
    //   required: true,
    //   admin: {
    //     description: 'Hidden from public view; used for spam checks / Gravatar.',
    //   },
    // },
    {
      name: 'content',
      type: 'textarea',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'pending', // Require manual admin approval, or auto-approve after spam checks
      options: [
        { label: 'Pending Approval', value: 'pending' },
        { label: 'Approved', value: 'approved' },
        { label: 'Spam', value: 'spam' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
  ],
}