"use client";

import Link from "next/link";
import { CreditCard } from "lucide-react";
import { buttonClasses } from "@/components/ui/Button";
import { Tooltip } from "@/components/ui/Tooltip";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { PRIMARY_NAV } from "@/lib/navigation";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import styles from "./Header.module.css";

export function Header() {
  const progressRef = useScrollProgress();

  return (
    <header className={styles.header}>
      <div className="relative mx-auto flex h-16 max-w-[1680px] items-center px-4 sm:px-6 lg:px-8">
        <Link href="/" aria-label="Fomi home" className="rounded-chip text-ink">
          <Logo className="h-8 w-auto" />
        </Link>

        <nav aria-label="Main" className={styles.nav}>
          <span ref={progressRef} aria-hidden="true" className={styles.track}>
            <span className={styles.thumb} />
          </span>
          <ul className="flex items-center gap-3">
            {PRIMARY_NAV.map(({ href, label, icon: Icon }, index) => (
              <li key={label}>
                <Tooltip label={label} side="bottom">
                  <Link
                    href={href}
                    aria-label={label}
                    aria-current={index === 0 ? "page" : undefined}
                    className={styles.link}
                  >
                    <Icon aria-hidden="true" size={19} strokeWidth={2.2} />
                  </Link>
                </Tooltip>
              </li>
            ))}
          </ul>
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
