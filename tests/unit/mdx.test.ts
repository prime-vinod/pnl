import { describe, it, expect } from "vitest";
import { getAllWork, getAllPosts } from "@/lib/mdx";

describe("mdx loader", () => {
  it("loads work entries sorted by order then year desc", async () => {
    const work = await getAllWork();
    expect(work.length).toBeGreaterThanOrEqual(2);
    expect(work[0]?.slug).toBe("sportsgrid-web");
  });

  it("loads posts sorted by date desc", async () => {
    const posts = await getAllPosts();
    expect(posts[0]?.slug).toBe("figma-to-react");
  });
});
