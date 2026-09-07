"use client";

import { useMemo, useState, type ComponentType } from "react";
import {
  AlertTriangle,
  Beaker,
  CircleDot,
  Cog,
  Container,
  Cpu,
  Cylinder,
  Droplets,
  Factory,
  Flame,
  Fuel,
  Gauge,
  Handshake,
  HelpCircle,
  Layers,
  Minus,
  Package,
  RefreshCw,
  Scissors,
  Search,
  Shield,
  ShieldAlert,
  Shirt,
  Sun,
  Thermometer,
  TrendingDown,
  Waves,
  Wind,
  Wrench,
} from "lucide-react";
import { CtaLink } from "@/components/site/cta";
import { Button } from "@/components/ui/button";
import { cta, whatsappHref } from "@/lib/site";
import { cn } from "@/lib/utils";

type Icon = ComponentType<{ className?: string }>;

type Option = {
  value: string;
  icon: Icon;
};

type Step = {
  key: string;
  label: string;
  prompt: string;
  options: Option[];
};

const steps: Step[] = [
  {
    key: "sector",
    label: "Sector",
    prompt: "¿En qué terreno opera?",
    options: [
      { value: "Industrial", icon: Factory },
      { value: "Oil & Gas", icon: Fuel },
      { value: "Textil", icon: Shirt },
      { value: "Mantenimiento", icon: Wrench },
      { value: "Otro", icon: HelpCircle },
    ],
  },
  {
    key: "proceso",
    label: "Proceso",
    prompt: "¿Qué tiene que hacer el fluido?",
    options: [
      { value: "Hidráulica", icon: Gauge },
      { value: "Mecanizado / CNC", icon: Cpu },
      { value: "Textil", icon: Scissors },
      { value: "Protección de metal", icon: Shield },
      { value: "Perforación / Fluidos de Perforación", icon: Droplets },
      { value: "Mantenimiento", icon: Wrench },
      { value: "Aún no lo tengo claro", icon: HelpCircle },
    ],
  },
  {
    key: "equipo",
    label: "Equipo",
    prompt: "¿Sobre qué equipo trabaja?",
    options: [
      { value: "Prensa / unidad hidráulica", icon: Cog },
      { value: "CNC / torno / fresa", icon: Cpu },
      { value: "Máquina circular / telar", icon: CircleDot },
      { value: "Bomba", icon: Waves },
      { value: "Herramienta / cadena", icon: Wrench },
      { value: "Tipo de Fluido de Perforación", icon: Cylinder },
      { value: "Otro", icon: HelpCircle },
    ],
  },
  {
    key: "material",
    label: "Material",
    prompt: "¿Qué material entra en contacto?",
    options: [
      { value: "Acero / ferroso", icon: Layers },
      { value: "Aluminio / no ferroso", icon: Beaker },
      { value: "Fibra / tejido", icon: Shirt },
      { value: "Sellos / elastómeros", icon: CircleDot },
      { value: "Fluidos Base Agua WBM", icon: Droplets },
      { value: "Fluidos Base Aceite OBM", icon: Fuel },
      { value: "No aplica", icon: Minus },
    ],
  },
  {
    key: "temperatura",
    label: "Temperatura",
    prompt: "¿A qué temperatura opera?",
    options: [
      { value: "Ambiente", icon: Sun },
      { value: "Hasta 60 °C", icon: Thermometer },
      { value: "60–90 °C", icon: Thermometer },
      { value: "Más de 90 °C", icon: Flame },
      { value: "No lo tengo medido", icon: HelpCircle },
    ],
  },
  {
    key: "consumo",
    label: "Consumo",
    prompt: "¿Cómo se consume el fluido?",
    options: [
      { value: "Puntual / mantenimiento", icon: Droplets },
      { value: "Continuo de proceso", icon: RefreshCw },
      { value: "Alto recambio de baño", icon: Waves },
      { value: "Por definir", icon: HelpCircle },
    ],
  },
  {
    key: "volumen",
    label: "Volumen",
    prompt: "¿En qué presentación lo necesita?",
    options: [
      { value: "Aerosol / litro", icon: Beaker },
      { value: "Galón", icon: Package },
      { value: "Garrafa", icon: Container },
      { value: "Tambor", icon: Cylinder },
      { value: "IBC", icon: Container },
      { value: "Granel / programa", icon: Factory },
    ],
  },
  {
    key: "necesidad",
    label: "Necesidad",
    prompt: "¿Qué hay que resolver primero?",
    options: [
      { value: "Seleccionar referencia", icon: Search },
      { value: "Reducir consumo", icon: TrendingDown },
      { value: "Corrosión / herrumbre", icon: ShieldAlert },
      { value: "Desgaste / agarre", icon: AlertTriangle },
      { value: "Espuma / estabilidad", icon: Wind },
      { value: "Inhibición de arcillas", icon: Layers },
      { value: "Mejorar ROP", icon: TrendingDown },
      { value: "Lubricante a base de Aceites Vegetales o Minerales", icon: Droplets },
      { value: "Otro tipo de aplicación", icon: HelpCircle },
      { value: "Acompañamiento de planta", icon: Handshake },
    ],
  },
];

function hintLine(answers: Record<string, string>) {
  const proceso = answers.proceso ?? "";
  if (proceso.includes("Hidráulica")) return "FormuLub ISO — línea hidráulica.";
  if (proceso.includes("Mecanizado")) return "Metalworking — FormuLub-Sol / SSYNT / SYNT.";
  if (proceso.includes("Textil") || answers.sector === "Textil") return "Formu-Tex — aceite textil.";
  if (proceso.includes("Protección")) return "Formu-Cor — protección anticorrosiva.";
  if (proceso.includes("Perforación") || answers.sector === "Oil & Gas")
    return "Línea Oil & Gas — especialidades de fluidos.";
  if (proceso.includes("Mantenimiento") || answers.sector === "Mantenimiento")
    return "FormuLub-MW 70 — mantenimiento multiuso.";
  return "Una línea FormuTech a validar con su operación.";
}

