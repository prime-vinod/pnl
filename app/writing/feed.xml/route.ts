import { getAllPosts } from "@/lib/mdx";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

export async function GET() {
  const posts = await getAllPosts();
  const items = posts
    .map(
      (p) => `
    <item>
      <title><![CDATA[${p.title}]]></title>
      <link>${BASE}/writing/${p.slug}</link>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
      <description><![CDATA[${p.description}]]></description>
    </item>`,
    )
    .join("");
  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0"><channel>
    <title>Vinod Suthar — Writing</title>
    <link>${BASE}/writing</link>
    <description>Writing by Vinod Suthar</description>
    ${items}
  </channel></rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/xml" } });
}
