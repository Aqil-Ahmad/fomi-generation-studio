import Link from "next/link";
import { FOOTER_COLUMNS } from "@/lib/navigation";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-line bg-surface max-md:pb-20">
      <div className="mx-auto grid max-w-[1680px] gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_3fr] lg:px-8">
        <div>
          <Link href="/" aria-label="Fomi home" className="inline-flex items-center gap-3 rounded-chip text-ink">
            <Logo className="h-8 w-auto" />
            <span className="text-xl font-semibold tracking-wide">FOMI</span>
          </Link>
          <p className="mt-3 text-sm text-muted">Figment of My Imagination</p>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {FOOTER_COLUMNS.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h2 className="text-sm font-semibold">{column.title}</h2>
              <ul className="mt-3 grid gap-2">
                {column.links.map((link) => (
                  <li key={link}>
                    <Link href="/" className="rounded-tiny text-sm text-muted transition-colors hover:text-ink">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>
      <p className="mx-auto max-w-[1680px] border-t border-line px-4 py-5 text-xs text-muted sm:px-6 lg:px-8">
        © 2026 FOMI
      </p>
    </footer>
  );
}
