import { ContactForm } from "@/components/sections/contact-form";
import { JsonLd } from "@/components/ui/json-ld";

export const metadata = { title: "About" };

export default function AboutPage() {
  return (
    <article className="mx-auto max-w-3xl px-[5vw] pt-[18vh] pb-[12vh]">
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Vinod Suthar",
        jobTitle: "Software Engineer",
        email: "vinodkumar850386@gmail.com",
        telephone: "+91-8503864833",
        address: "Ahmedabad, Gujarat, India",
        worksFor: { "@type": "Organization", name: "PrimeApps Infotech" },
        url: process.env.NEXT_PUBLIC_SITE_URL,
        sameAs: [
          "https://github.com/vivenn",
          "https://linkedin.com/in/vinod-suthar-04b4262b0",
          "https://www.youtube.com/@vivenxfilm",
          "https://www.instagram.com/vivenxfilm.io/",
        ],
      }} />
      <h1 className="font-display text-[clamp(48px,9vw,140px)] font-black leading-[0.9] tracking-tight">About.</h1>

      <section className="mt-12 space-y-6 text-lg text-ink">
        <p>I&apos;m Vinod Suthar, a software engineer based in Ahmedabad, India, with 3+ years of experience building high-performance backend systems, AI-powered applications, and full-stack products.</p>
        <p>At PrimeApps Infotech, I&apos;ve led and contributed to complex platforms — from a contractor management system with LLM-based certificate verification and RAG knowledge bases, to a full CRM with an integrated email client, permission systems, real-time queues, and agentic AI workflows. I care deeply about system design, performance, and shipping things that scale.</p>
      </section>

      <section className="mt-16">
        <h2 className="font-mono text-xs uppercase tracking-widest text-ink-dim">Now</h2>
        <p className="mt-3 text-lg">Software Engineer at PrimeApps Infotech since March 2022 — currently leading backend development on a CRM platform, building everything from email clients and pipeline modules to AI agent integrations and background job infrastructure.</p>
      </section>

      <section className="mt-16">
        <h2 className="font-mono text-xs uppercase tracking-widest text-ink-dim">Languages</h2>
        <p className="mt-3 text-lg">TypeScript · JavaScript · PHP · Java · C++</p>
      </section>

      <section className="mt-10">
        <h2 className="font-mono text-xs uppercase tracking-widest text-ink-dim">Backend &amp; Frameworks</h2>
        <p className="mt-3 text-lg">NestJS · Node.js · Express.js · Laravel · REST APIs · GraphQL · System Design &amp; Architecture</p>
      </section>

      <section className="mt-10">
        <h2 className="font-mono text-xs uppercase tracking-widest text-ink-dim">Databases &amp; Messaging</h2>
        <p className="mt-3 text-lg">MongoDB · PostgreSQL · MySQL · Redis (Caching) · RabbitMQ · BullMQ · Prisma ORM · Sequelize · Mongoose</p>
      </section>

      <section className="mt-10">
        <h2 className="font-mono text-xs uppercase tracking-widest text-ink-dim">AI &amp; MCP</h2>
        <p className="mt-3 text-lg">LLM Integration · RAG · AI Agents · MCP Server (SSE + HTTP Streaming) · vLLM · Agentic Workflows · OpenAI · Anthropic SDK · Chatbot &amp; Voice Agent</p>
      </section>

      <section className="mt-10">
        <h2 className="font-mono text-xs uppercase tracking-widest text-ink-dim">Frontend &amp; Integrations</h2>
        <p className="mt-3 text-lg">React.js · Next.js · Payload CMS · Stripe · BigBlueButton · Google OAuth &amp; Gmail API · Microsoft Graph API (Outlook) · IMAP · Merge API · Monday.com · Checkr · AWS SES · AWS S3 · Git · Nginx</p>
      </section>

      <section className="mt-16">
        <h2 className="font-mono text-xs uppercase tracking-widest text-ink-dim">Education</h2>
        <p className="mt-3 text-lg">MCA — LJ College, Ahmedabad · 2022</p>
        <p className="mt-1 text-lg">BCOM — MLSU, Udaipur · 2018</p>
      </section>

      <section className="mt-16">
        <h2 className="font-mono text-xs uppercase tracking-widest text-ink-dim">Spoken Languages</h2>
        <p className="mt-3 text-lg">English · Hindi · Gujarati</p>
      </section>

      <section id="contact" className="mt-16">
        <h2 className="font-mono text-xs uppercase tracking-widest text-ink-dim">Contact</h2>
        <dl className="mt-6 grid grid-cols-1 gap-x-8 gap-y-4 text-lg sm:grid-cols-[max-content_1fr]">
          <dt className="font-mono text-xs uppercase tracking-widest text-ink-dim sm:self-center">Email</dt>
          <dd><a className="underline-offset-4 hover:underline" href="mailto:vinodkumar850386@gmail.com">vinodkumar850386@gmail.com</a></dd>
          <dt className="font-mono text-xs uppercase tracking-widest text-ink-dim sm:self-center">Phone</dt>
          <dd><a className="underline-offset-4 hover:underline" href="tel:+918503864833">+91 85038 64833</a></dd>
          <dt className="font-mono text-xs uppercase tracking-widest text-ink-dim sm:self-center">Location</dt>
          <dd>Ahmedabad, Gujarat, India</dd>
          <dt className="font-mono text-xs uppercase tracking-widest text-ink-dim sm:self-center">GitHub</dt>
          <dd><a className="underline-offset-4 hover:underline" href="https://github.com/vivenn" target="_blank" rel="noopener noreferrer">github.com/vivenn</a></dd>
          <dt className="font-mono text-xs uppercase tracking-widest text-ink-dim sm:self-center">LinkedIn</dt>
          <dd><a className="underline-offset-4 hover:underline" href="https://linkedin.com/in/vinod-suthar-04b4262b0" target="_blank" rel="noopener noreferrer">linkedin.com/in/vinod-suthar-04b4262b0</a></dd>
          <dt className="font-mono text-xs uppercase tracking-widest text-ink-dim sm:self-center">YouTube</dt>
          <dd><a className="underline-offset-4 hover:underline" href="https://www.youtube.com/@vivenxfilm" target="_blank" rel="noopener noreferrer">youtube.com/@vivenxfilm</a></dd>
          <dt className="font-mono text-xs uppercase tracking-widest text-ink-dim sm:self-center">Instagram</dt>
          <dd><a className="underline-offset-4 hover:underline" href="https://www.instagram.com/vivenxfilm.io/" target="_blank" rel="noopener noreferrer">instagram.com/vivenxfilm.io</a></dd>
        </dl>
        <div className="mt-10"><ContactForm /></div>
      </section>
    </article>
  );
}
