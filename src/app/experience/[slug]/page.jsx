import { notFound } from "next/navigation";
import { Calendar } from "lucide-react";
import data from "@/data/experiences.json";
import BackLink from "@/components/back-link";
import HoverText from "@/components/hover-text";

const ALL = [...data.workExperiences, ...data.organizationalExperiences];

export function generateStaticParams() {
  return ALL.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const item = ALL.find((e) => e.slug === slug);
  if (!item) return {};
  return { title: item.title };
}

export default async function ExperienceDetailPage({ params }) {
  const { slug } = await params;
  const item = ALL.find((e) => e.slug === slug);
  if (!item) notFound();

  return (
    <main className="bg-white min-h-screen pt-28 pb-24 px-6 md:px-16">
      <div className="max-w-2xl mx-auto">
        <BackLink
          archivePath="/experience"
          archiveLabel="Back to all experience"
          homeSection="experiences"
          homeLabel="Back to experience"
          className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors mb-10"
        />

        <div className="flex items-center gap-2 mb-4">
          {item.type && (
            <span className="text-xs font-medium text-zinc-500 bg-zinc-50 border border-zinc-200 px-2.5 py-1 rounded-full">
              {item.type}
            </span>
          )}
          <span className="flex items-center gap-1.5 text-xs text-zinc-400">
            <Calendar size={11} />
            {item.date}
          </span>
        </div>

        <p className="text-sm text-zinc-500 mb-1">{item.company || item.organization}</p>
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-zinc-900 leading-tight mb-10">
          <HoverText text={item.title} />
        </h1>

        <div className="text-xs font-medium tracking-[0.15em] uppercase text-zinc-400 mb-4">
          Responsibilities
        </div>
        <ul className="space-y-4">
          {item.responsibilities.map((r, i) => (
            <li key={i} className="flex gap-3 text-[15px] text-zinc-600 leading-relaxed">
              <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-zinc-300 flex-shrink-0" />
              <span>{r}</span>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
