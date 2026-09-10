import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { PROFILES } from "./scruttin-profiles";

type PeopleContextValue = {
  trusted: string[];
  isTrusted: (name: string) => boolean;
  toggleTrust: (name: string) => void;
  inviteLink: string;
};

const PeopleContext = createContext<PeopleContextValue | null>(null);

export function PeopleProvider({ children }: { children: ReactNode }) {
  const [trusted, setTrusted] = useState<string[]>(() =>
    PROFILES.filter((p) => p.inMyPeople).map((p) => p.name),
  );

  const isTrusted = useCallback((name: string) => trusted.includes(name), [trusted]);

  const toggleTrust = useCallback((name: string) => {
    setTrusted((list) => (list.includes(name) ? list.filter((n) => n !== name) : [...list, name]));
  }, []);

  const inviteLink = "https://scruttin.app/i/you-4K2P";

  const value = useMemo(
    () => ({ trusted, isTrusted, toggleTrust, inviteLink }),
    [trusted, isTrusted, toggleTrust],
  );

  return <PeopleContext.Provider value={value}>{children}</PeopleContext.Provider>;
}

export function useMyPeople() {
  const ctx = useContext(PeopleContext);
  if (!ctx) throw new Error("useMyPeople must be used inside PeopleProvider");
  return ctx;
}
