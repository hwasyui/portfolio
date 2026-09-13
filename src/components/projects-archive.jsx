"use client";

import React, { useMemo, useState } from "react";
import ProjectCard from "@/components/project-card";

export default function ProjectsArchive({ projects }) {
  const categories = useMemo(() => {
    const set = new Set();
    projects.forEach((p) => (p.categories ?? [p.category]).forEach((c) => c && set.add(c)));
    return ["All", ...Array.from(set)];
  }, [projects]);

  const [active, setActive] = useState("All");

  const filtered =
    active === "All"
      ? projects
      : projects.filter((p) => (p.categories ?? [p.category]).includes(active));

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`text-xs font-medium px-3.5 py-2 rounded-full border transition-colors duration-200 ${
              active === cat
                ? "bg-zinc-900 border-zinc-900 text-white"
                : "bg-white border-zinc-200 text-zinc-600 hover:border-zinc-900 hover:text-zinc-900"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
        {filtered.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i % 3} wide />
        ))}
      </div>
    </div>
  );
}
