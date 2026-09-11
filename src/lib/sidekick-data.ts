import outfit1 from "@/assets/outfit-1.jpg";
import outfit2 from "@/assets/outfit-2.jpg";
import outfit3 from "@/assets/outfit-3.jpg";
import outfit4 from "@/assets/outfit-4.jpg";
import itemJacket from "@/assets/item-jacket.jpg";
import itemBlazer from "@/assets/item-blazer.jpg";

export type SidekickKind = "rate" | "pick" | "keep" | "style";

type Base = {
  id: string;
  kind: SidekickKind;
  name: string;
  initials: string;
  handle: string;
  place?: string;
  ago: string;
  /** Short, immediately understandable question or headline. */
  question: string;
  /** Optional longer explanation, shown as "More from [name]". */
  more?: string;
  likes: number;
  thoughts: number;
};

export type RatePost = Base & {
  kind: "rate";
  images: string[];
  overall: number;
  scores: { label: string; value: number }[];
  ratings: number;
};

export type PickPost = Base & {
  kind: "pick";
  options: { key: "A" | "B"; image: string; percent: number }[];
  votes: number;
};

export type KeepPost = Base & {
  kind: "keep";
  image: string;
  price: string;
  brand: string;
  item: string;
  inStoreNow: boolean;
  keepPercent: number;
  decisions: number;
};

export type Suggestion = {
  id: string;
  handle: string;
  stylist: boolean;
  text: string;
  helpful: number;
};

export type StylePost = Base & {
  kind: "style";
  image: string;
  item: string;
  vibe: string;
  suggestions: number;
  top: Suggestion[];
};

export type SidekickPost = RatePost | PickPost | KeepPost | StylePost;

export const KIND_META: Record<SidekickKind, { label: string; task: string; sub?: string }> = {
  rate: { label: "Rate my fit", task: "Rate it" },
  pick: { label: "Pick one", task: "Choose one" },
  keep: { label: "Keep or leave", task: "Decide", sub: "Shopping decision" },
  style: { label: "Style this", task: "Suggest a look" },
};

export const SIDEKICK_POSTS: SidekickPost[] = [
  {
    id: "s1",
    kind: "rate",
    name: "Derrick M.",
    initials: "DM",
    handle: "@derrick",
    place: "Kampala",
    ago: "2h",
    question: "Trying something different today.",
    more: "First time trying this colour. I'm not completely sure about the shoes, so be honest.",
    images: [outfit2],
    overall: 8.4,
    scores: [
      { label: "Fit", value: 8.7 },
      { label: "Colours", value: 9.0 },
      { label: "Styling", value: 7.9 },
    ],
    ratings: 312,
    likes: 184,
    thoughts: 43,
  },
  {
    id: "s2",
    kind: "pick",
    name: "Maya R.",
    initials: "MR",
    handle: "@maya",
    place: "London",
    ago: "18m",
    question: "Which one for dinner tonight?",
    more: "It's a fairly casual rooftop place. I love B, but I'm wondering if it's a little too much.",
    options: [
      { key: "A", image: outfit1, percent: 38 },
      { key: "B", image: outfit4, percent: 62 },
    ],
    votes: 924,
    likes: 96,
    thoughts: 81,
  },
  {
    id: "s3",
    kind: "keep",
    name: "Daniel O.",
    initials: "DO",
    handle: "@daniel",
    place: "Kampala",
    ago: "7m",
    question: "Worth buying?",
    more: "The fit feels great and it's 100% wool, but I'm not sure about the colour. I already own two brown jackets. Would you actually buy this?",
    image: itemJacket,
    price: "UGX 320,000",
    brand: "Zara",
    item: "Jacket",
    inStoreNow: true,
    keepPercent: 71,
    decisions: 672,
    likes: 72,
    thoughts: 94,
  },
  {
    id: "s4",
    kind: "style",
    name: "Nia B.",
    initials: "NB",
    handle: "@nia",
    place: "Nairobi",
    ago: "4h",
    question: "How would you style this?",
    more: "I just bought this and have no idea what trousers to wear with it. I'd like something casual enough for weekends.",
    image: itemBlazer,
    item: "Blazer",
    vibe: "Smart casual",
    suggestions: 214,
    top: [
      {
        id: "sg1",
        handle: "@marcus",
        stylist: false,
        text: "Cream trousers + white tee + brown loafers.",
        helpful: 38,
      },
      {
        id: "sg2",
        handle: "@aisha",
        stylist: true,
        text: "I'd go darker underneath and let the green be the main colour.",
        helpful: 27,
      },
    ],
    likes: 53,
    thoughts: 53,
  },
  {
    id: "s5",
    kind: "rate",
    name: "Tariq A.",
    initials: "TA",
    handle: "@tariq",
    place: "Dubai",
    ago: "5h",
    question: "Client-meeting grey, rated honestly.",
    more: "No rush on this one — I just want to know if the proportions read right before I make it my default work fit.",
    images: [outfit3],
    overall: 7.6,
    scores: [
      { label: "Fit", value: 8.1 },
      { label: "Colours", value: 7.2 },
      { label: "Styling", value: 7.4 },
    ],
    ratings: 148,
    likes: 61,
    thoughts: 19,
  },
];
