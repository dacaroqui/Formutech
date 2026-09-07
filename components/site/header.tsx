"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { CtaLink } from "@/components/site/cta";
import { industrialFamilies, oilGasProducts } from "@/lib/products";
import { nav, site, whatsappHref } from "@/lib/site";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/utils";
import { useEffect, useId, useRef, useState } from "react";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [solucionesOpen, setSolucionesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const solucionesId = useId();
  const onSoluciones = isActive(pathname, "/industrial") || isActive(pathname, "/oil-gas");

  useEffect(() => {
    setMobileOpen(false);
    setSolucionesOpen(false);
  }, [pathname]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setSolucionesOpen(false);
        setMobileOpen(false);
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!solucionesOpen) return;
    function onDocClick(e: MouseEvent) {
      const t = e.target as Node;
      if (triggerRef.current?.contains(t) || menuRef.current?.contains(t)) return;
      setSolucionesOpen(false);
    }
    const id = window.setTimeout(() => {
      document.addEventListener("click", onDocClick);
    }, 0);
    return () => {
      window.clearTimeout(id);
      document.removeEventListener("click", onDocClick);
    };
  }, [solucionesOpen]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const frosted = scrolled || solucionesOpen || mobileOpen;

  return (
    <header className="fixed inset-x-0 top-0 z-[80]">
      <div
        className={cn(
          "relative border-b border-white/55 backdrop-blur-xl",
          frosted && "shadow-[0_12px_40px_-24px_rgba(28,36,24,0.45)]"
        )}
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: frosted
              ? "linear-gradient(90deg, #ffffff 0%, #ffffff 38%, rgba(255,255,255,0.88) 62%, rgba(255,255,255,0.55) 100%)"
              : "linear-gradient(90deg, #ffffff 0%, #ffffff 34%, rgba(255,255,255,0.82) 58%, rgba(255,255,255,0.38) 100%)",
          }}
        />
        <div className="relative mx-auto flex h-[88px] max-w-6xl items-center justify-between gap-6 px-4 sm:px-6">
          <Link href="/" className="flex shrink-0 items-center py-1 pr-3" aria-label="FormuTech inicio">
            <Image
              src={asset("/brand/logo-menu.png")}
              alt="FormuTech"
              width={2513}
              height={408}
              className="h-14 w-auto max-w-[min(360px,68vw)] object-contain object-left sm:h-16"
              priority
            />
          </Link>

          <nav className="max-lg:hidden lg:flex items-center gap-1">
            {nav.map((item) =>
              "children" in item && item.children ? (
                <button
                  key={item.label}
                  ref={triggerRef}
                  type="button"
                  aria-expanded={solucionesOpen}
                  aria-controls={solucionesId}
                  aria-haspopup="true"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setSolucionesOpen((v) => !v);
                  }}
                  className={cn(
                    "inline-flex items-center gap-1 rounded-xl px-3 py-2 text-[13px] font-semibold tracking-wide text-ink/80 hover:bg-white/50 hover:text-ink",
                    (solucionesOpen || onSoluciones) && "bg-white/55 text-ink"
                  )}
                >
                  {item.label}
                  <ChevronDown
                    className={cn("size-3.5 transition-transform", solucionesOpen && "rotate-180")}
                  />
                </button>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-xl px-3 py-2 text-[13px] font-semibold tracking-wide text-ink/80 hover:bg-white/50 hover:text-ink",
                    isActive(pathname, item.href) && "bg-white/55 text-ink"
                  )}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          <div className="max-lg:hidden lg:block">
            <CtaLink href={whatsappHref()} variant="green" external>
              Hablemos
            </CtaLink>
          </div>

          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-xl border border-white/50 bg-white/50 backdrop-blur-md lg:hidden"
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {solucionesOpen && (
        <div
          ref={menuRef}
          id={solucionesId}
          className="max-lg:hidden border-b border-white/40 bg-white/80 shadow-[0_18px_40px_-24px_rgba(28,36,24,0.45)] backdrop-blur-xl"
        >
          <div className="mx-auto grid max-w-6xl gap-10 px-4 py-7 sm:px-6 lg:grid-cols-2">
            <MenuColumn
              kicker="Sector industrial"
              href="/industrial"
              items={industrialFamilies.map((f) => ({
                href: f.href,
                title: f.product,
                hint: f.name,
              }))}
            />
            <MenuColumn
              kicker="Oil & Gas"
              href="/oil-gas"
              items={oilGasProducts.map((p) => ({
                href: p.href,
                title: p.name,
                hint: p.type,
              }))}
            />
          </div>
        </div>
      )}

      {mobileOpen && (
        <div className="fixed inset-x-0 top-[88px] bottom-0 z-[90] overflow-y-auto border-t border-white/40 bg-white/90 backdrop-blur-xl lg:hidden">
          <nav className="flex flex-col px-4 py-5 pb-8">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-xl px-3 py-3 text-base font-semibold text-ink"
              >
                {item.label}
              </Link>
            ))}
            <div className="space-y-5 px-3 pt-3">
              <MenuColumn
                kicker="Sector industrial"
                href="/industrial"
                compact
                onNavigate={() => setMobileOpen(false)}
                items={industrialFamilies.map((f) => ({
                  href: f.href,
                  title: f.product,
                  hint: f.name,
                }))}
              />
              <MenuColumn
                kicker="Oil & Gas"
                href="/oil-gas"
                compact
                onNavigate={() => setMobileOpen(false)}
                items={oilGasProducts.map((p) => ({
                  href: p.href,
                  title: p.name,
                  hint: p.type,
                }))}
              />
            </div>
            <CtaLink href={whatsappHref()} className="mt-5 w-full" external variant="gold">
              Hablemos
            </CtaLink>
            <p className="px-3 pt-4 text-center text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
              {site.tagline}
            </p>
          </nav>
        </div>
      )}
    </header>
  );
}

function MenuColumn({
  kicker,
  href,
  items,
  compact,
  onNavigate,
}: {
  kicker: string;
  href: string;
  items: { href: string; title: string; hint: string }[];
  compact?: boolean;
  onNavigate?: () => void;
}) {
  return (
    <div>
      <div className={cn("flex items-baseline gap-3", compact ? "justify-start" : "justify-between")}>
        <Link
          href={href}
          onClick={onNavigate}
          className="text-[11px] font-semibold tracking-[0.18em] text-gold uppercase hover:text-ink"
        >
          {kicker}
        </Link>
        {!compact && (
          <Link
            href={href}
            onClick={onNavigate}
            className="text-[12px] font-semibold text-primary hover:text-ink"
          >
            Ver todas
          </Link>
        )}
      </div>
      <ul className={cn("mt-3", compact ? "space-y-0.5" : "columns-1 gap-x-8 sm:columns-2")}>
        {items.map((item) => (
          <li key={item.href} className="break-inside-avoid">
            <Link
              href={item.href}
              onClick={onNavigate}
              className="block rounded-xl px-2 py-2 hover:bg-muted"
            >
              <span className="block text-sm font-semibold text-ink">{item.title}</span>
              <span className="block text-[12px] text-muted-foreground">{item.hint}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
