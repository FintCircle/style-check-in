import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Bell, Globe, Plus, Users } from "lucide-react";
import { POSTS, type Audience, type Post } from "@/lib/scruttin-data";
import { PostCard } from "@/components/scruttin/PostCard";
import { AskSheet } from "@/components/scruttin/AskSheet";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Scruttin — Before you wear it, ask" },
      {
        name: "description",
        content:
          "Post the outfit, set a clock, get a straight verdict before you walk out the door. Ask everyone, or just your people.",
      },
      { property: "og:title", content: "Scruttin — Before you wear it, ask" },
      {
        property: "og:description",
        content:
          "A second opinion on what you're wearing, on the clock. Wear it or change it, decided in minutes.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [audience, setAudience] = useState<Audience>("everyone");
  const [posts, setPosts] = useState<Post[]>(POSTS);
  const [asking, setAsking] = useState(false);

  const visible = useMemo(
    () => (audience === "everyone" ? posts : posts.filter((p) => p.audience === "my-people")),
    [audience, posts],
  );

  const liveCount = visible.filter((p) => p.secondsLeft > 0).length;

  return (
    <div className="mx-auto min-h-screen max-w-lg bg-card pb-24">
      <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur">
        <div className="flex items-center justify-between px-4 pt-4">
          <div>
            <h1 className="text-2xl leading-none font-semibold">Scruttin</h1>
            <p className="mt-1 text-xs text-muted-foreground">
              {liveCount} outfit{liveCount === 1 ? "" : "s"} still on the clock
            </p>
          </div>
          <button aria-label="Notifications" className="p-2">
            <Bell className="size-5" />
          </button>
        </div>

        <div className="mt-3 flex gap-1 px-4 pb-3">
          <ToggleTab
            active={audience === "everyone"}
            onClick={() => setAudience("everyone")}
            icon={<Globe className="size-3.5" />}
            label="Everyone"
          />
          <ToggleTab
            active={audience === "my-people"}
            onClick={() => setAudience("my-people")}
            icon={<Users className="size-3.5" />}
            label="My people"
          />
        </div>
      </header>

      <section className="border-b border-border bg-secondary px-4 py-4">
        <p className="label-caps text-muted-foreground">The Scruttin rule</p>
        <p className="mt-1.5 text-sm leading-snug">
          Every outfit runs on a clock. Verdicts stay hidden until you vote, then the result locks
          when time's up — so you get an answer while you can still change.
        </p>
      </section>

      {visible.length === 0 ? (
        <p className="px-4 py-16 text-center text-sm text-muted-foreground">
          None of your people are asking right now.
        </p>
      ) : (
        visible.map((post) => <PostCard key={post.id} post={post} />)
      )}

      <button
        onClick={() => setAsking(true)}
        className="fixed bottom-6 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 rounded-full bg-primary px-5 py-3.5 font-display text-sm font-semibold text-primary-foreground shadow-lg"
      >
        <Plus className="size-4" /> Ask now
      </button>

      {asking && (
        <AskSheet
          onClose={() => setAsking(false)}
          onPost={(post) => setPosts((list) => [post, ...list])}
        />
      )}
    </div>
  );
}

function ToggleTab({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={
        active
          ? "inline-flex items-center gap-1.5 rounded-full bg-primary px-3.5 py-1.5 text-sm font-medium text-primary-foreground"
          : "inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3.5 py-1.5 text-sm text-muted-foreground"
      }
    >
      {icon}
      {label}
    </button>
  );
}
