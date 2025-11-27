// import { createClient } from 'next-sanity'

// import { apiVersion, dataset, projectId,token } from '../env'
  
// export const client = createClient({
//   projectId,
//     token ,
//    dataset,
//   apiVersion,
//   useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
// })
// /sanity/client.ts
import { createClient } from "next-sanity"
import { apiVersion, dataset, projectId, token } from "../env"

// ✅ for public reading
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
})

// ✅ for admin writing (secured server-side)
export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  token, // uses private env var
  useCdn: false,
})
