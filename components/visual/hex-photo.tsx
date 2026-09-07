import Image from "next/image";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/utils";

export function HexPhoto({
  src,
  alt,
  className,
  priority,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div className={cn("relative", className)}>
      <div className="absolute -inset-3 hidden md:block" aria-hidden>
        <svg viewBox="0 0 100 100" className="size-full">
          <polygon
            points="50,2 96,26 96,74 50,98 4,74 4,26"
            fill="none"
          stroke="#d89629"
            strokeWidth="0.6"
            className="draw-line"
          />
        </svg>
      </div>
      <div className="relative overflow-hidden hex-clip bg-muted shadow-[0_30px_60px_-40px_rgba(28,36,24,0.55)]">
        <Image
          src={asset(src)}
          alt={alt}
          width={1200}
          height={900}
          priority={priority}
          className="aspect-[4/5] w-full object-cover md:aspect-square"
        />
      </div>
    </div>
  );
}
