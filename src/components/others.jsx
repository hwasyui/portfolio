"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import data from "../data/others.json";
import { ArrowUpRight, ChevronDown, ChevronUp, FileText, X } from "lucide-react";
import SpotlightCard from "./spotlight-card";
import PdfThumbnail from "./pdf-thumbnail";
import HoverText from "./hover-text";

const ease = [0.16, 1, 0.3, 1];
const INITIAL_VISIBLE = 4;

function CertCard({ cert, index, onOpen }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.4, ease, delay: index * 0.03 }}
      className="h-full"
    >
      <SpotlightCard
        as="button"
        onClick={() => cert.file && onOpen(cert.file)}
        className="w-full h-full text-left"
      >
        <div className="h-full flex flex-col rounded-[28px] border border-zinc-200 group-hover:border-zinc-900 overflow-hidden transition-colors duration-200">
          <div className="relative h-32 bg-zinc-50 flex items-center justify-center overflow-hidden">
            {cert.file ? (
              cert.file.toLowerCase().endsWith(".pdf") ? (
                <PdfThumbnail src={cert.file} />
              ) : (
                <Image src={cert.file} alt={cert.title} fill sizes="300px" className="object-cover" />
              )
            ) : (
              <FileText size={26} className="text-zinc-200" />
            )}
          </div>
          <div className="p-4 flex flex-col flex-1">
            <div className="flex items-start justify-between gap-2 mb-1">
              <span className="text-[13px] font-medium text-zinc-800 leading-snug">{cert.title}</span>
              {cert.link && (
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-zinc-300 hover:text-zinc-900 transition-colors flex-shrink-0 mt-0.5"
                >
                  <ArrowUpRight size={13} />
                </a>
              )}
            </div>
            <span className="text-[11px] text-zinc-400 mt-auto pt-2">{cert.issuer}</span>
          </div>
        </div>
      </SpotlightCard>
    </motion.div>
  );
}

const Others = () => {
  const [showAll, setShowAll] = useState(false);
  const [lightbox, setLightbox] = useState(null);
  const visibleCerts = showAll ? data.certificates : data.certificates.slice(0, INITIAL_VISIBLE);

  return (
    <div className="bg-white px-6 md:px-16 py-20 md:py-28">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease }}
          className="mb-12"
        >
          <p className="text-xs font-medium tracking-[0.15em] uppercase text-zinc-400 mb-3">Others</p>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-zinc-900 leading-tight">
            <HoverText text="Languages & certificates" />
          </h2>
        </motion.div>

        <div className="space-y-12">
          <div>
            <h3 className="text-sm font-semibold text-zinc-900 mb-4">Languages</h3>
            <div className="flex flex-wrap gap-3">
              {data.languages.map((lang, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.4, ease, delay: i * 0.05 }}
                  className="border border-zinc-200 rounded-xl px-4 py-2.5"
                >
                  <div className="text-[11px] font-medium tracking-[0.1em] uppercase text-zinc-400">{lang.level}</div>
                  <div className="text-sm font-semibold text-zinc-900">{lang.name}</div>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-zinc-900 mb-4">Certificates</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <AnimatePresence initial={false}>
                {visibleCerts.map((cert, i) => (
                  <CertCard key={cert.title} cert={cert} index={i} onOpen={setLightbox} />
                ))}
              </AnimatePresence>
            </div>

            {data.certificates.length > INITIAL_VISIBLE && (
              <button
                onClick={() => setShowAll((prev) => !prev)}
                className="mt-6 flex items-center gap-1.5 mx-auto text-sm font-medium text-zinc-900 border-b border-zinc-900"
              >
                {showAll ? (
                  <><ChevronUp size={14} /> Show less</>
                ) : (
                  <><ChevronDown size={14} /> Show all {data.certificates.length}</>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.25, ease }}
            className={`relative w-full ${lightbox?.toLowerCase().endsWith(".pdf") ? "max-w-3xl h-[80vh]" : "max-w-2xl"}`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute -top-3 -right-3 w-9 h-9 bg-white border border-zinc-200 rounded-full flex items-center justify-center shadow-sm z-10 hover:bg-zinc-900 hover:text-white hover:border-zinc-900 transition-colors"
            >
              <X size={14} />
            </button>
            {lightbox?.toLowerCase().endsWith(".pdf") ? (
              <iframe src={lightbox} className="w-full h-full rounded-xl shadow-xl bg-white" title="Certificate PDF" />
            ) : (
              <img src={lightbox} alt="Certificate" className="w-full rounded-xl shadow-xl" />
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Others;
