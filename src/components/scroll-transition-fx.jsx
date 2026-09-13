"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const SPARKS = [-220, -150, -90, -30, 30, 90, 150, 220];

function Spark({ progress, x, index }) {
  const y = useTransform(progress, [0, 1], [70, -70]);
  const scale = useTransform(progress, [0, 0.5, 1], [0.4, 1, 0.4]);
  const opacity = useTransform(
    progress,
    [0, 0.18 + index * 0.015, 0.5, 0.82 - index * 0.015, 1],
    [0, 1, 1, 1, 0]
  );
  return (
    <motion.span
      style={{ x, y, scale, opacity }}
      className="absolute top-1/2 left-1/2 -ml-[3px] -mt-[3px] w-1.5 h-1.5 rounded-full bg-zinc-900"
    />
  );
}

// a handful of dots that rise and fade as the boundary between two sections crosses the viewport
export default function ScrollTransitionFx() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  return (
    <div ref={ref} className="relative h-px" aria-hidden>
      <div className="fixed inset-0 z-30 pointer-events-none overflow-hidden">
        {SPARKS.map((x, i) => (
          <Spark key={i} progress={scrollYProgress} x={x} index={i} />
        ))}
      </div>
    </div>
  );
}
