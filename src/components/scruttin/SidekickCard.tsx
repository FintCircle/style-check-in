import { useState } from "react";
import { Bookmark, Check, Heart, MessageCircle, Sparkles, X, Zap } from "lucide-react";
import {
  KIND_META,
  type KeepPost,
  type PickPost,
  type RatePost,
  type SidekickPost,
  type StylePost,
} from "@/lib/sidekick-data";
import { Avatar } from "./Avatar";

export function SidekickCard({ post }: { post: SidekickPost }) {
  const meta = KIND_META[post.kind];

  return (
    <article className="border-b border-border bg-card px-4 py-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="label-caps text-foreground">{meta.label}</p>
          {meta.sub && <p className="label-caps text-muted-foreground">{meta.sub}</p>}
        </div>
        <span className="label-caps rounded-full border border-border px-2 py-0.5 text-muted-foreground">
          {meta.task}
        </span>
      </div>

      <header className="mt-3 flex items-center gap-2.5">
        <Avatar initials={post.initials} size={32} />
        <p className="text-xs text-muted-foreground">
          <span className="font-semibold text-foreground">{post.handle}</span>
          {post.place ? ` · ${post.place}` : ""} · {post.ago}
        </p>
      </header>

      <h2 className="mt-3 text-[1.0625rem] leading-snug font-semibold">{post.question}</h2>

      {post.kind === "rate" && <RateBody post={post} />}
      {post.kind === "pick" && <PickBody post={post} />}
      {post.kind === "keep" && <KeepBody post={post} />}
      {post.kind === "style" && <StyleBody post={post} />}

      {post.more && (
        <div className="mt-4 rounded-xl border border-border bg-secondary/60 px-3.5 py-3">
          <p className="label-caps text-muted-foreground">
            More from {post.name.split(" ")[0]}
          </p>
          <p className="mt-1.5 text-sm leading-snug text-foreground/85">“{post.more}”</p>
        </div>
      )}

      <ActionRow likes={post.likes} thoughts={post.thoughts} />
    </article>
  );
}

function Photo({ src, alt }: { src: string; alt: string }) {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      width={768}
      height={1024}
      className="aspect-[3/4] w-full object-cover"
    />
  );
}

