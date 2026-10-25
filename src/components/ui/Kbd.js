import { cn } from "@/lib/cn";

const tones = {
  light: "border-line bg-surface text-ink-2",
  dark: "border-canvas/20 bg-canvas/10 text-canvas/80",
};

export function Kbd({ tone = "light", className, children }) {
  return (
    <kbd
      className={cn(
        "inline-flex h-5 min-w-5 items-center justify-center rounded-tiny border px-1 font-sans text-2xs font-semibold",
        tones[tone],
        className,
      )}
    >
      {children}
    </kbd>
  );
}
