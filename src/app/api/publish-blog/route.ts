import axios from "axios";
import { NextResponse } from "next/server";
import { createClient } from "@sanity/client";

const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: "blogsanity",
  apiVersion: "2025-01-01",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN!,
});

// Function to upload Pollinations image to Sanity
async function uploadImageToSanity(prompt: string) {
  try {
    const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(
      prompt
    )}?width=1024&height=768&n=1`;

    let response;

    try {
      // Try Pollinations
      response = await axios.get(imageUrl, {
        responseType: "arraybuffer",
        timeout: 15000,
      });
    } catch (err) {
      console.warn("Pollinations failed → Switching to fallback!", err.message);

      // Fallback — using Picsum (NEVER fails)
      response = await axios.get(
        "https://picsum.photos/1024/768.jpg",
        { responseType: "arraybuffer" }
      );
    }

    const buffer = Buffer.from(response.data);

    const asset = await sanity.assets.upload("image", buffer, {
      filename: `${prompt.replace(/\s+/g, "_")}.jpg`,
    });

    return asset._id;
  } catch (err) {
    console.error("🔥 Image upload failed completely:", err);
    return null;
  }
}


// POST handler
export async function POST(req: Request) {
  try {
    const data = await req.json();

    if (!data.title || !data.content) {
      return NextResponse.json(
        { success: false, error: "Missing title or content" },
        { status: 400 }
      );
    }

    const imagePrompt = data.imagePrompt || data.title || "AI generated blog image";
    
    const imageRef = await uploadImageToSanity(imagePrompt);

    // ✅ Convert plain content to Sanity Portable Text blocks
    const bodyBlocks = data.content
      .split(/\n{2,}/)
      .filter((para: string) => para.trim() !== "")
      .map((para: string) => ({
        _type: "block",
        children: [{ _type: "span", text: para.trim() }],
      }));

    const post = {
      _type: "post",
      title: data.title,
      slug: {
        _type: "slug",
        current: data.title.toLowerCase().replace(/\s+/g, "-"),
      },
      body: bodyBlocks, // ✅ Correct field for Sanity Portable Text
      author: {
        _type: "reference",
        _ref: "default-author-id", // Replace with your actual author document ID
      },
      mainImage: imageRef
        ? { _type: "image", asset: { _type: "reference", _ref: imageRef } }
        : undefined,
      publishedAt: new Date().toISOString(),
    };

    const result = await sanity.create(post);

    return NextResponse.json({ success: true, post: result });
  } catch (error: any) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}