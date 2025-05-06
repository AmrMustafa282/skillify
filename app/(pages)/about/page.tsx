"use client";

import AboutHero from "./_components/hero";
import OurStory from "./_components/our-story";
import OurValues from "./_components/our-values";
import Team from "./_components/team";
import Timeline from "./_components/timeline";
import AboutCTA from "./_components/cta";

export default function AboutPage() {
  return (
    <div>
      <AboutHero />
      <OurStory />
      <OurValues />
      <Team />
      {/* <Timeline /> */}
      <AboutCTA />
    </div>
  );
}
