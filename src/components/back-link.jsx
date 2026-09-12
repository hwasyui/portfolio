"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

/** "Back to X" link that returns to wherever the user actually came from:
 * the archive page (e.g. /projects) if they clicked in from there, or the
 * matching homepage section otherwise. Defaults to the homepage section on
 * first render (matches SSR) and corrects itself right after mount. */
export default function BackLink({ archivePath, archiveLabel, homeHref, homeLabel, className }) {
  const [href, setHref] = useState(homeHref);
  const [label, setLabel] = useState(homeLabel);

  useEffect(() => {
    if (sessionStorage.getItem("back-context") === archivePath) {
      setHref(archivePath);
      setLabel(archiveLabel);
    }
  }, [archivePath, archiveLabel]);

  return (
    <Link
      href={href}
      className={
        className ||
        "inline-flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors"
      }
    >
      <ArrowLeft size={14} /> {label}
    </Link>
  );
}
