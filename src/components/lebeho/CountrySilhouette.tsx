import { COUNTRY_SHAPES } from "@/lib/country-shapes";

export function CountrySilhouette({
  code,
  size = 56,
  className = "",
}: {
  code: string;
  size?: number;
  className?: string;
}) {
  const shape = COUNTRY_SHAPES[code];
  if (!shape) return null;

  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      role="img"
      aria-label={`Outline of ${shape.name}`}
      className={className}
    >
      <path d={shape.path} fill="currentColor" fillRule="evenodd" />
    </svg>
  );
}
