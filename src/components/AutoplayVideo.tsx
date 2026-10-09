"use client";

import { useEffect, useRef } from "react";

// Stummes Loop-Video: spielt erst, wenn es im Bild ist, und gar nicht bei „Bewegung reduzieren“
// (dann bleibt das Posterbild stehen).
export function AutoplayVideo({
  mp4,
  webm,
  poster,
  label,
  className,
}: {
  mp4: string;
  webm?: string;
  poster?: string;
  label: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const ruhig = window.matchMedia("(prefers-reduced-motion: reduce)");
    const observer = new IntersectionObserver(
      ([eintrag]) => {
        if (eintrag.isIntersecting && !ruhig.matches) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.25 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      className={className}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      aria-label={label}
    >
      {webm && <source src={webm} type="video/webm" />}
      <source src={mp4} type="video/mp4" />
    </video>
  );
}