function RateBody({ post }: { post: RatePost }) {
  const [rated, setRated] = useState(false);

  return (
    <>
      <div className="mt-3 grid gap-1.5 overflow-hidden rounded-xl border border-border">
        {post.images.map((src, i) => (
          <Photo key={src} src={src} alt={`${post.name}'s look ${i + 1}`} />
        ))}
      </div>

      <div className="mt-3 rounded-xl border border-border bg-background px-3.5 py-3">
        <div className="flex items-end justify-between">
          <p className="label-caps text-muted-foreground">Overall</p>
          <p className="tick font-display text-2xl leading-none font-semibold">
            {post.overall.toFixed(1)}
            <span className="text-sm text-muted-foreground"> / 10</span>
          </p>
        </div>
        <div className="mt-3 space-y-2">
          {post.scores.map((s) => (
            <div key={s.label} className="flex items-center gap-2.5">
              <span className="w-16 text-xs text-muted-foreground">{s.label}</span>
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-secondary">
                <div className="h-full bg-keep" style={{ width: `${s.value * 10}%` }} />
              </div>
              <span className="tick w-8 text-right text-xs font-semibold">
                {s.value.toFixed(1)}
              </span>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => setRated(true)}
        disabled={rated}
        className="mt-3 h-12 w-full rounded-lg bg-primary font-display text-sm font-semibold text-primary-foreground disabled:opacity-60"
      >
        {rated ? "Thanks — your rating is in" : "Rate this fit"}
      </button>
      <p className="mt-2 text-xs text-muted-foreground">
        {post.ratings} ratings · no clock on this one
      </p>
    </>
  );
}

function PickBody({ post }: { post: PickPost }) {
  const [picked, setPicked] = useState<"A" | "B" | null>(null);

  return (
    <>
      <div className="mt-3 grid grid-cols-2 gap-1.5">
        {post.options.map((o) => (
          <button
            key={o.key}
            onClick={() => setPicked(o.key)}
            className={
              picked === o.key
                ? "overflow-hidden rounded-xl border-2 border-foreground text-left"
                : "overflow-hidden rounded-xl border border-border text-left"
            }
          >
            <div className="relative">
              <Photo src={o.image} alt={`Option ${o.key}`} />
              <span className="label-caps absolute top-2 left-2 rounded-full bg-background/90 px-2 py-0.5">
                {o.key}
              </span>
            </div>
            {picked && (
              <div className="rise px-2.5 py-2">
                <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
                  <div className="h-full bg-keep" style={{ width: `${o.percent}%` }} />
                </div>
                <p className="tick mt-1.5 text-sm font-semibold">{o.percent}%</p>
              </div>
            )}
          </button>
        ))}
      </div>

      {!picked ? (
        <>
          <div className="mt-2 grid grid-cols-2 gap-1.5">
            {post.options.map((o) => (
              <button
                key={o.key}
                onClick={() => setPicked(o.key)}
                className="rounded-lg bg-primary py-3 font-display text-sm font-semibold text-primary-foreground"
              >
                {o.key}
              </button>
            ))}
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            Results stay hidden until you choose.
          </p>
        </>
      ) : (
        <p className="mt-2 text-xs text-muted-foreground">
          You chose {picked} · {post.votes} votes · {post.thoughts} thoughts
        </p>
      )}
    </>
  );
}

function KeepBody({ post }: { post: KeepPost }) {
  const [decision, setDecision] = useState<"keep" | "leave" | null>(null);

  return (
    <>
      {post.inStoreNow && (
        <p className="label-caps mt-2 inline-flex items-center gap-1 rounded-full bg-live px-2 py-0.5 text-live-foreground">
          <Zap className="size-3" /> In store now
        </p>
      )}

      <div className="mt-3 overflow-hidden rounded-xl border border-border">
        <Photo src={post.image} alt={`${post.brand} ${post.item}`} />
      </div>

      <div className="mt-3">
        <p className="tick font-display text-2xl leading-none font-semibold">{post.price}</p>
        <p className="mt-1 text-xs text-muted-foreground">
          {post.brand} · {post.item}
        </p>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2">
        <button
          onClick={() => setDecision("keep")}
          className={
            decision === "keep"
              ? "flex items-center justify-center gap-1.5 rounded-lg border-2 border-foreground bg-primary py-3.5 font-display text-sm font-semibold text-primary-foreground"
              : "flex items-center justify-center gap-1.5 rounded-lg border border-foreground/25 bg-card py-3.5 font-display text-sm font-semibold"
          }
        >
          <Check className="size-4" /> Keep it
        </button>
        <button
          onClick={() => setDecision("leave")}
          className={
            decision === "leave"
              ? "flex items-center justify-center gap-1.5 rounded-lg border-2 border-foreground bg-primary py-3.5 font-display text-sm font-semibold text-primary-foreground"
              : "flex items-center justify-center gap-1.5 rounded-lg border border-foreground/25 bg-card py-3.5 font-display text-sm font-semibold"
          }
        >
          <X className="size-4" /> Leave it
        </button>
      </div>

      {decision ? (
        <div className="rise mt-3 space-y-2">
          <div className="flex h-9 overflow-hidden rounded-lg border border-border">
            <div
              className="flex items-center bg-keep px-2.5"
              style={{ width: `${Math.max(post.keepPercent, 14)}%` }}
            >
              <span className="label-caps tick text-primary-foreground">{post.keepPercent}%</span>
            </div>
            <div className="flex flex-1 items-center justify-end bg-change px-2.5">
              <span className="label-caps tick text-foreground">{100 - post.keepPercent}%</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Keep {post.keepPercent}% · Leave {100 - post.keepPercent}% · {post.decisions} decisions
          </p>
        </div>
      ) : (
        <p className="mt-2 text-xs text-muted-foreground">
          {post.decisions} decisions · {post.thoughts} thoughts
        </p>
      )}
    </>
  );
}

function StyleBody({ post }: { post: StylePost }) {
  return (
    <>
      <div className="mt-3 overflow-hidden rounded-xl border border-border">
        <Photo src={post.image} alt={post.item} />
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        {post.item} · {post.vibe}
      </p>

      <button className="mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-lg border border-foreground/25 bg-card font-display text-sm font-semibold">
        <Sparkles className="size-4" /> Suggest a look
      </button>
      <p className="mt-2 text-xs text-muted-foreground">
        {post.suggestions} suggestions · {post.thoughts} thoughts
      </p>

      <div className="mt-4 space-y-3">
        <p className="label-caps text-muted-foreground">Top suggestions</p>
        {post.top.map((s) => (
          <div key={s.id} className="rounded-xl border border-border bg-background px-3.5 py-3">
            <p className="flex items-center gap-1.5 text-xs font-semibold">
              {s.handle}
              {s.stylist && (
                <span className="label-caps inline-flex items-center gap-1 rounded-full bg-secondary px-1.5 py-0.5 text-muted-foreground">
                  <Check className="size-3" /> Stylist
                </span>
              )}
            </p>
            <p className="mt-1 text-sm leading-snug text-foreground/85">{s.text}</p>
            <p className="mt-1.5 inline-flex items-center gap-1 text-xs text-muted-foreground">
              <Heart className="size-3" /> Helpful {s.helpful}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}

function ActionRow({ likes, thoughts }: { likes: number; thoughts: number }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  return (
    <div className="mt-4 flex items-center gap-5 text-xs text-muted-foreground">
      <button
        onClick={() => setLiked((v) => !v)}
        aria-label="Like"
        className={liked ? "inline-flex items-center gap-1.5 text-foreground" : "inline-flex items-center gap-1.5"}
      >
        <Heart className={liked ? "size-4 fill-current" : "size-4"} /> {likes + (liked ? 1 : 0)}
      </button>
      <span className="inline-flex items-center gap-1.5">
        <MessageCircle className="size-4" /> {thoughts}
      </span>
      <button
        onClick={() => setSaved((v) => !v)}
        aria-label="Save"
        className={saved ? "ml-auto text-foreground" : "ml-auto"}
      >
        <Bookmark className={saved ? "size-4 fill-current" : "size-4"} />
      </button>
    </div>
  );
}
