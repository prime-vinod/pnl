"use server";
import { z } from "zod";
import { Resend } from "resend";
import { headers } from "next/headers";
import { checkRateLimit } from "./rate-limit";
import ContactMessage from "@/emails/contact-message";

const Input = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email().max(200),
  message: z.string().min(10).max(4000),
  website: z.string().max(0),
});

export type ContactResult = { ok: true } | { ok: false; error: string };

export async function sendContact(formData: FormData): Promise<ContactResult> {
  const parsed = Input.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
    website: formData.get("website") ?? "",
  });
  if (!parsed.success) return { ok: false, error: "Please check the form and try again." };

  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() ?? "anon";
  const allowed = await checkRateLimit(ip);
  if (!allowed) return { ok: false, error: "Rate limit exceeded. Try again later." };

  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  const apiKey = process.env.RESEND_API_KEY;
  if (!to || !from || !apiKey) return { ok: false, error: "Contact temporarily unavailable. Please email directly." };

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: parsed.data.email,
    subject: `Portfolio inquiry — ${parsed.data.name}`,
    react: ContactMessage(parsed.data),
  });
  if (error) return { ok: false, error: "Send failed. Please email directly." };
  return { ok: true };
}
