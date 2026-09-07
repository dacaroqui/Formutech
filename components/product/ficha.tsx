import type { ComponentType, ReactNode } from "react";
import {
  ArrowDownToLine,
  Beaker,
  Box,
  CircleDot,
  Clock,
  Cog,
  Container,
  Cpu,
  Cylinder,
  Droplet,
  Droplets,
  Eye,
  Factory,
  Flame,
  FlaskConical,
  Gauge,
  Layers,
  Package,
  Paintbrush,
  Percent,
  Scale,
  Scissors,
  Shield,
  ShieldCheck,
  Shirt,
  Snowflake,
  Sparkles,
  SprayCan,
  Timer,
  Thermometer,
  Truck,
  Wind,
  Wrench,
} from "lucide-react";
import { HexIcon } from "@/components/visual/hex";
import { cn } from "@/lib/utils";

type Icon = ComponentType<{ className?: string }>;

const RULES: [RegExp, Icon][] = [
  [/cnc|mecaniz|torne|fresa|rectific|tallad|corte de/, Cpu],
  [/hidraul|bomba/, Gauge],
  [/textil|telar|fibra|carrete|anillo|coser|tejido|punto|circular/, Shirt],
  [/cuchilla|papelera|tijera/, Scissors],
  [/tractor|mineria|construccion|montacarga/, Truck],
  [/reductor|engranaje|rodamiento/, Cog],
  [/inyeccion|moldeo|plastic/, Box],
  [/inmersion/, Droplets],
  [/brocha/, Paintbrush],
  [/aspers/, SprayCan],
  [/tubo|perfil|pieza metal/, Box],
  [/automotriz|taller|herramient|cadena|bisagra|cerradur|desbloq/, Wrench],
  [/aire comprimido|compresor/, Wind],
  [/ferroso|metal/, Layers],
  [/antidesgast|desgast/, Shield],
  [/anticorros|herrumbr|oxid/, ShieldCheck],
  [/espuma/, Wind],
  [/temperatura/, Thermometer],
  [/inflam/, Flame],
  [/emulsion|crema|espontan/, Beaker],
  [/lavable|incoloro|mancha/, Sparkles],
  [/refriger/, Snowflake],
  [/ph|biocid|bacter|olor|fungic/, FlaskConical],
  [/sello|compatib/, CircleDot],
  [/humect|consumo|m\u00b2|m2/, Gauge],
  [/penetra/, ArrowDownToLine],
  [/limpia|desengras/, SprayCan],
  [/lubric/, Droplets],
  [/viscos/, Droplet],
  [/gravedad/, Scale],
  [/aspecto|visual|coloracion|color/, Eye],
  [/concentracion|proporcion|empleo/, Percent],
  [/camara salina|salina/, Timer],
  [/tiempo|hora/, Clock],
  [/humedad|desplaza|agua/, Droplets],
  [/proteccion/, Shield],
  [/galon/, Package],
  [/garrafa/, Container],
  [/tambor/, Cylinder],
  [/aerosol/, SprayCan],
  [/granel/, Factory],
];

export function iconFor(label: string): Icon {
  const key = label
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase();
  for (const [re, icon] of RULES) {
    if (re.test(key)) return icon;
  }
  return CircleDot;
}

function Mark({ icon: Icon, className }: { icon: Icon; className?: string }) {
  return (
    <HexIcon className={cn("size-11 shrink-0", className)}>
      <Icon className="size-4" />
    </HexIcon>
  );
}

export function FichaHead({
  kicker,
  title,
  icon,
}: {
  kicker?: string;
  title: string;
  icon: Icon;
}) {
  return (
    <div className="flex items-start gap-3">
      <Mark icon={icon} className="size-12" />
      <div>
        {kicker && (
          <p className="text-[11px] font-semibold tracking-[0.2em] text-gold uppercase">
            {kicker}
          </p>
        )}
        <h2 className={cn("text-2xl font-bold", kicker && "mt-1")}>{title}</h2>
      </div>
    </div>
  );
}

