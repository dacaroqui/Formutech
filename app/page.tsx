import Image from "next/image";
import { Droplets, Factory } from "lucide-react";
import { OperationWizard } from "@/components/configurator/wizard";
import { MethodStack } from "@/components/home/method-stack";
import { CatalogCard } from "@/components/product/catalog-card";
import { CtaLink } from "@/components/site/cta";
import { HexIcon } from "@/components/visual/hex";
import { Reveal } from "@/components/visual/reveal";
import { asset } from "@/lib/asset";
import { site, whatsappHref } from "@/lib/site";

const evidence = [
  { title: "Métodos ASTM", body: "Color, viscosidad, gravedad e inflamación según métodos publicados en ficha." },
  { title: "Fichas técnicas", body: "Documentos descargables de nuestros aceites industriales y productos para diseño de fluidos de perforación." },
  { title: "Ensayos", body: "Todos nuestros ensayos se rigen por los más altos estándares de calidad: normas API, ASTM, DIN, entre otras." },
  { title: "Parámetros", body: "Rangos de viscosidad, pH y punto de inflamación tomados de producto." },
  { title: "Documentación", body: "Presentaciones, modo de empleo y límites claros de lo que aún no está medido." },
  { title: "Información de producto", body: "Habla con nuestro asesor técnico para ampliar la información del portafolio, o navega la sección de soluciones." },
];

export default function HomePage() {
  return (
    <>
      <section className="relative isolate -mt-[88px] min-h-svh overflow-hidden">
        <div className="absolute inset-0">
          <div className="hero-pane-left">
            <Image
              src={asset("/photos/sector-industrial.png")}
              alt="Operación industrial: mecanizado con fluido de corte"
              fill
              sizes="(min-width: 768px) 65vw, 100vw"
              className="object-cover hero-ken-a"
              priority
            />
          </div>
          <div className="hero-pane-right">
            <Image
              src={asset("/photos/sector-oilgas.png")}
              alt="Hidrocarburos: análisis de muestras y extracción"
              fill
              sizes="(min-width: 768px) 65vw, 100vw"
              className="object-cover hero-ken-b"
              priority
            />
          </div>
        </div>
        <div className="absolute inset-0 bg-ink/25" />
        <div className="hero-seam pointer-events-none" aria-hidden />
        <p className="pointer-events-none absolute bottom-5 left-5 hidden text-[11px] font-semibold tracking-[0.22em] text-white/80 uppercase md:block">
          Industrial
        </p>
        <p className="pointer-events-none absolute right-5 bottom-5 hidden text-[11px] font-semibold tracking-[0.22em] text-white/80 uppercase md:block">
          Oil &amp; Gas
        </p>
        <div className="relative mx-auto flex min-h-svh max-w-6xl items-end px-4 py-14 pt-32 sm:px-6 lg:items-center lg:py-20 lg:pt-32">
          <div className="glass-hero rise-in w-full max-w-3xl p-7 sm:p-9 md:p-11">
            <p className="text-sm font-semibold tracking-[0.12em] text-gold sm:text-[15px]">
              Sector industrial y fluidos de perforación Oil &amp; Gas
            </p>
            <h1 className="mt-5 text-3xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-4xl md:text-5xl">
              ESPECIALISTAS EN ACEITES INDUSTRIALES
              <span className="mt-2 block text-gold">
                Y PRODUCTOS PARA OIL &amp; GAS
              </span>
            </h1>
            <p className="mt-5 text-base leading-relaxed text-white/90 md:text-lg">
              FormuTech Colombia es tu aliado estratégico en el diseño, fabricación y comercialización de aceites industriales y productos especializados para Fluidos de perforación.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <CtaLink href={whatsappHref()} external className="px-6 py-3.5 text-sm">
                Hablemos
              </CtaLink>
              <CtaLink href="/industrial" variant="outline" className="border-white/35 bg-white/10 px-6 py-3.5 text-sm text-white hover:border-gold hover:text-white">
                Explorar soluciones
              </CtaLink>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:py-12">
        <Reveal>
          <p className="text-[11px] font-semibold tracking-[0.22em] text-gold uppercase">
            Entrada por sectores
          </p>
          <h2 className="mt-2 max-w-2xl text-2xl font-extrabold md:text-3xl">
            Soluciones para diferentes exigencias operativas
          </h2>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            Entramos por la necesidad. Después llegamos a la referencia específica.
          </p>
        </Reveal>
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <CatalogCard
            href="/industrial"
            image={asset("/photos/sector-industrial.png")}
            alt="Sistemas hidráulicos y mecanizado CNC"
            lead="Sector industrial"
            title="Lubricación, protección, mecanizado, textil y mantenimiento."
            facts={[
              "8 familias · hidráulicos · solubles · textil · anticorrosivo · dieléctrico · MW-70",
            ]}
            aspect="aspect-[16/9] lg:aspect-[2.15/1]"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
          <CatalogCard
            href="/oil-gas"
            image={asset("/photos/sector-oilgas.png")}
            alt="Laboratorio de fluidos e infraestructura energética"
            lead="Oil & Gas"
            title="Fluidos de Perforación"
            facts={["10 especialidades · inhibidores · ROP · WBM · OBM · antiespumantes · biocidas"]}
            aspect="aspect-[16/9] lg:aspect-[2.15/1]"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        </div>
      </section>

      <MethodStack />

      <section className="bg-muted/50">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <OperationWizard />
        </div>
      </section>

      <section className="relative isolate overflow-hidden border-t border-border bg-white">
        <div className="absolute inset-0">
          <Image
            src={asset("/photos/calidad-ensayos.png")}
            alt="Técnico de laboratorio realizando ensayos de calidad sobre aceites industriales"
            fill
            className="object-cover object-[80%_center]"
            sizes="100vw"
          />
        </div>
        <div className="calidad-veil absolute inset-0" />
        <div className="relative z-10 mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.22em] text-gold uppercase">
                Calidad y evidencia
              </p>
              <h2 className="mt-2 text-3xl font-extrabold">
                Calidad técnica, respaldo y evidencia.
              </h2>
              <p className="mt-2 font-semibold tracking-wide text-primary">
                {site.principle.toUpperCase()}
              </p>
            </div>
            <Droplets className="relative z-10 size-8 text-gold" />
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {evidence.map((e) => (
              <article key={e.title} className="surface-card p-5">
                <HexIcon className="size-9">
                  <Factory className="size-4" />
                </HexIcon>
                <h3 className="mt-4 font-bold">{e.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{e.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
