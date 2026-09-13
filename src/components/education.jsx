"use client";

import React, { useState } from "react";
import data from "../data/educations.json";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import HoverText from "./hover-text";
import Sep from "./sep";

const ease = [0.16, 1, 0.3, 1];

function EduCard({ edu }) {
  const gpaLine = edu.description.find((d) => d.includes("GPA"));
  const gpa = gpaLine ? gpaLine.match(/([\d.]+)\/([\d.]+)/) : null;
  const gpaPct = gpa ? (parseFloat(gpa[1]) / parseFloat(gpa[2])) * 100 : null;
  const hasSchol = edu.description.some((d) => d.includes("Scholarship"));
  const hasDuo = edu.description.some((d) => d.includes("Duolingo"));
  const bullets = edu.description.filter(
    (d) => !d.includes("GPA") && !d.includes("Scholarship") && !d.includes("Duolingo")
  );
  return (
    <div className="rounded-[28px] border border-zinc-200 p-8 md:p-10">
      <div className="flex flex-col md:flex-row md:items-start gap-8 md:gap-14">
        <div className="md:w-64 flex-shrink-0">
          <div className="flex items-center gap-2 mb-5">
            <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-zinc-100 text-zinc-600">
              {edu.type === "formal" ? "Formal" : "Bootcamp"}
            </span>
            <span className="text-[11px] text-zinc-400">{edu.period}</span>
          </div>
          <h3 className="font-semibold text-2xl text-zinc-900 leading-tight mb-1.5">{edu.school}</h3>
          <p className="text-sm text-zinc-500">{edu.degree}</p>
          <p className="text-xs text-zinc-400 mt-1">{edu.location}</p>

          {gpa && (
            <div className="mt-6 max-w-[180px]">
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-2xl font-semibold text-zinc-900 leading-none">{gpa[0]}</span>
                <span className="text-[11px] text-zinc-400">GPA</span>
              </div>
              <div className="h-1 rounded-full bg-zinc-100 overflow-hidden">
                <div className="h-full bg-zinc-900 rounded-full" style={{ width: `${gpaPct}%` }} />
              </div>
            </div>
          )}

          {(hasSchol || hasDuo) && (
            <div className="flex flex-wrap gap-2 mt-5">
              {hasSchol && (
                <span className="text-[11px] font-medium text-zinc-600 bg-zinc-50 border border-zinc-200 px-2.5 py-1 rounded-full">
                  Jababeka 75% Scholarship
                </span>
              )}
              {hasDuo && (
                <span className="text-[11px] font-medium text-zinc-600 bg-zinc-50 border border-zinc-200 px-2.5 py-1 rounded-full">
                  Duolingo
                  <Sep />
                  Score 130
                </span>
              )}
            </div>
          )}
        </div>

        {bullets.length > 0 && (
          <ul className="flex-1 space-y-3 md:pt-1">
            {bullets.map((b, j) => (
              <li key={j} className="text-sm text-zinc-500 leading-relaxed pl-4 border-l border-zinc-200">
                {b}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

const Education = () => {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const N = data.length;
  const edu = data[index];

  const go = (delta) => {
    setDir(delta);
    setIndex((i) => (i + delta + N) % N);
  };

  return (
    <div className="bg-white px-6 md:px-16 py-20 md:py-28">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease }}
          className="mb-10 flex items-end justify-between gap-6"
        >
          <div>
            <p className="text-xs font-medium tracking-[0.15em] uppercase text-zinc-400 mb-3">Education</p>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-zinc-900 leading-tight">
              <HoverText text="Background" />
            </h2>
          </div>

          <div className="hidden sm:flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => go(-1)}
              aria-label="Previous"
              className="w-10 h-10 rounded-lg border border-zinc-900 flex items-center justify-center text-zinc-900 hover:bg-zinc-900 hover:text-white transition-colors duration-200"
            >
              <ArrowLeft size={16} strokeWidth={1.5} />
            </button>
            <button
              onClick={() => go(1)}
              aria-label="Next"
              className="w-10 h-10 rounded-lg border border-zinc-900 flex items-center justify-center text-zinc-900 hover:bg-zinc-900 hover:text-white transition-colors duration-200"
            >
              <ArrowRight size={16} strokeWidth={1.5} />
            </button>
          </div>
        </motion.div>

        <div className="flex items-baseline gap-2 mb-5">
          <span className="text-sm font-semibold text-zinc-900 tabular-nums">{String(index + 1).padStart(2, "0")}</span>
          <span className="text-sm text-zinc-400">/ {String(N).padStart(2, "0")}</span>
        </div>

        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait" custom={dir} initial={false}>
            <motion.div
              key={index}
              custom={dir}
              initial={{ opacity: 0, x: dir > 0 ? 40 : -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir > 0 ? -40 : 40 }}
              transition={{ duration: 0.4, ease }}
            >
              <EduCard edu={edu} />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex sm:hidden items-center gap-2 mt-6">
          <button
            onClick={() => go(-1)}
            aria-label="Previous"
            className="w-10 h-10 rounded-lg border border-zinc-900 flex items-center justify-center text-zinc-900"
          >
            <ArrowLeft size={16} strokeWidth={1.5} />
          </button>
          <button
            onClick={() => go(1)}
            aria-label="Next"
            className="w-10 h-10 rounded-lg border border-zinc-900 flex items-center justify-center text-zinc-900"
          >
            <ArrowRight size={16} strokeWidth={1.5} />
          </button>
        </div>

        <div className="mt-8 h-px bg-zinc-200 relative overflow-hidden rounded-full">
          <motion.div
            className="h-px bg-zinc-900 absolute left-0 top-0"
            animate={{ width: `${((index + 1) / N) * 100}%` }}
            transition={{ duration: 0.4, ease }}
          />
        </div>
      </div>
    </div>
  );
};

export default Education;
