import { COUNTRY_SHAPES } from "./country-shapes";

export type Profile = {
  name: string;
  initials: string;
  handle: string;
  city: string;
  countryCode: string;
  bio: string;
  style: string[];
  asked: number;
  calledIt: number;
  keepRate: number;
  trustedBy: number;
  joined: string;
  inMyPeople: boolean;
};

export const PROFILES: Profile[] = [
  {
    name: "You",
    initials: "YO",
    handle: "@you",
    city: "Kampala",
    countryCode: "UG",
    bio: "Getting dressed in a hurry, most days.",
    style: ["Everyday", "Work"],
    asked: 12,
    calledIt: 84,
    keepRate: 61,
    trustedBy: 9,
    joined: "2026",
    inMyPeople: false,
  },
  {
    name: "Derrick M.",
    initials: "DM",
    handle: "@derrickm",
    city: "Kampala",
    countryCode: "UG",
    bio: "Tailoring nerd. If the shoulder is wrong, nothing else matters.",
    style: ["Tailoring", "Weddings"],
    asked: 34,
    calledIt: 291,
    keepRate: 58,
    trustedBy: 142,
    joined: "2025",
    inMyPeople: false,
  },
  {
    name: "Maya R.",
    initials: "MR",
    handle: "@mayarwrites",
    city: "London",
    countryCode: "GB",
    bio: "Blazers over everything. Ask me about second dates.",
    style: ["Minimal", "Date night"],
    asked: 57,
    calledIt: 612,
    keepRate: 72,
    trustedBy: 388,
    joined: "2025",
    inMyPeople: true,
  },
  {
    name: "Tariq A.",
    initials: "TA",
    handle: "@tariq.a",
    city: "Dubai",
    countryCode: "AE",
    bio: "Client meetings five days a week. Loafers win, usually.",
    style: ["Workwear", "Smart casual"],
    asked: 21,
    calledIt: 174,
    keepRate: 49,
    trustedBy: 96,
    joined: "2026",
    inMyPeople: false,
  },
  {
    name: "Nadia S.",
    initials: "NS",
    handle: "@nadiasat",
    city: "Nairobi",
    countryCode: "KE",
    bio: "Colour maximalist. Nothing is ever too much.",
    style: ["Party", "Colour"],
    asked: 88,
    calledIt: 903,
    keepRate: 81,
    trustedBy: 1240,
    joined: "2024",
    inMyPeople: true,
  },
  {
    name: "Aisha N.",
    initials: "AN",
    handle: "@aishan",
    city: "Kampala",
    countryCode: "UG",
    bio: "Will always tell you about the shoes.",
    style: ["Shoes", "Everyday"],
    asked: 15,
    calledIt: 402,
    keepRate: 44,
    trustedBy: 118,
    joined: "2025",
    inMyPeople: false,
  },
  {
    name: "James K.",
    initials: "JK",
    handle: "@jamesk",
    city: "Accra",
    countryCode: "GH",
    bio: "Sleeve-roll evangelist.",
    style: ["Casual", "Tailoring"],
    asked: 9,
    calledIt: 233,
    keepRate: 66,
    trustedBy: 74,
    joined: "2026",
    inMyPeople: true,
  },
  {
    name: "Sofia L.",
    initials: "SL",
    handle: "@sofia.l",
    city: "Lyon",
    countryCode: "FR",
    bio: "Relaxed, never office. That's the whole brief.",
    style: ["Minimal", "Date night"],
    asked: 27,
    calledIt: 318,
    keepRate: 69,
    trustedBy: 205,
    joined: "2025",
    inMyPeople: true,
  },
  {
    name: "Ruth K.",
    initials: "RK",
    handle: "@ruthk",
    city: "Nairobi",
    countryCode: "KE",
    bio: "Gold earrings solve most problems.",
    style: ["Party", "Jewellery"],
    asked: 41,
    calledIt: 511,
    keepRate: 77,
    trustedBy: 302,
    joined: "2024",
    inMyPeople: true,
  },
];

export function getProfile(name: string, fallbackInitials = "??"): Profile {
  const found = PROFILES.find((p) => p.name === name);
  if (found) return found;
  return {
    name,
    initials: fallbackInitials,
    handle: `@${name.toLowerCase().replace(/[^a-z]/g, "")}`,
    city: "Unknown",
    countryCode: "UG",
    bio: "New to Scruttin.",
    style: ["Everyday"],
    asked: 1,
    calledIt: 3,
    keepRate: 50,
    trustedBy: 0,
    joined: "2026",
    inMyPeople: false,
  };
}

export function countryName(code: string) {
  return COUNTRY_SHAPES[code]?.name ?? "Somewhere";
}
