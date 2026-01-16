import { createContext, useContext, useState, ReactNode } from "react";
import { leagues } from "./LeagueContext";

export interface TradeProposal {
  id: number;
  leagueId: string;
  type: "incoming" | "outgoing";
  status: "pending" | "accepted" | "rejected";
  fromUser: string;
  fromTeam: string;
  toUser: string;
  toTeam: string;
  offeredArticle?: { title: string; basePrice: number };
  offeredCredits?: number;
  requestedArticle: { title: string; basePrice: number };
  contractTier: string;
  createdAt: Date;
}

const mockTradeProposals: TradeProposal[] = [
  {
    id: 1,
    leagueId: "global",
    type: "incoming",
    status: "pending",
    fromUser: "Alex Chen",
    fromTeam: "Wiki Warriors",
    toUser: "You",
    toTeam: "Knowledge Kings",
    offeredArticle: { title: "Albert Einstein", basePrice: 850 },
    requestedArticle: { title: "Python (programming language)", basePrice: 950 },
    contractTier: "2 Weeks",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
  {
    id: 2,
    leagueId: "europe",
    type: "incoming",
    status: "pending",
    fromUser: "Sarah Kim",
    fromTeam: "Data Dynamos",
    toUser: "You",
    toTeam: "Knowledge Kings",
    offeredCredits: 1200,
    requestedArticle: { title: "JavaScript", basePrice: 1100 },
    contractTier: "1 Month",
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
  },
  {
    id: 3,
    leagueId: "global",
    type: "outgoing",
    status: "pending",
    fromUser: "You",
    fromTeam: "Knowledge Kings",
    toUser: "Mike Johnson",
    toTeam: "Article Aces",
    offeredCredits: 800,
    requestedArticle: { title: "React (software)", basePrice: 900 },
    contractTier: "1 Week",
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
  },
  {
    id: 4,
    leagueId: "americas",
    type: "incoming",
    status: "pending",
    fromUser: "Jamie Lee",
    fromTeam: "Page Pioneers",
    toUser: "You",
    toTeam: "Knowledge Kings",
    offeredArticle: { title: "Machine Learning", basePrice: 1050 },
    requestedArticle: { title: "Artificial Intelligence", basePrice: 1200 },
    contractTier: "2 Weeks",
    createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000),
  },
  {
    id: 5,
    leagueId: "asia",
    type: "incoming",
    status: "pending",
    fromUser: "Yuki Tanaka",
    fromTeam: "Tech Titans",
    toUser: "You",
    toTeam: "Knowledge Kings",
    offeredCredits: 950,
    requestedArticle: { title: "Cloud Computing", basePrice: 880 },
    contractTier: "1 Week",
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
  },
];

interface TradeProposalsContextType {
  proposals: TradeProposal[];
  setProposals: React.Dispatch<React.SetStateAction<TradeProposal[]>>;
  getProposalsByLeague: (leagueId: string) => TradeProposal[];
  getPendingCountByLeague: (leagueId: string) => number;
  getTotalPendingCount: () => number;
  getLeaguesWithPending: () => string[];
}

const TradeProposalsContext = createContext<TradeProposalsContextType | undefined>(undefined);

export function TradeProposalsProvider({ children }: { children: ReactNode }) {
  const [proposals, setProposals] = useState<TradeProposal[]>(mockTradeProposals);

  const getProposalsByLeague = (leagueId: string) => {
    return proposals.filter(p => p.leagueId === leagueId);
  };

  const getPendingCountByLeague = (leagueId: string) => {
    return proposals.filter(
      p => p.leagueId === leagueId && p.type === "incoming" && p.status === "pending"
    ).length;
  };

  const getTotalPendingCount = () => {
    return proposals.filter(p => p.type === "incoming" && p.status === "pending").length;
  };

  const getLeaguesWithPending = () => {
    const leagueIds = new Set<string>();
    proposals.forEach(p => {
      if (p.type === "incoming" && p.status === "pending") {
        leagueIds.add(p.leagueId);
      }
    });
    return Array.from(leagueIds);
  };

  return (
    <TradeProposalsContext.Provider
      value={{
        proposals,
        setProposals,
        getProposalsByLeague,
        getPendingCountByLeague,
        getTotalPendingCount,
        getLeaguesWithPending,
      }}
    >
      {children}
    </TradeProposalsContext.Provider>
  );
}

export function useTradeProposals() {
  const context = useContext(TradeProposalsContext);
  if (context === undefined) {
    throw new Error("useTradeProposals must be used within a TradeProposalsProvider");
  }
  return context;
}
