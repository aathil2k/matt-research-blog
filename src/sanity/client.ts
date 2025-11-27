
// import { createClient } from '@sanity/client'
// import imageUrlBuilder from '@sanity/image-url'

// // ✅ Sanity client setup
// export const sanityClient = createClient({
//   projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
//   dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
//   apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION!,
//   useCdn: process.env.SANITY_USE_CDN === 'true', // Use CDN only for public reads
//   token: process.env.SANITY_API_TOKEN, // Optional — only if you want to write/update posts
// })

// // ✅ Image builder helper
// const builder = imageUrlBuilder(sanityClient)
// export const urlFor = (source: any) => builder.image(source)

// // ✅ Test connection function
// export const testSanityConnection = async () => {
//   try {
//     const data = await sanityClient.fetch('count(*)')
//     console.log('✅ Sanity client connection successful! Documents:', data)
//     return data
//   } catch (error) {
//     console.error('❌ Sanity client connection failed:', error)
//     return null
//   }
// }
import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// Set a default API version so Vercel NEVER breaks
const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-10-05"

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion,              // <-- FIXED
  useCdn: process.env.SANITY_USE_CDN === 'true',
  token: process.env.SANITY_API_TOKEN,
})

// Image builder helper
const builder = imageUrlBuilder(sanityClient)
export const urlFor = (source: any) => builder.image(source)

// Test connection
export const testSanityConnection = async () => {
  try {
    const data = await sanityClient.fetch('count(*)')
    console.log('✅ Sanity client connected! Documents:', data)
    return data
  } catch (error) {
    console.error('❌ Sanity client connection failed:', error)
    return null
  }
}
