import { kv } from "@vercel/kv";

export async function checkRateLimit(ip: string, max = 5, windowSec = 3600): Promise<boolean> {
  if (!process.env.KV_REST_API_URL) return true;
  const key = `rl:contact:${ip}`;
  const count = await kv.incr(key);
  if (count === 1) await kv.expire(key, windowSec);
  return count <= max;
}
