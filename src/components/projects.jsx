"use client";

import React, { useState, useRef, useLayoutEffect, useCallback } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import data from "../data/projects.json";
import ProjectCard from "./project-card.jsx";
import HoverText from "./hover-text";

const ease = [0.16, 1, 0.3, 1];
const INITIAL_VISIBLE = 4;

const Projects = () => {
  const [extra, setExtra] = useState(0);
  const pinRef = useRef(null);
  const trackRef = useRef(null);

  const visible = data.slice(0, INITIAL_VISIBLE);
  const hiddenCount = data.length - visible.length;

  const measure = useCallback(() => {
    if (!trackRef.current) return;
    setExtra(Math.max(0, trackRef.current.scrollWidth - window.innerWidth));
  }, []);

  useLayoutEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure, visible.length]);

  const { scrollYProgress } = useScroll({
    target: pinRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -extra]);
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["4%", "100%"]);

  const step = (dir) => {
    if (!pinRef.current || extra <= 0) return;
    const firstCard = trackRef.current?.children?.[0];
    const cardStep = firstCard ? firstCard.getBoundingClientRect().width + 20 : 380;
    const pinTop = pinRef.current.getBoundingClientRect().top + window.scrollY;
    const target = Math.min(
      Math.max(window.scrollY + dir * cardStep, pinTop),
      pinTop + extra
    );
    window.scrollTo({ top: target, behavior: "smooth" });
  };

  return (
    <div className="bg-white py-20 md:py-28">
      <div ref={pinRef} className="relative" style={{ height: `calc(100vh + ${extra}px)` }}>
        <div className="sticky top-20">
          <div className="max-w-6xl mx-auto px-6 md:px-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease }}
              className="mb-10 flex items-end justify-between gap-6"
            >
              <div>
                <p className="text-xs font-medium tracking-[0.15em] uppercase text-zinc-400 mb-3">Projects</p>
                <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-zinc-900 leading-tight mb-2">
                  <HoverText text="Selected work" />
                </h2>
                <p className="text-sm text-zinc-400">
                  {hiddenCount > 0
                    ? `Showing ${visible.length} of ${data.length} projects. Keep scrolling to browse.`
                    : "Keep scrolling to browse"}
                </p>
              </div>

              <div className="hidden sm:flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => step(-1)}
                  aria-label="Previous"
                  className="w-10 h-10 rounded-lg border border-zinc-900 flex items-center justify-center text-zinc-900 hover:bg-zinc-900 hover:text-white transition-colors duration-200"
                >
                  <ArrowLeft size={16} strokeWidth={1.5} />
                </button>
                <button
                  onClick={() => step(1)}
                  aria-label="Next"
                  className="w-10 h-10 rounded-lg border border-zinc-900 flex items-center justify-center text-zinc-900 hover:bg-zinc-900 hover:text-white transition-colors duration-200"
                >
                  <ArrowRight size={16} strokeWidth={1.5} />
                </button>
              </div>
            </motion.div>
          </div>

          <div className="overflow-hidden">
            <motion.div ref={trackRef} style={{ x }} className="flex gap-5 pl-6 md:pl-16">
              {visible.map((project, i) => (
                <ProjectCard key={project.slug} project={project} index={i} />
              ))}
              {hiddenCount > 0 && (
                <Link
                  href="/projects"
                  className="w-[220px] flex-shrink-0 flex flex-col items-center justify-center gap-2 rounded-[28px] border border-dashed border-zinc-300 text-zinc-500 hover:border-zinc-900 hover:text-zinc-900 transition-colors duration-200"
                >
                  <ArrowRight size={18} />
                  <span className="text-sm font-medium">View all {data.length}</span>
                </Link>
              )}
              <div className="w-6 md:w-16 flex-shrink-0" aria-hidden />
            </motion.div>
          </div>

          <div className="mt-8 max-w-6xl mx-auto px-6 md:px-16">
            <div className="h-px bg-zinc-200 relative overflow-hidden rounded-full">
              <motion.div
                className="absolute top-0 left-0 h-px bg-zinc-900"
                style={{ width: progressWidth }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
