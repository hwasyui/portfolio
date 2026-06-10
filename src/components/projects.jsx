"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp, Users, User } from "lucide-react";
import data from "../data/projects.json";
import ProjectCard from "./project-card.jsx";
import ProjectModal from "./project-modal.jsx";

const CATEGORIES = ["All", "Artificial Intelligence", "Web Development", "Mobile", "Other"];
const TYPE_FILTERS = [
  { value: "all",        label: "All Types",  icon: null   },
  { value: "individual", label: "Individual", icon: User   },
  { value: "team",       label: "Team",       icon: Users  },
];
const INITIAL_VISIBLE = 6;

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedType, setSelectedType]         = useState("all");
  const [selectedProject, setSelectedProject]   = useState(null);
  const [showAll, setShowAll]                   = useState(false);

  const filtered = data.filter((p) => {
    const matchCategory = selectedCategory === "All" || p.categories.includes(selectedCategory);
    const matchType     = selectedType === "all"     || p.projectType === selectedType;
    return matchCategory && matchType;
  });

  const visible = showAll ? filtered : filtered.slice(0, INITIAL_VISIBLE);
  const hasMore = filtered.length > INITIAL_VISIBLE;

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    setShowAll(false);
  };

  const handleTypeChange = (type) => {
    setSelectedType(type);
    setShowAll(false);
  };

  return (
    <div className="relative overflow-hidden bg-pink-pale px-6 md:px-16 py-16 min-h-[calc(100vh-2.75rem)]">
      <div className="absolute bottom-0 left-0 font-bebas leading-none text-pink-hot/10 pointer-events-none select-none text-[120px] md:text-[180px] lg:text-[220px]" aria-hidden>05</div>
      <div className="max-w-6xl mx-auto">

        <div className="font-bebas text-[9px] tracking-[5px] text-pink-hot mb-1">Chapter V</div>
        <h2 className="font-playfair font-black text-4xl md:text-5xl text-zinc-900 mb-8 leading-tight">
          Projects
        </h2>

        {/* filters - two dropdowns */}
        <div className="flex flex-wrap items-center gap-3 mb-10">
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="appearance-none font-bebas text-xs tracking-[2px] bg-white border border-zinc-200 text-zinc-600 pl-4 pr-8 py-2 rounded-full cursor-pointer focus:outline-none focus:border-pink-hot transition-colors"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
          </div>

          <div className="relative">
            <select
              value={selectedType}
              onChange={(e) => handleTypeChange(e.target.value)}
              className="appearance-none font-bebas text-xs tracking-[2px] bg-white border border-zinc-200 text-zinc-600 pl-4 pr-8 py-2 rounded-full cursor-pointer focus:outline-none focus:border-pink-hot transition-colors"
            >
              {TYPE_FILTERS.map(({ value, label }) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
            <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
          </div>

          <span className="font-bebas text-[10px] tracking-[2px] text-zinc-400">
            {filtered.length} project{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>

        {/* project grid */}
        {visible.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {visible.map((project, i) => (
              <div key={`${selectedCategory}-${selectedType}-${i}`}>
                <ProjectCard
                  project={project}
                  onClick={() => setSelectedProject(project)}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="font-bebas text-[11px] tracking-[4px] text-zinc-400">No projects match this filter</p>
          </div>
        )}

        {/* show more / show less */}
        {hasMore && (
          <div className="flex justify-center mt-10">
            <button
              onClick={() => setShowAll((prev) => !prev)}
              className="flex items-center gap-2 font-bebas text-[10px] tracking-[3px]
                         text-pink-hot border border-pink-hot px-6 py-2.5 rounded-full
                         hover:bg-pink-hot hover:text-white transition-all duration-200"
            >
              {showAll ? (
                <><ChevronUp size={13} /> Show Less</>
              ) : (
                <><ChevronDown size={13} /> Show All {filtered.length} Projects</>
              )}
            </button>
          </div>
        )}
      </div>

      {/* project detail modal */}
      <ProjectModal
        project={selectedProject}
        open={selectedProject !== null}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
};

export default Projects;
