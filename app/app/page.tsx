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
 * Single landing page. Section order follows specs/10-landing-spec.md
 * exactly (hero first, footer last — R22, no reordering to justify in
 * README per R10). Header/footer live in the root layout.
 */
export default function Home() {
  return (
    <main id="contenido" aria-label={messages.a11y.mainLabel}>
      <Hero />
      <HowItWorks />
      <Talent />
      <Companies />
      <Tournaments />
      <Networking />
      <Testimonials />
      <News />
      <Newsletter />
      <Closing />
    </main>
  );
}
