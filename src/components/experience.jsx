"use client";

import React from "react";
import Link from "next/link";
import data from "../data/experiences.json";
import { Calendar, ArrowUpRight, Layers, Briefcase } from "lucide-react";
import ExperienceStack from "./experience-stack";
import Sep from "./sep";

function renderWorkItem(item) {
  return (
    <div
      className="h-full rounded-[28px] border border-zinc-200 bg-white p-8 md:p-10 flex items-center gap-6"
      style={{ minHeight: 190 }}
    >
      <Briefcase size={28} strokeWidth={1.5} className="text-zinc-400 flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 text-xs text-zinc-400 mb-2">
          <Calendar size={11} />
          {item.date}
          <Sep />
          {item.company}
        </div>
        <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-zinc-900 mb-2">{item.title}</h3>
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
  );
}

const Experience = () => {
  const { workExperiences, organizationalExperiences } = data;
  const internships = workExperiences.filter((e) => e.type === "Internship");
  const otherWork = workExperiences.filter((e) => e.type !== "Internship");
  const otherCount = otherWork.length + organizationalExperiences.length;

  return (
    <ExperienceStack
      eyebrow="Experience"
      heading="Work experience"
      items={internships}
      renderItem={renderWorkItem}
      ctaHref="/experience"
      ctaTitle="View other experience"
      ctaDesc={`${otherCount} more role${otherCount === 1 ? "" : "s"}: part-time, freelance, and organizational.`}
      ctaIcon={Layers}
    />
  );
};

export default Experience;
