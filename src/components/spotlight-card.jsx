"use client";

import React, { useRef } from "react";

export default function SpotlightCard({ as: Tag = "div", className = "", children, ...props }) {
  const ref = useRef(null);

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--spot-x", `${e.clientX - r.left}px`);
    el.style.setProperty("--spot-y", `${e.clientY - r.top}px`);
  };

  return (
    <Tag
      ref={ref}
      onMouseMove={onMove}
      className={`group relative ${className}`}
      {...props}
    >
      <span
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: "radial-gradient(220px circle at var(--spot-x, 50%) var(--spot-y, 50%), rgba(0,0,0,0.06), transparent 70%)",
        }}
        aria-hidden
      />
      {children}
    </Tag>
  );
}
