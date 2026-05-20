import { describe, it, expect } from "vitest";
import { cn } from "@/lib/cn";

describe("cn", () => {
  it("merges and dedupes tailwind classes", () => {
    expect(cn("p-2", "p-4")).toBe("p-4");
  });
  it("filters falsy", () => {
    expect(cn("a", false && "b", null, "c")).toBe("a c");
  });
});
