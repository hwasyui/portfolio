"use client";

import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Globe, FileText, Users, User, ChevronDown, ChevronUp } from "lucide-react";
import { FaGithub } from "react-icons/fa6";

const CONTRIBUTIONS_PREVIEW = 4;

// detail can be a plain string OR an array where:
//   string item  → paragraph
//   string[]     → bullet list
const renderDetail = (detail) => {
  if (!detail) return null;
  if (typeof detail === "string") {
    return <p className="text-sm text-zinc-600 leading-relaxed">{detail}</p>;
  }
  return (
    <div className="space-y-3">
      {detail.map((block, i) => {
        if (typeof block === "string") {
          return <p key={i} className="text-sm text-zinc-600 leading-relaxed">{block}</p>;
        }
        if (Array.isArray(block)) {
          return (
            <ul key={i} className="space-y-1.5 pl-1">
              {block.map((item, j) => (
                <li key={j} className="flex gap-2 text-sm text-zinc-600">
                  <span className="text-pink-hot mt-0.5 flex-shrink-0">·</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          );
        }
        return null;
      })}
    </div>
  );
};

const ProjectModal = ({ project, open, onClose }) => {
  const [showSummary, setShowSummary] = useState(false);
  const [showAllContributions, setShowAllContributions] = useState(false);

  useEffect(() => {
    if (!open) {
      setShowSummary(false);
      setShowAllContributions(false);
    }
  }, [open]);

  if (!project) return null;

  const isTeam = project.projectType === "team";
  const contributions = project.contributions ?? [];
  const visibleContributions = showAllContributions
    ? contributions
    : contributions.slice(0, CONTRIBUTIONS_PREVIEW);
  const hiddenCount = contributions.length - CONTRIBUTIONS_PREVIEW;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>

        {/* image */}
        <div className="relative">
          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-52 object-cover rounded-t-2xl"
            />
          ) : (
            <div className="w-full h-40 flex items-center justify-center bg-pink-pale rounded-t-2xl text-xs text-zinc-400">
              CONFIDENTIAL / DOCUMENTATION GONE
            </div>
          )}

          <div className={`absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-[9px] font-bebas tracking-[2px] shadow
            ${isTeam
              ? "bg-zinc-900/85 text-white backdrop-blur-sm"
              : "bg-white/85 text-zinc-600 backdrop-blur-sm border border-zinc-200/60"
            }`}
          >
            {isTeam ? <Users size={11} /> : <User size={11} />}
            {isTeam ? "TEAM PROJECT" : "SOLO PROJECT"}
          </div>
        </div>

        <div className="px-6 pb-6 pt-4">

          {/* category + title */}
          <div className="mb-4">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
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
            <DialogTitle className="mt-1">{project.title}</DialogTitle>
          </div>

          {/* view toggle */}
          <div className="flex gap-2 mb-5">
            <button
              onClick={() => setShowSummary(false)}
              className={`font-bebas text-[9px] tracking-[3px] px-3 py-1.5 rounded-full border transition-all duration-150
                ${!showSummary
                  ? "bg-pink-hot border-pink-hot text-white"
                  : "border-zinc-200 text-zinc-400 hover:border-pink-hot hover:text-pink-hot"
                }`}
            >
              {isTeam ? "Details & Contributions" : "Details"}
            </button>
            <button
              onClick={() => setShowSummary(true)}
              className={`font-bebas text-[9px] tracking-[3px] px-3 py-1.5 rounded-full border transition-all duration-150
                ${showSummary
                  ? "bg-pink-hot border-pink-hot text-white"
                  : "border-zinc-200 text-zinc-400 hover:border-pink-hot hover:text-pink-hot"
                }`}
            >
              Summary
            </button>
          </div>

          {/* two-column body */}
          <div className="flex flex-col md:flex-row gap-6">

            {/* main content */}
            <div className="flex-1 min-w-0 space-y-5">
              {showSummary ? (
                <p className="text-sm text-zinc-600 leading-relaxed">{project.summary}</p>
              ) : (
                <>
                  {project.detail && (
                    <div>
                      <div className="font-bebas text-[10px] tracking-[3px] text-zinc-500 mb-3">Project Details</div>
                      {renderDetail(project.detail)}
                    </div>
                  )}

                  {isTeam && contributions.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Users size={12} className="text-pink-hot" />
                        <span className="font-bebas text-[10px] tracking-[3px] text-zinc-500">My Contributions</span>
                      </div>
                      <ul className="space-y-2">
                        {visibleContributions.map((item, i) => (
                          <li key={i} className="flex gap-3 border-l-2 border-pink-hot/30 pl-3 py-1 bg-pink-pale/40 rounded-r-lg">
                            <span className="font-bebas text-[10px] text-pink-hot/60 mt-0.5 flex-shrink-0 w-4">{String(i + 1).padStart(2, "0")}</span>
                            <span className="text-xs text-zinc-600 leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                      {contributions.length > CONTRIBUTIONS_PREVIEW && (
                        <button
                          onClick={() => setShowAllContributions(prev => !prev)}
                          className="mt-3 flex items-center gap-1.5 font-bebas text-[9px] tracking-[2px] text-zinc-400 hover:text-pink-hot transition-colors duration-150"
                        >
                          {showAllContributions
                            ? <><ChevronUp size={11} /> Show less</>
                            : <><ChevronDown size={11} /> +{hiddenCount} more contributions</>
                          }
                        </button>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>

            {/* sidebar: tech stack + links */}
            <div className="md:w-48 flex-shrink-0 space-y-5">
              <div>
                <div className="font-bebas text-[9px] tracking-[4px] text-zinc-400 mb-2">Tech Stack</div>
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((t, i) => (
                    <Badge key={i} variant="outline" className="text-xs border-pink-hot/30 text-pink-deep">
                      {t}
                    </Badge>
                  ))}
                </div>
              </div>

              {(project.url || project.gitrepo || project.doc) && (
                <div>
                  <div className="font-bebas text-[9px] tracking-[4px] text-zinc-400 mb-2">Links</div>
                  <div className="flex flex-col gap-2">
                    {project.url && (
                      <Button variant="outline" size="sm" asChild className="gap-1.5 border-pink-hot text-pink-hot hover:bg-pink-hot hover:text-white transition-colors text-xs justify-start">
                        <a href={project.url} target="_blank" rel="noopener noreferrer">
                          <Globe size={13} /> Live Demo
                        </a>
                      </Button>
                    )}
                    {project.gitrepo && (
                      <Button variant="outline" size="sm" asChild className="gap-1.5 border-zinc-300 hover:border-pink-hot hover:text-pink-hot transition-colors text-xs justify-start">
                        <a href={project.gitrepo} target="_blank" rel="noopener noreferrer">
                          <FaGithub size={13} /> GitHub
                        </a>
                      </Button>
                    )}
                    {project.doc && (
                      <Button variant="outline" size="sm" asChild className="gap-1.5 border-zinc-300 hover:border-pink-hot hover:text-pink-hot transition-colors text-xs justify-start">
                        <a href={project.doc} target="_blank" rel="noopener noreferrer">
                          <FileText size={13} /> Docs
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectModal;
