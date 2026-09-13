"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import skills from "../data/skills.json";
import { CAPABILITIES } from "../data/capabilities";
import FocusList from "./focus-list";
import HoverText from "./hover-text";

const ease = [0.16, 1, 0.3, 1];

const TABS = [
  ...CAPABILITIES.map((c) => ({ num: c.num, title: c.label, desc: c.desc, kind: "capability", cap: c })),
  { num: "04", title: "Languages", desc: "Programming languages I write in day to day.", kind: "languages" },
  { num: "05", title: "Tools & Workflow", desc: "The infra, testing, and dev tools around the code.", kind: "tools" },
];

const Chip = ({ label }) => (
  <span className="inline-block px-3.5 py-2 text-sm font-medium text-zinc-600 bg-zinc-50 border border-zinc-200 rounded-full">
    {label}
  </span>
);

function CapabilityPane({ cap }) {
  const groups = skills[cap.dataKey] ?? {};
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-8">
      {Object.entries(groups).map(([group, items]) => (
        <div key={group}>
          <p className="text-xs font-medium tracking-[0.1em] uppercase text-zinc-400 mb-3">{group}</p>
          <div className="flex flex-wrap gap-1.5">
            {items.map((item) => (
              <Chip key={item} label={item} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function LanguagesPane() {
  return (
    <div className="flex flex-wrap gap-2">
      {skills["Programming Languages"].map((lang) => (
        <Chip key={lang} label={lang} />
      ))}
    </div>
  );
}

function ToolsPane() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-8">
      {Object.entries(skills["Tools & Workflow"]).map(([group, items]) => (
        <div key={group}>
          <p className="text-xs font-medium tracking-[0.1em] uppercase text-zinc-400 mb-3">{group}</p>
          <div className="flex flex-wrap gap-1.5">
            {items.map((tool) => (
              <Chip key={tool} label={tool} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function ActivePane({ tab }) {
  if (tab.kind === "capability") return <CapabilityPane cap={tab.cap} />;
  if (tab.kind === "languages") return <LanguagesPane />;
  return <ToolsPane />;
}

const Skills = () => {
  const [active, setActive] = useState(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const toggle = (i) => setActive((cur) => (cur === i ? null : i));

  return (
    <div className="bg-white px-6 md:px-16 py-20 md:py-28">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease }}
          className="mb-12"
        >
          <p className="text-xs font-medium tracking-[0.15em] uppercase text-zinc-400 mb-3">Skills</p>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-zinc-900 leading-tight">
            <HoverText text="Capabilities" />
          </h2>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-10 md:gap-16">
          <div
            style={
              isDesktop
                ? {
                    maxWidth: active === null ? "36rem" : "340px",
                    marginLeft: active === null ? "calc((100% - 36rem) / 2)" : "0px",
                  }
                : undefined
            }
            className="transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] w-full max-w-xl mx-auto flex-shrink-0"
          >
            <FocusList items={TABS} activeIndex={active} onSelect={toggle} />
          </div>

          <AnimatePresence>
            {active !== null && (
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 16 }}
                transition={{ duration: 0.5, ease }}
                className="flex-1 min-w-0 md:pt-2"
              >
                <ActivePane tab={TABS[active]} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Skills;
