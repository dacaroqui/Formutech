"use client";

import { useState } from "react";
import Link from "next/link";
import { ListFilter } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
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
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={(next) => setOpen(next)}>
      <PopoverTrigger
        aria-label="Filtros"
        title="Filtros"
        className={cn(
          buttonVariants({ variant: "outline", size: "icon-lg" }),
          "relative size-11 shrink-0 rounded-2xl border-border bg-white text-ink shadow-none",
          activeCount > 0 && "border-gold/60 bg-accent"
        )}
      >
        <ListFilter className="size-5" />
        {activeCount > 0 && (
          <span className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
            {activeCount}
          </span>
        )}
      </PopoverTrigger>
      <PopoverContent
        align="end"
        sideOffset={8}
        className="w-80 max-h-[min(28rem,70vh)] gap-0 overflow-y-auto rounded-2xl p-0"
      >
        <PopoverHeader className="sticky top-0 z-10 flex flex-row items-center justify-between gap-3 border-b border-border bg-popover px-4 py-3">
          <PopoverTitle className="text-base font-semibold text-ink">Filtros</PopoverTitle>
          <Link
            href={clearHref}
            scroll={false}
            onClick={() => setOpen(false)}
            className="text-sm font-medium text-muted-foreground hover:text-gold"
          >
            Limpiar filtros
          </Link>
        </PopoverHeader>
        <FilterGroup
          title="Familia"
          options={familyOptions}
          onPick={() => setOpen(false)}
        />
        <FilterGroup
          title="Ficha técnica"
          options={sheetOptions}
          onPick={() => setOpen(false)}
        />
      </PopoverContent>
    </Popover>
  );
}

function FilterGroup({
  title,
  options,
  onPick,
}: {
  title: string;
  options: FilterChoice[];
  onPick: () => void;
}) {
  return (
    <div className="px-2 py-2">
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
              onClick={onPick}
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
              <span className="tabular-nums text-xs text-muted-foreground">{option.count}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
