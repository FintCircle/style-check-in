import strut1 from "@/assets/strut-1.mp4.asset.json";
import strut2 from "@/assets/strut-2.mp4.asset.json";
import strut3 from "@/assets/strut-3.mp4.asset.json";
import outfit1 from "@/assets/outfit-1.jpg";
import outfit2 from "@/assets/outfit-2.jpg";
import outfit4 from "@/assets/outfit-4.jpg";

/** Hard cap: a Strut can never run longer than 60 seconds. */
export const STRUT_MAX_SECONDS = 60;

export type Strut = {
  id: string;
  name: string;
  initials: string;
  handle: string;
  place: string;
  kind: string;
  caption: string;
  video: string;
  poster: string;
  seconds: number;
  loves: number;
  notes: number;
};

export const STRUTS: Strut[] = [
  {
    id: "s1",
    name: "Maya R.",
    initials: "MR",
    handle: "@mayaruns",
    place: "London",
    kind: "Outfit reveal",
    caption: "Blazer over a tee, three ways. Tell me which one walks out with me.",
    video: strut1.url,
    poster: outfit1,
    seconds: 42,
    loves: 1284,
    notes: 96,
  },
  {
    id: "s2",
    name: "Derrick M.",
    initials: "DM",
    handle: "@derrick.m",
    place: "Kampala",
    kind: "Runway walk",
    caption: "Cream trousers, long jacket, one take. No filters, no music — just the fit.",
    video: strut2.url,
    poster: outfit2,
    seconds: 28,
    loves: 862,
    notes: 51,
  },
  {
    id: "s3",
    name: "Nadia S.",
    initials: "NS",
    handle: "@nadia.s",
    place: "Nairobi",
    kind: "Thrift find",
    caption: "Green satin, 40k shillings, second-hand. December dinner sorted.",
    video: strut3.url,
    poster: outfit4,
    seconds: 57,
    loves: 2410,
    notes: 173,
  },
];

export const STRUT_RULES = [
  "60 seconds, hard stop — no extensions",
  "Record it or upload it, that's the whole toolkit",
  "No effects, no filters, no music library, no AR",
  "Edit elsewhere if you want — Strut just shows the fashion",
];
