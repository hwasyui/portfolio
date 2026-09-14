"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ease = [0.16, 1, 0.3, 1];

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
  const hasContributions = project.projectType === "team" && contributions.length > 0;

  const tabs = [
    { id: "overview", label: "Overview" },
    project.detail && { id: "details", label: "Details" },
    hasContributions && { id: "contributions", label: "My contributions" },
  ].filter(Boolean);

  const [active, setActive] = useState("overview");

  return (
    <div>
      {tabs.length > 1 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={`text-sm font-medium px-4 py-2 rounded-full border transition-colors duration-200 ${
                active === tab.id
                  ? "bg-zinc-900 text-white border-zinc-900"
                  : "bg-white text-zinc-500 border-zinc-200 hover:border-zinc-900 hover:text-zinc-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3, ease }}
        >
          {active === "overview" && (
            <section>
              <h2 className="text-xs font-medium tracking-[0.15em] uppercase text-zinc-400 mb-4">Overview</h2>
              <p className="text-[15px] text-zinc-600 leading-[1.8]">{project.summary}</p>
            </section>
          )}

          {active === "details" && project.detail && (
            <section>
              <h2 className="text-xs font-medium tracking-[0.15em] uppercase text-zinc-400 mb-4">Details</h2>
              {renderDetail(project.detail)}
            </section>
          )}

          {active === "contributions" && hasContributions && (
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
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
