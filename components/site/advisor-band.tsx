import { CtaLink } from "@/components/site/cta";
import { whatsappHref } from "@/lib/site";

export function AdvisorBand({
  title = "¿Necesitas ayuda para seleccionar la referencia?",
  body = "No partimos del producto. Partimos de la operación, el equipo y las condiciones de trabajo.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="border-t border-border bg-muted/60">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-12 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-[11px] font-semibold tracking-[0.22em] text-gold uppercase">
            Acompañamiento
          </p>
          <h2 className="mt-2 max-w-xl text-2xl font-bold">{title}</h2>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">{body}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <CtaLink href={whatsappHref()} external>
            Habla con un asesor técnico
          </CtaLink>
          <CtaLink href="/configurador" variant="outline">
            Describir mi operación
          </CtaLink>
        </div>
      </div>
    </section>
  );
}
