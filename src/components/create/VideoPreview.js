"use client";

import { useRef } from "react";
import { cn } from "@/lib/cn";

export function VideoPreview({ src, poster, className }) {
  const videoRef = useRef(null);

  function play() {
    videoRef.current?.play().catch(() => {});
  }

  function stop() {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    video.currentTime = 0;
  }

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      onPointerEnter={(event) => event.pointerType === "mouse" && play()}
      onPointerLeave={stop}
      className={cn("size-full object-cover", className)}
    />
  );
}
