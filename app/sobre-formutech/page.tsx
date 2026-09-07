import Image from "next/image";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { CtaLink } from "@/components/site/cta";
import { asset } from "@/lib/asset";
import { site, whatsappHref } from "@/lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre FormuTech",
  description:
    `Empresa colombiana de formulación y fabricación de lubricantes industriales. Soporte técnico por aplicación y contacto con ${site.contact.name}.`,
};

const pillars = [
  {
    title: "Eficiencia responsable",
    body: "Aceites de desempeño para optimizar consumo y prolongar vida de equipo, reduciendo desperdicios y reprocesos.",
  },
  {
    title: "Ingeniería aplicada",
    body: "El fluido tiene que responder al equipo y a las condiciones, no a un eslogan.",
  },
  {
    title: "Acompañamiento consciente",
    body: "Asesoría en uso, manejo y disposición. El producto no se explica solo.",
  },
  {
    title: "Visión a futuro",
    body: "Soluciones que cuidan los recursos de hoy y sostienen la industria que sigue operando mañana.",
  },
];

const process = [
  { n: "01", title: "Selección", body: "Entender la necesidad y escoger la solución adecuada." },
  { n: "02", title: "Implementación", body: "Orientar uso, manejo y condiciones de aplicación." },
  { n: "03", title: "Seguimiento", body: "Revisar desempeño y cambios en la operación." },
  { n: "04", title: "Eficiencia", body: "Buscar continuidad, protección y costo coherente." },
];

const jumps = [
  { href: "#empresa", label: "La empresa" },
  { href: "#soporte", label: "Soporte técnico" },
  { href: "#contacto", label: "Contacto" },
];

const empresaCards: { title: string; body: string | string[] }[] = [
  {
    title: "Formulación y fabricación",
    body: "FormuTech formula y fabrica aceites industriales y especialidades químicas con criterio técnico para el diseño de fluidos de perforación en el sector Oil & Gas. El propósito es una solución adaptada a la operación de equipos hidráulicos, procesos de mecanizado, sector textil, protección y limpieza de equipos industriales y diseño de fluidos de perforación para el sector Oil & Gas.",
  },
  {
    title: "Bases Grupo I, II y III",
    body: "En la línea industrial trabajamos con bases Grupo I, II y III, de mayor grado de refinación, para buscar estabilidad y vida útil coherente con el equipo. En FormuTech Colombia vamos de la mano con el uso de tecnologías limpias y productos biodegradables para el sector Oil & Gas empleados en la formulación de fluidos de perforación.",
  },
  {
    title: "Misión",
    body: [
      "En FormuTech Colombia somos pioneros en el diseño, fabricación y comercialización de aceites industriales y aditivos químicos confiables en la formulación de fluidos de perforación para el sector Oil & Gas.",
      "En el sector industrial nos caracterizamos por el suministro de aceites que protegen su maquinaria, mejoran el desempeño de los procesos y aportan eficiencia real.",
      "En el sector Oil & Gas estamos comprometidos con el uso de tecnologías verdes para el suministro de todo tipo de aditivos químicos necesarios para la correcta formulación y excelente desempeño de cualquier tipo de fluido de perforación.",
    ],
  },
];

