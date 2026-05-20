"use client";
import { useState, useTransition } from "react";
import { sendContact, type ContactResult } from "@/lib/contact";
import { Button } from "@/components/ui/button";

export function ContactForm() {
  const [state, setState] = useState<ContactResult | null>(null);
  const [pending, start] = useTransition();
  return (
    <form
      id="contact"
      action={(fd) => start(async () => setState(await sendContact(fd)))}
      className="space-y-4"
      noValidate
    >
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <div>
        <label htmlFor="name" className="block font-mono text-xs uppercase tracking-widest text-ink-dim">Name</label>
        <input id="name" name="name" required className="mt-1 w-full border-b border-line bg-transparent py-2 focus:border-accent focus:outline-none" />
      </div>
      <div>
        <label htmlFor="email" className="block font-mono text-xs uppercase tracking-widest text-ink-dim">Email</label>
        <input id="email" name="email" type="email" required className="mt-1 w-full border-b border-line bg-transparent py-2 focus:border-accent focus:outline-none" />
      </div>
      <div>
        <label htmlFor="message" className="block font-mono text-xs uppercase tracking-widest text-ink-dim">Message</label>
        <textarea id="message" name="message" required rows={5} className="mt-1 w-full border-b border-line bg-transparent py-2 focus:border-accent focus:outline-none" />
      </div>
      <Button type="submit" disabled={pending}>{pending ? "Sending…" : "Send"}</Button>
      <div aria-live="polite" role="status" className="font-mono text-xs">
        {state?.ok === true && <p className="text-accent">Message sent. Thanks.</p>}
        {state?.ok === false && <p className="text-red-400">{state.error} <a className="underline" href="mailto:hi@example.com">Email directly</a>.</p>}
      </div>
    </form>
  );
}
