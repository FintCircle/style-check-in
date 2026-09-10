export function Avatar({ initials, size = 38 }: { initials: string; size?: number }) {
  return (
    <span
      className="label-caps flex shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground"
      style={{ width: size, height: size, fontSize: size * 0.3 }}
    >
      {initials}
    </span>
  );
}
