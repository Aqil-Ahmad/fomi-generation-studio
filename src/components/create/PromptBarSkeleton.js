export function PromptBarSkeleton() {
  return (
    <div aria-hidden="true" className="rounded-panel border border-accent/40 bg-surface p-3 shadow-bar sm:px-4">
      <div className="h-8" />
      <div className="mt-2 flex items-center gap-3">
        <span className="skeleton h-10 w-24 rounded-control motion-safe:animate-shimmer" />
        <span className="skeleton h-10 w-24 rounded-control motion-safe:animate-shimmer" />
        <span className="skeleton ml-auto h-11 w-36 rounded-card motion-safe:animate-shimmer" />
      </div>
    </div>
  );
}
