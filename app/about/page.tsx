import { ContactForm } from "@/components/sections/contact-form";
import { JsonLd } from "@/components/ui/json-ld";

export const metadata = { title: "About" };

const skills: { label: string; value: string }[] = [
  { label: "Languages", value: "TypeScript · JavaScript · PHP · Java · C++" },
  { label: "Backend & Frameworks", value: "NestJS · Node.js · Express.js · Laravel · REST APIs · GraphQL · System Design & Architecture" },
  { label: "Databases & Messaging", value: "MongoDB · PostgreSQL · MySQL · Redis (Caching) · RabbitMQ · BullMQ · Prisma ORM · Sequelize · Mongoose" },
  { label: "AI & MCP", value: "LLM Integration · RAG · AI Agents · MCP Server (SSE + HTTP Streaming) · vLLM · Agentic Workflows · OpenAI · Anthropic SDK · Chatbot & Voice Agent" },
  { label: "Frontend & Integrations", value: "React.js · Next.js · Payload CMS · Stripe · BigBlueButton · Google OAuth & Gmail API · Microsoft Graph API (Outlook) · IMAP · Merge API · Monday.com · Checkr · AWS SES · AWS S3 · Git · Nginx" },
  { label: "Education", value: "MCA — LJ College, Ahmedabad · 2022 — BCOM — MLSU, Udaipur · 2018" },
  { label: "Spoken Languages", value: "English · Hindi · Gujarati" },
];

const contactLinks = [
  { label: "Email", href: "mailto:vinodkumar850386@gmail.com", display: "vinodkumar850386@gmail.com" },
  { label: "Phone", href: "tel:+918503864833", display: "+91 85038 64833" },
  { label: "GitHub", href: "https://github.com/vivenn", display: "github.com/vivenn", external: true },
  { label: "LinkedIn", href: "https://linkedin.com/in/vinod-suthar-04b4262b0", display: "linkedin.com/in/vinod-suthar-04b4262b0", external: true },
  { label: "YouTube", href: "https://www.youtube.com/@vivenxfilm", display: "youtube.com/@vivenxfilm", external: true },
  { label: "Instagram", href: "https://www.instagram.com/vivenxfilm.io/", display: "instagram.com/vivenxfilm.io", external: true },
];

export default function AboutPage() {
  return (
    <article>
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

      <header className="mx-auto max-w-5xl px-[5vw] pt-[18vh]">
        <div className="font-mono text-[11px] uppercase tracking-widest text-ink-dim">Vinod Suthar · Software Engineer</div>
        <h1 className="mt-4 font-display text-[clamp(48px,9vw,140px)] font-black leading-[0.9] tracking-[-0.04em]">
          ABOUT.
        </h1>
        <p className="mt-8 max-w-2xl font-display text-xl leading-snug text-ink-dim md:text-2xl">
          I&apos;m a software engineer based in Ahmedabad, India, with 3+ years building high-performance backend systems, AI-powered applications, and full-stack products.
        </p>
      </header>

      <div className="mx-auto grid max-w-7xl gap-12 px-[5vw] py-16 lg:grid-cols-12 lg:gap-16">
        <aside className="lg:col-span-3">
          <div className="space-y-8 lg:sticky lg:top-24">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-ink-dim">Now</div>
              <p className="mt-2 text-sm leading-relaxed">
                Software Engineer at PrimeApps Infotech since March 2022 — leading backend development on a CRM platform.
              </p>
            </div>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-ink-dim">Location</div>
              <div className="mt-1 font-display text-base">Ahmedabad, India</div>
            </div>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-ink-dim">Available for</div>
              <p className="mt-2 text-sm text-ink-dim">Backend architecture, AI integrations, full-stack contracts.</p>
            </div>
          </div>
        </aside>

        <div className="lg:col-span-8 lg:col-start-5">
          <section>
            <p className="text-lg leading-relaxed">
              At PrimeApps Infotech, I&apos;ve led and contributed to complex platforms — from a contractor management system with LLM-based certificate verification and RAG knowledge bases, to a full CRM with an integrated email client, permission systems, real-time queues, and agentic AI workflows. I care deeply about system design, performance, and shipping things that scale.
            </p>
          </section>

          <section className="mt-16">
            <h2 className="font-display text-2xl font-black tracking-tight md:text-3xl">Stack</h2>
            <dl className="mt-6 border-t border-line">
              {skills.map((s) => (
                <div key={s.label} className="border-b border-line py-5 md:grid md:grid-cols-12 md:gap-6">
                  <dt className="font-mono text-[11px] uppercase tracking-widest text-ink-dim md:col-span-3">{s.label}</dt>
                  <dd className="mt-2 text-base leading-relaxed md:col-span-9 md:mt-0">{s.value}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section id="contact" className="mt-16">
            <h2 className="font-display text-2xl font-black tracking-tight md:text-3xl">Contact</h2>
            <dl className="mt-6 border-t border-line">
              {contactLinks.map((c) => (
                <div key={c.label} className="border-b border-line py-4 md:grid md:grid-cols-12 md:items-baseline md:gap-6">
                  <dt className="font-mono text-[11px] uppercase tracking-widest text-ink-dim md:col-span-3">{c.label}</dt>
                  <dd className="mt-1 md:col-span-9 md:mt-0">
                    <a
                      className="text-base underline decoration-ink-dim underline-offset-4 transition-colors hover:decoration-accent"
                      href={c.href}
                      {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    >
                      {c.display}
                    </a>
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-12">
              <h3 className="font-display text-xl font-bold tracking-tight">Send a message</h3>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>
          </section>
        </div>
      </div>
    </article>
  );
}
