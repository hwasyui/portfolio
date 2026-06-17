"use client";

import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Users, User } from "lucide-react";

const ProjectCard = ({ project, onClick, index = 0 }) => {
  const isTeam = project.projectType === "team";

  return (
    <motion.div
      onClick={onClick}
      initial={{ opacity: 0, y: 36, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.08 }}
      whileHover={{ y: -7, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 380, damping: 24, delay: index * 0.06 }}
      className="flex flex-col h-full bg-white border border-pink-candy/30
                 rounded-2xl overflow-hidden shadow-sm cursor-pointer
                 hover:shadow-xl hover:shadow-pink-hot/10 hover:border-pink-hot/40 group"
    >
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

        <div className={`absolute top-2.5 right-2.5 flex items-center gap-1 px-2 py-1 rounded-full text-[9px] font-bebas tracking-[2px] shadow-sm
          ${isTeam
            ? "bg-zinc-900/80 text-white backdrop-blur-sm"
            : "bg-white/85 text-zinc-600 backdrop-blur-sm border border-zinc-200/60"
          }`}
        >
          {isTeam ? <Users size={10} /> : <User size={10} />}
          {isTeam ? "TEAM" : "SOLO"}
        </div>
      </div>

      <div className="flex flex-col flex-1 p-5 space-y-2">
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

        <h3 className="font-playfair font-bold text-base text-zinc-900 leading-snug group-hover:text-pink-hot transition-colors duration-200">
          {project.title}
        </h3>

        <p className="text-xs text-zinc-500 leading-relaxed line-clamp-3 flex-1">
          {project.summary}
        </p>

        <div className="flex flex-wrap gap-1 pt-1">
          {project.tech.slice(0, 4).map((t, i) => (
            <Badge
              key={i}
              variant="outline"
              className="text-[10px] border-pink-candy/40 text-zinc-500 px-2 py-0"
            >
              {t}
            </Badge>
          ))}
          {project.tech.length > 4 && (
            <span className="text-[10px] text-zinc-400 px-1 py-0.5">+{project.tech.length - 4}</span>
          )}
        </div>

        <div className="pt-1 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <span className="font-bebas text-[9px] tracking-[3px] text-pink-hot">View Details</span>
          <span className="text-pink-hot text-xs">→</span>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
