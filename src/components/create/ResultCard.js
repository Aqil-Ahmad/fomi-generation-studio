"use client";

import Image from "next/image";
import { Copy, Download, Heart, Play, RotateCcw } from "lucide-react";
import { IconButton } from "@/components/ui/IconButton";
import { cn } from "@/lib/cn";
import { VideoPreview } from "./VideoPreview";

const SIZES = "(min-width: 1536px) 18vw, (min-width: 1024px) 22vw, (min-width: 640px) 33vw, 50vw";

export function ResultCard({ result, favorite, priority, onOpen, onToggleFavorite, onCopy, onReuse }) {
  const isVideo = result.type === "video";
  const ratio = result.aspectRatio.replace(":", "/");

  return (
    <figure
      className="group relative m-0 aspect-(--ratio) overflow-hidden rounded-card bg-surface-2 motion-safe:animate-result-in"
      style={{ "--ratio": ratio }}
    >
      {isVideo ? (
        <VideoPreview src={result.src} poster={result.poster} />
      ) : (
        <Image
          src={result.src}
          alt={result.prompt}
          fill
          sizes={SIZES}
          priority={priority}
          placeholder="blur"
          blurDataURL={result.blurDataURL}
          className="object-cover transition-transform duration-300 ease-out group-hover:scale-103"
        />
      )}

      <button
        type="button"
        onClick={onOpen}
        aria-label={`Open ${isVideo ? "video" : "image"}: ${result.prompt}`}
        className="absolute inset-0 rounded-card focus-visible:-outline-offset-3"
      />

      {isVideo && (
        <span aria-hidden="true" className="pointer-events-none absolute bottom-2.5 left-2.5 grid size-7 place-items-center rounded-full bg-overlay text-white">
          <Play size={13} fill="currentColor" />
        </span>
      )}

      <div
        className={cn(
          "absolute top-2 right-2 flex gap-1 rounded-control bg-surface/90 p-1 shadow-float backdrop-blur transition-opacity duration-150",
          "opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 pointer-coarse:opacity-100",
        )}
      >
        <IconButton label={favorite ? "Remove from favourites" : "Add to favourites"} pressed={favorite} onClick={onToggleFavorite} className="size-8">
          <Heart aria-hidden="true" size={16} fill={favorite ? "currentColor" : "none"} />
        </IconButton>
        <IconButton label="Copy prompt" onClick={onCopy} className="size-8">
          <Copy aria-hidden="true" size={16} />
        </IconButton>
        <IconButton label="Reuse prompt" onClick={onReuse} className="size-8">
          <RotateCcw aria-hidden="true" size={16} />
        </IconButton>
        <a
          href={result.src}
          download
          aria-label="Download"
          className="grid size-8 place-items-center rounded-control text-ink-2 transition-colors hover:bg-surface-2 hover:text-ink pointer-coarse:size-11"
        >
          <Download aria-hidden="true" size={16} />
        </a>
      </div>
    </figure>
  );
}
