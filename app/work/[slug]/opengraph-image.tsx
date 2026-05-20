import { brandedOG } from "@/lib/seo";
import { getWork } from "@/lib/mdx";

// nodejs runtime required because getWork() reads MDX from disk via node:fs.
export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function og({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const w = await getWork(slug);
  return brandedOG(w?.title ?? "Case Study");
}
