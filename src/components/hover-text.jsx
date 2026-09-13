"use client";

import { motion } from "framer-motion";

export default function HoverText({ text }) {
  const words = text.split(" ");
  return words.map((word, wi) => (
    <span key={wi} className="inline-block whitespace-nowrap">
      {word.split("").map((ch, ci) => (
        <motion.span
          key={ci}
          className="inline-block"
          whileHover={{ y: -4 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
        >
          {ch}
        </motion.span>
      ))}
      {wi < words.length - 1 ? " " : ""}
    </span>
  ));
}
