import { promises as fs } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";

const WorkFrontmatter = z.object({
  title: z.string(),
  client: z.string(),
  year: z.number().int(),
  role: z.string(),
  tags: z.array(z.string()),
  cover: z.string(),
  featured: z.boolean().default(false),
  order: z.number().int().default(0),
});

const WritingFrontmatter = z.object({
  title: z.string(),
  date: z.string(),
  tags: z.array(z.string()),
  description: z.string(),
});

export type Work = z.infer<typeof WorkFrontmatter> & { slug: string; body: string };
export type Post = z.infer<typeof WritingFrontmatter> & { slug: string; body: string };

const ROOT = path.join(process.cwd(), "content");

async function readDir(dir: string) {
  const full = path.join(ROOT, dir);
  const entries = await fs.readdir(full).catch(() => []);
  return entries.filter((f) => f.endsWith(".mdx"));
}

export async function getAllWork(): Promise<Work[]> {
  const files = await readDir("work");
  const items = await Promise.all(files.map(async (file) => {
    const raw = await fs.readFile(path.join(ROOT, "work", file), "utf8");
    const { data, content } = matter(raw);
    const parsed = WorkFrontmatter.parse(data);
    return { ...parsed, slug: file.replace(/\.mdx$/, ""), body: content };
  }));
  return items.sort((a, b) => a.order - b.order || b.year - a.year);
}

export async function getWork(slug: string): Promise<Work | null> {
  const all = await getAllWork();
  return all.find((w) => w.slug === slug) ?? null;
}

export async function getAllPosts(): Promise<Post[]> {
  const files = await readDir("writing");
  const items = await Promise.all(files.map(async (file) => {
    const raw = await fs.readFile(path.join(ROOT, "writing", file), "utf8");
    const { data, content } = matter(raw);
    const parsed = WritingFrontmatter.parse(data);
    return { ...parsed, slug: file.replace(/\.mdx$/, ""), body: content };
  }));
  return items.sort((a, b) => b.date.localeCompare(a.date));
}

export async function getPost(slug: string): Promise<Post | null> {
  const all = await getAllPosts();
  return all.find((p) => p.slug === slug) ?? null;
}
