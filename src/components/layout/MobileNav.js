import Link from "next/link";
import { FolderOpen, House, UserRound, UsersRound } from "lucide-react";

const ITEMS = [
  { href: "/", label: "Home", icon: House, current: true },
  { href: "/#templates", label: "Community", icon: UsersRound },
  { href: "/#creations", label: "Assets", icon: FolderOpen },
  { href: "/#plans", label: "Profile", icon: UserRound },
];

export function MobileNav() {
  return (
    <nav
      aria-label="Main"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-canvas/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden"
    >
      <ul className="grid grid-cols-4">
        {ITEMS.map(({ href, label, icon: Icon, current }) => (
          <li key={label}>
            <Link
              href={href}
              aria-current={current ? "page" : undefined}
              className="flex min-h-14 flex-col items-center justify-center gap-0.5 text-2xs font-medium text-muted aria-[current=page]:text-accent-ink"
            >
              <Icon aria-hidden="true" size={20} strokeWidth={2} />
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