export function EmptyTech({
  label = "Este bloque está listo para cargar datos validados. No rellenamos cifras ni beneficios cuantificables sin ficha.",
}: {
  label?: string;
}) {
  return (
    <div className="mt-5 flex items-start gap-4 rounded-[20px] border border-dashed border-gold/40 bg-accent/50 px-5 py-6">
      <Mark icon={Beaker} />
      <p className="text-sm leading-relaxed text-muted-foreground">{label}</p>
    </div>
  );
}

export function BenefitGrid({ items }: { items: string[] }) {
  return (
    <ul className="mt-6 grid gap-3 sm:grid-cols-2">
      {items.map((item) => {
        const Icon = iconFor(item);
        return (
          <li
            key={item}
            className="flex items-start gap-3 rounded-[20px] bg-muted/70 px-4 py-4 ring-1 ring-foreground/8"
          >
            <Mark icon={Icon} />
            <p className="pt-2 text-sm font-semibold leading-snug">{item}</p>
          </li>
        );
      })}
    </ul>
  );
}

export function ApplicationGrid({ items }: { items: string[] }) {
  return (
    <ul className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => {
        const Icon = iconFor(item);
        return (
          <li
            key={item}
            className="flex items-center gap-3 rounded-[18px] border border-border bg-white px-3 py-3 shadow-[0_12px_28px_-24px_rgba(28,36,24,0.45)]"
          >
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent text-primary">
              <Icon className="size-4" />
            </span>
            <span className="text-sm font-medium leading-snug">{item}</span>
          </li>
        );
      })}
    </ul>
  );
}

export function SpecBoard({
  specs,
}: {
  specs: { label: string; method?: string; value: string }[];
}) {
  return (
    <div className="relative mt-6 overflow-hidden rounded-[28px] bg-[#243322] p-5 text-white md:p-7">
      <div className="pointer-events-none absolute inset-0 method-grid opacity-30" />
      <div className="relative grid gap-3 sm:grid-cols-2">
        {specs.map((s) => {
          const Icon = iconFor(s.label);
          return (
            <article
              key={s.label}
              className="rounded-[20px] bg-white/5 px-4 py-4 ring-1 ring-white/10"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="flex size-10 items-center justify-center text-gold">
                  <Icon className="size-4" />
                </span>
                {s.method && (
                  <span className="rounded-full border border-gold/35 px-2 py-0.5 text-[10px] font-semibold tracking-[0.12em] text-gold uppercase">
                    {s.method}
                  </span>
                )}
              </div>
              <p className="mt-3 text-[11px] tracking-[0.14em] text-white/55 uppercase">
                {s.label}
              </p>
              <p className="mt-1 text-lg font-extrabold tracking-tight text-gold md:text-xl">
                {s.value}
              </p>
            </article>
          );
        })}
      </div>
    </div>
  );
}

export function PackGrid({ items }: { items: string[] }) {
  return (
    <ul className="mt-5 grid gap-3 sm:grid-cols-3">
      {items.map((item) => {
        const Icon = iconFor(item);
        return (
          <li
            key={item}
            className="flex items-center gap-3 rounded-[20px] bg-accent px-4 py-4 ring-1 ring-gold/35"
          >
            <Mark icon={Icon} />
            <span className="text-sm font-semibold leading-snug">{item}</span>
          </li>
        );
      })}
    </ul>
  );
}

const COLOR_DOT: Record<string, string> = {
  Azul: "bg-sky-600",
  Verde: "bg-primary",
  Naranja: "bg-orange-500",
};

export function ColorChips({ colors }: { colors: string[] }) {
  return (
    <div className="mt-6 rounded-[20px] bg-muted/70 px-5 py-4 ring-1 ring-foreground/8">
      <p className="text-sm font-semibold">Coloración disponible según requerimiento</p>
      <p className="mt-1 text-xs text-muted-foreground">
        Identificación visual en planta. No es una propiedad técnica de desempeño.
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {colors.map((c) => (
          <span
            key={c}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-3 py-1.5 text-sm font-medium"
          >
            <span
              className={cn("size-2.5 rounded-full", COLOR_DOT[c] ?? "bg-ink")}
              aria-hidden
            />
            {c}
          </span>
        ))}
      </div>
    </div>
  );
}

export function FichaNote({ children }: { children: ReactNode }) {
  return (
    <p className="mt-4 border-l-2 border-gold pl-4 text-sm leading-relaxed text-muted-foreground">
      {children}
    </p>
  );
}
