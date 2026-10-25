import { cn } from "@/lib/cn";

export function Segmented({ label, options, value, onChange, className, itemClassName }) {
  return (
    <div role="group" aria-label={label} className={cn("inline-flex items-center gap-0.5 rounded-control border border-line bg-surface p-0.5", className)}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          aria-pressed={option.value === value}
          aria-label={option.label}
          onClick={() => onChange(option.value)}
          className={cn(
            "flex h-7.5 min-w-7.5 items-center justify-center rounded-chip px-2 text-sm text-ink-2 transition-[background-color,color] duration-150 hover:bg-surface-2 hover:text-ink aria-pressed:bg-accent aria-pressed:text-accent-contrast pointer-coarse:min-h-11 pointer-coarse:min-w-11",
            itemClassName,
          )}
        >
          {option.icon ?? option.label}
        </button>
      ))}
    </div>
  );
}
