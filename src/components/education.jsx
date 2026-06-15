"use client";

import React from "react";
import data from "../data/educations.json";
import { motion } from "framer-motion";

const EntryRow = ({ edu, index }) => {
  const gpaLine  = edu.description.find((d) => d.includes("GPA"));
  const gpa      = gpaLine ? gpaLine.match(/([\d.]+\/[\d.]+)/)?.[1] : null;
  const hasSchol = edu.description.some((d) => d.includes("Scholarship"));
  const hasDuo   = edu.description.some((d) => d.includes("Duolingo"));
  const bullets  = edu.description.filter(
    (d) => !d.includes("GPA") && !d.includes("Scholarship") && !d.includes("Duolingo")
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ type: "spring", stiffness: 380, damping: 30, delay: index * 0.1 }}
      className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-12 py-10
                 border-b border-zinc-200/60 last:border-0"
    >
      <div className="md:col-span-2">
        <div className="font-bebas text-[9px] tracking-[5px] text-pink-hot mb-3">
          {edu.type === "formal" ? "FORMAL" : "BOOTCAMP"}
        </div>
        <h3 className="font-playfair font-black text-2xl md:text-[28px] text-zinc-900 leading-tight mb-2">
          {edu.school}
        </h3>
        <p className="font-playfair italic text-zinc-400 text-sm leading-snug">
          {edu.degree}
        </p>
      </div>

      <div className="md:col-span-3">
        <div className="flex flex-wrap items-center gap-2 mb-5">
          <span className="font-bebas text-[11px] tracking-[4px] text-zinc-800">{edu.period}</span>
          <span className="text-zinc-300 select-none">·</span>
          <span className="text-xs text-zinc-400">{edu.location}</span>
        </div>

        {gpa && (
          <div className="flex items-baseline gap-2 mb-4">
            <span className="font-playfair font-black text-3xl text-pink-hot leading-none">{gpa}</span>
            <span className="font-bebas text-[10px] tracking-[3px] text-zinc-400">GPA</span>
          </div>
        )}

        {(hasSchol || hasDuo) && (
          <div className="flex flex-col gap-1 mb-4">
            {hasSchol && (
              <span className="font-bebas text-[10px] tracking-[2px] text-zinc-500">
                ✦ Jababeka 75% Scholarship Recipient
              </span>
            )}
            {hasDuo && (
              <span className="font-bebas text-[10px] tracking-[2px] text-zinc-500">
                ✦ Duolingo English Test · Score 130
              </span>
            )}
          </div>
        )}

        {bullets.length > 0 && (
          <ul className="space-y-2">
            {bullets.map((b, j) => (
              <li key={j} className="text-sm text-zinc-500 leading-relaxed flex gap-2.5">
                <span className="text-pink-hot/50 flex-shrink-0 mt-0.5">—</span>
                {b}
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  );
};

const Education = () => (
  <div className="relative overflow-hidden bg-pink-pale px-6 md:px-16 py-16">
    <div
      className="absolute bottom-0 right-0 font-bebas leading-none text-pink-hot/10
                 pointer-events-none select-none text-[120px] md:text-[180px] lg:text-[220px]"
      aria-hidden
    >
      05
    </div>
    <div className="max-w-5xl mx-auto">

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ type: "spring", stiffness: 420, damping: 30 }}
        className="mb-10"
      >
        <div className="font-bebas text-[9px] tracking-[5px] text-pink-hot mb-1">Chapter V</div>
        <h2 className="font-playfair font-black text-4xl md:text-5xl text-zinc-900 leading-tight">
          Education
        </h2>
      </motion.div>

      <div>
        {data.map((edu, i) => (
          <EntryRow key={i} edu={edu} index={i} />
        ))}
      </div>

    </div>
  </div>
);

export default Education;
