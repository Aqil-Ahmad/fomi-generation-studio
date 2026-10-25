import { ratioToNumber } from "@/lib/options";

export function RatioIcon({ ratio, size = 16 }) {
  const value = ratioToNumber(ratio);
  const width = value >= 1 ? size : Math.round(size * value);
  const height = value >= 1 ? Math.round(size / value) : size;

  return (
    <span aria-hidden="true" className="grid place-items-center" style={{ width: size, height: size }}>
      <span className="rounded-[3px] border-[1.5px] border-current" style={{ width, height }} />
    </span>
  );
}
