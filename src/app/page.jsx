"use client";

import Navigate from "@/components/navigate";
import Landing from "@/components/landing";
import About from "@/components/about";
import Skills from "@/components/skills";
import Educations from "@/components/education";
import Experiences from "@/components/experience";
import Projects from "@/components/projects";
import Others from "@/components/others";
import ContactMe from "@/components/contact";
import ChatWidget from "@/components/chatbot";
import ScrollToTop from "@/components/scroll-to-top";
import AnimatedSection from "@/components/animated-section";
import SectionStrip from "@/components/section-strip";

export default function Home() {
  return (
    <main className="flex flex-col w-full min-h-screen bg-white text-zinc-900">
      <Navigate />
      <ScrollToTop />

      <section id="landing" className="scroll-mt-20 snap-section">
        <Landing />
      </section>

      <SectionStrip chapter="I" label="About" colors="default" />
      <AnimatedSection id="about"><About /></AnimatedSection>

      <SectionStrip chapter="II" label="Skills" colors="blush" />
      <AnimatedSection id="skills"><Skills /></AnimatedSection>

      <SectionStrip chapter="III" label="Education" colors="default" />
      <AnimatedSection id="educations"><Educations /></AnimatedSection>

      <SectionStrip chapter="IV" label="Experience" colors="deep" />
      <AnimatedSection id="experiences"><Experiences /></AnimatedSection>

      <SectionStrip chapter="V" label="Projects" colors="default" />
      <AnimatedSection id="projects"><Projects /></AnimatedSection>

      <SectionStrip chapter="VI" label="Others" colors="dark" />
      <AnimatedSection id="others"><Others /></AnimatedSection>

      <SectionStrip chapter="VII" label="Contact" colors="default" />
      <AnimatedSection id="contacts"><ContactMe /></AnimatedSection>

      <ChatWidget />
    </main>
  );
}
