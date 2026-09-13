import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Globe, FileText, Users, User } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { Badge } from "@/components/ui/badge";
import projects from "@/data/projects.json";
import ProjectDetailBody from "@/components/project-detail-body";
import ProjectHeroImage from "@/components/project-hero-image";
import BackLink from "@/components/back-link";
import HoverText from "@/components/hover-text";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
  };
}

export default async function ProjectDetailPage({ params }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const isTeam = project.projectType === "team";
  const idx = projects.findIndex((p) => p.slug === slug);
  const prevProject = projects[(idx - 1 + projects.length) % projects.length];
  const nextProject = projects[(idx + 1) % projects.length];

  return (
    <main className="bg-white min-h-screen pb-24">
      <div className="max-w-4xl mx-auto px-6 md:px-16 pt-24 mb-8">
        <BackLink
          archivePath="/projects"
          archiveLabel="Back to all projects"
          homeHref="/#projects"
          homeLabel="Back to projects"
        />
      </div>

      <div className="max-w-5xl mx-auto px-6 md:px-16 mb-10">
        <div className={`relative rounded-[28px] overflow-hidden ${project.image ? "h-[260px] md:h-[420px]" : "h-[200px] bg-zinc-50 flex items-center justify-center"}`}>
          {project.image ? (
            <>
              <ProjectHeroImage src={project.image} alt={project.title} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            </>
          ) : (
            <span className="text-xs text-zinc-400">No public documentation</span>
          )}

          <div className={`absolute inset-x-0 bottom-0 p-6 md:p-10 ${project.image ? "" : "hidden"}`}>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              {(project.categories ?? [project.category]).map((cat, i) => (
                <span key={i} className="text-[11px] font-medium text-white bg-white/15 backdrop-blur-sm px-2.5 py-1 rounded-full">
                  {cat}
                </span>
              ))}
              <span className="text-[11px] font-medium text-white bg-white/15 backdrop-blur-sm px-2.5 py-1 rounded-full inline-flex items-center gap-1">
                {isTeam ? <Users size={11} /> : <User size={11} />}
                {isTeam ? "Team project" : "Solo project"}
              </span>
              {project.year && <span className="text-[11px] text-white/70">{project.year}</span>}
            </div>
            <h1 className="text-2xl md:text-4xl font-semibold tracking-tight text-white leading-tight">
              <HoverText text={project.title} />
            </h1>
          </div>
        </div>

        {!project.image && (
          <div className="mt-6">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              {(project.categories ?? [project.category]).map((cat, i) => (
                <span key={i} className="text-xs font-medium text-zinc-500 bg-zinc-50 border border-zinc-200 px-2.5 py-1 rounded-full">
                  {cat}
                </span>
              ))}
              <span className="text-xs font-medium text-zinc-500 bg-zinc-50 border border-zinc-200 px-2.5 py-1 rounded-full inline-flex items-center gap-1">
                {isTeam ? <Users size={11} /> : <User size={11} />}
                {isTeam ? "Team project" : "Solo project"}
              </span>
              {project.year && <span className="text-xs text-zinc-400">{project.year}</span>}
            </div>
            <h1 className="text-2xl md:text-4xl font-semibold tracking-tight text-zinc-900 leading-tight">
              <HoverText text={project.title} />
            </h1>
          </div>
        )}
      </div>

      <div className="max-w-4xl mx-auto px-6 md:px-16">
        <div className="flex flex-col md:flex-row gap-12">
          <div className="flex-1 min-w-0">
            <ProjectDetailBody project={project} />
          </div>

          <div className="md:w-56 flex-shrink-0 space-y-8 md:sticky md:top-24 md:self-start">
            <div>
              <div className="text-xs font-medium tracking-[0.1em] uppercase text-zinc-400 mb-3">Tech stack</div>
              <div className="flex flex-wrap gap-1.5">
                {project.tech.map((t, i) => (
                  <Badge key={i} variant="outline" className="text-xs border-zinc-200 text-zinc-600">{t}</Badge>
                ))}
              </div>
            </div>

            {(project.url || project.gitrepo || project.gitrepos?.length > 0 || project.doc) && (
              <div>
                <div className="text-xs font-medium tracking-[0.1em] uppercase text-zinc-400 mb-3">Links</div>
                <div className="flex flex-col gap-2">
                  {project.url && (
                    <a href={project.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-zinc-700 hover:text-zinc-900 border border-zinc-200 hover:border-zinc-900 rounded-lg px-3 py-2 transition-colors">
                      <Globe size={13} /> Live demo
                    </a>
                  )}
                  {project.gitrepos?.length > 0
                    ? project.gitrepos.map(({ label, url }) => (
                        <a key={label} href={url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-zinc-700 hover:text-zinc-900 border border-zinc-200 hover:border-zinc-900 rounded-lg px-3 py-2 transition-colors">
                          <FaGithub size={13} /> {label}
                        </a>
                      ))
                    : project.gitrepo && (
                        <a href={project.gitrepo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-zinc-700 hover:text-zinc-900 border border-zinc-200 hover:border-zinc-900 rounded-lg px-3 py-2 transition-colors">
                          <FaGithub size={13} /> GitHub
                        </a>
                      )}
                  {project.doc && (
                    <a href={project.doc} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-zinc-700 hover:text-zinc-900 border border-zinc-200 hover:border-zinc-900 rounded-lg px-3 py-2 transition-colors">
                      <FileText size={13} /> Documentation
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 md:px-16 mt-20 pt-10 border-t border-zinc-100">
        <div className="flex items-center justify-between gap-4">
          <Link href={`/projects/${prevProject.slug}`} className="group flex items-center gap-3 min-w-0">
            <span className="w-10 h-10 rounded-full border border-zinc-900 flex items-center justify-center flex-shrink-0 text-zinc-900 group-hover:bg-zinc-900 group-hover:text-white transition-colors duration-200">
              <ArrowLeft size={16} strokeWidth={1.5} />
            </span>
            <span className="min-w-0 hidden sm:block">
              <span className="block text-xs text-zinc-400">Previous</span>
              <span className="block text-sm font-medium text-zinc-900 truncate">{prevProject.title}</span>
            </span>
          </Link>
          <Link href={`/projects/${nextProject.slug}`} className="group flex items-center gap-3 min-w-0 text-right">
            <span className="min-w-0 hidden sm:block">
              <span className="block text-xs text-zinc-400">Next</span>
              <span className="block text-sm font-medium text-zinc-900 truncate">{nextProject.title}</span>
            </span>
            <span className="w-10 h-10 rounded-full border border-zinc-900 flex items-center justify-center flex-shrink-0 text-zinc-900 group-hover:bg-zinc-900 group-hover:text-white transition-colors duration-200">
              <ArrowRight size={16} strokeWidth={1.5} />
            </span>
          </Link>
        </div>
      </div>
    </main>
  );
}
