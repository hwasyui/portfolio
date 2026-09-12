import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Calendar, GraduationCap, Code2 } from "lucide-react";
import data from "@/data/experiences.json";
import educations from "@/data/educations.json";

export const metadata = {
  title: "Experience",
  description: "Full work, organizational, and education timeline for Angelica Suti Whiharto.",
};

const TYPE_STYLE = {
  Internship: "bg-zinc-900 text-white",
  "Part-time": "bg-zinc-100 text-zinc-600",
  "Self-employment": "bg-zinc-100 text-zinc-600",
  Seasonal: "bg-zinc-100 text-zinc-600",
  default: "bg-zinc-100 text-zinc-600",
};

function TypePill({ type }) {
  return (
    <span className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full ${TYPE_STYLE[type] || TYPE_STYLE.default}`}>
      {type}
    </span>
  );
}

function Row({ item, base }) {
  return (
    <Link
      href={`/${base}/${item.slug}`}
      className="group flex items-center justify-between gap-4 py-5 border-b border-zinc-100 last:border-b-0"
    >
      <div className="min-w-0">
        <div className="text-xs text-zinc-400 mb-1">{item.company || item.organization}</div>
        <h3 className="font-semibold text-base text-zinc-900 leading-tight">{item.title}</h3>
        <div className="flex items-center gap-2 mt-2">
          {item.type ? <TypePill type={item.type} /> : null}
          <span className="flex items-center gap-1 text-[11px] text-zinc-400">
            <Calendar size={10} />
            {item.date}
          </span>
        </div>
      </div>
      <ArrowUpRight
        size={16}
        className="flex-shrink-0 text-zinc-300 group-hover:text-zinc-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
      />
    </Link>
  );
}

function EduRow({ edu }) {
  const Icon = edu.type === "formal" ? GraduationCap : Code2;
  return (
    <div className="flex items-center gap-4 py-5 border-b border-zinc-100 last:border-b-0">
      <div className="w-9 h-9 rounded-lg bg-zinc-50 border border-zinc-200 flex items-center justify-center flex-shrink-0">
        <Icon size={16} className="text-zinc-500" />
      </div>
      <div className="min-w-0">
        <div className="text-xs text-zinc-400 mb-1">{edu.location}</div>
        <h3 className="font-semibold text-base text-zinc-900 leading-tight">{edu.school}</h3>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-zinc-100 text-zinc-600">
            {edu.type === "formal" ? "Formal" : "Bootcamp"}
          </span>
          <span className="flex items-center gap-1 text-[11px] text-zinc-400">
            <Calendar size={10} />
            {edu.period}
          </span>
        </div>
      </div>
    </div>
  );
}

function Section({ label, children }) {
  return (
    <div className="mb-12">
      <p className="text-[11px] font-medium tracking-[0.1em] uppercase text-zinc-400 mb-1">{label}</p>
      <div>{children}</div>
    </div>
  );
}

export default function ExperienceArchivePage() {
  const { workExperiences, organizationalExperiences } = data;
  const internships = workExperiences.filter((e) => e.type === "Internship");
  const otherWork = workExperiences.filter((e) => e.type !== "Internship");

  return (
    <main className="bg-white min-h-screen pt-28 pb-24 px-6 md:px-16">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/#experiences"
          className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors mb-10"
        >
          <ArrowLeft size={14} /> Back home
        </Link>

        <p className="text-xs font-medium tracking-[0.15em] uppercase text-zinc-400 mb-3">Experience</p>
        <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-zinc-900 leading-tight mb-2">
          Full timeline
        </h1>
        <p className="text-sm text-zinc-500 mb-14">Every role, organization, and program, in one place.</p>

        {internships.length > 0 && (
          <Section label="Internships">
            {internships.map((item) => (
              <Row key={item.slug} item={item} base="experience" />
            ))}
          </Section>
        )}

        {otherWork.length > 0 && (
          <Section label="Other work">
            {otherWork.map((item) => (
              <Row key={item.slug} item={item} base="experience" />
            ))}
          </Section>
        )}

        {organizationalExperiences.length > 0 && (
          <Section label="Organizational">
            {organizationalExperiences.map((item) => (
              <Row key={item.slug} item={item} base="experience" />
            ))}
          </Section>
        )}

        {educations.length > 0 && (
          <Section label="Education">
            {educations.map((edu, i) => (
              <EduRow key={i} edu={edu} />
            ))}
          </Section>
        )}
      </div>
    </main>
  );
}
