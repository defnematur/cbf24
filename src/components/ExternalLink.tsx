import type { ReactNode } from "react";
import { Icon } from "./Icon";

// Externe Links (Textilkatalog, Hakro, Instagram …) öffnen in neuem Tab, mit ↗.
export function ExternalLink({
  href,
  className,
  children,
  icon = true,
}: {
  href: string;
  className?: string;
  children: ReactNode;
  icon?: boolean;
}) {
  return (
    <a href={href} className={className} target="_blank" rel="noopener noreferrer">
      {children}
      {icon && <Icon name="arrowUpRight" size={14} />}
      <span className="sr-only"> (öffnet in neuem Tab)</span>
    </a>
  );
}
