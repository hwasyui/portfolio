"use client";

import React from "react";
import { motion } from "framer-motion";

const START_COLOR = "#d4d4d8";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.018 } },
};

export default function ScrollFillText({
  text,
  boldWords = [],
  as: Tag = "p",
  className = "",
  toColor = "#52525b",
  boldToColor = "#18181b",
}) {
  const words = text.split(" ");
  const boldSet = new Set(boldWords.flatMap((phrase) => phrase.split(" ")));

  return (
    <Tag className={className}>
      <motion.span
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
      >
        {words.map((word, i) => {
          const bold = boldSet.has(word.replace(/[.,]/g, ""));
          return (
            <React.Fragment key={i}>
              <motion.span
                variants={{
                  hidden: { color: START_COLOR },
                  visible: { color: bold ? boldToColor : toColor },
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className={bold ? "font-semibold" : undefined}
              >
                {word}
              </motion.span>
              {i < words.length - 1 ? " " : ""}
            </React.Fragment>
          );
        })}
      </motion.span>
    </Tag>
  );
}
