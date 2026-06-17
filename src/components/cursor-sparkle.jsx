"use client";
import { useEffect } from "react";

const SYMBOLS = ["✦", "✧", "★", "✿", "◆", "·"];
const COLORS  = ["#E040A0", "#FFB8D8", "#FF88C0", "#A0106A", "#FFE0EE"];

export default function CursorSparkle() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(hover: none)").matches) return;

    let lastX = 0, lastY = 0, lastT = 0;

    const spawn = (x, y) => {
      const el  = document.createElement("span");
      const sym = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
      const col = COLORS[Math.floor(Math.random() * COLORS.length)];
      const sz  = 8 + Math.random() * 9;
      const ox  = (Math.random() - 0.5) * 28;
      const oy  = -(18 + Math.random() * 22);
      const rot = (Math.random() - 0.5) * 140;
      const dur = 520 + Math.random() * 280;

      el.textContent = sym;
      Object.assign(el.style, {
        position:      "fixed",
        left:          `${x}px`,
        top:           `${y}px`,
        pointerEvents: "none",
        userSelect:    "none",
        zIndex:        "9999",
        fontSize:      `${sz}px`,
        color:         col,
        lineHeight:    "1",
        transform:     "translate(-50%,-50%)",
      });
      document.body.appendChild(el);

      el.animate(
        [
          { opacity: 1,  transform: `translate(calc(-50% + ${ox * 0.2}px), -50%) scale(1) rotate(0deg)` },
          { opacity: 0,  transform: `translate(calc(-50% + ${ox}px), calc(-50% + ${oy}px)) scale(0.1) rotate(${rot}deg)` },
        ],
        { duration: dur, easing: "ease-out", fill: "forwards" }
      ).onfinish = () => el.remove();
    };

    const onMove = (e) => {
      const now  = Date.now();
      const dist = Math.hypot(e.clientX - lastX, e.clientY - lastY);
      if (dist > 16 && now - lastT > 50) {
        lastX = e.clientX;
        lastY = e.clientY;
        lastT = now;
        spawn(e.clientX, e.clientY);
      }
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    return () => document.removeEventListener("mousemove", onMove);
  }, []);

  return null;
}
