"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

const roles = [
  "Backend Engineer",
  "Data Engineer",
  "AI Developer",
  "Full-Stack Dev",
];

const MARQUEE_TEXT =
  "BACKEND ENGINEER · DATA ENGINEER · AI DEVELOPER · FULL STACK WEB · PYTHON · KAFKA · DOCKER · FASTAPI · REACTJS · BEKASI · INDONESIA · OPEN TO WORK · ";

const spring = (delay = 0, stiffness = 420, damping = 30) => ({
  type: "spring", stiffness, damping, delay,
});

function useTyping(words) {
  const [idx, setIdx] = useState(0);
  const [chars, setChars] = useState(0);
  const [del, setDel] = useState(false);

  useEffect(() => {
    const word = words[idx];
    let t;
    if (!del && chars < word.length) {
      t = setTimeout(() => setChars((c) => c + 1), 90);
    } else if (!del) {
      t = setTimeout(() => setDel(true), 1600);
    } else if (chars > 0) {
      t = setTimeout(() => setChars((c) => c - 1), 50);
    } else {
      t = setTimeout(() => {
        setDel(false);
        setIdx((i) => (i + 1) % words.length);
      }, 300);
    }
    return () => clearTimeout(t);
  }, [idx, chars, del, words]);

  return words[idx].slice(0, chars);
}

const EXPR_SRC = {
  default:   "/chibi/eye-pair.png",
  blink:     "/chibi/blink.png",
  sleepy:    "/chibi/sleepy.png",
  mad:       "/chibi/mad.png",
  peek:      "/chibi/peek.png",
  flustered: "/chibi/flustered.png",
};

function ChibiCharacter({ peekTrigger, flusteredTrigger }) {
  const [expr, setExpr] = useState("default");

  const r = useRef({ expr: "default", timer: null, startX: null });
  const containerRef = useRef(null);
  const eyeRef = useRef(null);

  const setE = (e) => {
    r.current.expr = e;
    setExpr(e);
    if (e !== "default" && eyeRef.current) {
      eyeRef.current.style.transform = "translate(0px, 0px)";
    }
  };

  const schedBlinkRef = useRef(null);
  schedBlinkRef.current = () => {
    clearTimeout(r.current.timer);
    r.current.timer = setTimeout(() => {
      if (r.current.expr !== "default") {
        schedBlinkRef.current();
        return;
      }
      setE("blink");
      setTimeout(() => {
        if (r.current.expr === "blink") setE("default");
        schedBlinkRef.current();
      }, 80);
    }, 3000 + Math.random() * 3000);
  };

  const triggerRef = useRef(null);
  triggerRef.current = (next, dur) => {
    clearTimeout(r.current.timer);
    setE(next);
    r.current.timer = setTimeout(() => {
      setE("default");
      schedBlinkRef.current();
    }, dur);
  };

  useEffect(() => {
    schedBlinkRef.current();
    return () => clearTimeout(r.current.timer);
  }, []);

  useEffect(() => {
    const onMove = (e) => {
      if (!containerRef.current || !eyeRef.current) return;
      if (r.current.expr !== "default") return;
      const rect = containerRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const MAX = 7;
      const t = Math.min(1, dist / 200);
      const ox = (dx / Math.max(dist, 1)) * MAX * t;
      const oy = (dy / Math.max(dist, 1)) * MAX * t;
      eyeRef.current.style.transform = `translate(${ox}px, ${oy}px)`;
    };
    document.addEventListener("mousemove", onMove);
    return () => document.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    if (!peekTrigger) return;
    triggerRef.current("peek", 2000);
  }, [peekTrigger]);

  useEffect(() => {
    if (!flusteredTrigger) return;
    triggerRef.current("flustered", 2000);
  }, [flusteredTrigger]);

  const onDown = (e) => {
    r.current.startX = e.touches ? e.touches[0].clientX : e.clientX;
  };
  const onUp = (e) => {
    if (r.current.startX === null) return;
    const dx =
      (e.changedTouches ? e.changedTouches[0].clientX : e.clientX) -
      r.current.startX;
    r.current.startX = null;
    if (Math.abs(dx) > 40) triggerRef.current("sleepy", 2500);
    else triggerRef.current("mad", 1500);
  };

  return (
    <div
      ref={containerRef}
      className="relative cursor-pointer select-none shrink-0 w-[300px] h-[300px] md:w-[400px] md:h-[400px] lg:w-[560px] lg:h-[560px]"
      style={{ position: "relative" }}
      onMouseDown={onDown}
      onMouseUp={onUp}
      onTouchStart={onDown}
      onTouchEnd={onUp}
    >
      <img
        src="/chibi/no-eye.png"
        alt="chibi"
        draggable={false}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "contain",
        }}
      />
      <img
        ref={eyeRef}
        src={EXPR_SRC[expr]}
        alt=""
        draggable={false}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "contain",
          willChange: "transform",
        }}
      />
    </div>
  );
}

