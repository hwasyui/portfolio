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

const ease = [0.22, 1, 0.36, 1];

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

function Lanyard() {
  const wrapRef = useRef(null);
  const cardRef = useRef(null);
  const pathRef = useRef(null);
  const svgRef  = useRef(null);
  const st = useRef({
    angle: 0, vel: 0,
    drag: false, releasing: false,
    lastX: 0,
    autoT: 0, raf: null,
  });

  useEffect(() => {
    const s = st.current;
    const wrap = wrapRef.current;
    const card = cardRef.current;
    const path = pathRef.current;
    const svgEl = svgRef.current;
    if (!wrap || !card || !path || !svgEl) return;

    const apply = (a) => {
      card.style.transform = `rotate(${a}deg)`;
      path.setAttribute("d", `M80,0 Q${80 + a * 1.8},50 80,80`);
    };

    // idle pendulum, paused while drag or spring release is running
    const tick = () => {
      if (!s.drag && !s.releasing) {
        s.autoT += 0.012;
        s.angle += (Math.sin(s.autoT) * 6 - s.angle) * 0.06;
        apply(s.angle);
      }
      s.raf = requestAnimationFrame(tick);
    };
    s.raf = requestAnimationFrame(tick);

    const getX = (e) => e.touches ? e.touches[0].clientX : e.clientX;

    const down = (e) => {
      s.drag = true;
      s.releasing = false;
      s.vel = 0;
      s.lastX = getX(e);
      wrap.style.cursor = "grabbing";
    };

    const move = (e) => {
      if (!s.drag) return;
      const x = getX(e);
      const dx = x - s.lastX;
      s.lastX = x;
      const target = Math.max(-35, Math.min(35, s.angle - dx * 0.35));
      s.vel = target - s.angle;
      s.angle = target;
      apply(s.angle);
    };

    // spring release, oscillates based on velocity and angle at the moment of release
    const startSpring = () => {
      s.releasing = true;
      const loop = () => {
        s.vel = (s.vel - 0.03 * s.angle) * 0.88;
        s.angle += s.vel;
        if (s.angle >  35) { s.angle =  35; s.vel *= -0.5; }
        if (s.angle < -35) { s.angle = -35; s.vel *= -0.5; }
        apply(s.angle);
        if (Math.abs(s.vel) > 0.08 || Math.abs(s.angle) > 0.15) {
          requestAnimationFrame(loop);
        } else {
          s.angle = 0; s.vel = 0; s.autoT = 0;
          s.releasing = false;
        }
      };
      requestAnimationFrame(loop);
    };

    const up = () => {
      if (!s.drag) return;
      s.drag = false;
      wrap.style.cursor = "grab";
      startSpring();
    };

    // keyboard: left arrow → tilts left (negative angle), right → right
    const onKeyDown = (e) => {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      e.preventDefault();
      if (e.key === "ArrowLeft") s.vel -= 4;
      else                       s.vel += 4;
      if (!s.releasing && !s.drag) startSpring();
    };

    wrap.addEventListener("mousedown", down);
    wrap.addEventListener("touchstart", down, { passive: true });
    document.addEventListener("mousemove", move);
    document.addEventListener("touchmove", move, { passive: true });
    document.addEventListener("mouseup", up);
    document.addEventListener("touchend", up);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      cancelAnimationFrame(s.raf);
      wrap.removeEventListener("mousedown", down);
      wrap.removeEventListener("touchstart", down);
      document.removeEventListener("mousemove", move);
      document.removeEventListener("touchmove", move);
      document.removeEventListener("mouseup", up);
      document.removeEventListener("touchend", up);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        cursor: "grab",
        userSelect: "none",
        width: "100%",
        padding: "48px 60px",
      }}
    >
      <svg
        ref={svgRef}
        width="160"
        height="80"
        viewBox="0 0 160 80"
        style={{ display: "block", overflow: "visible" }}
      >
        <path
          ref={pathRef}
          d="M80,0 Q70,50 80,80"
          fill="none"
          stroke="#FFB8D8"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <rect x="64" y="0" width="32" height="8" rx="4" fill="#E040A0" />
      </svg>

      <div
        ref={cardRef}
        style={{
          width: "256px",
          background: "white",
          borderRadius: "16px",
          overflow: "hidden",
          border: "1.5px solid #FFB8D8",
          boxShadow: "0 12px 40px rgba(224,64,160,0.15)",
          transformOrigin: "top center",
          willChange: "transform",
        }}
      >
        {/* card header */}
        <div
          style={{
            background: "#E040A0",
            padding: "24px 18px 18px",
            textAlign: "center",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "-1px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "36px",
              height: "15px",
              background: "#FFF5F8",
              borderRadius: "0 0 10px 10px",
              border: "1.5px solid #FFB8D8",
              borderTop: "none",
            }}
          />
          <div
            style={{
              width: "88px",
              height: "88px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.2)",
              border: "2.5px solid rgba(255,255,255,0.5)",
              margin: "10px auto 12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src="/angel-logo.svg"
              alt="Angelica"
              style={{ width: "52px", height: "52px", filter: "brightness(0) invert(1)" }}
            />
          </div>
          <div
            style={{
              fontWeight: 700,
              fontSize: "18px",
              color: "white",
              marginBottom: "4px",
              fontFamily: "Georgia, serif",
            }}
          >
            Angelica
          </div>
          <div
            style={{
              fontSize: "10px",
              letterSpacing: "3px",
              color: "rgba(255,255,255,0.7)",
              fontFamily: "sans-serif",
            }}
          >
            Suti Whiharto
          </div>
        </div>

        {/* card body */}
        <div style={{ padding: "14px 16px" }}>
          <div
            style={{
              background: "#FFE0EE",
              borderRadius: "4px",
              padding: "6px 10px",
              marginBottom: "12px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: "9px",
                letterSpacing: "3px",
                color: "#A0106A",
                fontFamily: "sans-serif",
              }}
            >
              Data · Backend · AI
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "4px",
              marginBottom: "12px",
              justifyContent: "center",
            }}
          >
            {["Python", "FastAPI", "Docker"].map((tag) => (
              <span
                key={tag}
                style={{
                  padding: "3px 8px",
                  borderRadius: "20px",
                  background: "#E040A0",
                  color: "white",
                  fontSize: "9px",
                  letterSpacing: "1px",
                  fontFamily: "sans-serif",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
          <div
            style={{
              height: "0.5px",
              background: "#FFB8D8",
              opacity: 0.4,
              marginBottom: "10px",
            }}
          />
          <div
            style={{
              fontSize: "10px",
              color: "#aaa",
              display: "flex",
              flexDirection: "column",
              gap: "5px",
              fontFamily: "sans-serif",
            }}
          >
            {[
              ["University", "President Univ.", false],
              ["GPA", "3.95 / 4.00", false],
              ["Status", "Open to work ✦", true],
            ].map(([k, v, hot]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between" }}>
                <span>{k}</span>
                <span style={{ color: hot ? "#E040A0" : "#1A0A12", fontWeight: 700 }}>{v}</span>
              </div>
            ))}
          </div>
          <div
            style={{
              marginTop: "12px",
              padding: "7px",
              background: "#1A0A12",
              borderRadius: "6px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: "9px",
                letterSpacing: "2px",
                color: "#FFB8D8",
                fontFamily: "sans-serif",
              }}
            >
              Bekasi, Indonesia
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const Landing = () => {
  const typed = useTyping(roles);

  return (
    <>
      <style>{`@keyframes cursorBlink{0%,100%{opacity:1;}50%{opacity:0;}}`}</style>

      <section className="min-h-screen grid grid-cols-1 md:grid-cols-2">
        {/* left panel, hot-pink */}
        <div className="bg-pink-hot relative overflow-hidden flex flex-col justify-between p-10 md:p-16 min-h-[52vh] md:min-h-screen">
          <div
            className="absolute bottom-0 left-0 font-bebas leading-none text-white/10 pointer-events-none select-none text-[160px] md:text-[240px] lg:text-[320px]"
            style={{ lineHeight: 0.85 }}
            aria-hidden
          >
            00
          </div>

          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease }}
            className="relative z-10 inline-flex items-center gap-2 border border-white/30 bg-white/15 px-4 py-1.5 w-fit"
          >
            <span className="font-bebas text-[9px] tracking-[5px] text-white">
              ✦ Angelica's Portfolio ✦
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.28, ease }}
            className="relative z-10"
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45, ease }}
            className="relative z-10"
          >
            <p
              className="font-playfair italic text-white/90 mb-1 text-lg md:text-2xl lg:text-[32px]"
            >
              Angelica Suti Whiharto
            </p>
            <p className="font-bebas text-[11px] tracking-[4px] text-white/60">
              President University · Informatics 2023
            </p>
          </motion.div>
        </div>

        {/* right panel, cream bg with the physics lanyard */}
        <div className="bg-pink-pale flex flex-col justify-between p-10 md:p-16 min-h-[60vh] md:min-h-screen relative overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
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
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.65, delay: 0.38, ease }}
            className="flex justify-center"
          >
            <Lanyard />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.55 }}
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

      {/* marquee strip */}
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
