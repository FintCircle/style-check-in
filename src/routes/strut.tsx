import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Info, X } from "lucide-react";
import { STRUTS, STRUT_RULES } from "@/lib/strut-data";
import { StrutCard } from "@/components/scruttin/StrutCard";

export const Route = createFileRoute("/strut")({
  head: () => ({
    meta: [
      { title: "Strut — Fashion in 60 seconds | Scruttin" },
      {
        name: "description",
        content:
          "Strut is fashion in motion: outfit reveals, GRWM snippets, thrift finds and runway walks in 60 seconds or less. No filters, no effects, no music library.",
      },
      { property: "og:title", content: "Strut — Fashion in 60 seconds" },
      {
        property: "og:description",
        content:
          "Sixty seconds, recorded or uploaded, nothing added. Tap to play, swipe up for the next look.",
      },
    ],
  }),
  component: StrutPage,
});

function StrutPage() {
  const [showRules, setShowRules] = useState(false);

  return (
    <main className="relative mx-auto h-[100svh] max-w-lg bg-foreground">
      <header className="pointer-events-none absolute inset-x-0 top-0 z-30 flex items-center justify-between px-4 pt-4">
        <div className="pointer-events-auto flex items-center gap-3">
          <Link to="/" className="text-sm font-medium text-background/70">
            Feed
          </Link>
          <h1 className="text-lg leading-none font-semibold text-background">Strut</h1>
          <span className="label-caps text-background/60">60s max</span>
        </div>
        <button
          onClick={() => setShowRules(true)}
          aria-label="Strut rules"
          className="pointer-events-auto p-1 text-background/80"
        >
          <Info className="size-5" />
        </button>
      </header>

      <div className="h-full snap-y snap-mandatory overflow-y-scroll overscroll-y-contain">
        {STRUTS.map((strut) => (
          <StrutCard key={strut.id} strut={strut} />
        ))}
        <div className="flex h-[100svh] snap-start flex-col items-center justify-center gap-3 px-8 text-center text-background">
          <p className="font-display text-lg font-semibold">That's every Strut for now</p>
          <p className="text-sm text-background/70">
            Sixty seconds of fashion, nothing added. Post yours, or head back to ask for a verdict.
          </p>
          <Link
            to="/"
            className="mt-2 inline-flex h-11 items-center rounded-lg bg-background px-4 font-display text-sm font-semibold text-foreground"
          >
            Back to the feed
          </Link>
        </div>
      </div>

      {showRules && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end bg-foreground/60">
          <div className="rise rounded-t-2xl bg-background px-4 pt-4 pb-8">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">The Strut rules</h2>
              <button
                onClick={() => setShowRules(false)}
                aria-label="Close"
                className="p-1 text-muted-foreground"
              >
                <X className="size-5" />
              </button>
            </div>
            <ul className="mt-3 space-y-2.5">
              {STRUT_RULES.map((rule) => (
                <li key={rule} className="flex gap-2.5 text-sm leading-snug">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-foreground" />
                  {rule}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-muted-foreground">
              Nothing plays on its own — tap a Strut to start it, swipe up for the next one.
            </p>
          </div>
        </div>
      )}
    </main>
  );
}
