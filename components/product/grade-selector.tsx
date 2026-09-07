"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Grade } from "@/lib/products";
import { cn } from "@/lib/utils";

export function GradeSelector({
  grades,
  activeId,
  onSelectHref,
}: {
  grades: Grade[];
  activeId: string;
  onSelectHref?: boolean;
}) {
  const router = useRouter();

  return (
    <div className="flex flex-wrap gap-2">
      {grades.map((g) => {
        const active = g.id === activeId;
        const cls = cn(
          "rounded-2xl border px-4 py-3 text-left transition",
          active
            ? "border-gold bg-accent text-ink shadow-[0_10px_24px_-18px_#d89629]"
            : "border-border bg-white hover:border-gold/60"
        );
        if (onSelectHref) {
          return (
            <Link key={g.id} href={g.href} className={cls}>
              <span className="block text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
                Referencia
              </span>
              <span className="mt-1 block text-sm font-semibold">{g.label}</span>
              {g.pending && (
                <span className="mt-1 block text-[11px] text-gold">Ficha pendiente</span>
              )}
            </Link>
          );
        }
        return (
          <button
            key={g.id}
            type="button"
            className={cls}
            onClick={() => router.push(g.href, { scroll: false })}
          >
            <span className="block text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
              Referencia
            </span>
            <span className="mt-1 block text-sm font-semibold">{g.label}</span>
          </button>
        );
      })}
    </div>
  );
}
