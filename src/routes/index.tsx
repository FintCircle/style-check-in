import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState, type ReactNode } from "react";
import { Bell, Globe, Plus, UserPlus, Users } from "lucide-react";
import { POSTS, type Audience, type Post } from "@/lib/scruttin-data";
import { PeopleProvider, useMyPeople } from "@/lib/scruttin-people";
import { PostCard } from "@/components/scruttin/PostCard";
import { AskSheet } from "@/components/scruttin/AskSheet";
import { PeopleSheet } from "@/components/scruttin/PeopleSheet";

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
  component: IndexRoute,
});

function IndexRoute() {
  return (
    <PeopleProvider>
      <Index />
    </PeopleProvider>
  );
}

function Index() {
  const [audience, setAudience] = useState<Audience>("everyone");
  const [posts, setPosts] = useState<Post[]>(POSTS);
  const [asking, setAsking] = useState(false);
  const [managing, setManaging] = useState(false);
  const { trusted, isTrusted } = useMyPeople();

  const visible = useMemo(
    () =>
      audience === "everyone"
        ? posts.filter((p) => p.audience === "everyone")
        : posts.filter(
            (p) => p.audience === "my-people" && (p.name === "You" || isTrusted(p.name)),
          ),
    [audience, posts, isTrusted],
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
          <div className="flex items-center gap-1">
            <Link
              to="/strut"
              className="label-caps rounded-full border border-border px-2.5 py-1.5 text-foreground"
            >
              Strut
            </Link>
            <button
              onClick={() => setManaging(true)}
              aria-label="Manage my people"
              className="relative p-2"
            >
              <UserPlus className="size-5" />
              <span className="absolute -top-0.5 -right-0.5 flex min-w-4 justify-center rounded-full bg-primary px-1 text-[0.625rem] leading-4 font-semibold text-primary-foreground">
                {trusted.length}
              </span>
            </button>
            <button aria-label="Notifications" className="p-2">
              <Bell className="size-5" />
            </button>
          </div>
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
          When you ask, you choose who answers: the whole community, or only your people. Every
          outfit runs on a clock, verdicts stay hidden until you vote, and the result locks when
          time's up.
        </p>
      </section>

      {visible.length === 0 ? (
        <div className="px-4 py-16 text-center">
          <p className="text-sm text-muted-foreground">
            Nobody has asked their people for an opinion right now. Only people who added you can
            show up here.
          </p>
          <button
            onClick={() => setManaging(true)}
            className="mt-4 inline-flex h-11 items-center gap-2 rounded-lg bg-primary px-4 font-display text-sm font-semibold text-primary-foreground"
          >
            <UserPlus className="size-4" /> Invite or add people
          </button>
        </div>
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
      {managing && <PeopleSheet onClose={() => setManaging(false)} />}
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
  icon: ReactNode;
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
