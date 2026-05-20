import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("next/headers", () => ({ headers: async () => new Map([["x-forwarded-for", "1.1.1.1"]]) as never }));
vi.mock("@vercel/kv", () => ({ kv: { incr: vi.fn(async () => 1), expire: vi.fn(async () => 1) } }));
vi.mock("resend", () => ({
  Resend: vi.fn(function (this: { emails: { send: ReturnType<typeof vi.fn> } }) {
    this.emails = { send: vi.fn(async () => ({ error: null })) };
  }),
}));

describe("sendContact", () => {
  beforeEach(() => {
    process.env.RESEND_API_KEY = "test";
    process.env.CONTACT_TO_EMAIL = "to@example.com";
    process.env.CONTACT_FROM_EMAIL = "from@example.com";
  });

  it("rejects invalid input", async () => {
    const { sendContact } = await import("@/lib/contact");
    const fd = new FormData();
    fd.set("name", "");
    fd.set("email", "nope");
    fd.set("message", "x");
    fd.set("website", "");
    const res = await sendContact(fd);
    expect(res.ok).toBe(false);
  });

  it("rejects when honeypot filled", async () => {
    const { sendContact } = await import("@/lib/contact");
    const fd = new FormData();
    fd.set("name", "Vinod");
    fd.set("email", "v@example.com");
    fd.set("message", "Hello there I have a project for you.");
    fd.set("website", "spam");
    const res = await sendContact(fd);
    expect(res.ok).toBe(false);
  });

  it("accepts valid input", async () => {
    const { sendContact } = await import("@/lib/contact");
    const fd = new FormData();
    fd.set("name", "Vinod");
    fd.set("email", "v@example.com");
    fd.set("message", "Hello there I have a project for you.");
    fd.set("website", "");
    const res = await sendContact(fd);
    expect(res.ok).toBe(true);
  });
});
