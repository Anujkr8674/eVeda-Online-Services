"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Show button when scrolled down 300px
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      
      if (currentScroll > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      if (totalScroll > 0) {
        setScrollProgress(currentScroll / totalScroll);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Run once on mount to check initial state
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Circumference of our progress circle (2 * PI * r) where r = 18
  const circumference = 2 * Math.PI * 18;
  const strokeDashoffset = circumference - scrollProgress * circumference;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          onClick={scrollToTop}
          className="fixed bottom-4 right-3.5 sm:bottom-6 sm:right-6 z-50 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/[0.08] text-white hover:text-[var(--accent-global)] shadow-[0_8px_30px_rgb(0,0,0,0.3)] transition-colors duration-300 group cursor-pointer focus:outline-none"
          style={{
            WebkitTapHighlightColor: "transparent",
          }}
          aria-label="Scroll to top"
        >
          {/* Subtle Hover Glow Backdrop */}
          <div className="absolute inset-0 rounded-full bg-[var(--accent-global)]/0 group-hover:bg-[var(--accent-global)]/5 transition-colors duration-300 pointer-events-none" />
          
          {/* Circular Progress SVG */}
          <svg className="absolute w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 44 44">
            {/* Track Circle (Light Gray) */}
            <circle
              className="text-white/[0.04]"
              stroke="currentColor"
              strokeWidth="2"
              fill="transparent"
              r="18"
              cx="22"
              cy="22"
            />
            {/* Progress Circle (Theme Accent) */}
            <circle
              className="transition-all duration-75"
              style={{
                color: "var(--accent-global, #7c3aed)",
                strokeDasharray: circumference,
                strokeDashoffset: strokeDashoffset,
              }}
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="transparent"
              r="18"
              cx="22"
              cy="22"
            />
          </svg>

          {/* Up Arrow Icon */}
          <ArrowUp className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5 relative z-10" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
