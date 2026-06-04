"use client";

import React from "react";
import data from "../data/educations.json";
import { Calendar, MapPin, GraduationCap, Laptop } from "lucide-react";
import { motion } from "framer-motion";

const entryVariants = {
  hidden: { opacity: 0, x: -16 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.18, duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  }),
};

const TimelineEntry = ({ edu, index, variant }) => {
  const isFormal = variant === "formal";
  const dotColor  = isFormal ? "border-pink-deep text-pink-deep"        : "border-violet-500 text-violet-500";
  const lineColor = isFormal ? "bg-pink-hot/20"                         : "bg-violet-200";
  const accentTxt = isFormal ? "text-pink-hot"                          : "text-violet-600";

  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={entryVariants}
      className="relative pl-14"
    >
      {/* dot */}
      <div className={`absolute left-0 top-0.5 w-9 h-9 rounded-full
                       bg-pink-blush border-2 flex items-center justify-center
                       flex-shrink-0 ${dotColor}`}>
        {isFormal
          ? <GraduationCap size={14} />
          : <Laptop        size={14} />}
      </div>

      {/* content */}
      <div className="pb-10">
        {/* school + meta */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-1.5 mb-1">
          <div>
            <h3 className="font-playfair font-bold text-xl md:text-2xl text-zinc-900 leading-tight">
              {edu.school}
            </h3>
            <p className={`text-sm font-semibold mt-0.5 ${accentTxt}`}>{edu.degree}</p>
          </div>
          <div className="flex flex-col items-start md:items-end gap-1 flex-shrink-0 md:pt-1">
            <div className="flex items-center gap-1.5 text-xs text-zinc-500">
              <Calendar size={11} />
              <span className="font-bebas tracking-wider text-[11px]">{edu.period}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-zinc-500">
              <MapPin size={11} />
              <span>{edu.location}</span>
            </div>
            {!isFormal && (
              <span className={`font-bebas text-[9px] tracking-[3px] px-2 py-0.5 rounded-full bg-violet-100 ${accentTxt}`}>
                BOOTCAMP
              </span>
            )}
          </div>
        </div>

        {/* divider */}
        <div className={`h-px w-full mt-3 mb-3.5 ${isFormal ? "bg-pink-hot/10" : "bg-violet-100"}`} />

        {/* bullets */}
        <ul className="space-y-1.5">
          {edu.description.map((point, j) => (
            <li key={j} className="text-sm text-zinc-600 flex gap-2.5 leading-relaxed">
              <span className={`mt-0.5 flex-shrink-0 ${accentTxt}`}>·</span>
              {point}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

const TimelineBlock = ({ entries, variant, icon: Icon, label, lineClass, accentClass }) => (
  <div className="mb-10">
    {/* section label */}
    <div className="flex items-center gap-3 mb-7">
      <Icon size={14} className={accentClass} />
      <span className="font-bebas text-[9px] tracking-[5px] text-zinc-700">{label}</span>
      <div className={`flex-1 h-px ${lineClass}`} />
    </div>

    {/* timeline */}
    <div className="relative">
      {/* vertical line that sits behind all the dots */}
      <div className={`absolute left-[17px] top-10 bottom-10 w-px ${lineClass}`} />

      {entries.map((edu, i) => (
        <TimelineEntry
          key={i}
          edu={edu}
          index={i}
          variant={variant}
        />
      ))}
    </div>
  </div>
);

const Education = () => {
  const formal    = data.filter((e) => e.type === "formal");
  const nonFormal = data.filter((e) => e.type === "bootcamp" || e.type === "course");

  return (
    <div className="relative overflow-hidden bg-pink-blush px-6 md:px-16 py-16 min-h-[calc(100vh-2.75rem)]">
      <div className="absolute bottom-0 left-0 font-bebas leading-none text-pink-hot/10 pointer-events-none select-none" style={{ fontSize: "clamp(100px, 18vw, 220px)" }} aria-hidden>03</div>
      <div className="max-w-5xl mx-auto">

        <div className="font-bebas text-[9px] tracking-[5px] text-pink-deep mb-1">Chapter III</div>
        <h2 className="font-playfair font-black text-4xl md:text-5xl text-zinc-900 mb-12 leading-tight">
          Education
        </h2>

        <TimelineBlock
          entries={formal}
          variant="formal"
          icon={GraduationCap}
          label="FORMAL EDUCATION"
          lineClass="bg-pink-hot/20"
          accentClass="text-pink-deep"
        />

        {nonFormal.length > 0 && (
          <TimelineBlock
            entries={nonFormal}
            variant="bootcamp"
            icon={Laptop}
            label="NON-FORMAL · BOOTCAMP"
            lineClass="bg-violet-200"
            accentClass="text-violet-600"
          />
        )}

      </div>
    </div>
  );
};

export default Education;
