import { NextResponse } from "next/server";
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2025-01-01",
  token: process.env.SANITY_API_TOKEN!,   // MUST have write/delete permission
  useCdn: false,
});

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Blog ID is missing" },
        { status: 400 }
      );
    }

    const result = await client.delete(id);

    return NextResponse.json({ success: true, result });
  } catch (error: any) {
    console.error("SANITY DELETE ERROR:", error.message);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
