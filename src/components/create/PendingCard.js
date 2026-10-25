export function PendingCard({ aspectRatio, progress }) {
  return (
    <div
      aria-hidden="true"
      className="relative aspect-(--ratio) overflow-hidden rounded-card skeleton motion-safe:animate-shimmer"
      style={{ "--ratio": aspectRatio.replace(":", "/") }}
    >
      <span className="absolute inset-x-3 bottom-3 h-1 overflow-hidden rounded-full bg-ink/10">
        <span
          className="block h-full origin-left rounded-full bg-accent-strong transition-transform duration-500 ease-linear"
          style={{ transform: `scaleX(${Math.max(0.04, progress)})` }}
        />
      </span>
    </div>
  );
}
