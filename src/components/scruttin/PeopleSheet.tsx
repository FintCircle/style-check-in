import { useState } from "react";
import { Check, Copy, Share2, UserPlus, Users, X } from "lucide-react";
import { PROFILES, countryName } from "@/lib/scruttin-profiles";
import { useMyPeople } from "@/lib/scruttin-people";
import { Avatar } from "./Avatar";

export function PeopleSheet({ onClose }: { onClose: () => void }) {
  const { trusted, isTrusted, toggleTrust, inviteLink } = useMyPeople();
  const [copied, setCopied] = useState(false);

  const people = PROFILES.filter((p) => p.name !== "You");
  const yours = people.filter((p) => isTrusted(p.name));
  const suggested = people.filter((p) => !isTrusted(p.name));

  async function copy() {
    try {
      await navigator.clipboard.writeText(inviteLink);
    } catch {
      /* clipboard blocked — the link is still on screen */
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  async function share() {
    if (typeof navigator !== "undefined" && "share" in navigator) {
      try {
        await navigator.share({
          title: "Scruttin",
          text: "Be one of my people on Scruttin — tell me straight before I walk out the door.",
          url: inviteLink,
        });
        return;
      } catch {
        /* dismissed */
      }
    }
    void copy();
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end bg-foreground/40" onClick={onClose}>
      <div
        className="rise max-h-[92vh] overflow-y-auto rounded-t-2xl bg-background px-4 pt-4 pb-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-lg leading-tight font-semibold">My people</h2>
            <p className="text-xs text-muted-foreground">
              {trusted.length} {trusted.length === 1 ? "person" : "people"} you trust to tell you
              straight
            </p>
          </div>
          <button onClick={onClose} aria-label="Close" className="p-1 text-muted-foreground">
            <X className="size-5" />
          </button>
        </div>

        <div className="mt-4 rounded-xl border border-border bg-secondary px-3.5 py-3">
          <p className="label-caps text-muted-foreground">Invite someone</p>
          <p className="mt-1.5 text-sm leading-snug">
            Send your link. Whoever joins with it lands in your people — they're the only ones who
            can see and vote when you ask your people instead of everyone.
          </p>
          <p className="mt-2 truncate rounded-lg border border-border bg-card px-3 py-2 text-xs text-muted-foreground">
            {inviteLink}
          </p>
          <div className="mt-2 flex gap-2">
            <button
              onClick={share}
              className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-lg bg-primary font-display text-sm font-semibold text-primary-foreground"
            >
              <Share2 className="size-4" /> Share invite
            </button>
            <button
              onClick={copy}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-border bg-card px-3.5 text-sm font-medium"
            >
              {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        </div>

        <p className="label-caps mt-5 text-muted-foreground">Who you trust</p>
        {yours.length === 0 ? (
          <p className="mt-2 text-sm text-muted-foreground">
            No one yet — invite a friend or add someone below.
          </p>
        ) : (
          <div className="mt-2 space-y-2">
            {yours.map((p) => (
              <Row
                key={p.name}
                name={p.name}
                initials={p.initials}
                sub={`${p.handle} · ${p.city}, ${countryName(p.countryCode)}`}
                trusted
                onToggle={() => toggleTrust(p.name)}
              />
            ))}
          </div>
        )}

        <p className="label-caps mt-5 text-muted-foreground">People you could trust</p>
        {suggested.length === 0 ? (
          <p className="mt-2 text-sm text-muted-foreground">You've added everyone here.</p>
        ) : (
          <div className="mt-2 space-y-2">
            {suggested.map((p) => (
              <Row
                key={p.name}
                name={p.name}
                initials={p.initials}
                sub={`${p.handle} · says keep ${p.keepRate}% of the time`}
                trusted={false}
                onToggle={() => toggleTrust(p.name)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Row({
  name,
  initials,
  sub,
  trusted,
  onToggle,
}: {
  name: string;
  initials: string;
  sub: string;
  trusted: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-card px-3 py-2.5">
      <Avatar initials={initials} size={34} />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold">{name}</p>
        <p className="truncate text-xs text-muted-foreground">{sub}</p>
      </div>
      <button
        onClick={onToggle}
        className={
          trusted
            ? "inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full border border-border px-3 text-xs font-medium text-muted-foreground"
            : "inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full bg-primary px-3 text-xs font-semibold text-primary-foreground"
        }
      >
        {trusted ? (
          <>
            <Users className="size-3.5" /> Trusted
          </>
        ) : (
          <>
            <UserPlus className="size-3.5" /> Add
          </>
        )}
      </button>
    </div>
  );
}
