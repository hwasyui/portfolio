"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import ScrollFillText from "@/components/scroll-fill-text";
import HoverText from "@/components/hover-text";
import projects from "@/data/projects.json";

const ease = [0.16, 1, 0.3, 1];

function Reveal({ children, delay = 0, y = 20, x = 0, className }) {
  return (
    <motion.div
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const STATS = [
  ["Degree", "Informatics, President University"],
  ["Projects shipped", `${projects.length}`],
  ["Duolingo English Test", "130"],
  ["Available for", "Full Time Position"],
];

const AboutPage = () => {
  return (
    <div className="bg-white px-6 md:px-16 py-20 md:py-28">
      <div className="w-full max-w-7xl mx-auto">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.15em] uppercase text-zinc-400 mb-3">About</p>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-zinc-900 leading-tight mb-12 md:mb-14">
            <HoverText text="A builder who learns fast, somewhere between backend systems and AI." />
          </h2>
        </Reveal>

        <div className="flex flex-col md:flex-row gap-14 items-start">
          <Reveal x={-24} y={0} delay={0.05} className="w-full md:w-2/5 flex-shrink-0">
            <div className="relative aspect-square rounded-[28px] overflow-hidden bg-zinc-50">
              <Image
                src="/about/photo4.jpg"
                alt="Angelica"
                fill
                sizes="(max-width: 768px) 90vw, 400px"
                className="object-cover"
                priority
              />
            </div>
          </Reveal>

          <div className="w-full md:w-3/5 space-y-5">
            <ScrollFillText
              className="text-[15px] leading-[1.8]"
              text="I am an Informatics student at President University, currently building systems that turn data into useful, reliable applications. Most of my time goes into backend development, data pipelines, and AI-related projects."
              boldWords={[
                "Informatics student at President University",
                "backend development, data pipelines, and AI-related projects",
              ]}
            />

            <ScrollFillText
              className="text-[15px] leading-[1.8]"
              text="I have worked on RAG-based chatbots, computer vision systems, and NLP pipelines, built as part of coursework, internships, and personal projects. Completed internships as a Data Engineer at FIFGROUP and a Backend Engineer at BCA."
            />

            <ScrollFillText
              className="text-[15px] leading-[1.8]"
              text="I have hands-on experience with FastAPI, Kafka, Docker, MongoDB, PostgreSQL, and modern LLM frameworks. My current goal is to strengthen fundamentals while shipping things that work in real-world environments."
            />

            <Reveal delay={0.28} className="pt-4 grid grid-cols-2 gap-x-6 gap-y-5">
              {STATS.map(([label, val]) => (
                <div key={label}>
                  <div className="text-xs font-medium tracking-[0.1em] uppercase text-zinc-400 mb-1">
                    {label}
                  </div>
                  <div className="text-sm font-semibold text-zinc-900">{val}</div>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
