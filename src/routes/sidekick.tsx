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

  const activeDescription =
    filter === "all"
      ? "Every post asks you to do one thing: rate a fit, pick between two, decide keep or leave, or suggest a look."
      : `${KIND_META[filter].label} posts ask for one clear opinion — the full story sits under “More from” the person asking.`;

  return (
    <main className="min-h-screen bg-card pb-24 lg:mx-auto lg:flex lg:max-w-7xl lg:gap-10 lg:bg-background lg:px-8">
      <aside className="hidden lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-60 lg:shrink-0 lg:flex-col lg:border-r lg:border-border lg:py-10 lg:pr-8">
        <div>
          <h1 className="text-3xl leading-none font-semibold">Sidekick</h1>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Room to explain yourself — no clock, no rush
          </p>
        </div>

        <nav className="mt-12" aria-label="Sidekick filters">
          <p className="label-caps mb-3 text-muted-foreground">Browse by ask</p>
          <div className="flex flex-col gap-1">
            {FILTERS.map((f) => {
              const label = f === "all" ? "Everything" : KIND_META[f].label;
              const isActive = filter === f;

              return (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  aria-current={isActive ? "page" : undefined}
                  className={
                    isActive
                      ? "flex items-center justify-between rounded-md bg-primary px-3 py-2.5 text-left text-sm font-medium text-primary-foreground"
                      : "flex items-center justify-between rounded-md px-3 py-2.5 text-left text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                  }
                >
                  <span>{label}</span>
                  {isActive && <span className="size-1.5 rounded-full bg-primary-foreground" />}
                </button>
              );
            })}
          </div>
        </nav>

        <div className="mt-auto flex flex-col gap-2">
          <button className="flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-3 font-display text-sm font-semibold text-primary-foreground shadow-sm">
            <Plus className="size-4" /> Post to Sidekick
          </button>
          <div className="mt-4 flex items-center gap-2">
            <Link
              to="/"
              className="label-caps px-2 py-1.5 text-muted-foreground hover:text-foreground"
            >
              Feed
            </Link>
            <Link
              to="/strut"
              className="label-caps px-2 py-1.5 text-muted-foreground hover:text-foreground"
            >
              Strut
            </Link>
          </div>
        </div>
      </aside>

      <div className="w-full lg:max-w-lg lg:pt-10">
        <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur lg:static lg:border-0 lg:bg-transparent lg:pb-5">
          <div className="flex items-center justify-between px-4 pt-4 lg:hidden">
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

          <div className="flex gap-1 overflow-x-auto px-4 py-3 lg:hidden">
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

        <section className="border-b border-border bg-secondary px-4 py-4 lg:border lg:bg-card lg:px-5">
          <p className="label-caps text-muted-foreground">
            {filter === "all" ? "How Sidekick works" : KIND_META[filter].label}
          </p>
          <p className="mt-1.5 text-sm leading-snug">{activeDescription}</p>
        </section>

        {visible.map((post) => (
          <SidekickCard key={post.id} post={post} />
        ))}
      </div>

      <button className="fixed bottom-6 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 rounded-full bg-primary px-5 py-3.5 font-display text-sm font-semibold text-primary-foreground shadow-lg lg:hidden">
        <Plus className="size-4" /> Post to Sidekick
      </button>
    </main>
  );
}
