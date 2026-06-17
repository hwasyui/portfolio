"use client";

import React, { useState } from "react";
import data from "../data/educations.json";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

const TYPE_STYLE = {
  formal:    { badge: "bg-pink-hot text-white",       accent: "from-pink-hot to-pink-deep" },
  bootcamp:  { badge: "bg-zinc-900 text-pink-candy",  accent: "from-zinc-800 to-zinc-900"  },
};

function EduCard({ edu, index }) {
  const [open, setOpen] = useState(false);
  const style = TYPE_STYLE[edu.type] ?? TYPE_STYLE.formal;

  const gpaLine  = edu.description.find((d) => d.includes("GPA"));
  const gpa      = gpaLine ? gpaLine.match(/([\d.]+\/[\d.]+)/)?.[1] : null;
  const hasSchol = edu.description.some((d) => d.includes("Scholarship"));
  const hasDuo   = edu.description.some((d) => d.includes("Duolingo"));
  const bullets  = edu.description.filter(
    (d) => !d.includes("GPA") && !d.includes("Scholarship") && !d.includes("Duolingo")
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ type: "spring", stiffness: 360, damping: 28, delay: index * 0.1 }}
      whileHover={{ y: -5, scale: 1.01 }}
      className="rounded-3xl overflow-hidden bg-white border border-pink-candy/30
                 shadow-sm hover:shadow-xl hover:shadow-pink-hot/10 cursor-default"
    >
      <div className={`bg-gradient-to-br ${style.accent} px-7 pt-7 pb-8 relative overflow-hidden`}>
        <div className="absolute top-3 right-4 pointer-events-none select-none font-bebas text-white/10 text-[80px] leading-none">
          {String(index + 1).padStart(2, "0")}
        </div>

        <div className="flex items-start justify-between gap-3 mb-4 relative z-10">
          <span className={`font-bebas text-[9px] tracking-[4px] px-3 py-1 rounded-full ${style.badge}`}>
            {edu.type === "formal" ? "FORMAL" : "BOOTCAMP"}
          </span>
          <span className="font-bebas text-[10px] tracking-[2px] text-white/60">{edu.period}</span>
        </div>

        <h3 className="font-playfair font-bold text-white text-2xl md:text-3xl leading-tight mb-1 relative z-10">
          {edu.school}
        </h3>
        <p className="font-playfair italic text-white/70 text-sm relative z-10">{edu.degree}</p>

        {gpa && (
          <motion.div
            className="mt-4 inline-flex items-baseline gap-2 relative z-10"
            whileHover={{ scale: 1.06 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            <span className="font-playfair font-black text-4xl text-white leading-none">{gpa}</span>
            <span className="font-bebas text-[10px] tracking-[3px] text-white/60">GPA</span>
          </motion.div>
        )}
      </div>

      <div className="px-7 py-5">
        <div className="flex items-center gap-2 text-xs text-zinc-400 mb-4">
          <span className="font-bebas tracking-[3px]">{edu.location}</span>
        </div>

        {(hasSchol || hasDuo) && (
          <div className="flex flex-wrap gap-2 mb-4">
            {hasSchol && (
              <span className="inline-flex items-center gap-1.5 font-bebas text-[9px] tracking-[2px] text-pink-hot bg-pink-blush px-3 py-1.5 rounded-full">
                ✦ Jababeka 75% Scholarship
              </span>
            )}
            {hasDuo && (
              <span className="inline-flex items-center gap-1.5 font-bebas text-[9px] tracking-[2px] text-zinc-600 bg-zinc-100 px-3 py-1.5 rounded-full">
                ✦ Duolingo · Score 130
              </span>
            )}
          </div>
        )}

        {bullets.length > 0 && (
          <>
            <AnimatePresence initial={false}>
              {open && (
                <motion.ul
                  key="bullets"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 320, damping: 30 }}
                  className="space-y-2 mb-3 overflow-hidden"
                >
                  {bullets.map((b, j) => (
                    <li key={j} className="text-sm text-zinc-500 leading-relaxed flex gap-2.5 list-none">
                      <span className="text-pink-hot/50 flex-shrink-0 mt-0.5 text-xs">✦</span>
                      {b}
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>

            <motion.button
              onClick={() => setOpen(v => !v)}
              whileHover={{ x: 2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 22 }}
              className="flex items-center gap-1 font-bebas text-[9px] tracking-[2px] text-pink-hot hover:text-pink-deep"
            >
              {open ? <><ChevronUp size={11} /> Show less</> : <><ChevronDown size={11} /> +{bullets.length} details</>}
            </motion.button>
          </>
        )}
      </div>
    </motion.div>
  );
}

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
        <div className="relative inline-block">
          <span className="absolute -top-5 right-0 text-pink-candy/70 font-bebas text-3xl animate-float pointer-events-none select-none" aria-hidden>✦</span>
          <span className="absolute top-2 -right-6 text-pink-hot/40 font-bebas text-base animate-float-delay pointer-events-none select-none" aria-hidden>✦</span>
          <span className="absolute -top-1 right-12 text-pink-candy/35 font-bebas text-sm animate-float-slow pointer-events-none select-none" aria-hidden>✦</span>
          <div className="font-bebas text-[9px] tracking-[5px] text-pink-hot mb-1">Chapter V</div>
          <h2 className="font-playfair font-black text-4xl md:text-5xl text-zinc-900 leading-tight">
            Education
          </h2>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {data.map((edu, i) => (
          <EduCard key={i} edu={edu} index={i} />
        ))}
      </div>

    </div>
  </div>
);

export default Education;
