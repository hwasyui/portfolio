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
  if (window.location.hash) {
    const id = window.location.hash.slice(1);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ behavior: "instant" }));
    });
    return;
  }
  window.scrollTo({ top: 0, behavior: "instant" });
}

/** Scrolls to top on route change, except returning to "/" where it restores
 * the scroll position (or section) the user left from. */
const ScrollManager = () => {
  const pathname = usePathname();

  useEffect(() => {
    const onClick = (e) => {
      const link = e.target.closest("a[href]");
      const href = link?.getAttribute("href");
      if (!href) return;

      // Remember which page an item-detail link was clicked from, so the
      // detail page's "Back to X" can return there instead of always home.
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
