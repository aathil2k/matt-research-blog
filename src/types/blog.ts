// // src/types/blog.ts
// export interface BlogPost {
//   _id: string
//   title: string
//   slug: {
//     current: string
//   }
//   excerpt?: string
//   mainImage?: {
//     asset?: {
//       _ref?: string
//       url?: string
//       _type?: string
//     }
//   }
//   publishedAt: string
//   author?: {
//     name: string
//     image?: any
//   }
//   categories?: Array<{
//     title: string
//   }>
// }
// src/types/blog.ts
export interface BlogPost {
  _id: string
  title: string
  slug: {
    current: string
  }
  mainImage?: {
    asset?: {
      _ref?: string
      url?: string
    }
  }
  publishedAt: string
  body?: any[]
  categories?: Array<{
    title: string
  }>
  author?: {
    name: string
    image?: any
  }
}