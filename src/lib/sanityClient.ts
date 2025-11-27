import { createClient } from "@sanity/client";

export const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: "blogsanity",
  apiVersion: "2025-10-05",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN, // must have write access
});
