"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useCvModal } from "@/components/cv-modal";
import MagneticButton from "@/components/magnetic-button";
import HoverText from "@/components/hover-text";
import Sep from "@/components/sep";

const roles = ["Backend Engineer", "Data Engineer", "AI Developer", "Full-Stack Developer"];
const ease = [0.16, 1, 0.3, 1];

function useTyping(words) {
  const [idx, setIdx] = useState(0);
  const [chars, setChars] = useState(0);
  const [del, setDel] = useState(false);

  useEffect(() => {
    const word = words[idx];
    let t;
    if (!del && chars < word.length) {
      t = setTimeout(() => setChars((c) => c + 1), 65);
    } else if (!del) {
      t = setTimeout(() => setDel(true), 1500);
    } else if (chars > 0) {
      t = setTimeout(() => setChars((c) => c - 1), 35);
    } else {
      t = setTimeout(() => {
        setDel(false);
        setIdx((i) => (i + 1) % words.length);
      }, 250);
    }
    return () => clearTimeout(t);
  }, [idx, chars, del, words]);

  return words[idx].slice(0, chars);
}

function GridSpotlight() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      <div
        className="absolute inset-0 opacity-[0.7]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #d4d4d8 1px, transparent 1px), linear-gradient(to bottom, #d4d4d8 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(420px circle at var(--mx, 50%) var(--my, 20%), black, transparent)",
          WebkitMaskImage: "radial-gradient(420px circle at var(--mx, 50%) var(--my, 20%), black, transparent)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #e4e4e7 1px, transparent 1px), linear-gradient(to bottom, #e4e4e7 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
    </div>
  );
}

const Landing = () => {
  const typed = useTyping(roles);
  const { openCv } = useCvModal();
  const sectionRef = useRef(null);

  const onMove = (e) => {
    const el = sectionRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={onMove}
      className="relative min-h-screen flex flex-col justify-center bg-white overflow-hidden"
    >
      <style>{`@keyframes cursorBlink{0%,100%{opacity:1;}50%{opacity:0;}}`}</style>

      <GridSpotlight />

      <div className="relative z-10 max-w-[1600px] w-full mx-auto px-6 md:px-16 py-32">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease, delay: 0.05 }}
          className="text-xs font-medium tracking-[0.15em] uppercase text-zinc-400 mb-6"
        >
          <HoverText text="Portfolio" />
          <Sep />
          <HoverText text="2026" />
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease, delay: 0.1 }}
          className="text-lg md:text-xl text-zinc-500 mb-1"
        >
          <HoverText text="I am a" />
        </motion.p>

        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 0.8, ease, delay: 0.15 }}
            className="text-[11vw] leading-[0.95] md:text-[6vw] font-semibold tracking-tight text-zinc-900"
            style={{ minHeight: "1.1em" }}
          >
            <HoverText text={typed} />
            <span
              style={{
                display: "inline-block",
                width: "0.06em",
                height: "0.85em",
                background: "#18181b",
                verticalAlign: "middle",
                marginLeft: "0.08em",
                animation: "cursorBlink 0.9s infinite",
              }}
            />
          </motion.h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.5 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mt-10 pt-10 border-t border-zinc-100"
        >
          <div>
            <p className="text-lg text-zinc-700 font-medium">
              <HoverText text="Angelica Suti Whiharto" />
            </p>
            <p className="text-sm text-zinc-400 mt-1">
              <HoverText text="West Java, Indonesia" />
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <MagneticButton
              onClick={openCv}
              className="px-6 py-3 bg-zinc-900 text-white text-sm font-medium rounded-full hover:bg-zinc-700 transition-colors duration-200"
            >
              View CV
            </MagneticButton>
            <MagneticButton
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              className="px-6 py-3 border border-zinc-300 text-zinc-900 text-sm font-medium rounded-full hover:border-zinc-900 transition-colors duration-200"
            >
              See projects
            </MagneticButton>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="relative z-10 flex items-center gap-2 text-xs font-medium tracking-[0.15em] uppercase text-zinc-400 px-6 md:px-16 pb-10"
      >
        <motion.span
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={12} />
        </motion.span>
        <HoverText text="Scroll" />
      </motion.div>
    </section>
  );
};

export default Landing;
