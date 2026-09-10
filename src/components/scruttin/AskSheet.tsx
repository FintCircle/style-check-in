import { useState } from "react";
import { Camera, Users, Globe, X } from "lucide-react";
import { CLOCK_OPTIONS, OCCASIONS, type Audience, type Post } from "@/lib/scruttin-data";

type Props = {
  onClose: () => void;
  onPost: (post: Post) => void;
};

export function AskSheet({ onClose, onPost }: Props) {
  const [occasion, setOccasion] = useState("Everyday");
  const [question, setQuestion] = useState("");
  const [audience, setAudience] = useState<Audience>("everyone");
  const [clock, setClock] = useState(1200);

  function submit() {
    onPost({
      id: `local-${Date.now()}`,
      name: "You",
      initials: "YO",
      place: "Kampala",
      minutesAgo: 0,
      audience,
      occasion,
      question: question.trim() || "Does this work?",
      images: [],
      secondsLeft: clock,
      keep: 0,
      change: 0,
      comments: [],
    });
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end bg-foreground/40">
      <div className="rise max-h-[92vh] overflow-y-auto rounded-t-2xl bg-background px-4 pt-4 pb-8">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Ask before you wear it</h2>
          <button onClick={onClose} aria-label="Close" className="p-1 text-muted-foreground">
            <X className="size-5" />
          </button>
        </div>

        <button className="mt-4 flex aspect-[4/3] w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-foreground/25 bg-secondary/60 text-muted-foreground">
          <Camera className="size-6" />
          <span className="text-sm">Add up to 4 photos</span>
        </button>

        <p className="label-caps mt-5 text-muted-foreground">What's it for</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {OCCASIONS.map((o) => (
            <button
              key={o}
              onClick={() => setOccasion(o)}
              className={
                occasion === o
                  ? "rounded-full bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground"
                  : "rounded-full border border-border bg-card px-3 py-1.5 text-sm text-foreground"
              }
            >
              {o}
            </button>
          ))}
        </div>

        <p className="label-caps mt-5 text-muted-foreground">Your question</p>
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Do these shoes work with this?"
          className="mt-2 h-11 w-full rounded-lg border border-input bg-card px-3.5 text-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring/30"
        />

        <p className="label-caps mt-5 text-muted-foreground">Who sees it and votes</p>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {(
            [
              {
                key: "everyone" as Audience,
                label: "Everyone",
                Icon: Globe,
                note: "The whole Scruttin community votes",
              },
              {
                key: "my-people" as Audience,
                label: "My people",
                Icon: Users,
                note: "Only the people you've added can see it",
              },
            ]
          ).map(({ key, label, Icon, note }) => (
            <button
              key={key}
              onClick={() => setAudience(key)}
              className={
                audience === key
                  ? "rounded-xl border-2 border-foreground bg-card p-3 text-left"
                  : "rounded-xl border border-border bg-card p-3 text-left"
              }
            >
              <Icon className="size-4" />
              <p className="mt-1.5 text-sm font-semibold">{label}</p>
              <p className="text-xs text-muted-foreground">{note}</p>
            </button>
          ))}
        </div>

        <p className="label-caps mt-5 text-muted-foreground">Set the clock</p>
        <div className="mt-2 space-y-2">
          {CLOCK_OPTIONS.map((c) => (
            <button
              key={c.seconds}
              onClick={() => setClock(c.seconds)}
              className={
                clock === c.seconds
                  ? "flex w-full items-center justify-between rounded-lg border-2 border-foreground bg-card px-3.5 py-3 text-left"
                  : "flex w-full items-center justify-between rounded-lg border border-border bg-card px-3.5 py-3 text-left"
              }
            >
              <span className="text-sm font-semibold">{c.label}</span>
              <span className="text-xs text-muted-foreground">{c.note}</span>
            </button>
          ))}
        </div>

        <button
          onClick={submit}
          className="mt-5 h-12 w-full rounded-lg bg-primary font-display text-sm font-semibold text-primary-foreground"
        >
          Start the clock
        </button>
        <p className="mt-2 text-center text-xs text-muted-foreground">
          When the clock stops, the verdict locks and you go.
        </p>
      </div>
    </div>
  );
}
