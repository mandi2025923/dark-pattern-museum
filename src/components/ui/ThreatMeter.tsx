type ThreatMeterProps = {
  level: 1 | 2 | 3 | 4 | 5;
  className?: string;
};

export function ThreatMeter({ level, className = "" }: ThreatMeterProps) {
  return (
    <div
      className={`flex gap-0.5 ${className}`}
      role="img"
      aria-label={`Threat level ${level} of 5`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={`h-3 w-1 ${
            i < level ? "bg-museum-neon shadow-neon-sm" : "bg-museum-border"
          }`}
        />
      ))}
    </div>
  );
}
