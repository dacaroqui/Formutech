import Link from "next/link";
import { CtaLink } from "@/components/site/cta";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <p className="text-[11px] font-semibold tracking-[0.22em] text-gold uppercase">
        404
      </p>
      <h1 className="mt-3 text-3xl font-extrabold">Esta ruta no está en el mapa.</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        Volvamos a la operación, no al catálogo vacío.
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <CtaLink href="/">Inicio</CtaLink>
        <CtaLink href="/sobre-formutech#contacto" variant="outline">
          Contacto
        </CtaLink>
      </div>
      <Link href="/industrial" className="mt-6 inline-block text-sm text-primary">
        Ver soluciones industriales
      </Link>
    </div>
  );
}
