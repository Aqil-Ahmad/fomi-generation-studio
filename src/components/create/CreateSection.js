"use client";

import { Suspense, useRef, useState } from "react";
import { useGeneration } from "@/hooks/useGeneration";
import { Creations } from "./Creations";
import { PromptBar } from "./PromptBar";
import { PromptBarSkeleton } from "./PromptBarSkeleton";

export function CreateSection({ children }) {
  const generation = useGeneration();
  const promptRef = useRef(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleGenerate(settings) {
    setSubmitting(true);
    const started = generation.generate(settings);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    await started;
    document.getElementById("creations")?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    setSubmitting(false);
  }

  return (
    <div className="relative">
      {children}
      {generation.groups.length > 0 && (
        <div className="mx-auto max-w-[1680px] px-4 pt-10 sm:px-6 lg:px-8">
          <Creations generation={generation} onReuse={(settings) => promptRef.current?.fill(settings.prompt, settings)} />
        </div>
      )}
      <div id="create" className="sticky bottom-20 z-20 mx-auto mt-6 max-w-[1680px] scroll-mt-24 scroll-mb-6 px-3 sm:px-6 md:bottom-4 lg:px-8">
        <Suspense fallback={<PromptBarSkeleton />}>
          <PromptBar ref={promptRef} onGenerate={handleGenerate} submitting={submitting} />
        </Suspense>
      </div>
    </div>
  );
}
