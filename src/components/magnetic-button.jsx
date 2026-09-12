"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

export default function MagneticButton({ children, className, onClick, strength = 0.25, ...props }) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos({
      x: (e.clientX - r.left - r.width / 2) * strength,
      y: (e.clientY - r.top - r.height / 2) * (strength * 1.6),
    });
  };
  const onLeave = () => setPos({ x: 0, y: 0 });

  return (
    <motion.button
      ref={ref}
      type={props.type}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 300, damping: 20, mass: 0.5 }}
      whileTap={{ scale: 0.96 }}
      className={className}
      {...props}
    >
      {children}
    </motion.button>
  );
}
