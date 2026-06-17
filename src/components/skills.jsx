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
    initial={{ opacity: 0, scale: 0.8, y: 6 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    transition={{ type: "spring", stiffness: 420, damping: 24, delay: index * 0.025 }}
    whileHover={{ scale: 1.1, y: -2, transition: { type: "spring", stiffness: 420, damping: 18 } }}
    whileTap={{ scale: 0.95 }}
    className="inline-block px-2.5 py-1 text-[11px] font-medium cursor-default
               bg-pink-blush text-zinc-700 rounded-lg
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
    transition={{ type: "spring", stiffness: 400, damping: 26, delay: index * 0.025 }}
    whileHover={{ scale: 1.08, y: -2, transition: { type: "spring", stiffness: 420, damping: 18 } }}
    whileTap={{ scale: 0.95 }}
    className="inline-block px-2.5 py-1 text-[11px] font-medium cursor-default
               bg-pink-pale border border-pink-candy/40 text-zinc-600 rounded-lg
               hover:border-pink-hot hover:text-pink-hot hover:bg-pink-blush transition-colors duration-150"
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
    <div className="relative overflow-hidden bg-white px-8 md:px-16 lg:px-24 py-16 md:py-20">
      <div
        className="absolute bottom-0 left-0 font-bebas leading-none text-zinc-900/5 pointer-events-none select-none text-[120px] md:text-[180px] lg:text-[220px]"
        aria-hidden
      >
        02
      </div>

      <div className="max-w-5xl mx-auto">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ type: "spring", stiffness: 420, damping: 30 }}
        >
          <div className="relative inline-block">
            <span className="absolute -top-5 right-0 text-pink-candy/60 font-bebas text-3xl animate-float pointer-events-none select-none" aria-hidden>✦</span>
            <span className="absolute top-3 -right-6 text-pink-hot/35 font-bebas text-base animate-float-delay pointer-events-none select-none" aria-hidden>✦</span>
            <span className="absolute -top-2 right-12 text-pink-candy/30 font-bebas text-sm animate-float-slow pointer-events-none select-none" aria-hidden>✦</span>
            <div className="font-bebas text-xs tracking-[5px] text-pink-hot mb-2">Chapter II</div>
            <h2 className="font-playfair font-black text-zinc-900 leading-tight text-4xl md:text-6xl">
              Skills
            </h2>
          </div>
          <p className="font-bebas text-sm tracking-[3px] text-zinc-500 mt-2">Services</p>
          <p className="font-bebas text-xs tracking-[3px] text-zinc-400 mt-1">
            Click a service to explore tools &amp; frameworks
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
          {capabilities.map((cap, i) => {
            const isActive = active === cap.id;
            return (
              <motion.button
                key={cap.id}
                onClick={() => toggle(cap.id)}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ type: "spring", stiffness: 380, damping: 28, delay: i * 0.08 }}
                whileHover={isActive ? {} : { y: -5, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                style={{ transition: "box-shadow 0.2s" }}
                className={`text-left p-5 border-2 rounded-2xl group
                  ${isActive
                    ? "bg-pink-hot border-pink-hot shadow-lg shadow-pink-hot/25"
                    : "bg-pink-pale border-pink-candy/40 hover:border-pink-hot hover:shadow-md hover:shadow-pink-hot/10"
                  }`}
              >
                <div className={`font-bebas text-2xl leading-none mb-3 transition-colors ${
                  isActive ? "text-white/60" : "text-pink-candy group-hover:text-pink-hot"
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
              </motion.button>
            );
          })}
        </div>

        <AnimatePresence initial={false}>
          {current && (
            <motion.div
              key={current.id}
              initial={{ height: 0, opacity: 0, y: -8 }}
              animate={{ height: "auto", opacity: 1, y: 0 }}
              exit={{ height: 0, opacity: 0, y: -8 }}
              transition={{ type: "spring", stiffness: 320, damping: 30 }}
              className="overflow-hidden"
            >
              <div className="bg-pink-pale border border-pink-candy/40 rounded-2xl px-8 py-8 mb-10">
                <TabbedPanel data={current.data} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="border-t border-pink-candy/30 mb-10" />

        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        >
          <p className="font-bebas text-xs tracking-[5px] text-zinc-400 mb-4">Languages</p>
          <div className="flex flex-wrap gap-1.5">
            {skills["Programming Languages"].map((lang, i) => (
              <ToolPill key={lang} label={lang} index={i} />
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        >
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
        </motion.div>
      </div>
    </div>
  );
};

export default Skills;
