import { useState } from "react";
import { MessageCircle, Send, Users } from "lucide-react";
import type { Comment, Post } from "@/lib/scruttin-data";
import { getProfile, type Profile } from "@/lib/scruttin-profiles";
import { Avatar } from "./Avatar";
import { ClockPill, useCountdown } from "./Countdown";
import { ProfileSheet } from "./ProfileSheet";
import { VerdictBar } from "./VerdictBar";

export function PostCard({ post }: { post: Post }) {
  const { seconds, locked } = useCountdown(post.secondsLeft);
  const [choice, setChoice] = useState<"keep" | "change" | null>(null);
  const [keep, setKeep] = useState(post.keep);
  const [change, setChange] = useState(post.change);
  const [comments, setComments] = useState<Comment[]>(post.comments);
  const [showComments, setShowComments] = useState(false);
  const [draft, setDraft] = useState("");
  const [profile, setProfile] = useState<Profile | null>(null);

  function vote(next: "keep" | "change") {
    if (locked || choice) return;
    setChoice(next);
    if (next === "keep") setKeep((n) => n + 1);
    else setChange((n) => n + 1);
  }

  function addComment() {
    const text = draft.trim();
    if (!text) return;
    setComments((list) => [
      ...list,
      { id: `local-${Date.now()}`, name: "You", initials: "YO", text, minutesAgo: 0, fromMyPeople: false },
    ]);
    setDraft("");
  }

  return (
    <article className="border-b border-border bg-card px-4 py-5">
      <header className="flex items-start gap-3">
        <button
          onClick={() => setProfile(getProfile(post.name, post.initials))}
          aria-label={`View ${post.name}'s profile`}
        >
          <Avatar initials={post.initials} />
        </button>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setProfile(getProfile(post.name, post.initials))}
              className="truncate text-sm font-semibold"
            >
              {post.name}
            </button>
            {post.audience === "my-people" && (
              <span className="label-caps inline-flex items-center gap-1 rounded-full border border-border px-1.5 py-0.5 text-muted-foreground">
                <Users className="size-3" /> My people
              </span>
            )}
          </div>
          <p className="text-xs text-muted-foreground">
            {post.minutesAgo}m ago · {post.place} · {post.occasion}
          </p>
        </div>
        <ClockPill seconds={seconds} locked={locked} />
      </header>

      <h2 className="mt-3 text-[1.0625rem] leading-snug font-semibold">{post.question}</h2>

      <div className="mt-3 grid gap-1.5 overflow-hidden rounded-xl border border-border">
        {post.images.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={`${post.name}'s outfit option ${i + 1}`}
            loading="lazy"
            width={768}
            height={1024}
            className="aspect-[3/4] w-full object-cover"
          />
        ))}
      </div>

      <div className="mt-3">
        <VerdictBar keep={keep} change={change} choice={choice} locked={locked} onVote={vote} />
      </div>

      {!locked && choice === null && (
        <p className="mt-2 text-xs text-muted-foreground">
          Votes stay hidden until you call it — no following the crowd.
        </p>
      )}

      <button
        onClick={() => setShowComments((s) => !s)}
        className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground"
      >
        <MessageCircle className="size-3.5" />
        {comments.length} {comments.length === 1 ? "note" : "notes"}
      </button>

      {showComments && (
        <div className="rise mt-3 space-y-3">
          {comments.map((c) => (
            <div key={c.id} className="flex gap-2.5">
              <Avatar initials={c.initials} size={28} />
              <div className="min-w-0">
                <p className="text-xs font-semibold">
                  {c.name}
                  {c.fromMyPeople && (
                    <span className="ml-1.5 font-normal text-muted-foreground">· your people</span>
                  )}
                </p>
                <p className="text-sm leading-snug text-foreground/85">{c.text}</p>
              </div>
            </div>
          ))}

          {locked ? (
            <p className="text-xs text-muted-foreground">
              The clock ran out — notes are closed on this one.
            </p>
          ) : (
            <div className="flex items-center gap-2">
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addComment()}
                placeholder="Tell them straight…"
                className="h-10 flex-1 rounded-full border border-input bg-background px-3.5 text-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring/30"
              />
              <button
                onClick={addComment}
                aria-label="Send note"
                className="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground"
              >
                <Send className="size-4" />
              </button>
            </div>
          )}
        </div>
      )}
    </article>
  );
}
