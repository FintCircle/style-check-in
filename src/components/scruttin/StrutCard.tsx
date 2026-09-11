import { useEffect, useRef, useState } from "react";
import { Heart, MessageCircle, Play, Send } from "lucide-react";
import { STRUT_MAX_SECONDS, type Strut } from "@/lib/strut-data";
import { Avatar } from "./Avatar";

export function StrutCard({ strut, className = "" }: { strut: Strut; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [loved, setLoved] = useState(false);

  // Nothing ever autoplays: leaving the screen simply stops what you started.
  useEffect(() => {
    const node = wrap.current;
    if (!node) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry && !entry.isIntersecting) {
          ref.current?.pause();
          setPlaying(false);
        }
      },
      { threshold: 0.6 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  function toggle() {
    const video = ref.current;
    if (!video) return;
    if (video.paused) {
      void video.play();
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  }

  function onTime() {
    const video = ref.current;
    if (!video) return;
    if (video.currentTime >= STRUT_MAX_SECONDS) {
      video.pause();
      setPlaying(false);
      setProgress(1);
      return;
    }
    const cap = Math.min(video.duration || strut.seconds, STRUT_MAX_SECONDS);
    setProgress(cap ? Math.min(1, video.currentTime / cap) : 0);
  }

  return (
    <div
      ref={wrap}
      className={`relative h-[100svh] w-full shrink-0 snap-start snap-always overflow-hidden bg-foreground ${className}`}
    >
      <video
        ref={ref}
        src={strut.video}
        poster={strut.poster}
        playsInline
        loop={false}
        onTimeUpdate={onTime}
        onEnded={() => {
          setPlaying(false);
          setProgress(1);
        }}
        className="absolute inset-0 size-full object-cover"
      />

      <button
        onClick={toggle}
        aria-label={playing ? `Pause ${strut.name}'s Strut` : `Play ${strut.name}'s Strut`}
        className="absolute inset-0 flex items-center justify-center"
      >
        {!playing && (
          <span className="flex size-16 items-center justify-center rounded-full bg-background/85 shadow-lg">
            <Play className="size-6 translate-x-0.5 fill-foreground text-foreground" />
          </span>
        )}
      </button>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/85 via-foreground/40 to-transparent px-4 pt-16 pb-8">
        <div className="pointer-events-auto flex items-end gap-3">
          <div className="min-w-0 flex-1 text-background">
            <div className="flex items-center gap-2">
              <Avatar initials={strut.initials} size={32} />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">{strut.name}</p>
                <p className="truncate text-xs text-background/70">
                  {strut.handle} · {strut.place}
                </p>
              </div>
            </div>
            <p className="label-caps mt-3 text-background/70">
              {strut.kind} · {strut.seconds}s
            </p>
            <p className="mt-1 text-sm leading-snug">{strut.caption}</p>
          </div>

          <div className="flex flex-col items-center gap-4 pb-1 text-background">
            <button
              onClick={() => setLoved((v) => !v)}
              aria-label="Love this Strut"
              className="flex flex-col items-center gap-1"
            >
              <Heart className={loved ? "size-6 fill-background" : "size-6"} />
              <span className="text-[0.6875rem] font-semibold">
                {strut.loves + (loved ? 1 : 0)}
              </span>
            </button>
            <button aria-label="Notes" className="flex flex-col items-center gap-1">
              <MessageCircle className="size-6" />
              <span className="text-[0.6875rem] font-semibold">{strut.notes}</span>
            </button>
            <button aria-label="Share" className="flex flex-col items-center gap-1">
              <Send className="size-6" />
            </button>
          </div>
        </div>

        <div className="mt-4 h-0.5 w-full rounded-full bg-background/25">
          <div
            className="h-full rounded-full bg-background transition-[width] duration-200"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
