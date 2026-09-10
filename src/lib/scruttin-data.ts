import outfit1 from "@/assets/outfit-1.jpg";
import outfit2 from "@/assets/outfit-2.jpg";
import outfit3 from "@/assets/outfit-3.jpg";
import outfit4 from "@/assets/outfit-4.jpg";

export type Audience = "everyone" | "my-people";

export type Comment = {
  id: string;
  name: string;
  initials: string;
  text: string;
  minutesAgo: number;
  fromMyPeople: boolean;
};

export type Post = {
  id: string;
  name: string;
  initials: string;
  place: string;
  minutesAgo: number;
  audience: Audience;
  occasion: string;
  question: string;
  images: string[];
  /** Seconds left on the clock when the app loads. 0 means the verdict is locked. */
  secondsLeft: number;
  keep: number;
  change: number;
  comments: Comment[];
};

export const CURRENT_USER = { name: "You", initials: "YO" };

export const POSTS: Post[] = [
  {
    id: "p1",
    name: "Derrick M.",
    initials: "DM",
    place: "Kampala",
    minutesAgo: 4,
    audience: "everyone",
    occasion: "Wedding",
    question: "Does this jacket look too long with the cream trousers?",
    images: [outfit2],
    secondsLeft: 512,
    keep: 128,
    change: 71,
    comments: [
      {
        id: "c1",
        name: "Aisha N.",
        initials: "AN",
        text: "Length is fine. It's the white sneakers fighting the formality — go loafers.",
        minutesAgo: 3,
        fromMyPeople: false,
      },
      {
        id: "c2",
        name: "James K.",
        initials: "JK",
        text: "Roll the sleeve a touch and you're the best dressed guest.",
        minutesAgo: 2,
        fromMyPeople: true,
      },
    ],
  },
  {
    id: "p2",
    name: "Maya R.",
    initials: "MR",
    place: "London",
    minutesAgo: 11,
    audience: "my-people",
    occasion: "First date",
    question: "Blazer over the tee, or is it trying too hard for a 7pm drink?",
    images: [outfit1],
    secondsLeft: 143,
    keep: 46,
    change: 9,
    comments: [
      {
        id: "c3",
        name: "Sofia L.",
        initials: "SL",
        text: "Keep it. Push the sleeves up so it reads relaxed, not office.",
        minutesAgo: 6,
        fromMyPeople: true,
      },
    ],
  },
  {
    id: "p3",
    name: "Tariq A.",
    initials: "TA",
    place: "Dubai",
    minutesAgo: 26,
    audience: "everyone",
    occasion: "Work",
    question: "Sneakers or loafers with the grey trousers for a client meeting?",
    images: [outfit3],
    secondsLeft: 47,
    keep: 22,
    change: 63,
    comments: [],
  },
  {
    id: "p4",
    name: "Nadia S.",
    initials: "NS",
    place: "Nairobi",
    minutesAgo: 58,
    audience: "my-people",
    occasion: "Party",
    question: "Green satin for a December dinner — too much?",
    images: [outfit4],
    secondsLeft: 0,
    keep: 214,
    change: 18,
    comments: [
      {
        id: "c4",
        name: "Ruth K.",
        initials: "RK",
        text: "Not even close to too much. Gold earrings and go.",
        minutesAgo: 44,
        fromMyPeople: true,
      },
    ],
  },
];

export const OCCASIONS = [
  "Everyday",
  "Work",
  "Interview",
  "Date",
  "Wedding",
  "Party",
  "Travel",
  "Other",
];

export const CLOCK_OPTIONS = [
  { label: "5 minutes", seconds: 300, note: "Shoes are already on" },
  { label: "20 minutes", seconds: 1200, note: "Leaving soon" },
  { label: "1 hour", seconds: 3600, note: "Still deciding" },
];

export function formatClock(totalSeconds: number) {
  const s = Math.max(0, Math.floor(totalSeconds));
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m}:${String(r).padStart(2, "0")}`;
}
