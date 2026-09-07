import Link from "next/link";
import { cn } from "@/lib/utils";
import { WhatsAppIcon } from "@/components/site/whatsapp-icon";

type Variant = "green" | "gold" | "outline" | "ghost";

const styles: Record<Variant, string> = {
  green:
    "bg-primary text-primary-foreground hover:bg-[#3d6428] shadow-[0_10px_24px_-16px_#497730]",
  gold: "bg-gold text-gold-foreground hover:bg-[#b49248]",
  outline:
    "border border-primary/25 bg-white text-primary hover:border-gold hover:text-ink",
  ghost: "text-primary hover:bg-muted",
};

export function CtaLink({
  href,
  children,
  variant = "green",
  className,
  external,
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  external?: boolean;
}) {
  const cls = cn(
    "inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-[13px] font-semibold tracking-[0.04em] transition-colors",
    styles[variant],
    className
  );
  const inner = (
    <>
      {href.includes("wa.me") && <WhatsAppIcon className="size-6 shrink-0" />}
      {children}
    </>
  );
  if (external) {
    const pdfName = href.endsWith(".pdf") ? href.split("/").pop() : undefined;
    return (
      <a
        href={href}
        className={cls}
        target="_blank"
        rel="noopener noreferrer"
        download={pdfName}
      >
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}
