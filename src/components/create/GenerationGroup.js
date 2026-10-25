"use client";

import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { modelLabel } from "@/lib/options";
import { PendingCard } from "./PendingCard";
import { ResultCard } from "./ResultCard";

const TIME_FORMAT = new Intl.DateTimeFormat("en", { hour: "numeric", minute: "2-digit" });

export function GenerationGroup({ group, favorites, priority, onOpen, onToggleFavorite, onCopy, onReuse, onRetry, onRemove }) {
  const { settings, status, results, progress } = group;
  const pending = Math.max(0, settings.count - results.length);
  const isActive = status === "queued" || status === "running";

  return (
    <article aria-busy={isActive} className="grid gap-4 md:grid-cols-[minmax(220px,280px)_1fr]">
      <div className="flex flex-col justify-between gap-4 rounded-card border border-line bg-accent-soft/60 p-4">
        <p className="line-clamp-10 text-sm leading-relaxed text-ink-2" title={settings.prompt}>
          {settings.prompt}
        </p>
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
          <span className="rounded-chip border border-line bg-surface px-2 py-1 font-medium text-ink-2">
            {modelLabel(settings.mode, settings.model)}
          </span>
          <span>{settings.aspectRatio}</span>
          <span aria-hidden="true">·</span>
          <time dateTime={group.createdAt}>{TIME_FORMAT.format(new Date(group.createdAt))}</time>
        </div>
      </div>

      {status === "failed" ? (
        <div role="alert" className="flex flex-col items-start justify-center gap-3 rounded-card border border-line bg-surface p-5">
          <p className="flex items-center gap-2 text-sm font-medium text-ink">
            <AlertCircle aria-hidden="true" size={18} className="text-accent-ink" />
            {group.error ?? "This one didn't finish."}
          </p>
          <div className="flex gap-2">
            <Button variant="accent" size="sm" onClick={onRetry}>
              Try again
            </Button>
            <Button variant="ghost" size="sm" onClick={onRemove}>
              Remove
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 items-start gap-3 sm:gap-4 lg:grid-cols-4">
          {results.map((result, index) => (
            <ResultCard
              key={result.id}
              result={result}
              favorite={favorites.includes(result.id)}
              priority={priority && index === 0}
              onOpen={() => onOpen(result)}
              onToggleFavorite={() => onToggleFavorite(result.id)}
              onCopy={() => onCopy(result.prompt)}
              onReuse={() => onReuse(settings)}
            />
          ))}
          {Array.from({ length: pending }, (_, index) => (
            <PendingCard key={index} aspectRatio={settings.aspectRatio} progress={progress} />
          ))}
        </div>
      )}
    </article>
  );
}
