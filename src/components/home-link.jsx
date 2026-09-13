"use client";

import Link from "next/link";

// records which homepage section to land on, so the url stays hash-free
export default function HomeLink({ section, className, children }) {
  return (
    <Link href="/" onClick={() => sessionStorage.setItem("scroll-target", section)} className={className}>
      {children}
    </Link>
  );
}
