import { cn } from "@/lib/cn";
import { Tooltip } from "./Tooltip";

export function IconButton({ label, shortcut, tooltipSide, pressed, className, children, type = "button", ...props }) {
  return (
    <Tooltip label={label} shortcut={shortcut} side={tooltipSide}>
      <button
        type={type}
        aria-label={label}
        aria-pressed={pressed}
        className={cn(
          "inline-flex size-9 items-center justify-center rounded-control text-ink-2 transition-[background-color,color,scale] duration-150 hover:bg-surface-2 hover:text-ink active:scale-96 disabled:cursor-not-allowed disabled:opacity-40 aria-pressed:bg-accent aria-pressed:text-ink pointer-coarse:size-11",
          className,
        )}
        {...props}
      >
        {children}
      </button>
    </Tooltip>
  );
}
