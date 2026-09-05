"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function RouteScrollRestorer() {
  const pathname = usePathname();

  useEffect(() => {
    // If the URL has an anchor hash, let anchor scrolling handle it
    if (window.location.hash) return;

    // Immediately scroll to the top of the page on route change
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    // Re-assert after render/layout pass
    const raf = requestAnimationFrame(() => {
      if (!window.location.hash) {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      }
    });

    const timer = setTimeout(() => {
      if (!window.location.hash) {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      }
    }, 50);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
  }, [pathname]);

  return null;
}
