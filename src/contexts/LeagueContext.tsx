import { createContext, useContext, useState, ReactNode } from "react";

export interface League {
  id: string;
  name: string;
  icon: string;
}

export const leagues: League[] = [
  { id: "global", name: "Global League", icon: "🌍" },
  { id: "europe", name: "European League", icon: "🇪🇺" },
  { id: "americas", name: "Americas League", icon: "🌎" },
  { id: "asia", name: "Asia-Pacific League", icon: "🌏" },
  { id: "premier", name: "Premier League", icon: "⭐" },
  { id: "champions", name: "Champions League", icon: "🏆" },
];

interface LeagueContextType {
  currentLeague: League;
  setCurrentLeague: (league: League) => void;
}

const LeagueContext = createContext<LeagueContextType | undefined>(undefined);

export function LeagueProvider({ children }: { children: ReactNode }) {
  const [currentLeague, setCurrentLeague] = useState<League>(leagues[0]);

  return (
    <LeagueContext.Provider value={{ currentLeague, setCurrentLeague }}>
      {children}
    </LeagueContext.Provider>
  );
}

export function useLeague() {
  const context = useContext(LeagueContext);
  if (context === undefined) {
    throw new Error("useLeague must be used within a LeagueProvider");
  }
  return context;
}