export default function SobreFormutechPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <Breadcrumbs
        items={[
          { href: "/", label: "Inicio" },
          { label: "Sobre FormuTech" },
        ]}
      />
      <p className="mt-6 text-[11px] font-semibold tracking-[0.22em] text-gold uppercase">
        Sobre FormuTech
      </p>
      <h1 className="mt-3 max-w-3xl text-4xl font-extrabold text-primary md:text-5xl">
        Ingeniería aplicada a fluidos de perforación y aceites industriales,{" "}
        <span className="text-gold">desde Colombia.</span>
      </h1>
      <nav className="mt-6 flex flex-wrap gap-2" aria-label="En esta página">
        {jumps.map((j) => (
          <a
            key={j.href}
            href={j.href}
            className="rounded-full border border-ink bg-ink px-4 py-1.5 text-[12px] font-semibold text-white hover:bg-primary"
          >
            {j.label}
          </a>
        ))}
      </nav>

      <section id="empresa" className="mt-12 scroll-mt-28">
        <div className="grid items-stretch gap-5 lg:grid-cols-2 lg:gap-6">
          <div className="flex h-full min-h-0 flex-col gap-4">
            {empresaCards.map((card) => (
              <article
                key={card.title}
                className="surface-card flex flex-1 flex-col justify-center p-6 md:p-8"
              >
                <h2 className="text-2xl font-extrabold tracking-tight md:text-[1.85rem]">
                  {card.title}
                </h2>
                {Array.isArray(card.body) ? (
                  card.body.map((p) => (
                    <p
                      key={p.slice(0, 40)}
                      className="mt-3 max-w-prose text-sm leading-relaxed text-muted-foreground md:text-base"
                    >
                      {p}
                    </p>
                  ))
                ) : (
                  <p className="mt-3 max-w-prose text-sm leading-relaxed text-muted-foreground md:text-base">
                    {card.body}
                  </p>
                )}
              </article>
            ))}
          </div>
          <div className="overflow-hidden rounded-[24px] bg-white">
            <Image
              src={asset("/photos/equipo-planta.jpg")}
              alt="Equipo técnico FormuTech en planta"
              width={1024}
              height={1536}
              className="h-auto w-full"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
        </div>
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p) => (
            <article key={p.title} className="surface-card p-5">
              <h3 className="font-bold">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="soporte" className="mt-16 scroll-mt-28 border-t border-border pt-12">
        <p className="text-[11px] font-semibold tracking-[0.22em] text-gold uppercase">
          Soporte técnico
        </p>
        <h2 className="mt-3 max-w-2xl text-3xl font-extrabold">
          Acompañamiento técnico post-venta
        </h2>
        <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
          El fluido se sostiene si alguien mira cómo se usa: selección,
          implementación, seguimiento y eficiencia.
        </p>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {process.map((p) => (
            <article key={p.n} className="rounded-[20px] bg-muted/60 p-5 ring-1 ring-foreground/8">
              <p className="text-[11px] font-semibold tracking-[0.2em] text-gold">{p.n}</p>
              <h3 className="mt-2 font-bold">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.body}</p>
            </article>
          ))}
        </div>
        <div className="mt-8 grid items-center gap-6 overflow-hidden rounded-[24px] bg-ink text-white lg:grid-cols-[1.1fr_0.9fr]">
          <div className="p-6 md:p-8">
            <h3 className="text-2xl font-extrabold">Conoce el estado de tu aceite</h3>
            <p className="mt-3 text-sm leading-relaxed text-white/70">
              Laboratorio para evaluar la condición del lubricante y orientar el
              momento de cambio. Sin receta automática: con evidencia.
            </p>
            <CtaLink
              href={whatsappHref(
                "Hola FormuTech, quiero solicitar un análisis de condición del lubricante."
              )}
              className="mt-6"
              variant="gold"
              external
            >
              Solicitar análisis
            </CtaLink>
          </div>
          <div className="relative min-h-52">
            <Image
              src={asset("/photos/lab-ensayos.png")}
              alt="Laboratorio de condición de lubricante"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section id="contacto" className="mt-16 scroll-mt-28 border-t border-border pt-12">
        <article className="surface-card w-full p-7 md:p-10">
          <div className="grid gap-8 md:grid-cols-2 md:items-center md:gap-12">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.22em] text-gold uppercase">
                Contacto
              </p>
              <h2 className="mt-3 text-3xl font-extrabold">Hablemos de tu operación</h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
                Sector, equipo y necesidad. {site.contact.name} atiende la conversación técnica
                por WhatsApp, teléfono o correo.
              </p>
            </div>
            <div className="flex flex-col items-start gap-3 md:items-end md:text-right">
              <p>
                <span className="text-lg font-bold">{site.contact.name}</span>
                <span className="mt-1 block text-sm text-muted-foreground">{site.contact.role}</span>
              </p>
              <p>
                <a className="font-semibold text-primary" href={`tel:${site.contact.phoneTel}`}>
                  {site.contact.phoneDisplay}
                </a>
              </p>
              <p>
                <a className="font-semibold" href={`mailto:${site.contact.email}`}>
                  {site.contact.email}
                </a>
              </p>
              <CtaLink href={whatsappHref()} className="mt-3" external>
                Hablemos
              </CtaLink>
            </div>
          </div>
        </article>
      </section>
    </div>
  );
}
