import { useState } from "react";
import { Camera, Check, Scale, Sparkles, Star, Vote, X, Zap } from "lucide-react";
import { KIND_META, type SidekickKind, type SidekickPost } from "@/lib/sidekick-data";
import outfit1 from "@/assets/outfit-1.jpg";
import outfit4 from "@/assets/outfit-4.jpg";
import itemJacket from "@/assets/item-jacket.jpg";
import itemBlazer from "@/assets/item-blazer.jpg";

type Props = {
  onClose: () => void;
  onPost: (post: SidekickPost) => void;
};

const FORMATS: {
  kind: SidekickKind;
  note: string;
  Icon: typeof Star;
}[] = [
  { kind: "rate", note: "You're wearing it — get honest scores", Icon: Star },
  { kind: "pick", note: "Two looks, one gets chosen", Icon: Vote },
  { kind: "keep", note: "Should you buy it? Price up front", Icon: Scale },
  { kind: "style", note: "Ask what to wear it with", Icon: Sparkles },
];

const PLACEHOLDER: Record<SidekickKind, string> = {
  rate: "Trying something different today.",
  pick: "Which one for dinner tonight?",
  keep: "Worth buying?",
  style: "How would you style this?",
};

export function SidekickComposer({ onClose, onPost }: Props) {
  const [kind, setKind] = useState<SidekickKind>("rate");
  const [question, setQuestion] = useState("");
  const [more, setMore] = useState("");

  // Keep or Leave
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");
  const [item, setItem] = useState("");
  const [inStoreNow, setInStoreNow] = useState(false);

  // Style this
  const [vibe, setVibe] = useState("Smart casual");

  function submit() {
    const base = {
      id: `sk-${Date.now()}`,
      name: "You",
      initials: "YO",
      handle: "@you",
      place: "Kampala",
      ago: "now",
      question: question.trim() || PLACEHOLDER[kind],
      more: more.trim() || undefined,
      likes: 0,
      thoughts: 0,
    };

    let post: SidekickPost;
    if (kind === "rate") {
      post = {
        ...base,
        kind: "rate",
        images: [outfit1],
        overall: 0,
        scores: [
          { label: "Fit", value: 0 },
          { label: "Colours", value: 0 },
          { label: "Styling", value: 0 },
        ],
        ratings: 0,
      };
    } else if (kind === "pick") {
      post = {
        ...base,
        kind: "pick",
        options: [
          { key: "A", image: outfit1, percent: 50 },
          { key: "B", image: outfit4, percent: 50 },
        ],
        votes: 0,
      };
    } else if (kind === "keep") {
      post = {
        ...base,
        kind: "keep",
        image: itemJacket,
        price: price.trim() || "UGX 0",
        brand: brand.trim() || "Unbranded",
        item: item.trim() || "Item",
        inStoreNow,
        keepPercent: 50,
        decisions: 0,
      };
    } else {
      post = {
        ...base,
        kind: "style",
        image: itemBlazer,
        item: item.trim() || "Item",
        vibe: vibe.trim() || "Smart casual",
        suggestions: 0,
        top: [],
      };
    }

    onPost(post);
    onClose();
  }

  const firstName = "You";

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end bg-foreground/40">
      <div className="rise max-h-[92vh] overflow-y-auto rounded-t-2xl bg-background px-4 pt-4 pb-8">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Post to Sidekick</h2>
          <button onClick={onClose} aria-label="Close" className="p-1 text-muted-foreground">
            <X className="size-5" />
          </button>
        </div>

        <p className="label-caps mt-5 text-muted-foreground">What are you asking for</p>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {FORMATS.map(({ kind: k, note, Icon }) => (
            <button
              key={k}
              onClick={() => setKind(k)}
              className={
                kind === k
                  ? "rounded-xl border-2 border-foreground bg-card p-3 text-left"
                  : "rounded-xl border border-border bg-card p-3 text-left"
              }
            >
              <Icon className="size-4" />
              <p className="mt-1.5 text-sm font-semibold">{KIND_META[k].label}</p>
              <p className="text-xs text-muted-foreground">{note}</p>
            </button>
          ))}
        </div>

        <p className="label-caps mt-5 text-muted-foreground">
          {kind === "pick" ? "Your two options" : "Photo"}
        </p>
        <div className={kind === "pick" ? "mt-2 grid grid-cols-2 gap-2" : "mt-2"}>
          {(kind === "pick" ? ["A", "B"] : ["one"]).map((slot) => (
            <button
              key={slot}
              className="flex aspect-[4/5] w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-foreground/25 bg-secondary/60 text-muted-foreground"
            >
              <Camera className="size-6" />
              <span className="text-xs">
                {kind === "pick" ? `Option ${slot}` : "Add a photo"}
              </span>
            </button>
          ))}
        </div>

        <p className="label-caps mt-5 text-muted-foreground">Your question</p>
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder={PLACEHOLDER[kind]}
          className="mt-2 h-11 w-full rounded-lg border border-input bg-card px-3.5 text-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring/30"
        />
        <p className="mt-1.5 text-xs text-muted-foreground">
          Keep it short — people should get it at a glance.
        </p>

        {kind === "keep" && (
          <>
            <p className="label-caps mt-5 text-muted-foreground">Price, brand and item</p>
            <div className="mt-2 space-y-2">
              <input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="UGX 320,000"
                className="h-11 w-full rounded-lg border border-input bg-card px-3.5 text-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring/30"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  placeholder="Zara"
                  className="h-11 w-full rounded-lg border border-input bg-card px-3.5 text-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring/30"
                />
                <input
                  value={item}
                  onChange={(e) => setItem(e.target.value)}
                  placeholder="Jacket"
                  className="h-11 w-full rounded-lg border border-input bg-card px-3.5 text-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring/30"
                />
              </div>
              <button
                onClick={() => setInStoreNow((v) => !v)}
                className={
                  inStoreNow
                    ? "flex w-full items-center justify-between rounded-lg border-2 border-foreground bg-card px-3.5 py-3 text-left"
                    : "flex w-full items-center justify-between rounded-lg border border-border bg-card px-3.5 py-3 text-left"
                }
              >
                <span className="flex items-center gap-2 text-sm font-semibold">
                  <Zap className="size-4" /> In store now
                </span>
                <span className="text-xs text-muted-foreground">
                  {inStoreNow ? "On" : "Tell people you need a quick answer"}
                </span>
              </button>
            </div>
          </>
        )}

        {kind === "style" && (
          <>
            <p className="label-caps mt-5 text-muted-foreground">The piece and the vibe</p>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <input
                value={item}
                onChange={(e) => setItem(e.target.value)}
                placeholder="Blazer"
                className="h-11 w-full rounded-lg border border-input bg-card px-3.5 text-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring/30"
              />
              <input
                value={vibe}
                onChange={(e) => setVibe(e.target.value)}
                placeholder="Smart casual"
                className="h-11 w-full rounded-lg border border-input bg-card px-3.5 text-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring/30"
              />
            </div>
          </>
        )}

        <p className="label-caps mt-5 text-muted-foreground">Anything else? (optional)</p>
        <textarea
          value={more}
          onChange={(e) => setMore(e.target.value)}
          rows={3}
          placeholder="It's an outdoor wedding and starts around two…"
          className="mt-2 w-full resize-none rounded-lg border border-input bg-card px-3.5 py-3 text-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring/30"
        />
        <p className="mt-1.5 text-xs text-muted-foreground">
          This shows on your post as “More from {firstName}”.
        </p>

        <button
          onClick={submit}
          className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary font-display text-sm font-semibold text-primary-foreground"
        >
          <Check className="size-4" /> Post — {KIND_META[kind].label}
        </button>
      </div>
    </div>
  );
}
