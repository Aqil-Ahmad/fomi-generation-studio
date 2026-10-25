"use client";

import { useId, useRef } from "react";
import Image from "next/image";
import { CloudUpload, X } from "lucide-react";
import { buttonClasses } from "@/components/ui/Button";

export function UploadButton({ file, onChange }) {
  const inputRef = useRef(null);
  const inputId = useId();

  if (file) {
    return (
      <span className="inline-flex h-10 items-center gap-2 rounded-control border border-line bg-surface py-1 pr-1 pl-1">
        <Image src={file.url} alt="" width={30} height={30} unoptimized className="size-7.5 rounded-chip object-cover" />
        <span className="max-w-28 truncate text-sm text-ink-2">{file.name}</span>
        <button
          type="button"
          aria-label={`Remove ${file.name}`}
          onClick={() => {
            URL.revokeObjectURL(file.url);
            onChange(null);
          }}
          className="grid size-7.5 place-items-center rounded-chip text-muted hover:bg-surface-2 hover:text-ink"
        >
          <X aria-hidden="true" size={15} />
        </button>
      </span>
    );
  }

  return (
    <>
      <input
        ref={inputRef}
        id={inputId}
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={(event) => {
          const picked = event.target.files?.[0];
          if (picked) onChange({ name: picked.name, url: URL.createObjectURL(picked) });
          event.target.value = "";
        }}
      />
      <label htmlFor={inputId} className={buttonClasses({ variant: "outline", className: "cursor-pointer font-normal text-ink-2 has-focus-visible:outline-2 has-focus-visible:outline-accent-strong" })}>
        <CloudUpload aria-hidden="true" size={17} strokeWidth={2} />
        upload
        <span className="sr-only">a reference image</span>
      </label>
    </>
  );
}
