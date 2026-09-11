import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import {
  KIND_META,
  SIDEKICK_POSTS,
  type SidekickKind,
  type SidekickPost,
} from "@/lib/sidekick-data";
import { SidekickCard } from "@/components/scruttin/SidekickCard";
import { SidekickComposer } from "@/components/scruttin/SidekickComposer";

export const Route = createFileRoute("/sidekick")({
  head: () => ({
    meta: [
      { title: "Sidekick — Rate, pick, decide, suggest | Scruttin" },
      {
        name: "description",
        content:
          "Sidekick is the mega feed: Rate My Fit, Pick One, Keep or Leave and Style This. A short question up top, the full story under More from the poster.",
      },
      { property: "og:title", content: "Sidekick — Rate, pick, decide, suggest" },
      {
        property: "og:description",
        content:
          "Four ways to ask on Scruttin: rate a fit, pick between two looks, decide keep or leave on a buy, or suggest how to style a piece.",
      },
    ],
  }),
  component: SidekickPage,
});

const FILTERS: ("all" | SidekickKind)[] = ["all", "rate", "pick", "keep", "style"];

function SidekickPage() {
  const [filter, setFilter] = useState<"all" | SidekickKind>("all");

  const visible = useMemo(
    () => (filter === "all" ? SIDEKICK_POSTS : SIDEKICK_POSTS.filter((p) => p.kind === filter)),
    [filter],
  );

  return (
    <main className="mx-auto min-h-screen max-w-lg bg-card pb-24">
      <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur">
        <div className="flex items-center justify-between px-4 pt-4">
          <div>
            <h1 className="text-2xl leading-none font-semibold">Sidekick</h1>
            <p className="mt-1 text-xs text-muted-foreground">
              Room to explain yourself — no clock, no rush
            </p>
          </div>
          <div className="flex items-center gap-1">
            <Link
              to="/"
              className="label-caps rounded-full border border-border px-2.5 py-1.5 text-foreground"
            >
              Feed
            </Link>
            <Link
              to="/strut"
              className="label-caps rounded-full border border-border px-2.5 py-1.5 text-foreground"
            >
              Strut
            </Link>
          </div>
        </div>

        <div className="mt-3 flex gap-1 overflow-x-auto px-4 pb-3">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={
                filter === f
                  ? "shrink-0 rounded-full bg-primary px-3.5 py-1.5 text-sm font-medium text-primary-foreground"
                  : "shrink-0 rounded-full border border-border bg-card px-3.5 py-1.5 text-sm text-muted-foreground"
              }
            >
              {f === "all" ? "Everything" : KIND_META[f].label}
            </button>
          ))}
        </div>
      </header>

      <section className="border-b border-border bg-secondary px-4 py-4">
        <p className="label-caps text-muted-foreground">How Sidekick works</p>
        <p className="mt-1.5 text-sm leading-snug">
          Every post asks you to do one thing: rate a fit, pick between two, decide keep or leave,
          or suggest a look. The question stays short — the rest sits under “More from” the person
          asking.
        </p>
      </section>

      {visible.map((post) => (
        <SidekickCard key={post.id} post={post} />
      ))}

      <button className="fixed bottom-6 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 rounded-full bg-primary px-5 py-3.5 font-display text-sm font-semibold text-primary-foreground shadow-lg">
        <Plus className="size-4" /> Post to Sidekick
      </button>
    </main>
  );
}
