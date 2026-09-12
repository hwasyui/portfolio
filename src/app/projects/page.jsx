import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import projects from "@/data/projects.json";
import ProjectCard from "@/components/project-card";

export const metadata = {
  title: "Projects",
  description: "All projects by Angelica Suti Whiharto.",
};

export default function ProjectsArchivePage() {
  return (
    <main className="bg-white min-h-screen pt-28 pb-24 px-6 md:px-16">
      <div className="max-w-6xl mx-auto">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors mb-10"
        >
          <ArrowLeft size={14} /> Back home
        </Link>

        <p className="text-xs font-medium tracking-[0.15em] uppercase text-zinc-400 mb-3">Projects</p>
        <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-zinc-900 leading-tight mb-2">
          All work
        </h1>
        <p className="text-sm text-zinc-500 mb-14">{projects.length} projects, solo and with teams.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i % 3} wide />
          ))}
        </div>
      </div>
    </main>
  );
}
