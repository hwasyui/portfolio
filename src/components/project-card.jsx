"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Users, User, ArrowUpRight } from "lucide-react";

const ease = [0.16, 1, 0.3, 1];

const ProjectCard = ({ project, index = 0, wide = false }) => {
  const isTeam = project.projectType === "team";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, ease, delay: index * 0.04 }}
      className={wide ? "w-full" : "w-[340px] md:w-[440px] flex-shrink-0"}
    >
      <Link href={`/projects/${project.slug}`} draggable={false} className="group block">
        <div className="relative h-[240px] md:h-[300px] rounded-[28px] overflow-hidden bg-zinc-100">
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 90vw, 440px"
              draggable={false}
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-xs text-zinc-400 text-center px-6">
              No public documentation
            </div>
          )}

          <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
            {project.year && (
              <span className="text-[11px] font-medium text-white/90 bg-black/20 backdrop-blur-sm px-2 py-1 rounded-full">
                {project.year}
              </span>
            )}
            <span className="flex items-center gap-1 text-[10px] font-medium text-white/90 bg-black/20 backdrop-blur-sm px-2 py-1 rounded-full">
              {isTeam ? <Users size={11} /> : <User size={11} />}
              {isTeam ? "Team" : "Solo"}
            </span>
          </div>
        </div>

        <div className="pt-4">
          <div className="text-[11px] font-medium tracking-[0.1em] uppercase text-zinc-400 mb-1.5">
            {(project.categories ?? [project.category])[0]}
          </div>
          <div className="flex items-center justify-between gap-3">
            <h3 className="font-semibold text-lg text-zinc-900 leading-snug link-underline">
              {project.title}
            </h3>
            <ArrowUpRight
              size={16}
              className="flex-shrink-0 text-zinc-300 group-hover:text-zinc-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
            />
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProjectCard;
