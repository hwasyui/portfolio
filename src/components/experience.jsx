"use client";

import React from "react";
import data from "../data/experiences.json";
import { motion } from "framer-motion";

// renders a category of experiences in a 2-column card grid
const Section = ({ title, items }) => (
  <div className="mb-12">
    <h3 className="font-playfair font-bold text-xl md:text-2xl text-zinc-900 mb-5 flex items-center gap-3">
      <span className="w-6 h-0.5 bg-pink-hot inline-block" />
      {title}
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {items.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.02, boxShadow: "0 8px 24px rgba(224,64,160,0.1)" }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{
            opacity: { duration: 0.4, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
            y:       { duration: 0.4, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
            scale:      { type: "spring", stiffness: 220, damping: 18 },
            boxShadow:  { type: "spring", stiffness: 220, damping: 18 },
          }}
          className="bg-white border border-zinc-100 hover:border-pink-hot/40 rounded-2xl p-5 space-y-2 transition-colors duration-200 flex flex-col h-full"
        >
          <div className="font-playfair font-bold text-base text-zinc-900">{item.title}</div>
          {item.type && (
            <div className="font-bebas text-[10px] tracking-[3px] text-pink-hot">{item.type}</div>
          )}
          <div className="text-xs text-zinc-400 italic">
            {(item.organization || item.company) + " · " + item.date}
          </div>
          <ul className="space-y-1 mt-1 flex-1">
            {item.responsibilities.map((point, j) => (
              <li key={j} className="text-sm text-zinc-600 flex gap-2">
                <span className="text-pink-hot flex-shrink-0 mt-0.5">·</span>
                {point}
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  </div>
);

const Experience = () => {
  const { workExperiences, organizationalExperiences, volunteerExperiences } = data;
  return (
    <div className="relative overflow-hidden bg-white px-6 md:px-16 py-16 min-h-[calc(100vh-2.75rem)]">
      <div className="absolute bottom-0 right-0 font-bebas leading-none text-zinc-900/5 pointer-events-none select-none text-[120px] md:text-[180px] lg:text-[220px]" aria-hidden>04</div>
      <div className="max-w-5xl mx-auto">

        <div className="font-bebas text-[9px] tracking-[5px] text-pink-hot mb-1">Chapter IV</div>
        <h2 className="font-playfair font-black text-4xl md:text-5xl text-zinc-900 mb-12 leading-tight">
          Experience
        </h2>

        {workExperiences.length > 0 && <Section title="Work" items={workExperiences} />}
        {organizationalExperiences.length > 0 && <Section title="Organizational" items={organizationalExperiences} />}
        {volunteerExperiences.length > 0 && <Section title="Volunteer" items={volunteerExperiences} />}
      </div>
    </div>
  );
};

export default Experience;
