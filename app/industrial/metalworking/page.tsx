import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { CatalogCard } from "@/components/product/catalog-card";
import { CtaLink } from "@/components/site/cta";
import { products } from "@/lib/products";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Metalworking · aceites solubles",
  description:
    "Selector progresivo mineral, semisintético y 100% sintético. Concentraciones de referencia y productos FormuLub-Sol.",
};

const stages = [
  {
    key: "MINERAL",
    conc: "5–10%",
    product: products.find((p) => p.slug === "formulub-sol")!,
    facts: ["Concentración de referencia", "Torneado · fresado · rectificado"],
  },
  {
    key: "SEMISINTÉTICO",
    conc: "5–10%",
    product: products.find((p) => p.slug === "formulub-sol-ssynt")!,
    facts: ["Concentración de referencia", "Viscosidad 30–45 cSt @ 40 °C"],
  },
  {
    key: "100% SINTÉTICO",
    conc: "2,5–5%",
    product: products.find((p) => p.slug === "formulub-sol-synt")!,
    facts: ["Concentración de referencia", "Coloración azul · verde · naranja"],
  },
];

export default function MetalworkingPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <Breadcrumbs
        items={[
          { href: "/", label: "Inicio" },
          { href: "/industrial", label: "Industrial" },
          { label: "Metalworking" },
        ]}
      />
      <p className="mt-6 text-[11px] font-semibold tracking-[0.22em] text-gold uppercase">
        Metalworking
      </p>
      <h1 className="mt-3 max-w-3xl text-4xl font-extrabold">
        Mineral → Semisintético → 100% sintético
      </h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        El soluble no se elige por catálogo. Se elige por el corte, el material y
        lo que el baño tiene que durar. La concentración es una referencia de
        partida; el ajuste lo hace la operación.
      </p>

      <div className="relative mt-10">
        <div className="gold-rule mb-8 hidden md:block" />
        <div className="grid gap-5 md:grid-cols-3">
          {stages.map((s, i) => (
            <CatalogCard
              key={s.key}
              href={s.product.href}
              image={s.product.image}
              alt={s.product.name}
              badge={`0${i + 1} ${s.key}`}
              lead={s.conc}
              title={s.product.name}
              subtitle={s.product.type}
              facts={s.facts}
            />
          ))}
        </div>
      </div>

      <p className="mt-8 text-sm text-muted-foreground">
        Aplicaciones de la familia: mecanizado, tallado de engranajes, torneado,
        fresado, rectificado, corte, ferrosos y no ferrosos.
      </p>
      <CtaLink href="/configurador" className="mt-8" variant="outline">
        Ayúdenme a elegir el tramo
      </CtaLink>
    </div>
  );
}
