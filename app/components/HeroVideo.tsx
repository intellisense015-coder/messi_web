"use client";

import { useEffect, useState } from "react";

export default function HeroVideo() {
  const [offset, setOffset] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotionPreference = () => setReducedMotion(mediaQuery.matches);
    syncMotionPreference();
    mediaQuery.addEventListener("change", syncMotionPreference);
    if (mediaQuery.matches) return () => mediaQuery.removeEventListener("change", syncMotionPreference);
    let frame = 0;
    const update = () => {
      frame = 0;
      setOffset(Math.min(window.scrollY * 0.08, 36));
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
      mediaQuery.removeEventListener("change", syncMotionPreference);
    };
  }, []);

  return (
    <div className="hero-video-layer" aria-hidden="true" style={{ transform: reducedMotion ? "scale(1.04)" : `translate3d(0, ${offset}px, 0) scale(1.04)` }}>
      <video className="hero-video" autoPlay={!reducedMotion} muted loop playsInline poster="/hero-operations.png" preload="metadata">
        <source src="/hero-warehouse.mp4" type="video/mp4" />
        <source src="/hero-geometric.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
