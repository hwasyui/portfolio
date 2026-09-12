"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useCvModal } from "@/components/cv-modal";

const links = [
  { id: "about", label: "About" },
  { id: "how-i-work", label: "Process" },
  { id: "skills", label: "Skills" },
  { id: "experiences", label: "Experience" },
  { id: "projects", label: "Work" },
  { id: "contacts", label: "Contact" },
];

const ease = [0.16, 1, 0.3, 1];

const Navigate = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { openCv } = useCvModal();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (id) => {
    setMobileOpen(false);
    if (pathname !== "/") {
      router.push("/");
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 400);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-colors duration-300 ${
        scrolled || mobileOpen ? "bg-white/85 backdrop-blur-md border-b border-zinc-200" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        <Link href="/" className="text-[15px] font-semibold tracking-tight text-zinc-900">
          Angelica Whiharto
        </Link>

        <nav className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => handleNavClick(l.id)}
              className="relative text-[13px] font-medium text-zinc-500 hover:text-zinc-900 transition-colors py-1 link-underline"
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={openCv}
            className="text-[13px] font-medium px-4 py-2 rounded-full bg-zinc-900 text-white hover:bg-zinc-700 transition-colors"
          >
            View CV
          </button>
        </nav>

        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="md:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-[5px]"
          aria-label="Toggle menu"
        >
          <span
            className="block h-[1.5px] w-5 bg-zinc-900 transition-transform duration-300"
            style={{ transform: mobileOpen ? "translateY(6.5px) rotate(45deg)" : "none" }}
          />
          <span
            className="block h-[1.5px] w-5 bg-zinc-900 transition-opacity duration-200"
            style={{ opacity: mobileOpen ? 0 : 1 }}
          />
          <span
            className="block h-[1.5px] w-5 bg-zinc-900 transition-transform duration-300"
            style={{ transform: mobileOpen ? "translateY(-6.5px) rotate(-45deg)" : "none" }}
          />
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease }}
            className="md:hidden overflow-hidden border-t border-zinc-100"
          >
            <div className="flex flex-col px-6 py-4">
              {links.map((l, i) => (
                <motion.button
                  key={l.id}
                  onClick={() => handleNavClick(l.id)}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, ease, delay: i * 0.03 }}
                  className="text-left py-2.5 text-[15px] font-medium text-zinc-700"
                >
                  {l.label}
                </motion.button>
              ))}
              <button
                onClick={() => { setMobileOpen(false); openCv(); }}
                className="mt-2 text-left text-[15px] font-medium text-zinc-900 py-2.5 border-t border-zinc-100"
              >
                View CV
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navigate;
