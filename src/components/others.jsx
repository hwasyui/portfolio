"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import data from "../data/others.json";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, ChevronDown, ChevronUp, Image as ImageIcon, FileText, X } from "lucide-react";

const Others = () => {
  const [showAll, setShowAll] = useState(false);
  const [lightbox, setLightbox] = useState(null);
  const visibleCerts = showAll ? data.certificates : data.certificates.slice(0, 3);

  return (
    <div className="relative overflow-hidden bg-white px-6 md:px-16 py-16 min-h-[calc(100vh-2.75rem)]">
      <div className="absolute bottom-0 right-0 font-bebas leading-none text-zinc-900/5 pointer-events-none select-none" style={{ fontSize: "clamp(100px, 18vw, 220px)" }} aria-hidden>06</div>
      <div className="max-w-5xl mx-auto">

        <div className="font-bebas text-[9px] tracking-[5px] text-pink-hot mb-1">Chapter VI</div>
        <h2 className="font-playfair font-black text-4xl md:text-5xl text-zinc-900 mb-12 leading-tight">
          Others
        </h2>

        <div className="space-y-10">

          {/* languages */}
          <div>
            <h3 className="font-playfair font-bold text-lg text-zinc-900 mb-4 flex items-center gap-3">
              <span className="w-5 h-0.5 bg-pink-hot" />
              Languages
            </h3>
            <div className="flex flex-wrap gap-3">
              {data.languages.map((lang, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.35, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="border border-pink-hot/30 bg-pink-pale rounded-lg px-4 py-2"
                >
                  <div className="font-bebas text-[9px] tracking-[3px] text-pink-hot">{lang.level}</div>
                  <div className="text-sm font-bold text-zinc-900">{lang.name}</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* certificates */}
          <div>
            <h3 className="font-playfair font-bold text-lg text-zinc-900 mb-4 flex items-center gap-3">
              <span className="w-5 h-0.5 bg-pink-hot" />
              Certificates
            </h3>
            <div className="space-y-2">
              {visibleCerts.map((cert, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.38, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between
                             bg-pink-pale border border-transparent hover:border-pink-hot/30
                             px-5 py-3.5 rounded-xl transition-all duration-200"
                >
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    {/* photo / pdf thumbnail */}
                    {cert.file ? (
                      <button
                        onClick={() => setLightbox(cert.file)}
                        className="flex-shrink-0 mt-0.5 w-9 h-9 rounded-lg overflow-hidden border border-pink-hot/30 hover:border-pink-hot transition-colors bg-pink-pale flex items-center justify-center"
                        title="View certificate"
                      >
                        {cert.file.toLowerCase().endsWith(".pdf") ? (
                          <FileText size={16} className="text-pink-hot" />
                        ) : (
                          <img src={cert.file} alt={cert.title} className="w-full h-full object-cover" />
                        )}
                      </button>
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
            </div>

            {/* in-place expand/collapse */}
            {data.certificates.length > 3 && (
              <button
                onClick={() => setShowAll(prev => !prev)}
                className="mt-6 flex items-center gap-2 mx-auto font-bebas text-[10px] tracking-[3px]
                           text-pink-hot border border-pink-hot px-5 py-2 rounded-full
                           hover:bg-pink-hot hover:text-white transition-all duration-200"
              >
                {showAll ? (
                  <><ChevronUp size={13} /> Show Less</>
                ) : (
                  <><ChevronDown size={13} /> Show All {data.certificates.length} Certificates</>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <div
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
          </div>
        </div>
      )}
    </div>
  );
};

export default Others;
