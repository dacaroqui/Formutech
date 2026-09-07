import Image from "next/image";
import Link from "next/link";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/utils";

export function CatalogCard({
  href,
  image,
  alt,
  lead,
  title,
  subtitle,
  facts,
  badge,
  aspect = "aspect-[3/4]",
  sizes = "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw",
}: {
  href: string;
  image: string;
  alt: string;
  lead?: string;
  title: string;
  subtitle?: string;
  facts?: readonly string[];
  badge?: string;
  aspect?: string;
  sizes?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex flex-col overflow-hidden rounded-[20px] bg-white ring-1 ring-foreground/8",
        "shadow-[0_16px_36px_-28px_rgba(28,36,24,0.45)]",
        "transition duration-300 ease-out",
        "hover:-translate-y-1 hover:shadow-[0_22px_40px_-22px_rgba(28,36,24,0.4)] hover:ring-gold/45"
      )}
    >
      <div className={cn("relative overflow-hidden bg-muted", aspect)}>
        <Image
          src={asset(image)}
          alt={alt}
          fill
          className="fluid-shift object-cover object-center"
          sizes={sizes}
        />
        {badge && (
          <span className="absolute left-3 top-3 rounded-full bg-white/92 px-3 py-1 text-[11px] font-semibold tracking-[0.12em] text-ink">
            {badge}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col px-4 py-3.5">
        {lead && (
          <p className="text-[17px] leading-tight font-extrabold tracking-tight text-ink">
            {lead}
          </p>
        )}
        <h2
          className={cn(
            "leading-snug text-ink",
            lead ? "mt-1 text-[15px] font-medium" : "text-[16px] font-bold"
          )}
        >
          {title}
        </h2>
        {subtitle && (
          <p className="mt-0.5 text-sm leading-snug text-muted-foreground">
            {subtitle}
          </p>
        )}
        {facts && facts.length > 0 && (
          <p className="mt-2 text-[12px] leading-snug text-ink/70">
            {facts.join(" · ")}
          </p>
        )}
      </div>
    </Link>
  );
}
