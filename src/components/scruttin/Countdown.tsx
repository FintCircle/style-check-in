import { useEffect, useState } from "react";
import { formatClock } from "@/lib/scruttin-data";

export function useCountdown(initialSeconds: number) {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    if (seconds <= 0) return;
    const id = window.setInterval(() => {
      setSeconds((s) => (s <= 1 ? 0 : s - 1));
    }, 1000);
    return () => window.clearInterval(id);
  }, [seconds]);

  return { seconds, locked: seconds <= 0 };
}

export function ClockPill({ seconds, locked }: { seconds: number; locked: boolean }) {
  if (locked) {
    return (
      <span className="label-caps inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary px-2.5 py-1 text-muted-foreground">
        Verdict locked
      </span>
    );
  }

  const urgent = seconds <= 120;

  return (
    <span
      className={
        urgent
          ? "label-caps inline-flex items-center gap-1.5 rounded-full bg-live px-2.5 py-1 text-live-foreground"
          : "label-caps inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-2.5 py-1 text-foreground"
      }
    >
      <span
        className={
          urgent
            ? "live-dot size-1.5 rounded-full bg-live-foreground"
            : "size-1.5 rounded-full bg-foreground"
        }
      />
      <span className="tick">{formatClock(seconds)} left</span>
    </span>
  );
}
