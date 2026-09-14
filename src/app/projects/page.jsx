import { ArrowLeft } from "lucide-react";
import projects from "@/data/projects.json";
import ProjectsArchive from "@/components/projects-archive";
import HoverText from "@/components/hover-text";
import HomeLink from "@/components/home-link";

export const metadata = {
  title: "Projects",
  description: "All projects by Angelica Suti Whiharto.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsArchivePage() {
  return (
    <main className="bg-white min-h-screen pt-28 pb-24 px-6 md:px-16">
      <div className="max-w-[1600px] mx-auto">
        <HomeLink
          section="projects"
          className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors mb-10"
        >
          <ArrowLeft size={14} /> Back home
        </HomeLink>

        <p className="text-xs font-medium tracking-[0.15em] uppercase text-zinc-400 mb-3">Projects</p>
        <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-zinc-900 leading-tight mb-2">
          <HoverText text="All work" />
        </h1>
        <p className="text-sm text-zinc-500 mb-10">{projects.length} projects, solo and with teams.</p>

        <ProjectsArchive projects={projects} />
      </div>
    </main>
  );
}
