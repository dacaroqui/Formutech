"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ListFilter } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type FilterChoice = {
  id: string;
  label: string;
  href: string;
  count: number;
  active: boolean;
};

export function SolutionsFilters({
  familyOptions,
  sheetOptions,
  clearHref,
  activeCount,
}: {
  familyOptions: FilterChoice[];
  sheetOptions: FilterChoice[];
  clearHref: string;
  activeCount: number;
}) {
  const detailsRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    function onPointerDown(e: PointerEvent) {
      const details = detailsRef.current;
      if (!details?.open || details.contains(e.target as Node)) return;
      details.removeAttribute("open");
    }
    function onKey(e: KeyboardEvent) {
      const details = detailsRef.current;
      if (e.key === "Escape" && details?.open) details.removeAttribute("open");
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <details ref={detailsRef} className="group relative shrink-0">
      <summary
        aria-label="Filtros"
        title="Filtros"
        className={cn(
          buttonVariants({ variant: "outline", size: "icon-lg" }),
          "relative size-11 cursor-pointer list-none rounded-2xl border-border bg-white text-ink shadow-none [&::-webkit-details-marker]:hidden [&::marker]:hidden",
          "group-open:border-gold/60 group-open:bg-accent",
          activeCount > 0 && "border-gold/60 bg-accent"
        )}
      >
        <ListFilter className="size-5" />
        {activeCount > 0 && (
          <span className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
            {activeCount}
          </span>
        )}
      </summary>
      <div className="absolute right-0 top-[calc(100%+8px)] z-[100] flex w-[min(20rem,calc(100vw-2rem))] max-h-[min(28rem,70vh)] flex-col overflow-y-auto rounded-2xl bg-white shadow-[0_18px_40px_-24px_rgba(28,36,24,0.55)] ring-1 ring-foreground/10">
        <div className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-border bg-white px-4 py-3">
          <p className="text-base font-semibold text-ink">Filtros</p>
          <Link
            href={clearHref}
            scroll={false}
            className="text-sm font-medium text-muted-foreground hover:text-gold"
          >
            Limpiar filtros
          </Link>
        </div>
        <FilterGroup title="Familia" options={familyOptions} />
        <FilterGroup
          title="Ficha técnica"
          options={sheetOptions}
          className="border-t border-border"
        />
      </div>
    </details>
  );
}

function FilterGroup({
  title,
  options,
  className,
}: {
  title: string;
  options: FilterChoice[];
  className?: string;
}) {
  return (
    <div className={cn("px-2 py-2", className)}>
      <p className="px-2 pb-1.5 text-[11px] font-semibold tracking-[0.18em] text-gold uppercase">
        {title}
      </p>
      <ul>
        {options.map((option) => (
          <li key={option.id}>
            <Link
              href={option.href}
              scroll={false}
              aria-current={option.active ? "page" : undefined}
              className={cn(
                "flex items-center gap-3 rounded-xl px-2 py-2 text-sm transition",
                option.active ? "bg-accent text-ink" : "text-ink/80 hover:bg-muted"
              )}
            >
              <span
                className={cn(
                  "flex size-4 shrink-0 items-center justify-center rounded-full border",
                  option.active ? "border-primary" : "border-foreground/25"
                )}
                aria-hidden
              >
                {option.active && <span className="size-2 rounded-full bg-primary" />}
              </span>
              <span className="min-w-0 flex-1 font-medium">{option.label}</span>
              <span
                className={cn(
                  "tabular-nums text-xs",
                  option.active ? "font-semibold text-primary" : "text-muted-foreground"
                )}
              >
                {option.count}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
