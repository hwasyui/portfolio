"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

// switches to the archive link after mount if that's where the user came from

export default function BackLink({ archivePath, archiveLabel, homeSection, homeLabel, className }) {
  const [href, setHref] = useState("/");
  const [label, setLabel] = useState(homeLabel);

  useEffect(() => {
    if (sessionStorage.getItem("back-context") === archivePath) {
      setHref(archivePath);
      setLabel(archiveLabel);
    }
  }, [archivePath, archiveLabel]);

  // tells the homepage which section to land on before navigating home
  const handleClick = () => {
    if (href === "/") sessionStorage.setItem("scroll-target", homeSection);
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={
        className ||
        "inline-flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors"
      }
    >
      <ArrowLeft size={14} /> {label}
    </Link>
  );
}
