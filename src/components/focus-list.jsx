"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const ease = [0.16, 1, 0.3, 1];

// hover-reveals by default, or becomes a controlled tab switcher when onSelect is passed
// renderExpanded(i), when given, expands inline right under the active row instead of elsewhere
export default function FocusList({ items, activeIndex, onSelect, renderExpanded }) {
  const [hovered, setHovered] = useState(null);
  const controlled = typeof onSelect === "function";

  return (
    <div>
      {items.map((item, i) => {
        const isOpen = controlled ? activeIndex === i : hovered === i;
        const Row = controlled ? motion.button : motion.div;

        return (
          <div key={item.num ?? item.title} className="border-b border-zinc-100 last:border-b-0">
            <Row
              type={controlled ? "button" : undefined}
              onClick={controlled ? () => onSelect(i) : undefined}
              onMouseEnter={() => !controlled && setHovered(i)}
              onMouseLeave={() => !controlled && setHovered(null)}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.45, ease, delay: i * 0.04 }}
              className="group w-full flex items-center justify-between gap-6 py-8 md:py-10 text-left"
            >
              <div className="flex items-baseline gap-5 md:gap-8 min-w-0">
                <span
                  className={`text-base md:text-lg font-medium tabular-nums transition-colors duration-200 ${
                    isOpen ? "text-zinc-400" : "text-zinc-300"
                  }`}
                >
                  {item.num}
                </span>
                <div className="min-w-0">
                  <div className="text-3xl md:text-5xl font-semibold tracking-tight text-zinc-900">
                    {item.title}
                  </div>
                  {item.desc && (
                    <p className="md:hidden text-[15px] text-zinc-500 leading-relaxed mt-1.5">{item.desc}</p>
                  )}
                  {item.desc && (
                    <motion.p
                      initial={false}
                      animate={{
                        height: isOpen ? "auto" : 0,
                        opacity: isOpen ? 1 : 0,
                        marginTop: isOpen ? 8 : 0,
                      }}
                      transition={{ duration: 0.3, ease }}
                      className="hidden md:block text-[15px] text-zinc-500 leading-relaxed overflow-hidden max-w-md"
                    >
                      {item.desc}
                    </motion.p>
                  )}
                </div>
              </div>
              <ArrowUpRight
                size={22}
                className={`flex-shrink-0 transition-all duration-200 ${
                  isOpen ? "text-zinc-900 translate-x-0.5 -translate-y-0.5" : "text-zinc-300"
                }`}
              />
            </Row>

            {renderExpanded && (
              <motion.div
                initial={false}
                animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                transition={{ duration: 0.35, ease }}
                className="overflow-hidden"
              >
                <div className="pb-6">{renderExpanded(i)}</div>
              </motion.div>
            )}
          </div>
        );
      })}
    </div>
  );
}
