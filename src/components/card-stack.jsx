"use client";

import React, { useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import HoverText from "./hover-text";

const ease = [0.16, 1, 0.3, 1];

// sliced from the end so only as many ghost lines show as cards already consumed
const GHOST_LINES = [
  { inset: 100, top: -48 },
  { inset: 68, top: -32 },
  { inset: 36, top: -16 },
];

export default function CardStack({
  eyebrow,
  heading,
  description,
  items,
  renderCard,
  vh = 50,
  cardHeight = 190,
}) {
  const containerRef = useRef(null);
  const [active, setActive] = useState(0);
  const N = items.length;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const next = Math.min(N - 1, Math.max(0, Math.floor(v * N)));
    setActive(next);
  });

  const pending = items.slice(active + 1);
  const ghostLines = GHOST_LINES.slice(GHOST_LINES.length - Math.min(active, GHOST_LINES.length));

  return (
    <div ref={containerRef} className="relative" style={{ height: `${N * vh}vh` }}>
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center py-24 md:py-32 px-6 md:px-16">
        {(eyebrow || heading || description) && (
          <div className="max-w-[1600px] w-full mb-16 md:mb-20">
            {eyebrow && (
              <p className="text-xs font-medium tracking-[0.15em] uppercase text-zinc-400 mb-3">{eyebrow}</p>
            )}
            {heading && (
              <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-zinc-900 leading-tight mb-4">
                <HoverText text={heading} />
              </h2>
            )}
            {description && (
              <p className="text-[15px] text-zinc-500 leading-relaxed max-w-xl">{description}</p>
            )}
          </div>
        )}

        <div className="relative w-full max-w-[1600px]">
          <AnimatePresence initial={false}>
            {ghostLines.map((g, idx) => (
              <motion.div
                key={idx}
                aria-hidden
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease }}
                className="absolute rounded-[28px] border border-zinc-200"
                style={{ left: g.inset, right: g.inset, top: g.top, height: 32 }}
              />
            ))}
          </AnimatePresence>

          <AnimatePresence initial={false} mode="popLayout">
            <motion.div
              key={active}
              initial={{ y: 8, opacity: 0, scale: 0.99 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -cardHeight * 0.18, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4, ease }}
              style={{ minHeight: cardHeight, position: "relative", zIndex: 1 }}
            >
              {renderCard(items[active], active, true)}
            </motion.div>
          </AnimatePresence>

          {pending.length > 0 && (
            <motion.div
              layout
              transition={{ duration: 0.4, ease }}
              className="mt-3 rounded-[20px] border border-zinc-100 divide-y divide-zinc-100 overflow-hidden bg-white"
            >
              {pending.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="flex items-center gap-3 px-5 py-3.5">
                    {Icon && <Icon size={16} strokeWidth={1.5} className="text-zinc-300 flex-shrink-0" />}
                    <span className="text-sm font-medium text-zinc-400">{item.title}</span>
                  </div>
                );
              })}
            </motion.div>
          )}
        </div>

        <div className="flex items-center gap-1.5 mt-10">
          {items.map((_, i) => (
            <span
              key={i}
              className={`h-1 rounded-full transition-all duration-300 ${
                i === active ? "w-6 bg-zinc-900" : "w-1.5 bg-zinc-200"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
