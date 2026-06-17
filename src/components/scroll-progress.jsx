"use client";
import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const max = scrollHeight - clientHeight;
      setPct(max > 0 ? (scrollTop / max) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 h-[3px] z-[60] pointer-events-none"
      style={{
        width: `${pct}%`,
        background: "linear-gradient(90deg, #A0106A, #E040A0, #FF88C0, #FFB8D8)",
        boxShadow: "0 0 10px rgba(224,64,160,0.65), 0 0 3px rgba(224,64,160,0.4)",
        transition: "width 80ms linear",
      }}
    />
  );
}
