"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Users, User } from "lucide-react";

// project card that opens a detail modal on click
const ProjectCard = ({ project, onClick }) => {
  const isTeam = project.projectType === "team";

  return (
    <div
      onClick={onClick}
      className="flex flex-col h-full bg-white border border-zinc-100
                 rounded-2xl overflow-hidden shadow-sm cursor-pointer
                 hover:shadow-md hover:border-pink-hot/40 hover:-translate-y-1
                 transition-all duration-300 group"
    >
      {/* image or placeholder */}
      <div className="relative">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-40 object-cover group-hover:brightness-95 transition-all duration-300"
          />
        ) : (
          <div className="w-full h-40 flex items-center justify-center bg-pink-pale text-xs text-zinc-400 font-medium text-center px-4">
            CONFIDENTIAL / DOCUMENTATION GONE
          </div>
        )}

        {/* team/solo badge in the top right corner of the image */}
        <div className={`absolute top-2.5 right-2.5 flex items-center gap-1 px-2 py-1 rounded-full text-[9px] font-bebas tracking-[2px] shadow-sm
          ${isTeam
            ? "bg-zinc-900/80 text-white backdrop-blur-sm"
            : "bg-white/80 text-zinc-600 backdrop-blur-sm border border-zinc-200/60"
          }`}
        >
          {isTeam ? <Users size={10} /> : <User size={10} />}
          {isTeam ? "TEAM" : "SOLO"}
        </div>
      </div>

      <div className="flex flex-col flex-1 p-5 space-y-2">
        {/* category labels + year */}
        <div className="flex flex-wrap items-center gap-1.5 justify-between">
          <div className="flex flex-wrap items-center gap-1">
            {(project.categories ?? [project.category]).map((cat, i) => (
              <span key={i} className="font-bebas text-[9px] tracking-[1px] text-pink-deep bg-pink-hot/10 px-2 py-0.5 rounded-full">
                {cat}
              </span>
            ))}
          </div>
          {project.year && (
            <span className="font-bebas text-[9px] tracking-[2px] text-zinc-400">{project.year}</span>
          )}
        </div>

        {/* title */}
        <h3 className="font-playfair font-bold text-base text-zinc-900 leading-snug group-hover:text-pink-hot transition-colors duration-200">
          {project.title}
        </h3>

        {/* summary preview */}
        <p className="text-xs text-zinc-500 leading-relaxed line-clamp-3 flex-1">
          {project.summary}
        </p>

        {/* tech stack (first 4) */}
        <div className="flex flex-wrap gap-1 pt-1">
          {project.tech.slice(0, 4).map((t, i) => (
            <Badge
              key={i}
              variant="outline"
              className="text-[10px] border-zinc-200 px-2 py-0"
            >
              {t}
            </Badge>
          ))}
          {project.tech.length > 4 && (
            <span className="text-[10px] text-zinc-400 px-1 py-0.5">+{project.tech.length - 4}</span>
          )}
        </div>

        {/* click hint */}
        <div className="pt-1 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <span className="font-bebas text-[9px] tracking-[3px] text-pink-hot">View Details</span>
          <span className="text-pink-hot text-xs">→</span>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
