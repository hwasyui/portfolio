"use client";

import React, { createContext, useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const CvModalContext = createContext(null);

export function useCvModal() {
  const ctx = useContext(CvModalContext);
  if (!ctx) throw new Error("useCvModal must be used inside CvModalProvider");
  return ctx;
}

export function CvModalProvider({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <CvModalContext.Provider value={{ open, openCv: () => setOpen(true), closeCv: () => setOpen(false) }}>
      {children}
      <AnimatePresence>
        {open && (
          <div
            className="fixed inset-0 z-[70] bg-black/50 flex items-center justify-center p-4"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-3xl h-[85vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setOpen(false)}
                className="absolute -top-3 -right-3 w-9 h-9 bg-white border border-zinc-200 rounded-full flex items-center justify-center shadow-sm z-10 hover:bg-zinc-900 hover:text-white hover:border-zinc-900 transition-colors"
              >
                <X size={15} />
              </button>
              <iframe
                src="/CV DATA ANGELICA SUTI WHIHARTO Q32026.pdf"
                className="w-full h-full rounded-xl border border-zinc-200 shadow-xl bg-white"
                title="Angelica's CV"
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </CvModalContext.Provider>
  );
}
