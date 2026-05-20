import { kv } from "@vercel/kv";

export async function bumpView(kind: "work" | "post", slug: string): Promise<number> {
  if (!process.env.KV_REST_API_URL) return 0;
  const key = `views:${kind}:${slug}`;
  return await kv.incr(key);
}
