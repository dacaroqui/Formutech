import Link from "next/link";

export type Crumb = { href?: string; label: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Miga de pan" className="text-[12px] text-muted-foreground">
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((item, i) => (
          <li key={`${item.label}-${i}`} className="flex items-center gap-1">
            {i > 0 && <span className="text-gold/80">/</span>}
            {item.href ? (
              <Link href={item.href} className="hover:text-primary">
                {item.label}
              </Link>
            ) : (
              <span className="font-medium text-ink">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
