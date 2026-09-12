"use client";

import React from "react";
import { Compass, Layers, Activity, FileText } from "lucide-react";
import CardStack from "@/components/card-stack";

const WORK_PIPELINE = [
  {
    icon: Compass,
    title: "Map the constraints",
    desc: "Data volume, latency budget, and failure modes, mapped out before writing a line of code.",
  },
  {
    icon: Layers,
    title: "Build in layers",
    desc: "Ship a working core first, then harden it, one layer at a time.",
  },
  {
    icon: Activity,
    title: "Instrument everything",
    desc: "Logging and dashboards from day one, so a problem shows up on a graph before it's an incident.",
  },
  {
    icon: FileText,
    title: "Document the handoff",
    desc: "Clear API contracts and setup docs, so the next engineer isn't reverse-engineering intent.",
  },
];

function renderPipelineCard(item, i, active) {
  const Icon = item.icon;
  return (
    <div className="h-full rounded-[28px] border border-zinc-200 bg-white p-8 md:p-10 flex items-center gap-6">
      <Icon size={28} strokeWidth={1.5} className="text-zinc-400 flex-shrink-0" />
      <div>
        <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-zinc-900 mb-1.5">{item.title}</h3>
        <p className="text-[15px] text-zinc-500 leading-relaxed max-w-md">{item.desc}</p>
      </div>
    </div>
  );
}

const HowIWork = () => {
  return (
    <CardStack
      eyebrow="How I work"
      heading="My work pipeline"
      description="Same shape whether it's a weekend build or a three-month internship deliverable, four steps, every time."
      items={WORK_PIPELINE}
      renderCard={renderPipelineCard}
    />
  );
};

export default HowIWork;
