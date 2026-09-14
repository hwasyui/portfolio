import projects from "@/data/projects.json";
import experiences from "@/data/experiences.json";

const siteUrl = "https://angelica-whiharto.com";

export default function sitemap() {
  const now = new Date();

  const staticRoutes = [
    { url: siteUrl, changeFrequency: "always", priority: 1 },
    { url: `${siteUrl}/projects`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteUrl}/experience`, changeFrequency: "weekly", priority: 0.7 },
  ];

  const projectRoutes = projects.map((p) => ({
    url: `${siteUrl}/projects/${p.slug}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const experienceRoutes = [
    ...experiences.workExperiences,
    ...experiences.organizationalExperiences,
  ].map((e) => ({
    url: `${siteUrl}/experience/${e.slug}`,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticRoutes, ...projectRoutes, ...experienceRoutes].map((entry) => ({
    ...entry,
    lastModified: now,
  }));
}
