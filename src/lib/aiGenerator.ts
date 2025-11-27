// export async function generateBlogSuggestions(prompt: string) {
//   const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY; // store in .env
//   if (!apiKey) throw new Error("Gemini API key missing!");

//   const response = await fetch(
//     `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
//     {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         contents: [
//           {
//             parts: [
//               {
//                 text: `Suggest 5 trending blog topics related to: "${prompt}". Return only the titles, one per line.`,
//               },
//             ],
//           },
//         ],
//       }),
//     }
//   );

//   const data = await response.json();

//   if (!response.ok) {
//     console.error("Gemini Error:", data);
//     throw new Error(data.error?.message || "Gemini request failed");
//   }

//   const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
//   return text
//     .split("\n")
//     .map((line: string) => line.trim())
//     .filter(Boolean);
// }

// // utils/cleanGeminiText.ts

// export function cleanGeminiText(text: string): string {
//   if (!text) return "";

//   return text
//     // Remove markdown and heading symbols
//     .replace(/\*\*/g, "")                // remove bold **
//     .replace(/\*/g, "")                  // remove stray asterisks
//     .replace(/#{1,6}\s*/g, "")           // remove markdown headings like #, ## etc.
//     .replace(/\bH[1-6]:\s*/g, "")        // remove "H1:", "H2:", etc.
//     .replace(/\n{3,}/g, "\n\n")          // normalize multiple newlines
//     .replace(/\s{2,}/g, " ")             // remove double spaces
//     .replace(/\s*-\s*/g, " - ")          // normalize bullet spacing
//     .replace(/\n\s*\n/g, "\n\n")         // normalize paragraph breaks
//     .replace(/SEO Keywords:.*/gi, "")    // remove SEO keyword sections
//     .replace(/\n{2,}/g, "\n\n")          // tidy extra newlines again
//     .trim();
// }


// export async function generateFullBlog(title: string) {
//   const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
//   if (!apiKey) throw new Error("Gemini API key missing!");

//   const response = await fetch(
//     `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
//     {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         contents: [
//           {
//             parts: [
//               {
//                 text: `Write a full SEO-optimized blog article titled: "${title}" with introduction, headings, and conclusion.`,
//               },
//             ],
//           },
//         ],
//       }),
//     }
//   );

//   const data = await response.json();

//   if (!response.ok) {
//     console.error("Gemini Error:", data);
//     throw new Error(data.error?.message || "Gemini request failed");
//   }

//   const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
//   const cleanedText = cleanGeminiText(rawText);

//   return cleanedText;
// }
// lib/aiGenerator.ts
export async function generateBlogSuggestions(prompt: string): Promise<string[]> {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  if (!apiKey) throw new Error("Gemini API key missing!");

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `Suggest 5 trending blog titles related to: "${prompt}". 
Return only the titles — one per line, no numbering or symbols.`,
              },
            ],
          },
        ],
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    console.error("Gemini API Error:", data);
    throw new Error(data.error?.message || "Gemini request failed");
  }

  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
  return text
    .split("\n")
    .map((line: string) => line.trim())
    .filter(Boolean);
}

// 🧠 Helper: Clean and structure blog content
function cleanAndStructureBlog(text: string): string {
  return text
    .replace(/\*\*/g, "") // remove bold **text**
    .replace(/#{1,6}\s*/g, "") // remove markdown headings #
    .replace(/\*/g, "") // remove stray *
    .replace(/`/g, "") // remove code ticks
    .replace(/>\s*/g, "") // remove blockquotes
    .replace(/\n{3,}/g, "\n\n") // normalize line breaks
    .replace(/\s{2,}/g, " ") // clean spaces
    .trim();
}

export async function generateFullBlog(title: string): Promise<string> {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  if (!apiKey) throw new Error("Gemini API key missing!");

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `
Write a complete, professional, SEO-optimized blog article titled "${title}".
The blog must:
- Begin with a strong introduction
- Use clear section headings
- Have smooth, readable paragraphs
- End with a short conclusion
- Avoid markdown formatting or symbols
- Use natural human tone suitable for publication

Format as plain text with line breaks between sections.
                `,
              },
            ],
          },
        ],
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    console.error("Gemini API Error:", data);
    throw new Error(data.error?.message || "Gemini request failed");
  }

  const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
  const cleaned = cleanAndStructureBlog(rawText);

  // Ensure it looks like a real blog
  const formatted = cleaned
    .split("\n\n")
    .map((para) => para.trim())
    .filter(Boolean)
    .join("\n\n");

  return formatted;
}
