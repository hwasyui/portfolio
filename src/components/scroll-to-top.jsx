"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const DETAIL_PREFIXES = ["/projects/", "/experience/", "/skills/"];
const ITEM_DETAIL_PREFIXES = ["/projects/", "/experience/"];

function isDetailHref(href) {
  if (!href) return false;
  return href === "/projects" || DETAIL_PREFIXES.some((p) => href.startsWith(p));
}

function isItemDetailHref(href) {
  if (!href) return false;
  return ITEM_DETAIL_PREFIXES.some((p) => href.startsWith(p) && href !== p);
}

function scrollToId(id) {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ behavior: "instant" }));
  });
}

function restoreScroll() {
  const saved = sessionStorage.getItem("home-scroll-y");
  if (saved !== null) {
    sessionStorage.removeItem("home-scroll-y");
    const top = parseInt(saved, 10);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => window.scrollTo({ top, behavior: "instant" }));
    });
    return;
  }
  // internal links pass the target section through session storage
  const target = sessionStorage.getItem("scroll-target");
  if (target) {
    sessionStorage.removeItem("scroll-target");
    scrollToId(target);
    return;
  }
  // falls back to the url hash for a manually typed or bookmarked link
  if (window.location.hash) {
    scrollToId(window.location.hash.slice(1));
    return;
  }
  window.scrollTo({ top: 0, behavior: "instant" });
}

// scrolls to top on route change, except back to "/" where it restores the last position
const ScrollManager = () => {
  const pathname = usePathname();

  useEffect(() => {
    const onClick = (e) => {
      const link = e.target.closest("a[href]");
      const href = link?.getAttribute("href");
      if (!href) return;

      // records which page an item-detail link was opened from
      if (isItemDetailHref(href)) {
        sessionStorage.setItem("back-context", window.location.pathname);
      }

      if (window.location.pathname === "/" && isDetailHref(href)) {
        sessionStorage.setItem("home-scroll-y", String(window.scrollY));
      }
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  useEffect(() => {
    if (pathname === "/") {
      restoreScroll();
    } else {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [pathname]);

  return null;
};

export default ScrollManager;
