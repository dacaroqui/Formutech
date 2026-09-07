"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const items = [
  { id: "resumen", label: "Resumen" },
  { id: "beneficios", label: "Beneficios" },
  { id: "aplicaciones", label: "Aplicaciones" },
  { id: "especificaciones", label: "Especificaciones" },
  { id: "documentacion", label: "Documentación" },
];

export function ProductNav() {
  const [active, setActive] = useState("resumen");

  useEffect(() => {
    const els = items
      .map((i) => document.getElementById(i.id))
      .filter((n): n is HTMLElement => Boolean(n));
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (vis?.target.id) setActive(vis.target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.2, 0.6] }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="lg:sticky lg:top-24 lg:self-start">
      <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-3 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0 lg:pb-0">
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={cn(
              "shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold tracking-wide lg:rounded-xl",
              active === item.id
                ? "border-gold bg-accent text-ink"
                : "border-border bg-white text-muted-foreground hover:text-ink"
            )}
          >
            {item.label}
          </a>
        ))}
      </div>
    </div>
  );
}
