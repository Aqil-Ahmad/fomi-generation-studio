"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { CreditCard } from "lucide-react";
import { buttonClasses } from "@/components/ui/Button";
import { Tooltip } from "@/components/ui/Tooltip";
import { PRIMARY_NAV } from "@/lib/navigation";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import styles from "./Header.module.css";

function subscribeToLocation(onChange) {
  window.addEventListener("popstate", onChange);
  window.addEventListener("hashchange", onChange);
  return () => {
    window.removeEventListener("popstate", onChange);
    window.removeEventListener("hashchange", onChange);
  };
}

function navIndexFor(location) {
  const index = PRIMARY_NAV.findIndex(({ href }) => href !== "/" && href.slice(1) === location);
  return index === -1 ? 0 : index;
}

export function Header() {
  const location = useSyncExternalStore(
    subscribeToLocation,
    () => window.location.search + window.location.hash,
    () => "",
  );
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const activeIndex = selectedIndex ?? navIndexFor(location);
  const highlightedIndex = hoveredIndex ?? activeIndex;

  useEffect(() => {
    const clearSelection = () => setSelectedIndex(null);
    window.addEventListener("popstate", clearSelection);
    return () => window.removeEventListener("popstate", clearSelection);
  }, []);

  return (
    <header className={styles.header}>
      <div className="relative mx-auto flex h-16 max-w-[1680px] items-center px-4 sm:px-6 lg:px-8">
        <Link href="/" aria-label="Fomi home" onClick={() => setSelectedIndex(0)} className="rounded-chip text-ink">
          <Logo className="h-8 w-auto" />
        </Link>

        <nav aria-label="Main" className={styles.nav}>
          <div className={styles.rail} style={{ "--position": highlightedIndex }} onPointerLeave={() => setHoveredIndex(null)}>
            <span aria-hidden="true" className={styles.track}>
              <span className={styles.thumb} />
            </span>
            <ul className={styles.list}>
              {PRIMARY_NAV.map(({ href, label, icon: Icon }, index) => (
                <li key={label}>
                  <Tooltip label={label} side="bottom">
                    <Link
                      href={href}
                      aria-label={label}
                      aria-current={index === activeIndex ? "page" : undefined}
                      data-highlighted={index === highlightedIndex || undefined}
                      onClick={() => setSelectedIndex(index)}
                      onPointerEnter={() => setHoveredIndex(index)}
                      onFocus={() => setHoveredIndex(index)}
                      onBlur={() => setHoveredIndex(null)}
                      className={styles.link}
                    >
                      <Icon aria-hidden="true" width={22} height={22} />
                    </Link>
                  </Tooltip>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Link href="/#plans" className={buttonClasses({ variant: "outline", size: "sm", className: "text-xs text-ink-2 max-lg:hidden" })}>
            <CreditCard aria-hidden="true" size={15} strokeWidth={2} />
            Plans
          </Link>
          <ThemeToggle />
          <Link href="/#create" className={buttonClasses({ variant: "soft", size: "md", className: "text-md" })}>
            Try now
          </Link>
        </div>
      </div>
    </header>
  );
}
