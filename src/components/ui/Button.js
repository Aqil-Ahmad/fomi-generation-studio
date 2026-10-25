import { cn } from "@/lib/cn";

const variants = {
  accent: "border-transparent bg-accent-strong text-on-accent hover:bg-accent-hover",
  soft: "border-transparent bg-surface-2 text-ink hover:bg-surface-3",
  outline: "border-line bg-surface text-ink hover:border-line-strong hover:bg-surface-2",
  ghost: "border-transparent text-ink-2 hover:bg-surface-2 hover:text-ink",
};

const sizes = {
  sm: "h-8 rounded-control px-3 text-sm",
  md: "h-10 rounded-control px-4 text-base",
  lg: "h-12 rounded-card px-6 text-lg",
};

export function buttonClasses({ variant = "outline", size = "md", className } = {}) {
  return cn(
    "inline-flex shrink-0 items-center justify-center gap-2 border font-medium whitespace-nowrap transition-[background-color,border-color,color,scale] duration-150 ease-out active:scale-98 disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100 pointer-coarse:min-h-11",
    variants[variant],
    sizes[size],
    className,
  );
}

export function Button({ variant, size, className, type = "button", ...props }) {
  return <button type={type} className={buttonClasses({ variant, size, className })} {...props} />;
}
