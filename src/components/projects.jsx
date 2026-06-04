"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
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
      <div className="absolute bottom-0 left-0 font-bebas leading-none text-pink-hot/10 pointer-events-none select-none" style={{ fontSize: "clamp(100px, 18vw, 220px)" }} aria-hidden>05</div>
      <div className="max-w-6xl mx-auto">

        <div className="font-bebas text-[9px] tracking-[5px] text-pink-hot mb-1">Chapter V</div>
        <h2 className="font-playfair font-black text-4xl md:text-5xl text-zinc-900 mb-8 leading-tight">
          Projects
        </h2>

        {/* filters: category tabs and type toggle */}
        <div className="flex items-end justify-between border-b border-zinc-200 mb-10">
          <div className="flex flex-wrap">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`font-bebas text-[10px] tracking-[3px] px-4 pb-3 pt-1 border-b-2 -mb-px transition-all duration-150
                  ${selectedCategory === cat
                    ? "border-pink-hot text-pink-hot"
                    : "border-transparent text-zinc-400 hover:text-zinc-600"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 pb-3">
            {TYPE_FILTERS.map(({ value, label, icon: Icon }) => (
              <button
                key={value}
                onClick={() => handleTypeChange(value)}
                className={`flex items-center gap-1 font-bebas text-[9px] tracking-[2px] transition-all duration-150
                  ${selectedType === value ? "text-zinc-900" : "text-zinc-300 hover:text-zinc-500"}`}
              >
                {Icon && <Icon size={10} />}
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* project grid */}
        {visible.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {visible.map((project, i) => (
              <motion.div
                key={`${selectedCategory}-${selectedType}-${i}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <ProjectCard
                  project={project}
                  onClick={() => setSelectedProject(project)}
                />
              </motion.div>
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
