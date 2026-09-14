"use client";

import Landing from "@/components/landing";
import About from "@/components/about";
import HowIWork from "@/components/how-i-work";
import Skills from "@/components/skills";
import Educations from "@/components/education";
import Experiences from "@/components/experience";
import Projects from "@/components/projects";
import Others from "@/components/others";
import ContactMe from "@/components/contact";
import AnimatedSection from "@/components/animated-section";

export default function Home() {
  return (
    <main className="flex flex-col w-full min-h-screen bg-white text-zinc-900">
      <section id="landing" className="scroll-mt-20">
        <Landing />
      </section>

      <AnimatedSection id="about"><About /></AnimatedSection>
      <AnimatedSection id="how-i-work"><HowIWork /></AnimatedSection>
      <AnimatedSection id="skills"><Skills /></AnimatedSection>
      <AnimatedSection id="experiences"><Experiences /></AnimatedSection>
      <AnimatedSection id="projects"><Projects /></AnimatedSection>
      <AnimatedSection id="educations"><Educations /></AnimatedSection>
      <AnimatedSection id="others"><Others /></AnimatedSection>
      <AnimatedSection id="contacts"><ContactMe /></AnimatedSection>
    </main>
  );
}
