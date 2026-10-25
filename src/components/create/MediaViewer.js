"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { IconButton } from "@/components/ui/IconButton";
import { modelLabel } from "@/lib/options";

export default function MediaViewer({ items, index, onNavigate, onClose }) {
  const dialogRef = useRef(null);
  const item = items[index];

  useEffect(() => {
    dialogRef.current?.showModal();
  }, []);

  function handleKeyDown(event) {
    if (event.key === "ArrowRight" && index < items.length - 1) onNavigate(index + 1);
    if (event.key === "ArrowLeft" && index > 0) onNavigate(index - 1);
  }

  return (
    <dialog
      ref={dialogRef}
      aria-label="Viewer"
      onClose={onClose}
      onKeyDown={handleKeyDown}
      onClick={(event) => event.target === dialogRef.current && dialogRef.current.close()}
      className="m-auto h-dvh max-h-none w-full max-w-none bg-transparent p-0 text-white backdrop:bg-black/85"
    >
      <div className="grid h-full grid-rows-[auto_1fr_auto] gap-3 p-4 sm:p-6">
        <div className="flex items-center justify-between">
          <p className="text-sm text-white/70" aria-live="polite">
            {index + 1} of {items.length}
          </p>
          <IconButton label="Close" onClick={() => dialogRef.current?.close()} className="text-white hover:bg-white/10 hover:text-white">
            <X aria-hidden="true" size={20} />
          </IconButton>
        </div>

        <div className="relative grid min-h-0 place-items-center">
          {item.type === "video" ? (
            <video key={item.id} src={item.src} poster={item.poster} controls autoPlay muted loop playsInline className="max-h-full max-w-full rounded-card" />
          ) : (
            <Image
              key={item.id}
              src={item.src}
              alt={item.prompt}
              width={item.width}
              height={item.height}
              sizes="90vw"
              placeholder="blur"
              blurDataURL={item.blurDataURL}
              className="max-h-full w-auto rounded-card object-contain"
            />
          )}
          {items.length > 1 && (
            <>
              <div className="absolute left-0 max-sm:hidden">
                <IconButton
                  label="Previous"
                  tooltipSide="right"
                  disabled={index === 0}
                  onClick={() => onNavigate(index - 1)}
                  className="bg-black/40 text-white hover:bg-black/60 hover:text-white"
                >
                  <ChevronLeft aria-hidden="true" size={22} />
                </IconButton>
              </div>
              <div className="absolute right-0 max-sm:hidden">
                <IconButton
                  label="Next"
                  tooltipSide="left"
                  disabled={index === items.length - 1}
                  onClick={() => onNavigate(index + 1)}
                  className="bg-black/40 text-white hover:bg-black/60 hover:text-white"
                >
                  <ChevronRight aria-hidden="true" size={22} />
                </IconButton>
              </div>
            </>
          )}
        </div>

        <div className="mx-auto w-full max-w-3xl text-center">
          <p className="line-clamp-3 text-sm text-white/90">{item.prompt}</p>
          <p className="mt-1 text-xs text-white/60">
            {modelLabel(item.type, item.model)} · {item.aspectRatio}
          </p>
        </div>
      </div>
    </dialog>
  );
}
