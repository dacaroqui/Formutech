import Image from "next/image";
import Link from "next/link";
import { asset } from "@/lib/asset";
import { site, whatsappHref, cta } from "@/lib/site";
import { CtaLink } from "@/components/site/cta";

const columns = [
  {
    title: "Soluciones",
    links: [
      { href: "/industrial", label: "Sector Industrial" },
      { href: "/oil-gas", label: "Oil & Gas" },
      { href: "/industrial/metalworking", label: "Metalworking" },
      { href: "/configurador", label: cta.wizard },
    ],
  },
  {
    title: "Compañía",
    links: [
      { href: "/sobre-formutech", label: "Sobre FormuTech" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-[#fbfaf7]">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <Image
            src={asset("/brand/logo.png")}
            alt="FormuTech. Ingeniería en cada gota"
            width={1484}
            height={1060}
            className="h-[100px] w-auto"
          />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Ingeniería aplicada a fluidos de perforación y aceites industriales.
            Entendemos la operación, formulamos o recomendamos y acompañamos.{" "}
            {site.principle}
          </p>
          <CtaLink href={whatsappHref()} className="mt-6" external variant="outline">
            Hablemos
          </CtaLink>
        </div>
        {columns.map((col) => (
          <div key={col.title}>
            <p className="text-[11px] font-semibold tracking-[0.2em] text-primary uppercase">
              {col.title}
            </p>
            <ul className="mt-4 space-y-2">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-ink/80 hover:text-primary">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>
            {site.contact.name} · {site.contact.role}
          </p>
          <p>
            <a href={`tel:${site.contact.phoneTel}`}>{site.contact.phoneDisplay}</a>
            {" · "}
            <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
          </p>
          <p>© {new Date().getFullYear()} FormuTech · Colombia</p>
        </div>
      </div>
    </footer>
  );
}
