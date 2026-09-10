import { MapPin, Users, X } from "lucide-react";
import { countryName, type Profile } from "@/lib/scruttin-profiles";
import { Avatar } from "./Avatar";
import { CountrySilhouette } from "./CountrySilhouette";

export function ProfileSheet({ profile, onClose }: { profile: Profile; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex flex-col justify-end bg-foreground/40"
      onClick={onClose}
    >
      <div
        className="rise max-h-[92vh] overflow-y-auto rounded-t-2xl bg-background px-4 pt-4 pb-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar initials={profile.initials} size={52} />
            <div className="min-w-0">
              <h2 className="truncate text-lg leading-tight font-semibold">{profile.name}</h2>
              <p className="text-xs text-muted-foreground">{profile.handle}</p>
            </div>
          </div>
          <button onClick={onClose} aria-label="Close" className="p-1 text-muted-foreground">
            <X className="size-5" />
          </button>
        </div>

        <div className="mt-4 flex items-center gap-3 rounded-xl border border-border bg-secondary px-3.5 py-3">
          <CountrySilhouette code={profile.countryCode} size={54} className="text-foreground/80" />
          <div className="min-w-0">
            <p className="label-caps text-muted-foreground">Answers from</p>
            <p className="mt-0.5 text-sm font-semibold">{countryName(profile.countryCode)}</p>
            <p className="inline-flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="size-3" />
              {profile.city}
            </p>
          </div>
        </div>

        <p className="mt-4 text-sm leading-snug text-foreground/85">{profile.bio}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {profile.style.map((s) => (
            <span
              key={s}
              className="rounded-full border border-border bg-card px-3 py-1 text-xs text-foreground"
            >
              {s}
            </span>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <Stat label="Outfits asked" value={profile.asked.toLocaleString()} />
          <Stat label="Verdicts given" value={profile.calledIt.toLocaleString()} />
          <Stat label="Says keep it" value={`${profile.keepRate}%`} />
          <Stat label="Trusted by" value={profile.trustedBy.toLocaleString()} />
        </div>

        <p className="mt-3 text-xs text-muted-foreground">On Scruttin since {profile.joined}</p>

        <button className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary font-display text-sm font-semibold text-primary-foreground">
          <Users className="size-4" />
          {profile.inMyPeople ? "In your people" : "Add to my people"}
        </button>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-card px-3 py-2.5">
      <p className="text-base font-semibold">{value}</p>
      <p className="label-caps text-muted-foreground">{label}</p>
    </div>
  );
}
