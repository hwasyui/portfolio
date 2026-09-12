"use client";

import React from "react";
import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1];

function Reveal({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

function renderDetail(detail) {
  if (!detail) return null;
  if (typeof detail === "string") {
    return <p className="text-[15px] text-zinc-600 leading-[1.8]">{detail}</p>;
  }
  return (
    <div className="space-y-4">
      {detail.map((block, i) => {
        if (typeof block === "string") {
          return <p key={i} className="text-[15px] text-zinc-600 leading-[1.8]">{block}</p>;
        }
        if (Array.isArray(block)) {
          return (
            <ul key={i} className="space-y-2 pl-1">
              {block.map((item, j) => (
                <li key={j} className="flex gap-2.5 text-[15px] text-zinc-600 leading-relaxed pl-3 border-l border-zinc-200">
                  {item}
                </li>
              ))}
            </ul>
          );
        }
        return null;
      })}
    </div>
  );
}

export default function ProjectDetailBody({ project }) {
  const contributions = project.contributions ?? [];

  return (
    <div className="space-y-12">
      <Reveal>
        <section>
          <h2 className="text-xs font-medium tracking-[0.15em] uppercase text-zinc-400 mb-4">Overview</h2>
          <p className="text-[15px] text-zinc-600 leading-[1.8]">{project.summary}</p>
        </section>
      </Reveal>

      {project.detail && (
        <Reveal delay={0.06}>
          <section>
            <h2 className="text-xs font-medium tracking-[0.15em] uppercase text-zinc-400 mb-4">Details</h2>
            {renderDetail(project.detail)}
          </section>
        </Reveal>
      )}

      {project.projectType === "team" && contributions.length > 0 && (
        <Reveal delay={0.12}>
          <section>
            <h2 className="text-xs font-medium tracking-[0.15em] uppercase text-zinc-400 mb-4">My contributions</h2>
            <ul className="space-y-3">
              {contributions.map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span className="text-xs font-medium text-zinc-300 mt-0.5 flex-shrink-0 w-5 tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[15px] text-zinc-600 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </section>
        </Reveal>
      )}
    </div>
  );
}
