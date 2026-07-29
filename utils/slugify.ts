// utils/slugify.ts
export const slugify = (val: string): string =>
  val
    ? val
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '')
    : ''