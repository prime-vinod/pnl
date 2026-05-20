import { ContactForm } from "@/components/sections/contact-form";
import { JsonLd } from "@/components/ui/json-ld";

export const metadata = { title: "About" };

export default function AboutPage() {
  return (
    <article className="mx-auto max-w-3xl px-[5vw] pt-[18vh] pb-[12vh]">
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Pinal Patel",
        jobTitle: "Frontend Developer",
        email: "pinalhpatel306@gmail.com",
        address: "Ahmedabad, Gujarat, India",
        worksFor: { "@type": "Organization", name: "PrimeApps Infotech" },
        url: process.env.NEXT_PUBLIC_SITE_URL,
      }} />
      <h1 className="font-display text-[clamp(48px,9vw,140px)] font-black leading-[0.9] tracking-tight">About.</h1>
      <section className="mt-12 space-y-6 text-lg text-ink">
        <p>I&apos;m Pinal Patel, a web designer and frontend developer based in Ahmedabad, India, with over 4 years of experience building user-friendly websites and mobile apps.</p>
        <p>I&apos;m proficient in HTML, CSS, JavaScript, React.js, Next.js, and React Native, with a strong focus on responsive, pixel-perfect design. I&apos;ve shipped diverse projects — from live sports platforms to OTT streaming — consistently delivering quality solutions aligned with client expectations.</p>
      </section>

      <section className="mt-16">
        <h2 className="font-mono text-xs uppercase tracking-widest text-ink-dim">Now</h2>
        <p className="mt-3 text-lg">Frontend Web Developer at PrimeApps Infotech since 2022 — building and maintaining production web and mobile interfaces.</p>
      </section>

      <section className="mt-16">
        <h2 className="font-mono text-xs uppercase tracking-widest text-ink-dim">Skills &amp; Tools</h2>
        <p className="mt-3 text-lg">HTML5 · CSS3 · JavaScript (ES6+) · React.js · Next.js · React Native · Tailwind CSS · Material UI · Bootstrap · Git · BrowserStack · Asana · Jira · Monday.com</p>
      </section>

      <section className="mt-16">
        <h2 className="font-mono text-xs uppercase tracking-widest text-ink-dim">Education</h2>
        <p className="mt-3 text-lg">Master of Computer Application — Gujarat Technological University (2018–2020)</p>
        <p className="mt-1 text-lg">Bachelor of Computer Application — Saurashtra University (2015–2018)</p>
      </section>

      <section className="mt-16">
        <h2 className="font-mono text-xs uppercase tracking-widest text-ink-dim">Languages</h2>
        <p className="mt-3 text-lg">English · Hindi · Gujarati</p>
      </section>

      <section className="mt-16">
        <h2 className="font-mono text-xs uppercase tracking-widest text-ink-dim">Contact</h2>
        <div className="mt-6"><ContactForm /></div>
      </section>
    </article>
  );
}