export function OperationWizard() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const current = steps[step];
  const done = step >= steps.length;

  const summary = useMemo(
    () => steps.map((s) => `${s.label}: ${answers[s.key] ?? "—"}`).join("\n"),
    [answers]
  );

  function choose(value: string) {
    setAnswers((prev) => ({ ...prev, [current.key]: value }));
    setStep((s) => s + 1);
  }

  return (
    <div className="overflow-hidden rounded-[28px] ring-1 ring-foreground/10 shadow-[0_18px_40px_-32px_rgba(28,36,24,0.4)] lg:grid lg:grid-cols-[minmax(220px,0.34fr)_1fr]">
      <aside className="relative overflow-hidden border-b border-border bg-muted px-6 py-8 md:px-8 lg:border-b-0 lg:border-r">
        <div className="pointer-events-none absolute inset-0 method-grid opacity-[0.18]" />
        <p className="relative text-[11px] font-semibold tracking-[0.22em] text-gold uppercase">
          {cta.wizard}
        </p>
        <p className="relative mt-6 font-extrabold leading-none text-primary/15 text-[72px] tabular-nums md:text-[88px]">
          {done ? String(steps.length).padStart(2, "0") : String(step + 1).padStart(2, "0")}
        </p>
        <h2 className="relative mt-2 text-2xl font-extrabold tracking-tight text-ink md:text-3xl">
          ¿Qué necesitas resolver?
        </h2>
        <p className="relative mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
          {done
            ? "Lectura preliminar lista. Un asesor la valida con la operación real."
            : current.prompt}
        </p>
        <ol className="relative mt-8 flex flex-wrap gap-2">
          {steps.map((s, i) => {
            const on = done || i < step;
            const here = !done && i === step;
            return (
              <li key={s.key}>
                <span
                  className={cn(
                    "relative inline-flex size-8 items-center justify-center text-[10px] font-bold",
                    here ? "text-gold" : on ? "text-ink" : "text-muted-foreground/55"
                  )}
                  title={s.label}
                >
                  <svg viewBox="0 0 32 32" className="absolute inset-0 size-full" aria-hidden>
                    <polygon
                      points="16,2 28,9 28,23 16,30 4,23 4,9"
                      fill={here ? "none" : on ? "#d89629" : "none"}
                      stroke={here || on ? "#d89629" : "#c5c1b6"}
                      strokeWidth="1.3"
                    />
                  </svg>
                  {i + 1}
                </span>
              </li>
            );
          })}
        </ol>
      </aside>

      <div className="bg-white px-5 py-7 sm:px-8">
        {!done ? (
          <div key={current.key} className="rise-in">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-[11px] font-semibold tracking-[0.18em] text-gold uppercase">
                  {current.label}
                </p>
                <h3 className="mt-1 text-xl font-bold">{current.prompt}</h3>
              </div>
              <p className="text-xs text-muted-foreground tabular-nums">
                {step + 1} / {steps.length}
              </p>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {current.options.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => choose(opt.value)}
                  className="group flex items-center gap-3 rounded-[20px] border border-border bg-muted/40 px-4 py-3.5 text-left transition hover:-translate-y-0.5 hover:border-gold hover:bg-accent hover:shadow-[0_16px_28px_-22px_rgba(28,36,24,0.45)]"
                >
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-white text-primary ring-1 ring-foreground/8 transition group-hover:bg-gold/15 group-hover:text-ink">
                    <opt.icon className="size-5" />
                  </span>
                  <span className="text-sm font-semibold leading-snug">{opt.value}</span>
                </button>
              ))}
            </div>
            {step > 0 && (
              <Button
                variant="ghost"
                className="mt-5"
                onClick={() => setStep((s) => Math.max(0, s - 1))}
              >
                Volver
              </Button>
            )}
          </div>
        ) : (
          <div className="rise-in">
            <p className="text-[11px] font-semibold tracking-[0.2em] text-primary uppercase">
              Lectura preliminar
            </p>
            <h3 className="mt-2 text-xl font-bold md:text-2xl">
              Tenemos una posible línea de solución para tu operación.
            </h3>
            <p className="mt-3 rounded-2xl bg-accent px-4 py-3 text-sm font-semibold text-ink">
              {hintLine(answers)}
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              Esto no es una recomendación técnica definitiva. Un asesor valida equipo,
              condiciones y referencia antes de formular o suministrar.
            </p>
            <dl className="mt-5 grid gap-2 sm:grid-cols-2">
              {steps.map((s) => (
                <div
                  key={s.key}
                  className="rounded-2xl border border-border bg-muted/40 px-4 py-3"
                >
                  <dt className="text-[11px] tracking-[0.14em] text-muted-foreground uppercase">
                    {s.label}
                  </dt>
                  <dd className="mt-1 text-sm font-semibold">{answers[s.key] ?? "—"}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-6 flex flex-wrap gap-3">
              <CtaLink
                href={whatsappHref(
                  `Hola FormuTech, quiero enviar mi operación:\n\n${summary}`
                )}
                external
              >
                Enviar mi operación a FormuTech
              </CtaLink>
              <Button
                variant="ghost"
                onClick={() => {
                  setStep(0);
                  setAnswers({});
                }}
              >
                Empezar de nuevo
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
