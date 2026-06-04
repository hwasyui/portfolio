"use client";

import React from "react";
import { motion } from "framer-motion";
import skills from "../data/skills.json";

const pillContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.065, delayChildren: 0.08 } },
};

const pillItem = {
  hidden: { opacity: 0, scale: 0.75, y: 8 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

// dark pill for the left panel
const Pill = ({ label }) => (
  <motion.span
    variants={pillItem}
    whileHover={{ scale: 1.05, transition: { type: "spring", stiffness: 300, damping: 20 } }}
    className="inline-block px-3 py-1 rounded-full text-xs font-medium cursor-default
               border border-white/20 bg-white/10 text-white/85
               hover:border-pink-candy hover:text-pink-candy transition-colors duration-150"
  >
    {label}
  </motion.span>
);

// light pill for the right panel
const PillLight = ({ label }) => (
  <motion.span
    variants={pillItem}
    whileHover={{ scale: 1.05, transition: { type: "spring", stiffness: 300, damping: 20 } }}
    className="inline-block px-3 py-1 rounded-full text-xs font-medium cursor-default
               border border-zinc-200 text-zinc-700
               hover:border-pink-hot hover:text-pink-hot transition-colors duration-150"
  >
    {label}
  </motion.span>
);

const PillCloud = ({ items, dark = false }) => (
  <motion.div
    className="flex flex-wrap gap-2"
    variants={pillContainer}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
  >
    {items.map((item) =>
      dark ? <Pill key={item} label={item} /> : <PillLight key={item} label={item} />
    )}
  </motion.div>
);

const Skills = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2">

      {/* left side, dark panel */}
      <div className="bg-zinc-900 relative overflow-hidden px-10 md:px-14 py-14 min-h-[calc(100vh-2.75rem)]">
        <div
          className="absolute bottom-0 right-0 font-bebas leading-none text-white/10 pointer-events-none select-none"
          style={{ fontSize: "clamp(100px, 18vw, 220px)" }}
          aria-hidden
        >
          02
        </div>

        <div className="relative z-10">
          <div className="font-bebas text-[9px] tracking-[5px] text-pink-candy mb-1">Chapter II</div>
          <h2 className="font-playfair font-black text-white mb-10 leading-tight"
              style={{ fontSize: "clamp(32px, 6vw, 56px)" }}>
            Skills
          </h2>

          {/* programming languages */}
          <div className="mb-10">
            <div className="font-bebas text-sm tracking-[3px] text-white mb-3">
              Programming Languages
            </div>
            <PillCloud items={skills["Programming Languages"]} dark />
          </div>

          {/* AI category header with smaller sub-categories below it */}
          <div>
            <div className="font-bebas text-sm tracking-[3px] text-white mb-5">
              Artificial Intelligence
            </div>
            <div className="space-y-5 pl-3 border-l border-white/10">
              {Object.entries(skills["Artificial Intelligence"]).map(([key, items]) => (
                <div key={key}>
                  <div className="font-bebas text-[9px] tracking-[3px] text-zinc-400 mb-2">{key}</div>
                  <PillCloud items={items} dark />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* right side, light panel */}
      <div className="bg-pink-pale relative overflow-hidden px-10 md:px-14 py-14 min-h-[calc(100vh-2.75rem)]">
        <div className="relative z-10">
          <div className="font-bebas text-[9px] tracking-[5px] text-pink-hot mb-1">Toolkit</div>
          <h3 className="font-playfair font-bold text-zinc-900 mb-10 leading-tight"
              style={{ fontSize: "clamp(28px, 5vw, 48px)" }}>
            Tools &<br />Frameworks
          </h3>

          {/* fullstack */}
          <div className="mb-10">
            <div className="font-bebas text-sm tracking-[3px] text-zinc-700 mb-5">
              Full-Stack Web
            </div>
            <div className="space-y-5 pl-3 border-l border-pink-hot/20">
              {Object.entries(skills["Fullstack"]).map(([key, items]) => (
                <div key={key}>
                  <div className="font-bebas text-[9px] tracking-[3px] text-zinc-400 mb-2">{key}</div>
                  <PillCloud items={items} />
                </div>
              ))}
            </div>
          </div>

          {/* data engineering */}
          <div className="mb-10">
            <div className="font-bebas text-sm tracking-[3px] text-zinc-700 mb-5">
              Data Engineering
            </div>
            <div className="space-y-5 pl-3 border-l border-pink-hot/20">
              {Object.entries(skills["Data Engineering"]).map(([key, items]) => (
                <div key={key}>
                  <div className="font-bebas text-[9px] tracking-[3px] text-zinc-400 mb-2">{key}</div>
                  <PillCloud items={items} />
                </div>
              ))}
            </div>
          </div>

          {/* deployment */}
          <div>
            <div className="font-bebas text-sm tracking-[3px] text-zinc-700 mb-3">
              Deployment & Others
            </div>
            <PillCloud items={skills["Deployment and Others"]} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;
