"use client";

import React, { useState } from "react";
import data from "../data/experiences.json";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, Users, Calendar, ChevronDown, ChevronUp } from "lucide-react";

const TYPE_COLOR = {
  Internship:       "bg-pink-hot text-white",
  "Part-time":      "bg-pink-blush text-pink-hot border border-pink-candy/40",
  "Self-employment":"bg-zinc-100 text-zinc-600",
  Seasonal:         "bg-amber-50 text-amber-700 border border-amber-200",
  default:          "bg-zinc-100 text-zinc-500",
};

const typePill = (type) => {
  const cls = TYPE_COLOR[type] || TYPE_COLOR.default;
  return (
    <span className={`font-bebas text-[9px] tracking-[2px] px-2.5 py-0.5 rounded-full ${cls}`}>
      {type}
    </span>
  );
};

function WorkCard({ item, index, featured = false }) {
  const [expanded, setExpanded] = useState(false);
  const preview = item.responsibilities.slice(0, 2);
  const rest    = item.responsibilities.slice(2);

  return (
    <motion.div
      initial={{ opacity: 0, y: 36, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ type: "spring", stiffness: 380, damping: 28, delay: index * 0.07 }}
      whileHover={{ y: -5, scale: 1.015 }}
      whileTap={{ scale: 0.99 }}
      style={{ originY: 0 }}
      className={`bg-white rounded-2xl overflow-hidden border cursor-default
                  ${featured
                    ? "border-pink-candy/60 shadow-md hover:shadow-xl hover:shadow-pink-hot/15"
                    : "border-pink-candy/30 hover:border-pink-hot/40 hover:shadow-lg hover:shadow-pink-hot/10"
                  }`}
    >
      <div className={`h-1.5 w-full ${featured ? "bg-gradient-to-r from-pink-hot to-pink-barbie" : "bg-pink-candy/60"}`} />

      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <div className="font-bebas text-[9px] tracking-[3px] text-zinc-400 mb-0.5">
              {item.company}
            </div>
            <h3 className={`font-playfair font-bold leading-tight text-zinc-900
                            ${featured ? "text-xl md:text-2xl" : "text-base md:text-lg"}`}>
              {item.title}
            </h3>
          </div>
          <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
            {item.type && typePill(item.type)}
            <span className="flex items-center gap-1 text-[10px] text-zinc-400 font-bebas tracking-wide">
              <Calendar size={9} />
              {item.date}
            </span>
          </div>
        </div>

        <ul className="space-y-1.5 mb-2">
          {preview.map((pt, j) => (
            <li key={j} className="text-sm text-zinc-600 leading-relaxed flex gap-2">
              <span className="text-pink-hot flex-shrink-0 mt-0.5 text-xs">✦</span>
              {pt}
            </li>
          ))}
        </ul>

        {rest.length > 0 && (
          <>
            <AnimatePresence initial={false}>
              {expanded && (
                <motion.ul
                  key="rest"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 320, damping: 30 }}
                  className="space-y-1.5 mb-2 overflow-hidden"
                >
                  {rest.map((pt, j) => (
                    <li key={j} className="text-sm text-zinc-600 leading-relaxed flex gap-2">
                      <span className="text-pink-hot flex-shrink-0 mt-0.5 text-xs">✦</span>
                      {pt}
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>

            <motion.button
              onClick={() => setExpanded((v) => !v)}
              whileHover={{ x: 2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 22 }}
              className="flex items-center gap-1 text-[10px] font-bebas tracking-[2px]
                         text-pink-hot hover:text-pink-deep mt-1"
            >
              {expanded
                ? <><ChevronUp size={12} /> SHOW LESS</>
                : <><ChevronDown size={12} /> +{rest.length} MORE</>
              }
            </motion.button>
          </>
        )}
      </div>
    </motion.div>
  );
}

function OrgCard({ item, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ type: "spring", stiffness: 380, damping: 28, delay: index * 0.07 }}
      whileHover={{ y: -4, scale: 1.015 }}
      whileTap={{ scale: 0.99 }}
      className="bg-white border border-pink-candy/40 rounded-2xl p-5 cursor-default
                 hover:border-pink-hot/50 hover:shadow-lg hover:shadow-pink-hot/10"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <div className="font-bebas text-[9px] tracking-[3px] text-pink-hot mb-0.5">
            {item.organization}
          </div>
          <h3 className="font-playfair font-bold text-base md:text-lg text-zinc-900 leading-tight">
            {item.title}
          </h3>
        </div>
        <span className="flex items-center gap-1 text-[10px] text-zinc-400 font-bebas tracking-wide flex-shrink-0">
          <Calendar size={9} />
          {item.date}
        </span>
      </div>
      <ul className="space-y-1.5">
        {item.responsibilities.map((pt, j) => (
          <li key={j} className="text-sm text-zinc-600 leading-relaxed flex gap-2">
            <span className="text-pink-hot flex-shrink-0 mt-0.5 text-xs">✦</span>
            {pt}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function SectionLabel({ icon: Icon, label, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 420, damping: 30, delay: index * 0.05 }}
      className="flex items-center gap-3 mb-6"
    >
      <Icon size={13} className="text-pink-hot flex-shrink-0" />
      <span className="font-bebas text-[10px] tracking-[5px] text-zinc-500">{label}</span>
      <div className="flex-1 h-px bg-pink-candy/40" />
    </motion.div>
  );
}

const Experience = () => {
  const { workExperiences, organizationalExperiences } = data;
  const internships = workExperiences.filter((e) => e.type === "Internship");
  const otherWork   = workExperiences.filter((e) => e.type !== "Internship");

  return (
    <div className="relative overflow-hidden bg-pink-pale px-6 md:px-16 py-16">
      <div
        className="absolute bottom-0 right-0 font-bebas leading-none text-pink-hot/10 pointer-events-none select-none text-[120px] md:text-[180px] lg:text-[220px]"
        aria-hidden
      >
        03
      </div>
      <div className="max-w-5xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ type: "spring", stiffness: 420, damping: 30 }}
          className="mb-12"
        >
          <div className="relative inline-block">
            <span className="absolute -top-5 right-0 text-pink-candy/70 font-bebas text-3xl animate-float pointer-events-none select-none" aria-hidden>✦</span>
            <span className="absolute top-2 -right-6 text-pink-hot/40 font-bebas text-base animate-float-delay pointer-events-none select-none" aria-hidden>✦</span>
            <span className="absolute -top-1 right-12 text-pink-candy/35 font-bebas text-sm animate-float-slow pointer-events-none select-none" aria-hidden>✦</span>
            <div className="font-bebas text-[9px] tracking-[5px] text-pink-hot mb-1">Chapter III</div>
            <h2 className="font-playfair font-black text-4xl md:text-5xl text-zinc-900 leading-tight">
              Experience
            </h2>
          </div>
        </motion.div>

        {internships.length > 0 && (
          <div className="mb-10">
            <SectionLabel icon={Briefcase} label="WORK · INTERNSHIP" index={0} />
            <div className="space-y-4">
              {internships.map((item, i) => (
                <WorkCard key={i} item={item} index={i} featured />
              ))}
            </div>
          </div>
        )}

        {otherWork.length > 0 && (
          <div className="mb-10">
            <SectionLabel icon={Briefcase} label="WORK · OTHER" index={1} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {otherWork.map((item, i) => (
                <WorkCard key={i} item={item} index={i} />
              ))}
            </div>
          </div>
        )}

        {organizationalExperiences.length > 0 && (
          <div className="mb-10">
            <SectionLabel icon={Users} label="ORGANIZATIONAL" index={2} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {organizationalExperiences.map((item, i) => (
                <OrgCard key={i} item={item} index={i} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Experience;
