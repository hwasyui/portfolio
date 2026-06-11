"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import skills from "../data/skills.json";

const capabilities = [
  {
    id: "ai",
    num: "01",
    label: "Artificial Intelligence",
    desc: "ML · NLP · Computer Vision · Embeddings",
    data: skills["Artificial Intelligence"],
  },
  {
    id: "fullstack",
    num: "02",
    label: "Full-Stack Web",
    desc: "Frontend · Backend · Databases",
    data: skills["Fullstack"],
  },
  {
    id: "data",
    num: "03",
    label: "Data Engineering",
    desc: "Streaming · Processing · Monitoring",
    data: skills["Data Engineering"],
  },
];

const Pill = ({ label, index }) => (
  <motion.span
    initial={{ opacity: 0, y: 4 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.2, delay: index * 0.03, ease: [0.22, 1, 0.36, 1] }}
    whileHover={{ scale: 1.05, transition: { type: "spring", stiffness: 320, damping: 22 } }}
    className="inline-block px-2.5 py-1 text-[11px] font-medium cursor-default
               bg-pink-blush text-zinc-700 rounded
               hover:bg-pink-hot hover:text-white transition-colors duration-150"
  >
    {label}
  </motion.span>
);

const ToolPill = ({ label, index }) => (
  <motion.span
    initial={{ opacity: 0, y: 4 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.2, delay: index * 0.025, ease: [0.22, 1, 0.36, 1] }}
    whileHover={{ scale: 1.05, transition: { type: "spring", stiffness: 320, damping: 22 } }}
    className="inline-block px-2.5 py-1 text-[11px] font-medium cursor-default
               bg-white border border-zinc-200 text-zinc-600 rounded
               hover:border-pink-hot hover:text-pink-hot transition-colors duration-150"
  >
    {label}
  </motion.span>
);

const TabbedPanel = ({ data }) => (
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {Object.entries(data).map(([group, items]) => (
      <div key={group}>
        <p className="font-bebas text-xs tracking-[3px] text-pink-hot mb-3">{group}</p>
        <div className="flex flex-wrap gap-1.5">
          {items.map((item, i) => <Pill key={item} label={item} index={i} />)}
        </div>
      </div>
    ))}
  </div>
);

const Skills = () => {
  const [active, setActive] = useState(null);
  const current = capabilities.find((c) => c.id === active);
  const toggle = (id) => setActive((prev) => (prev === id ? null : id));

  return (
    <div className="bg-pink-pale px-8 md:px-16 lg:px-24 py-16 md:py-20 min-h-[calc(100vh-2.75rem)]">

      {/* header */}
      <div className="mb-12">
        <div className="font-bebas text-xs tracking-[5px] text-pink-hot mb-2">Chapter II</div>
        <h2 className="font-playfair font-black text-zinc-900 leading-tight text-4xl md:text-6xl">
          Skills
        </h2>
        <p className="font-bebas text-sm tracking-[3px] text-zinc-500 mt-1">
          Services
        </p>
        <p className="font-bebas text-xs tracking-[3px] text-zinc-400 mt-1">
          Click a service to explore tools &amp; frameworks
        </p>
      </div>

      {/* 3-column service cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
        {capabilities.map((cap) => {
          const isActive = active === cap.id;
          return (
            <button
              key={cap.id}
              onClick={() => toggle(cap.id)}
              className={`text-left p-5 border-2 transition-all duration-200 group ${
                isActive
                  ? "bg-pink-hot border-pink-hot"
                  : "bg-white border-pink-blush hover:border-pink-hot"
              }`}
            >
              <div className={`font-bebas text-2xl leading-none mb-3 transition-colors ${
                isActive ? "text-white/60" : "text-zinc-300 group-hover:text-pink-candy"
              }`}>
                {cap.num}
              </div>
              <div className={`font-playfair font-bold leading-tight mb-1 transition-colors ${
                isActive ? "text-white" : "text-zinc-800 group-hover:text-zinc-900"
              }`}>
                {cap.label}
              </div>
              <div className={`font-bebas text-[10px] tracking-[1.5px] transition-colors ${
                isActive ? "text-white/70" : "text-zinc-400"
              }`}>
                {cap.desc}
              </div>
            </button>
          );
        })}
      </div>

      {/* detail panel */}
      <AnimatePresence initial={false}>
        {current && (
          <motion.div
            key={current.id}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="bg-white border border-pink-blush px-8 py-8 mb-10 shadow-sm">
              <TabbedPanel data={current.data} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* divider */}
      <div className="border-t border-pink-blush mb-10" />

      {/* base languages */}
      <div className="mb-10">
        <p className="font-bebas text-xs tracking-[5px] text-zinc-400 mb-4">Languages</p>
        <div className="flex flex-wrap gap-1.5">
          {skills["Programming Languages"].map((lang, i) => (
            <ToolPill key={lang} label={lang} index={i} />
          ))}
        </div>
      </div>

      {/* tools grouped by category */}
      <div>
        <p className="font-bebas text-xs tracking-[5px] text-zinc-400 mb-6">Tools & Workflow</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {Object.entries(skills["Tools & Workflow"]).map(([group, items]) => (
            <div key={group}>
              <p className="font-bebas text-[9px] tracking-[3px] text-pink-hot/70 mb-2">{group}</p>
              <div className="flex flex-wrap gap-1.5">
                {items.map((tool, i) => (
                  <ToolPill key={tool} label={tool} index={i} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Skills;
