import type { MetadataRoute } from "next";
import { getAllWork, getAllPosts } from "@/lib/mdx";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const work = await getAllWork();
  const posts = await getAllPosts();
  const now = new Date();
  return [
    { url: `${BASE}/`, lastModified: now },
    { url: `${BASE}/work`, lastModified: now },
    { url: `${BASE}/writing`, lastModified: now },
    { url: `${BASE}/about`, lastModified: now },
    ...work.map((w) => ({ url: `${BASE}/work/${w.slug}`, lastModified: now })),
    ...posts.map((p) => ({ url: `${BASE}/writing/${p.slug}`, lastModified: new Date(p.date) })),
  ];
}
