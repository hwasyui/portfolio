"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const START_COLOR = "#d4d4d8";

function Word({ word, bold, progress, range, toColor }) {
  const color = useTransform(progress, range, [START_COLOR, toColor]);
  return (
    <motion.span style={{ color }} className={bold ? "font-semibold" : undefined}>
      {word}
    </motion.span>
  );
}

export default function ScrollFillText({
  text,
  boldWords = [],
  as: Tag = "p",
  className = "",
  toColor = "#52525b",
  boldToColor = "#18181b",
}) {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 0.9", "start 0.4"],
  });

  const words = text.split(" ");
  const boldSet = new Set(boldWords.flatMap((phrase) => phrase.split(" ")));

  return (
    <Tag ref={container} className={className}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = (i + 1) / words.length;
        const bold = boldSet.has(word.replace(/[.,]/g, ""));
        return (
          <React.Fragment key={i}>
            <Word
              word={word}
              bold={bold}
              progress={scrollYProgress}
              range={[start, end]}
              toColor={bold ? boldToColor : toColor}
            />
            {i < words.length - 1 ? " " : ""}
          </React.Fragment>
        );
      })}
    </Tag>
  );
}
