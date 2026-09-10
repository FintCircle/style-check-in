type Props = {
  keep: number;
  change: number;
  choice: "keep" | "change" | null;
  locked: boolean;
  onVote: (choice: "keep" | "change") => void;
};

export function VerdictBar({ keep, change, choice, locked, onVote }: Props) {
  const total = keep + change;
  const keepPct = total === 0 ? 50 : Math.round((keep / total) * 100);
  const revealed = choice !== null || locked;

  if (!revealed) {
    return (
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => onVote("keep")}
          className="rounded-lg bg-primary px-3 py-3 font-display text-sm font-semibold text-primary-foreground transition-transform active:scale-[0.98]"
        >
          Wear it
        </button>
        <button
          onClick={() => onVote("change")}
          className="rounded-lg border border-foreground/25 bg-card px-3 py-3 font-display text-sm font-semibold text-foreground transition-transform active:scale-[0.98]"
        >
          Change it
        </button>
      </div>
    );
  }

  return (
    <div className="rise space-y-2">
      <div className="flex h-9 overflow-hidden rounded-lg border border-border">
        <div
          className="flex items-center justify-start bg-keep px-2.5"
          style={{ width: `${Math.max(keepPct, 14)}%` }}
        >
          <span className="label-caps tick text-primary-foreground">{keepPct}%</span>
        </div>
        <div className="flex flex-1 items-center justify-end bg-change px-2.5">
          <span className="label-caps tick text-foreground">{100 - keepPct}%</span>
        </div>
      </div>
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>
          Wear it {keep} · Change it {change}
        </span>
        <span>
          {locked && choice === null
            ? "Closed"
            : choice === "keep"
              ? "You said wear it"
              : "You said change it"}
        </span>
      </div>
    </div>
  );
}
