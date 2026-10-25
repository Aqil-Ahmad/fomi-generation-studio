"use client";

import { useEffect, useRef } from "react";

export function ShowcaseVideo({ media, autoplay, className }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !autoplay) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) video.play().catch(() => {});
      else video.pause();
    });
    observer.observe(video);
    return () => observer.disconnect();
  }, [autoplay]);

  function play() {
    videoRef.current?.play().catch(() => {});
  }

  function pause() {
    if (!autoplay) videoRef.current?.pause();
  }

  return (
    <video
      ref={videoRef}
      src={media.src}
      poster={media.poster}
      aria-hidden="true"
      muted
      loop
      playsInline
      preload={autoplay ? "metadata" : "none"}
      onPointerEnter={play}
      onPointerLeave={pause}
      className={className}
    />
  );
}
