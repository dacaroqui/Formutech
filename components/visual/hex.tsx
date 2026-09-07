export function HexIcon({
  className = "size-11",
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <span
      className={`relative inline-flex items-center justify-center text-primary ${className}`}
    >
      <svg viewBox="0 0 80 80" className="absolute inset-0 size-full hex-in" aria-hidden>
        <polygon
          points="40,6 70,23 70,57 40,74 10,57 10,23"
          fill="none"
          stroke="#d89629"
          strokeWidth="1.4"
        />
        <polygon
          points="40,14 63,27 63,53 40,66 17,53 17,27"
          fill="#497730"
          fillOpacity="0.06"
          stroke="#497730"
          strokeOpacity="0.25"
          strokeWidth="0.8"
        />
      </svg>
      <span className="relative z-10">{children}</span>
    </span>
  );
}

export function HexPattern({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 400 400"
      fill="none"
      aria-hidden
    >
      <g stroke="#d89629" strokeOpacity="0.18" strokeWidth="0.8">
        <polygon points="200,40 280,86 280,178 200,224 120,178 120,86" />
        <polygon points="200,70 255,102 255,166 200,198 145,166 145,102" />
        <line x1="80" y1="130" x2="120" y2="130" />
        <line x1="280" y1="130" x2="320" y2="130" />
        <line x1="200" y1="224" x2="200" y2="280" />
        <circle cx="80" cy="130" r="2.4" fill="#d89629" fillOpacity="0.5" stroke="none" />
        <circle cx="320" cy="130" r="2.4" fill="#d89629" fillOpacity="0.5" stroke="none" />
      </g>
    </svg>
  );
}