const Landing = () => {
  const typed = useTyping(roles);
  const [peekCount, setPeekCount] = useState(0);
  const [flusteredCount, setFlusteredCount] = useState(0);

  return (
    <>
      <style>{`@keyframes cursorBlink{0%,100%{opacity:1;}50%{opacity:0;}}`}</style>

      <section className="grid grid-cols-1 md:grid-cols-2">
        <div
          className="bg-pink-hot relative overflow-hidden flex flex-col gap-8 md:gap-0 md:justify-between p-10 md:p-16 py-14 md:min-h-screen cursor-pointer"
          onClick={() => setPeekCount((c) => c + 1)}
        >
          <div
            className="absolute bottom-0 left-0 font-bebas leading-none text-white/10 pointer-events-none select-none text-[160px] md:text-[240px] lg:text-[320px]"
            style={{ lineHeight: 0.85 }}
            aria-hidden
          >
            00
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.75, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={spring(0.04, 520, 28)}
            className="relative z-10 inline-flex items-center gap-2 border border-white/30 bg-white/15 px-4 py-1.5 w-fit"
          >
            <span className="font-bebas text-[9px] tracking-[5px] text-white">
              ✦ Angelica's Portfolio ✦
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 60, x: -24 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            transition={spring(0.12, 380, 28)}
            className="relative z-10"
            onClick={(e) => {
              e.stopPropagation();
              setFlusteredCount((c) => c + 1);
            }}
          >
            <div className="font-bebas text-[11px] tracking-[5px] text-white/50 mb-3">
              I am a
            </div>
            <h1
              className="font-playfair font-black text-white leading-tight tracking-tight text-4xl md:text-5xl lg:text-[68px]"
              style={{ minHeight: "1.3em" }}
            >
              {typed}
              <span
                style={{
                  display: "inline-block",
                  width: "4px",
                  height: "0.85em",
                  background: "rgba(255,255,255,0.8)",
                  verticalAlign: "middle",
                  marginLeft: "3px",
                  animation: "cursorBlink 0.8s infinite",
                }}
              />
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={spring(0.22, 380, 30)}
            className="relative z-10"
          >
            <p className="font-playfair italic text-white/90 mb-1 text-lg md:text-2xl lg:text-[32px] select-none">
              Angelica Suti Whiharto
            </p>
            <p className="font-bebas text-[11px] tracking-[4px] text-white/60 mb-6">
              President University · Informatics 2023
            </p>

            <div
              className="flex flex-wrap gap-3"
              onClick={(e) => e.stopPropagation()}
            >
              <a
                href="/Angelica Suti Whiharto CV 2026Q1.pdf"
                download
                className="font-bebas text-[11px] tracking-[3px] px-5 py-2.5
                           bg-white text-pink-hot
                           hover:bg-pink-blush
                           transition-colors duration-150"
              >
                Download CV
              </a>
              <button
                onClick={() =>
                  document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
                }
                className="font-bebas text-[11px] tracking-[3px] px-5 py-2.5
                           border border-white/50 text-white
                           hover:bg-white/10
                           transition-colors duration-150"
              >
                See Projects
              </button>
            </div>
          </motion.div>
        </div>

        <div className="bg-pink-pale flex flex-col gap-8 md:gap-0 md:justify-between p-10 md:p-16 py-14 md:min-h-screen relative overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={spring(0.06, 500, 35)}
            className="flex justify-between items-start"
          >
            <span className="font-bebas text-[9px] tracking-[3px] text-zinc-400">
              Vers. 0.0.1 · 2026
            </span>
            <span className="font-bebas text-[9px] tracking-[3px] text-zinc-400">
              Bekasi, Indonesia
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.6, y: 32 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={spring(0.16, 300, 22)}
            className="flex justify-center items-center"
          >
            <ChibiCharacter
              peekTrigger={peekCount}
              flusteredTrigger={flusteredCount}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={spring(0.28, 500, 35)}
            className="flex justify-between items-end"
          >
            <span className="font-bebas text-[9px] tracking-[3px] text-zinc-400">
              Scroll to explore
            </span>
            <span
              className="font-bebas leading-none text-zinc-200 select-none text-[40px] md:text-[56px] lg:text-[72px]"
              aria-hidden
            >
              00
            </span>
          </motion.div>
        </div>
      </section>

      <div className="bg-zinc-900 h-9 overflow-hidden flex items-center">
        <div className="animate-marquee flex whitespace-nowrap">
          {[0, 1].map((i) => (
            <span
              key={i}
              className="font-bebas text-[10px] tracking-[5px] text-pink-candy shrink-0 px-6"
            >
              {MARQUEE_TEXT}
            </span>
          ))}
        </div>
      </div>
    </>
  );
};

export default Landing;
