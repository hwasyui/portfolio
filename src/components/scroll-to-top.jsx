"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// scrolls to the top whenever the route changes
const ScrollToTop = () => {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
