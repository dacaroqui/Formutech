import Link from "next/link";
import { Search } from "lucide-react";
import { CatalogCard } from "@/components/product/catalog-card";
import { SolutionsFilters } from "@/components/product/solutions-filters";
import { CtaLink } from "@/components/site/cta";
import {
  applyIndustrialFilters,
  applyOilGasFilters,
  industrialFilterIds,
  industrialFilterLabels,
  oilGasFilterIds,
  oilGasFilterLabels,
  parseIndustrialFilter,
  parseOilGasFilter,
  parseQuery,
  solutionsHref,
  type IndustrialFilter,
  type OilGasFilter,
} from "@/lib/solutions-filter";
import { industrialFamilies, oilGasProducts } from "@/lib/products";
import { cn } from "@/lib/utils";

type Tab = "industrial" | "oil-gas";

export function SolutionsExplorer({
  tab,
  family,
  q,
}: {
  tab: Tab;
  family: IndustrialFilter | OilGasFilter;
  q: string;
}) {
  const industrial = applyIndustrialFilters(
    tab === "industrial" ? (family as IndustrialFilter) : "all",
    q,
    industrialFamilies
  );
  const oilgas = applyOilGasFilters(
    tab === "oil-gas" ? (family as OilGasFilter) : "all",
    q,
    oilGasProducts
  );
  const items = tab === "industrial" ? industrial : oilgas;
  const otherCount = tab === "industrial" ? oilgas.length : industrial.length;
  const filtersOn = family !== "all" || q.length > 0;
  const familyOptions =
    tab === "industrial"
      ? industrialFilterIds.map((id) => ({
          id,
          label: industrialFilterLabels[id],
          href: solutionsHref(tab, id, q),
          count: applyIndustrialFilters(id, q, industrialFamilies).length,
          active: family === id,
        }))
      : oilGasFilterIds.map((id) => ({
          id,
          label: oilGasFilterLabels[id],
          href: solutionsHref(tab, id, q),
          count: applyOilGasFilters(id, q, oilGasProducts).length,
          active: family === id,
        }));
  const activeCount: Number(family !== "all");
  const clearHref = solutionsHref(tab, "all", q);

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="inline-flex rounded-full bg-muted p-1 ring-1 ring-foreground/8">
          {(
            [
              ["industrial", "Industrial"],
              ["oil-gas", "Oil & Gas"],
            ] = const
          ).map(([id, label]) => (
            <Link
              key={id}
              href={solutionsHref(id, "all", q)}
              scroll={false}
              className={cn(
                "rounded-full px-5 py-2 text-sm font-semibold transition",
                tab === id
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-ink/70 hover:text-ink"
              )}
            >
              {label}
            </Link>
          ))}
        </div>
        <div className="flex w-full items-center gap-2 sm:max-w-md">
          <form action={tab === "industrial" ? "/industrial" : "/oil-gas"} className="relative min-w-0 flex-1">
            {family !== "all" && <input type="hidden" name="familia" value={family} />}
            <label className="block">
              <span className="sr-only">Buscar soluciones</span>
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                name="q"
                defaultValue={q}
                placeholder="Buscar referencia, familia o uso"
                className="h-11 w-full rounded-full border border-border bg-white pl-10 pr-12 text-sm outline-none ring-gold/40 placeholder:text-muted-foreground focus:ring-2"
              />
            </label>
            <button
              type="submit"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground"
            >
              Buscar
            </button>
          </form>
          <SolutionsFilters
            familyOptions={familyOptions}
            clearHref={clearHref}
            activeCount={activeCount}
          />
        </div>
      </div>

      <p className="mt-8 text-[11px] font-semibold tracking-[0.22em] text-gold uppercase">
        {tab === "industrial" ? "Sector industrial" : "Línea especializada"}
      </p>
      <h1 className="mt-3 max-w-3xl text-4xl font-extrabold tracking-tight md:text-5xl">
        {tab === "industrial"
          ? "Soluciones industriales formuladas desde la operación."
          : "Soluciones químicas para condiciones exigentes de Oil & Gas."}
      </h1>
      <p className="mt-4 text-sm text-muted-foreground">
        {items.length}{" "}
        {tab === "industrial"
          ? items.length === 1
            ? "familia"
            : "familias"
          : items.length === 1
            ? "referencia"
            : "referencias"}
        {filtersOn ? " con estos filtros" : ""}.
        {filtersOn && (
          <Link
            href={tab === "industrial" ? "/industrial" : "/oil-gas"}
            className="ml-2 font-semibold text-primary underline-offset-4 hover:underline"
          >
            Quitar filtros
          </Link>
        )}
      </p>

      {items.length === 0 ? (
        <div className="mt-10 rounded-[24px] border border-dashed border-gold/40 bg-accent/40 px-6 py-10">
          <p className="font-semibold">
            No hay resultados en {tab === "industrial" ? "Industrial" : "Oil & Gas"}.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Prueba otra familia oc cambia el texto de busqueda.
          </p>
          {otherCount > 0 && (
            <Link
              href={solutionsHref(tab === "industrial" ? "oil-gas" : "industrial", "all", q)}
              className="mt-3 inline-block text-sm font-semibold text-primary underline-offset-4 hover:underline"
            >
              Ver {otherCount} coincidencia{otherCount === 1 ? "" : "s"} en{" "}
              {tab === "industrial" ? "Oil & Gas" : "Industrial"}
            </Link>
          )}
        </div>
      ) : tab === "industrial" ? (
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {industrial.map((f) => (
            <CatalogCard
              key={f.href}
              href={f.href}
              image={f.image}
              alt={f.product}
              lead={f.facts[0]}
              title={f.product}
              subtitle={f.name}
              facts={f.facts.slice(1)}
            />
          ))}
        </div>
      ) : (
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {oilgas.map((p) => (
            <CatalogCard
              key={p.slug}
              href={p.href}
              image={p.image}
              alt={p.name}
              title={p.name}
              subtitle={p.type}
              facts={[p.short, "Ficha técnica descargable"]}
            />
          ))}
        </div>
      )}

      <div className="mt-12 flex flex-wrap gap-3">
        {tab === "industrial" && (
          <CtaLink href="/industrial/metalworking" variant="outline">
            Ir a metalworking
          </CtaLink>
        )}
        <CtaLink href="/configurador" variant="gold">
          {tab === "industrial" ? "Describir mi operación" : "Describir condiciones de pozo o