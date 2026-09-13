"use client";

import React, { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { FileText } from "lucide-react";

// renders the pdf's first page onto a canvas once it scrolls into view
export default function PdfThumbnail({ src }) {
  const canvasRef = useRef(null);
  const [status, setStatus] = useState("idle");
  const { ref, inView } = useInView({ triggerOnce: true, rootMargin: "200px" });

  useEffect(() => {
    if (!inView || !src) return;
    let cancelled = false;
    setStatus("loading");

    (async () => {
      try {
        const pdfjsLib = await import("pdfjs-dist");
        pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
          "pdfjs-dist/build/pdf.worker.min.mjs",
          import.meta.url
        ).toString();

        const pdf = await pdfjsLib.getDocument({ url: src }).promise;
        const page = await pdf.getPage(1);
        const canvas = canvasRef.current;
        if (!canvas || cancelled) return;

        const containerWidth = canvas.parentElement?.clientWidth || 300;
        const baseViewport = page.getViewport({ scale: 1 });
        const scale = (containerWidth / baseViewport.width) * 2;
        const viewport = page.getViewport({ scale });

        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext("2d");
        await page.render({ canvasContext: ctx, viewport }).promise;

        if (!cancelled) setStatus("ready");
      } catch {
        if (!cancelled) setStatus("error");
      }
    })();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, src]);

  return (
    <div ref={ref} className="relative w-full h-full">
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover"
        style={{ display: status === "ready" ? "block" : "none" }}
      />
      {status !== "ready" && (
        <div className="absolute inset-0 flex items-center justify-center">
          <FileText size={26} className="text-zinc-300" />
        </div>
      )}
    </div>
  );
}
