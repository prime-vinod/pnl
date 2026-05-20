import { Hero } from "@/components/sections/hero";
import { FeaturedWork } from "@/components/sections/featured-work";
import { ClientsStrip } from "@/components/sections/clients-strip";
import { AboutTeaser } from "@/components/sections/about-teaser";
import { WritingTeaser } from "@/components/sections/writing-teaser";
import { ContactCTA } from "@/components/sections/contact-cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedWork />
      <ClientsStrip />
      <AboutTeaser />
      <WritingTeaser />
      <ContactCTA />
    </>
  );
}
