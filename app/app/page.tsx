import Hero from "@/components/sections/Hero";
import HowItWorks from "@/components/sections/HowItWorks";
import Talent from "@/components/sections/Talent";
import Companies from "@/components/sections/Companies";
import Tournaments from "@/components/sections/Tournaments";
import Networking from "@/components/sections/Networking";
import Testimonials from "@/components/sections/Testimonials";
import News from "@/components/sections/News";
import Newsletter from "@/components/sections/Newsletter";
import Closing from "@/components/sections/Closing";
import { messages } from "@/content";

/**
 * Single landing page, read as one vertical timeline (D32): the hero is the
 * door and the closing section is the goal, with the body ordered so the story
 * narrates itself — how it works → proof (a live tournament) → what you get →
 * what companies get → community → validation → news → stay close → join.
 *
 * R22: "El orden es orientativo menos el hero y el footer", so only the hero
 * (first) and the footer (in the layout) are fixed. The reorder is declared in
 * the README (R10). Section bodies keep their own design; what changed is the
 * order and the shared timeline rail.
 */
export default function Home() {
  return (
    <main id="contenido" aria-label={messages.a11y.mainLabel}>
      <Hero />
      <HowItWorks />
      <Tournaments />
      <Talent />
      <Companies />
      <Networking />
      <Testimonials />
      <News />
      <Newsletter />
      <Closing />
    </main>
  );
}
