"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import data from "../data/experiences.json";
import { Calendar, ArrowUpRight, Layers, Briefcase } from "lucide-react";
import HoverText from "./hover-text";
import Sep from "./sep";

const ease = [0.16, 1, 0.3, 1];
const FEATURED_SLUGS = [
  "fifgroup-data-engineer",
  "bca-backend-engineer",
  "president-university-english-instructor",
];

function TimelineItem({ item, index, isLast }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.4, ease, delay: index * 0.08 }}
      className="grid grid-cols-1 md:grid-cols-[minmax(0,80px)_1fr] gap-3 md:gap-5"
    >
      <div className="hidden md:flex flex-col items-center">
        <span className="w-3 h-3 rounded-full border-2 border-zinc-900 bg-white flex-shrink-0 mt-1" />
        {!isLast && <span className="w-px flex-1 bg-zinc-200 mt-1" />}
      </div>
      <div
        className={`rounded-[28px] border border-zinc-200 bg-white p-6 md:p-10 flex items-center gap-4 md:gap-6 ${
          isLast ? "" : "mb-6 md:mb-8"
        }`}
        style={{ minHeight: 190 }}
      >
        <Briefcase size={28} strokeWidth={1.5} className="hidden sm:block text-zinc-400 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-xs text-zinc-400 mb-2">
            <span className="inline-flex items-center gap-1.5">
              <Calendar size={11} />
              {item.date}
            </span>
            <span className="hidden sm:inline-block">
              <Sep />
            </span>
            <span>{item.company}</span>
          </div>
          <h3 className="text-lg md:text-2xl font-semibold tracking-tight text-zinc-900 mb-2">{item.title}</h3>
          <p className="text-sm text-zinc-500 leading-relaxed max-w-md mb-3 line-clamp-2">
            {item.responsibilities?.[0]}
          </p>
          <Link
            href={`/experience/${item.slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-900 link-underline"
          >
            View full role <ArrowUpRight size={13} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

const Experience = () => {
  const { workExperiences, organizationalExperiences } = data;
  const featured = FEATURED_SLUGS.map((slug) => workExperiences.find((e) => e.slug === slug)).filter(Boolean);
  const otherWork = workExperiences.filter((e) => !FEATURED_SLUGS.includes(e.slug));
  const otherCount = otherWork.length + organizationalExperiences.length;

  return (
    <div className="bg-white px-6 md:px-16 py-14 md:py-20">
      <div className="max-w-[1600px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease }}
          className="mb-10 md:mb-12"
        >
          <p className="text-xs font-medium tracking-[0.15em] uppercase text-zinc-400 mb-3">Experience</p>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-zinc-900 leading-tight">
            <HoverText text="Work experience" />
          </h2>
        </motion.div>

        <div>
          {featured.map((item, i) => (
            <TimelineItem key={item.slug} item={item} index={i} isLast={false} />
          ))}

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, ease, delay: featured.length * 0.08 }}
            className="grid grid-cols-1 md:grid-cols-[minmax(0,80px)_1fr] gap-3 md:gap-5"
          >
            <div className="hidden md:flex justify-center">
              <span className="w-3 h-3 rounded-full bg-zinc-200 flex-shrink-0 mt-1" />
            </div>
            <Link
              href="/experience"
              className="group rounded-[28px] bg-zinc-900 hover:bg-zinc-800 p-6 md:p-10 flex items-center gap-4 md:gap-6 transition-colors duration-200"
              style={{ minHeight: 190 }}
            >
              <Layers size={28} strokeWidth={1.5} className="hidden sm:block text-zinc-500 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <h3 className="flex items-center gap-2 text-lg md:text-2xl font-semibold tracking-tight text-white mb-1.5">
                  View other experience
                  <ArrowUpRight
                    size={20}
                    className="text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
                  />
                </h3>
                <p className="text-[15px] text-zinc-400 leading-relaxed max-w-md">
                  {otherCount} more role{otherCount === 1 ? "" : "s"}: part-time, freelance, and organizational.
                </p>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Experience;
