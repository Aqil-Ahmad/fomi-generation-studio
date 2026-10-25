"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useToast } from "@/components/ui/Toast";
import { GenerationGroup } from "./GenerationGroup";

const MediaViewer = dynamic(() => import("./MediaViewer"));

function announcement(groups) {
  const latest = groups[0];
  if (!latest) return "";
  const noun = latest.settings.mode === "video" ? "video" : "image";
  if (latest.status === "failed") return `Generation failed. ${latest.error ?? ""}`;
  if (latest.status === "done") return `${latest.results.length} ${noun}${latest.results.length === 1 ? "" : "s"} ready`;
  return `Generating ${latest.settings.count} ${noun}${latest.settings.count === 1 ? "" : "s"}`;
}

export function Creations({ generation, onReuse }) {
  const { groups, favorites } = generation;
  const toast = useToast();
  const [viewerIndex, setViewerIndex] = useState(null);
  const results = groups.flatMap((group) => group.results);

  async function copyPrompt(prompt) {
    try {
      await navigator.clipboard.writeText(prompt);
      toast({ title: "Prompt copied" });
    } catch {
      toast({ title: "Couldn't copy the prompt" });
    }
  }

  return (
    <section id="creations" aria-labelledby="creations-heading" className="scroll-mt-24">
      <div className="mb-5 flex items-baseline justify-between gap-4">
        <h2 id="creations-heading" className="text-xl font-medium">
          Your creations
          {results.length > 0 && <span className="ml-2 text-base font-normal text-muted">{results.length}</span>}
        </h2>
      </div>
      <p className="sr-only" aria-live="polite">
        {announcement(groups)}
      </p>

      <div className="grid gap-8">
        {groups.map((group, index) => (
          <GenerationGroup
            key={group.id}
            group={group}
            favorites={favorites}
            priority={index === 0}
            onOpen={(result) => setViewerIndex(results.findIndex((item) => item.id === result.id))}
            onToggleFavorite={generation.toggleFavorite}
            onCopy={copyPrompt}
            onReuse={onReuse}
            onRetry={() => generation.retry(group)}
            onRemove={() => generation.remove(group.id)}
          />
        ))}
      </div>

      {viewerIndex !== null && results[viewerIndex] && (
        <MediaViewer items={results} index={viewerIndex} onNavigate={setViewerIndex} onClose={() => setViewerIndex(null)} />
      )}
    </section>
  );
}
