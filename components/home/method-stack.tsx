"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const STEPS = [
  {
    n: "01",
    title: "Entendemos",
    kind: "entendemos" as const,
    body: "Aplicación, equipo, condiciones, problema, consumo y la necesidad real. Si no cabe en una visita o una ficha, no se inventa en un catálogo.",
  },
  {
    n: "02",
    title: "Formulamos",
    kind: "formulamos" as const,
    body: "Definimos la solución equilibrando calidad, desempeño, costo y especialización.",
  },
  {
    n: "03",
    title: "Acompañamos",
    kind: "acompanamos" as const,
    body: "Selección, uso, manejo y búsqueda continua de eficiencia operativa. Acompañamiento técnico post-venta.",
  },
];

type Kind = (typeof STEPS)[number]["kind"];

const HEADER = 88;
const MOBILE_BOTTOM = 80;

function clamp(n: number, a: number, b: number) {
  return Math.min(b, Math.max(a, n));
}

function usePrefersReducedMotion() {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(mq.matches);
    const onChange = () => setReduce(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduce;
}

function panelHeight() {
  const bottom = window.matchMedia("(min-width: 768px)").matches ? 0 : MOBILE_BOTTOM;
  return window.innerHeight - HEADER - bottom;
}

function stepFromPin(scrolled: number, range: number) {
  if (range <= 0 || scrolled <= 48) return 0;
  const p = clamp((scrolled - 48) / Math.max(range - 48, 1), 0, 1);
  if (p < 0.38) return 0;
  if (p < 0.72) return 1;
  return 2;
}

export function MethodStack() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const reduce = usePrefersReducedMotion();

  useEffect(() => {
    if (reduce) return;
    let raf = 0;
    const update = () => {
      const el = trackRef.current;
      if (!el) return;
      const panel = panelHeight();
      const range = el.offsetHeight - panel;
      const scrolled = HEADER - el.getBoundingClientRect().top;
      const next = stepFromPin(scrolled, range);
      setCurrent((prev) => (prev === next ? prev : next));
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reduce]);

  const step = reduce ? 0 : current;

  return (
    <section
      ref={trackRef}
      className={cn(
        "relative bg-ink text-white",
        !reduce &&
          "h-[calc(100svh-88px-5rem+300svh)] md:h-[calc(100svh-88px+300svh)]"
      )}
    >
      <div
        className={cn(
          "flex flex-col overflow-hidden",
          reduce
            ? "py-16"
            : "sticky top-[88px] h-[calc(100svh-88px-5rem)] md:h-[calc(100svh-88px)]"
        )}
      >
        <div className="pointer-events-none absolute inset-0 method-grid opacity-40" />
        <div className="pointer-events-none absolute -right-24 top-24 size-[28rem] rounded-full bg-gold/15 blur-3xl" />

        <div className="relative mx-auto grid h-full min-h-0 w-full max-w-6xl items-center gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[0.42fr_1fr] lg:gap-10 lg:py-8">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.22em] text-gold uppercase">
              Nuestro método
            </p>
            <h2 className="mt-2 max-w-sm text-xl font-extrabold tracking-tight text-white sm:text-2xl md:text-3xl lg:text-4xl">
              Formulamos. Fabricamos. Equilibramos. Nos adaptamos.
            </h2>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/70">
              Tres movimientos. El mismo orden en cada planta.
            </p>
            <ol className="mt-8 flex gap-3 lg:flex-col lg:gap-4">
              {STEPS.map((s, i) => {
                const on = i === step;
                return (
                  <li key={s.n} className="flex items-center gap-3">
                    <span
                      className={cn(
                        "relative inline-flex size-10 items-center justify-center text-[11px] font-bold tracking-[0.12em]",
                        on ? "text-gold" : "text-white/60"
                      )}
                    >
                      <svg viewBox="0 0 40 40" className="absolute inset-0 size-full" aria-hidden>
                        <polygon
                          points="20,3 35,12 35,28 20,37 5,28 5,12"
                          fill={on ? "#d89629" : "none"}
                          fillOpacity={on ? 0.18 : 0}
                          stroke={on ? "#d89629" : "rgba(255,255,255,0.35)"}
                          strokeWidth="1.2"
                        />
                      </svg>
                      {s.n}
                    </span>
                    <span
                      className={cn(
                        "hidden text-sm font-semibold tracking-wide lg:inline",
                        on ? "text-white" : "text-white/55"
                      )}
                    >
                      {s.title}
                    </span>
                  </li>
                );
              })}
            </ol>
          </div>

          <div className="flex min-h-0 flex-col justify-center gap-3">
            {STEPS.map((s, i) => (
              <MethodCard key={s.n} step={s} active={reduce || i === step} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function MethodCard({
  step,
  active,
}: {
  step: (typeof STEPS)[number];
  active: boolean;
}) {
  return (
    <article
      data-active={active}
      className={cn(
        "overflow-hidden rounded-[24px] ring-1 transition-all duration-500 ease-out",
        active
          ? "bg-[#243322] p-5 opacity-100 ring-gold/55 sm:p-6 md:flex md:items-center md:gap-6 md:p-7"
          : "bg-[#1a2318] px-5 py-3.5 opacity-40 ring-white/10"
      )}
    >
      {active && (
        <div className="mb-3 flex size-20 shrink-0 items-center justify-center sm:size-24 md:mb-0 md:size-28">
          <MethodMark kind={step.kind} active={active} />
        </div>
      )}
      <div className="min-w-0">
        <p className="text-[11px] font-semibold tracking-[0.22em] text-gold uppercase">
          {step.n}
        </p>
        <h3
          className={cn(
            "mt-1 font-extrabold tracking-tight text-white",
            active ? "text-2xl sm:text-3xl" : "text-lg"
          )}
        >
          {step.title}
        </h3>
        {active && (
          <p className="mt-2 max-w-md text-sm leading-relaxed text-white/75 md:text-[15px]">
            {step.body}
          </p>
        )}
      </div>
    </article>
  );
}

function MethodMark({ kind, active }: { kind: Kind; active: boolean }) {
  const cls = cn("size-full", active && "method-mark-live");
  switch (kind) {
    case "entendemos":
      return (
        <svg viewBox="0 0 120 120" className={cls} aria-hidden>
          <polygon
            points="60,8 104,34 104,86 60,112 16,86 16,34"
            fill="none"
            stroke="#d89629"
            strokeWidth="1.6"
            className="method-draw"
          />
          <polygon
            points="60,22 92,41 92,79 60,98 28,79 28,41"
            fill="#497730"
            fillOpacity="0.22"
            stroke="#497730"
            strokeWidth="1"
            className="method-orbit origin-center"
          />
          <line
            x1="28"
            y1="60"
            x2="92"
            y2="60"
            stroke="#d89629"
            strokeWidth="1.4"
            className="method-scan origin-center"
          />
          <circle cx="60" cy="60" r="7" fill="none" stroke="#f7f6f1" strokeWidth="1.6" />
          <circle cx="60" cy="60" r="2.2" fill="#d89629" />
          <circle cx="38" cy="38" r="2" fill="#d89629" fillOpacity="0.8" />
          <circle cx="86" cy="44" r="1.6" fill="#f7f6f1" fillOpacity="0.7" />
          <circle cx="80" cy="84" r="1.8" fill="#d89629" fillOpacity="0.7" />
        </svg>
      );
    case "formulamos":
      return (
        <svg viewBox="0 0 120 120" className={cls} aria-hidden>
          <polygon
            points="60,8 104,34 104,86 60,112 16,86 16,34"
            fill="none"
            stroke="#d89629"
            strokeWidth="1.6"
            className="method-draw"
          />
          <path
            d="M46 28h28v14l12 22c2 4 2 10-4 16-6 6-16 10-22 10s-16-4-22-10c-6-6-6-12-4-16l12-22V28Z"
            fill="#497730"
            fillOpacity="0.28"
            stroke="#f7f6f1"
            strokeWidth="1.4"
          />
          <path
            d="M42 72c4 10 12 16 18 16s14-6 18-16"
            fill="#d89629"
            fillOpacity="0.55"
          />
          <circle cx="60" cy="36" r="3.2" fill="#d89629" className="method-drop" />
          <polygon points="86,24 94,28 94,37 86,41 78,37 78,28" fill="none" stroke="#d89629" strokeWidth="1" />
          <polygon points="28,78 35,82 35,90 28,94 21,90 21,82" fill="none" stroke="#f7f6f1" strokeWidth="1" />
        </svg>
      );
    case "acompanamos":
      return (
        <svg viewBox="0 0 120 120" className={cls} aria-hidden>
          <polygon
            points="38,22 62,36 62,64 38,78 14,64 14,36"
            fill="#497730"
            fillOpacity="0.22"
            stroke="#d89629"
            strokeWidth="1.5"
            className="method-draw"
          />
          <polygon
            points="82,42 106,56 106,84 82,98 58,84 58,56"
            fill="#497730"
            fillOpacity="0.22"
            stroke="#f7f6f1"
            strokeWidth="1.5"
            className="method-draw"
          />
          <path
            d="M50 50 C62 44, 70 62, 82 68"
            fill="none"
            stroke="#d89629"
            strokeWidth="2"
            strokeLinecap="round"
            className="method-bond"
          />
          <circle cx="60" cy="58" r="3.5" fill="#d89629" />
        </svg>
      );
    default: {
      const _never: never = kind;
      return _never;
    }
  }
}
