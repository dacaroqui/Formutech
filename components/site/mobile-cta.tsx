import { WhatsAppIcon } from "@/components/site/whatsapp-icon";
import { whatsappHref } from "@/lib/site";

export function MobileCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-white/95 p-3 backdrop-blur md:hidden">
      <a
        href={whatsappHref()}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-12 items-center justify-center gap-2 rounded-2xl bg-primary text-sm font-semibold text-primary-foreground"
      >
        <WhatsAppIcon className="size-6" />
        Hablemos
      </a>
    </div>
  );
}
