"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import data from "../data/others.json";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, ChevronDown, ChevronUp, Image as ImageIcon, FileText, X } from "lucide-react";

const Others = () => {
  const [showAll, setShowAll] = useState(false);
  const [lightbox, setLightbox] = useState(null);
  const visibleCerts = showAll ? data.certificates : data.certificates.slice(0, 3);

  return (
    <div className="relative overflow-hidden bg-white px-6 md:px-16 py-16">
      <div className="absolute bottom-0 right-0 font-bebas leading-none text-zinc-900/5 pointer-events-none select-none text-[120px] md:text-[180px] lg:text-[220px]" aria-hidden>06</div>
      <div className="max-w-5xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ type: "spring", stiffness: 420, damping: 30 }}
          className="mb-12"
        >
          <div className="relative inline-block">
            <span className="absolute -top-5 right-0 text-pink-candy/60 font-bebas text-3xl animate-float pointer-events-none select-none" aria-hidden>✦</span>
            <span className="absolute top-2 -right-6 text-pink-hot/35 font-bebas text-base animate-float-delay pointer-events-none select-none" aria-hidden>✦</span>
            <span className="absolute -top-1 right-12 text-pink-candy/30 font-bebas text-sm animate-float-slow pointer-events-none select-none" aria-hidden>✦</span>
            <div className="font-bebas text-[9px] tracking-[5px] text-pink-hot mb-1">Chapter VI</div>
            <h2 className="font-playfair font-black text-4xl md:text-5xl text-zinc-900 leading-tight">
              Others
            </h2>
          </div>
        </motion.div>

        <div className="space-y-10">

          <div>
            <motion.h3
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
              className="font-playfair font-bold text-lg text-zinc-900 mb-4 flex items-center gap-3"
            >
              <span className="w-5 h-0.5 bg-pink-hot" />
              Languages
            </motion.h3>
            <div className="flex flex-wrap gap-3">
              {data.languages.map((lang, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 28, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ type: "spring", stiffness: 420, damping: 26, delay: i * 0.07 }}
                  whileHover={{ y: -5, scale: 1.07, rotate: 1 }}
                  whileTap={{ scale: 0.96 }}
                  className="border border-pink-hot/30 bg-pink-pale rounded-xl px-4 py-2 cursor-default
                             hover:border-pink-hot hover:bg-pink-blush hover:shadow-md hover:shadow-pink-hot/10"
                >
                  <div className="font-bebas text-[9px] tracking-[3px] text-pink-hot">{lang.level}</div>
                  <div className="text-sm font-bold text-zinc-900">{lang.name}</div>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <motion.h3
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 400, damping: 28, delay: 0.05 }}
              className="font-playfair font-bold text-lg text-zinc-900 mb-4 flex items-center gap-3"
            >
              <span className="w-5 h-0.5 bg-pink-hot" />
              Certificates
            </motion.h3>
            <div className="space-y-2">
              <AnimatePresence initial={false}>
                {visibleCerts.map((cert, i) => (
                  <motion.div
                    key={cert.title}
                    initial={{ opacity: 0, y: 16, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 380, damping: 28, delay: i * 0.04 }}
                    whileHover={{ x: 4, backgroundColor: "rgba(255,224,238,0.6)" }}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between
                               bg-pink-pale border border-transparent hover:border-pink-hot/25
                               px-5 py-3.5 rounded-xl cursor-default"
                    style={{ transition: "background-color 0.2s, border-color 0.2s" }}
                  >
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      {cert.file ? (
                        <motion.button
                          onClick={() => setLightbox(cert.file)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          transition={{ type: "spring", stiffness: 400, damping: 20 }}
                          className="flex-shrink-0 mt-0.5 w-9 h-9 rounded-lg overflow-hidden border border-pink-hot/30 hover:border-pink-hot bg-white flex items-center justify-center"
                          title="View certificate"
                        >
                          {cert.file.toLowerCase().endsWith(".pdf") ? (
                            <FileText size={16} className="text-pink-hot" />
                          ) : (
                            <img src={cert.file} alt={cert.title} className="w-full h-full object-cover" />
                          )}
                        </motion.button>
                      ) : (
                        <div className="flex-shrink-0 mt-0.5 w-9 h-9 rounded-lg border border-dashed border-zinc-200 flex items-center justify-center text-zinc-300">
                          <ImageIcon size={14} />
                        </div>
                      )}

                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-medium text-sm text-zinc-800 leading-snug">{cert.title}</span>
                          {cert.link && (
                            <a
                              href={cert.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-pink-hot hover:text-pink-deep transition-colors flex-shrink-0"
                            >
                              <ArrowUpRight size={14} />
                            </a>
                          )}
                        </div>
                        {cert.id && <span className="text-xs text-zinc-400">{cert.id}</span>}
                      </div>
                    </div>

                    <Badge className="mt-2 sm:mt-0 sm:ml-4 bg-pink-blush text-pink-deep border-none text-xs w-fit flex-shrink-0">
                      {cert.issuer}
                    </Badge>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {data.certificates.length > 3 && (
              <motion.button
                onClick={() => setShowAll(prev => !prev)}
                whileHover={{ scale: 1.04, y: -1 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 22 }}
                className="mt-6 flex items-center gap-2 mx-auto font-bebas text-[10px] tracking-[3px]
                           text-pink-hot border border-pink-hot px-5 py-2 rounded-full
                           hover:bg-pink-hot hover:text-white transition-colors duration-200"
              >
                {showAll ? (
                  <><ChevronUp size={13} /> Show Less</>
                ) : (
                  <><ChevronDown size={13} /> Show All {data.certificates.length} Certificates</>
                )}
              </motion.button>
            )}
          </div>
        </div>
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ type: "spring", stiffness: 360, damping: 28 }}
            className={`relative w-full ${lightbox?.toLowerCase().endsWith(".pdf") ? "max-w-3xl h-[80vh]" : "max-w-2xl"}`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute -top-3 -right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg z-10 hover:bg-pink-pale hover:text-pink-hot transition-all"
            >
              <X size={14} />
            </button>
            {lightbox?.toLowerCase().endsWith(".pdf") ? (
              <iframe
                src={lightbox}
                className="w-full h-full rounded-2xl shadow-xl"
                title="Certificate PDF"
              />
            ) : (
              <img src={lightbox} alt="Certificate" className="w-full rounded-2xl shadow-xl" />
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Others;
