"use client";

import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";

const sp = (delay = 0) => ({ type: "spring", stiffness: 420, damping: 32, delay });

function Reveal({ children, delay = 0, y = 36, x = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={sp(delay)}
    >
      {children}
    </motion.div>
  );
}

function TiltPolaroid() {
  const cardRef = useRef(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width - 0.5) * 18;
      const y = ((e.clientY - r.top) / r.height - 0.5) * 18;
      el.style.transform = `perspective(700px) rotateX(${-y}deg) rotateY(${x}deg) scale(1.04)`;
      el.style.transition = "transform 0.08s ease-out";
    };

    const onLeave = () => {
      el.style.transform = "perspective(700px) rotateZ(-4deg)";
      el.style.transition = "transform 0.45s ease-out";
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div className="flex justify-center pt-6">
      <div
        ref={cardRef}
        style={{
          background: "white",
          padding: "12px 12px 52px",
          boxShadow:
            "0 24px 64px rgba(224,64,160,0.18), 0 4px 16px rgba(0,0,0,0.07)",
          transform: "perspective(700px) rotateZ(-4deg)",
          willChange: "transform",
          position: "relative",
          cursor: "default",
        }}
      >
        <img
          src="/about/photo4.jpg"
          alt="Angelica"
          style={{ display: "block", width: "220px", height: "285px", objectFit: "cover" }}
        />
        <div
          style={{
            position: "absolute",
            top: "-8px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "48px",
            height: "18px",
            background: "rgba(224,64,160,0.25)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "14px",
            left: 0,
            right: 0,
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontFamily: "Georgia, serif",
              fontStyle: "italic",
              fontSize: "11px",
              color: "#aaa",
            }}
          >
            Angelica, 2024
          </div>
        </div>
      </div>
    </div>
  );
}

const AboutPage = () => {
  return (
    <div className="relative overflow-hidden bg-pink-pale px-6 md:px-16 py-16">
      <div className="absolute bottom-0 right-0 font-bebas leading-none text-pink-hot/10 pointer-events-none select-none text-[120px] md:text-[180px] lg:text-[220px]" aria-hidden>01</div>
      <div className="max-w-5xl mx-auto">
        <Reveal y={24}>
          <div className="font-bebas text-[9px] tracking-[5px] text-pink-hot mb-1">Chapter I</div>
          <h2 className="font-playfair font-black text-4xl md:text-5xl text-zinc-900 mb-12 leading-tight">
            About Me
          </h2>
        </Reveal>

        <div className="flex flex-col md:flex-row gap-14 items-start">
          <Reveal x={-40} y={0} delay={0.05} className="w-full md:w-2/5 flex-shrink-0">
            <TiltPolaroid />
          </Reveal>

          <div className="w-full md:w-3/5 space-y-5">
            <Reveal delay={0.08}>
              <p className="font-playfair italic text-pink-hot text-lg md:text-xl leading-relaxed border-l-4 border-pink-hot pl-5">
                "A builder who learns fast, a thinker who ships things, somewhere
                between backend systems and AI."
              </p>
            </Reveal>

            <Reveal delay={0.14}>
              <p className="text-sm text-zinc-600 leading-[1.9]">
                I am an{" "}
                <strong className="text-zinc-900">
                  Informatics student at President University
                </strong>
                , currently building systems that turn data into useful and reliable
                applications. Most of my time goes into{" "}
                <strong className="text-pink-hot">
                  backend development, data pipelines, and AI-related projects
                </strong>
                .
              </p>
            </Reveal>

            <Reveal delay={0.20}>
              <p className="text-sm text-zinc-600 leading-[1.9]">
                I have worked on RAG-based chatbots, computer vision systems, and NLP
                pipelines, built as part of coursework, internships, and personal
                projects. Currently interning as a Data Engineer at FIFGROUP and
                previously as a Backend Engineer at BCA.
              </p>
            </Reveal>

            <Reveal delay={0.26}>
              <p className="text-sm text-zinc-600 leading-[1.9]">
                I have hands-on experience with FastAPI, Kafka, Docker, MongoDB,
                PostgreSQL, and modern LLM frameworks. My current goal is to
                strengthen fundamentals while shipping things that work in real-world
                environments.
              </p>
            </Reveal>

            <Reveal delay={0.32}>
              <div className="flex flex-wrap gap-2 pt-2">
                {[
                  ["Informatics", "President University"],
                  ["GPA", "3.95 / 4.00"],
                  ["Duolingo", "130"],
                  ["Open to", "Projects-Based Works"],
                ].map(([label, val]) => (
                  <div
                    key={label}
                    className="border border-pink-hot/30 bg-pink-blush rounded px-3 py-1.5"
                  >
                    <div className="font-bebas text-[8px] tracking-[3px] text-pink-hot">{label}</div>
                    <div className="text-xs font-bold text-zinc-800">{val}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
