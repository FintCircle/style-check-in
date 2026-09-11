import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Heart, Info, MessageCircle, X, Copy, MoreHorizontal } from "lucide-react";
import { STRUTS, STRUT_RULES, type Strut } from "@/lib/strut-data";
import { StrutCard } from "@/components/scruttin/StrutCard";
import { Avatar } from "@/components/scruttin/Avatar";

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
  const [selectedStrut, setSelectedStrut] = useState<Strut>(STRUTS[0]);
  const [activeTab, setActiveTab] = useState<"comments" | "creator">("comments");
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    const url = `${window.location.origin}/strut#${selectedStrut.id}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* Mobile: snap-scroll feed */}
      <main className="relative mx-auto h-[100svh] max-w-lg bg-foreground lg:hidden">
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

      {/* Desktop: split layout */}
      <main className="hidden h-[100svh] flex-col bg-background lg:flex">
        {/* Desktop header */}
        <header className="flex items-center justify-between border-b border-border px-6 py-4">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Feed
            </Link>
            <h1 className="text-lg font-semibold text-foreground">Strut</h1>
          </div>
          <button
            onClick={() => setShowRules(true)}
            aria-label="Strut rules"
            className="p-1 text-muted-foreground hover:text-foreground"
          >
            <Info className="size-5" />
          </button>
        </header>

        {/* Desktop split container */}
        <div className="flex flex-1 min-h-0">
          {/* Left: video stage */}
          <div className="w-3/5 bg-foreground overflow-hidden relative">
            <StrutCard strut={selectedStrut} className="h-full snap-none" />
          </div>

          {/* Right: detail panel */}
          <div className="w-2/5 flex flex-col bg-background border-l border-border">
            {/* Creator header */}
            <div className="flex items-start justify-between gap-4 px-6 py-4 border-b border-border">
              <div className="flex items-center gap-3 flex-1">
                <Avatar initials={selectedStrut.initials} size={40} />
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-foreground">{selectedStrut.name}</p>
                  <p className="text-sm text-muted-foreground">{selectedStrut.handle}</p>
                </div>
              </div>
              <button className="h-10 px-4 bg-live text-live-foreground rounded-lg font-semibold text-sm hover:opacity-90">
                Follow
              </button>
            </div>

            {/* Caption and metadata */}
            <div className="px-6 py-4 border-b border-border">
              <p className="text-sm text-muted-foreground mb-2">
                {selectedStrut.place} · {selectedStrut.kind}
              </p>
              <p className="text-foreground text-sm leading-relaxed">{selectedStrut.caption}</p>
            </div>

            {/* Engagement row */}
            <div className="flex items-center gap-6 px-6 py-4 border-b border-border text-sm">
              <button className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground">
                <Heart className="size-4" />
                <span className="tick font-semibold">{selectedStrut.loves}</span>
              </button>
              <button className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground">
                <MessageCircle className="size-4" />
                <span className="tick font-semibold">{selectedStrut.notes}</span>
              </button>
              <button className="ml-auto p-1 text-muted-foreground hover:text-foreground">
                <MoreHorizontal className="size-4" />
              </button>
            </div>

            {/* Copy link row */}
            <div className="flex items-center gap-2 px-6 py-4 border-b border-border bg-secondary/30 rounded-lg mx-4">
              <input
                type="text"
                value={`https://scruttin.app/strut#${selectedStrut.id}`}
                readOnly
                className="flex-1 text-xs bg-transparent text-foreground outline-none"
              />
              <button
                onClick={handleCopyLink}
                className="flex items-center gap-1 text-xs font-semibold text-live hover:text-live/80 whitespace-nowrap"
              >
                <Copy className="size-3.5" />
                {copied ? "Copied" : "Copy link"}
              </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-8 px-6 py-3 border-b border-border">
              <button
                onClick={() => setActiveTab("comments")}
                className={`text-sm font-semibold transition-colors ${
                  activeTab === "comments"
                    ? "text-foreground border-b-2 border-foreground -mb-3 pb-3"
                    : "text-muted-foreground"
                }`}
              >
                Comments ({selectedStrut.notes})
              </button>
              <button
                onClick={() => setActiveTab("creator")}
                className={`text-sm font-semibold transition-colors ${
                  activeTab === "creator"
                    ? "text-foreground border-b-2 border-foreground -mb-3 pb-3"
                    : "text-muted-foreground"
                }`}
              >
                Creator videos
              </button>
            </div>

            {/* Content area */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {activeTab === "comments" ? (
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <Avatar initials="SW" size={32} />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-foreground">Style Watcher</p>
                      <p className="text-sm text-foreground leading-relaxed mt-1">The way this fits is immaculate 🔥</p>
                      <p className="text-xs text-muted-foreground mt-2">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Avatar initials="MF" size={32} />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-foreground">Mode Fashion</p>
                      <p className="text-sm text-foreground leading-relaxed mt-1">Where did you get those shoes?</p>
                      <p className="text-xs text-muted-foreground mt-2">1 hour ago</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center text-muted-foreground text-sm py-8">
                  <p>View more Struts from {selectedStrut.name}</p>
                </div>
              )}
            </div>

            {/* Log in prompt */}
            <div className="px-6 py-4 border-t border-border">
              <button className="w-full h-11 rounded-lg bg-live text-live-foreground font-semibold text-sm hover:opacity-90">
                Log in to comment
              </button>
            </div>
          </div>
        </div>

        {/* Desktop grid selector */}
        <div className="hidden lg:flex gap-2 px-6 py-4 border-t border-border overflow-x-auto">
          {STRUTS.map((strut) => (
            <button
              key={strut.id}
              onClick={() => setSelectedStrut(strut)}
              className={`shrink-0 h-16 w-16 rounded-lg overflow-hidden border-2 transition-colors ${
                selectedStrut.id === strut.id
                  ? "border-foreground"
                  : "border-border hover:border-muted-foreground"
              }`}
            >
              <img src={strut.poster} alt={strut.name} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>

        {showRules && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/60">
            <div className="rise rounded-2xl bg-background p-6 max-w-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">The Strut rules</h2>
                <button
                  onClick={() => setShowRules(false)}
                  aria-label="Close"
                  className="p-1 text-muted-foreground hover:text-foreground"
                >
                  <X className="size-5" />
                </button>
              </div>
              <ul className="space-y-2.5">
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
    </>
  );
}
