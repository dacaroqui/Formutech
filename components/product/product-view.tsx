import Image from "next/image";
import Link from "next/link";
import {
  BookOpen,
  ClipboardList,
  Factory,
  FileText,
  Landmark,
  Layers,
  ListChecks,
  Package,
} from "lucide-react";
import { AdvisorBand } from "@/components/site/advisor-band";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { CtaLink } from "@/components/site/cta";
import {
  ApplicationGrid,
  BenefitGrid,
  ColorChips,
  EmptyTech,
  FichaHead,
  FichaNote,
  PackGrid,
  SpecBoard,
} from "@/components/product/ficha";
import { GradeSelector } from "@/components/product/grade-selector";
import { ProductNav } from "@/components/product/product-nav";
import { HexPattern } from "@/components/visual/hex";
import type { Grade, Product } from "@/lib/products";
import { industryRefs } from "@/lib/products";
import { asset } from "@/lib/asset";
import { site } from "@/lib/site";

export function ProductView({
  product,
  crumbs,
  grade,
}: {
  product: Product;
  crumbs: { href?: string; label: string }[];
  grade?: Grade;
}) {
  const specs = grade?.pending ? [] : grade?.specs?.length ? grade.specs : product.specs;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: grade ? `${product.name} ${grade.label}` : product.name,
    brand: { "@type": "Brand", name: site.name },
    description: product.seoDescription,
    image: product.image,
    category: product.category,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="relative overflow-hidden border-b border-border bg-white">
        <HexPattern className="pointer-events-none absolute -right-16 top-8 w-72 opacity-70" />
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-14">
          <div>
            <Breadcrumbs items={crumbs} />
            <p className="mt-5 text-[11px] font-semibold tracking-[0.22em] text-primary uppercase">
              {product.category} / {product.type}
            </p>
            <h1 className="mt-3 text-4xl font-extrabold tracking-tight md:text-5xl">
              {product.name}
            </h1>
            <p className="mt-3 text-lg font-semibold text-ink/80">{product.short}</p>
            {product.highlights?.map((h) => (
              <div
                key={h.label}
                className="mt-6 inline-flex items-baseline gap-3 rounded-2xl border border-gold/40 bg-accent px-4 py-3"
              >
                <span className="text-2xl font-extrabold text-primary">{h.value}</span>
                <span className="text-sm">
                  <span className="block font-semibold">{h.label}</span>
                  {h.hint && (
                    <span className="text-xs text-muted-foreground">{h.hint}</span>
                  )}
                </span>
              </div>
            ))}
            <div className="mt-8 flex flex-wrap gap-3">
              <CtaLink href="/sobre-formutech#contacto">Habla con un asesor técnico</CtaLink>
              {product.datasheet && (
                <CtaLink href={product.datasheet} variant="outline" external>
                  <FileText className="size-4" />
                  Descargar ficha técnica
                </CtaLink>
              )}
            </div>
          </div>
          <div className="relative overflow-hidden rounded-[24px] border border-border bg-[#eceee8]">
            <Image
              src={asset(product.image)}
              alt={product.name}
              width={1024}
              height={1536}
              className="aspect-[3/4] w-full object-cover"
              priority
            />
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[200px_1fr]">
        <ProductNav />
        <div className="space-y-16">
          {product.grades && (
            <section>
              <FichaHead
                kicker="Referencias"
                title="Seleccione la viscosidad"
                icon={Layers}
              />
              <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
                Cada referencia actualiza viscosidad, gravedad específica y punto de
                inflamación a partir de la ficha técnica publicada.
              </p>
              <div className="mt-6">
                <GradeSelector
                  grades={product.grades}
                  activeId={grade?.id ?? product.grades[0]?.id}
                  onSelectHref
                />
              </div>
            </section>
          )}

          <section id="resumen">
            <FichaHead
              kicker="¿Qué resuelve?"
              title="El problema de la operación"
              icon={BookOpen}
            />
            <p className="mt-5 max-w-3xl border-l-2 border-gold pl-4 text-base leading-relaxed text-ink/80">
              {product.solves}
            </p>
            {product.note && <FichaNote>{product.note}</FichaNote>}
          </section>

          <section id="beneficios">
            <FichaHead title="Beneficios" icon={ListChecks} />
            {product.benefits.length === 0 ? (
              <EmptyTech />
            ) : (
              <BenefitGrid items={product.benefits} />
            )}
            {product.colors && <ColorChips colors={product.colors} />}
          </section>

          <section id="aplicaciones">
            <FichaHead title="Aplicaciones" icon={Factory} />
            {product.applications.length === 0 ? (
              <EmptyTech />
            ) : (
              <ApplicationGrid items={product.applications} />
            )}
          </section>

          <section id="especificaciones">
            <FichaHead title="Datos técnicos" icon={ClipboardList} />
            {grade?.pending && (
              <p className="mt-3 text-sm text-muted-foreground">
                La referencia {grade.label} está prevista. Solicite la ficha técnica de
                esta viscosidad; no anticipamos valores.
              </p>
            )}
            {specs.length > 0 && <SpecBoard specs={specs} />}
          </section>

          {product.slug === "aceite-hidraulico" && (
            <section className="relative overflow-hidden rounded-[28px] border border-border bg-muted/50 p-6 md:p-8">
              <HexPattern className="pointer-events-none absolute -right-10 top-6 w-56 opacity-60" />
              <FichaHead
                kicker="Referencias de industria"
                title="DIN, ASTM, ISO y OEM"
                icon={Landmark}
              />
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                Todos nuestros aceites hidráulicos están formulados bajo los más altos
                estándares de calidad y cumplen bajo lo estipulado por las normas ASTM,
                API y cuentan con su respectiva certificación OEM.
              </p>
              <div className="relative mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {industryRefs.map((r) => (
                  <div
                    key={r.family}
                    className="rounded-2xl bg-white px-4 px-4 ring-1 ring-gold/25"
                  >
                    <p className="font-extrabold tracking-wide text-primary">{r.family}</p>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                      {r.hint}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          <section id="documentacion">
            <FichaHead title="Presentaciones y documentación" icon={Package} />
            {product.presentations.length === 0 ? (
              <EmptyTech label="Presentaciones se publicarán con la ficha de producto." />
            ) : (
              <PackGrid items={product.presentations} />
            )}
            <div className="mt-6">
              {product.datasheet ? (
                <Link
                  href={product.datasheet}
                  className="inline-flex items-center gap-3 rounded-[20px] bg-[#243322] px-5 py-4 text-sm font-semibold text-white ring-1 ring-gold/40 transition hover:bg-primary"
                  target="_blank"
                  download={product.datasheet.split("/").pop()}
                >
                  <FileText className="size-4 text-gold" />
                  Descargar ficha técnica (PDF)
                </Link>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Ficha técnica descargable pendiente de publicación. Puede solicitarla a un
                  asesor.
                </p>
              )}
            </div>
          </section>
        </div>
      </div>
      <AdvisorBand />
    </>
  );
}
