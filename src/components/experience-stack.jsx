"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import HoverText from "./hover-text";

const ease = [0.16, 1, 0.3, 1];

export default function ExperienceStack({
  eyebrow,
  heading,
  items,
  renderItem,
  ctaHref,
  ctaTitle,
  ctaDesc,
  ctaIcon: CtaIcon,
  vh = 50,
}) {
  const containerRef = useRef(null);
  const [active, setActive] = useState(0);
  const [showCta, setShowCta] = useState(false);
  const N = items.length;
  const totalSegments = N + 1;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const seg = v * totalSegments;
    setActive(Math.min(N - 1, Math.max(0, Math.floor(seg))));
    setShowCta(seg >= N);
  });

  return (
    <div ref={containerRef} className="relative" style={{ height: `${totalSegments * vh}vh` }}>
      <div className="sticky top-0 h-screen flex flex-col items-start justify-center py-24 md:py-32 px-6 md:px-16 overflow-hidden">
        {(eyebrow || heading) && (
          <div className="max-w-[1600px] mx-auto w-full mb-10 md:mb-12">
            {eyebrow && (
              <p className="text-xs font-medium tracking-[0.15em] uppercase text-zinc-400 mb-3">{eyebrow}</p>
            )}
            {heading && (
              <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-zinc-900 leading-tight">
                <HoverText text={heading} />
              </h2>
            )}
          </div>
        )}

        <div className="max-w-[1600px] mx-auto w-full grid grid-cols-1 md:grid-cols-[minmax(0,80px)_1fr] gap-3 md:gap-5">
          <div>
            <div className="hidden md:block relative h-40 w-px bg-zinc-200 ml-1">
              {items.map((_, i) => (
                <span
                  key={i}
                  className={`absolute left-1/2 -translate-x-1/2 rounded-full transition-colors duration-300 ${
                    i === active ? "w-2 h-2 bg-zinc-900" : "w-1.5 h-1.5 bg-zinc-200"
                  }`}
                  style={{ top: `${(i / Math.max(1, N - 1)) * 100}%`, marginTop: -3 }}
                />
              ))}
              <motion.span
                className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full border-2 border-zinc-900 bg-white"
                animate={{ top: `${(active / Math.max(1, N - 1)) * 100}%` }}
                transition={{ duration: 0.35, ease }}
                style={{ marginTop: -6 }}
              />
            </div>

            <div className="flex md:hidden gap-1.5 mt-2">
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

          <div className="relative w-full">
            <motion.div
              animate={{ opacity: showCta ? 0 : 1, x: showCta ? -48 : 0 }}
              transition={{ duration: 0.35, ease }}
              style={{ minHeight: 190, pointerEvents: showCta ? "none" : "auto" }}
            >
              {renderItem(items[active], active, true)}
            </motion.div>

            <motion.div
              animate={{ opacity: showCta ? 1 : 0, x: showCta ? 0 : 64 }}
              transition={{ duration: 0.35, ease }}
              className="absolute inset-0"
              style={{ pointerEvents: showCta ? "auto" : "none" }}
            >
              <Link
                href={ctaHref}
                className="group h-full rounded-[28px] bg-zinc-900 hover:bg-zinc-800 p-8 md:p-10 flex items-center gap-6 transition-colors duration-200"
                style={{ minHeight: 190 }}
              >
                {CtaIcon && <CtaIcon size={28} strokeWidth={1.5} className="text-zinc-500 flex-shrink-0" />}
                <div className="flex-1 min-w-0">
                  <h3 className="flex items-center gap-2 text-xl md:text-2xl font-semibold tracking-tight text-white mb-1.5">
                    {ctaTitle}
                    <ArrowUpRight
                      size={20}
                      className="text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
                    />
                  </h3>
                  <p className="text-[15px] text-zinc-400 leading-relaxed max-w-md">{ctaDesc}</p>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { ease };
