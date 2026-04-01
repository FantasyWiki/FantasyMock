import { createContext, useContext, useState, ReactNode } from "react";

export type NotificationType = "trade" | "contract_expiring" | "league_starting" | "league_ending" | "contract_expired" | "trade_accepted" | "trade_rejected";

export interface Notification {
  id: number;
  leagueId: string;
  type: NotificationType;
  read: boolean;
  createdAt: Date;
  title: string;
  description: string;
  // Trade-specific fields
  tradeData?: {
    direction: "incoming" | "outgoing";
    status: "pending" | "accepted" | "rejected";
    fromUser: string;
    fromTeam: string;
    toUser: string;
    toTeam: string;
    offeredArticle?: { title: string; basePrice: number };
    offeredCredits?: number;
    requestedArticle: { title: string; basePrice: number };
    contractTier: string;
  };
  // Contract-specific
  contractData?: {
    articleTitle: string;
    expiresAt: Date;
  };
  // League-specific
  leagueData?: {
    leagueName: string;
    date: Date;
  };
}

const mockNotifications: Notification[] = [
  // Trade notifications
  {
    id: 1,
    leagueId: "global",
    type: "trade",
    read: false,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    title: "Trade Proposal from Alex Chen",
    description: "Wiki Warriors wants to trade Albert Einstein for Python (programming language)",
    tradeData: {
      direction: "incoming",
      status: "pending",
      fromUser: "Alex Chen",
      fromTeam: "Wiki Warriors",
      toUser: "You",
      toTeam: "Knowledge Kings",
      offeredArticle: { title: "Albert Einstein", basePrice: 850 },
      requestedArticle: { title: "Python (programming language)", basePrice: 950 },
      contractTier: "2 Weeks",
    },
  },
  {
    id: 2,
    leagueId: "europe",
    type: "trade",
    read: false,
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
    title: "Credit Offer from Sarah Kim",
    description: "Data Dynamos offers 1,200 credits for JavaScript",
    tradeData: {
      direction: "incoming",
      status: "pending",
      fromUser: "Sarah Kim",
      fromTeam: "Data Dynamos",
      toUser: "You",
      toTeam: "Knowledge Kings",
      offeredCredits: 1200,
      requestedArticle: { title: "JavaScript", basePrice: 1100 },
      contractTier: "1 Month",
    },
  },
  {
    id: 3,
    leagueId: "global",
    type: "trade",
    read: false,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    title: "Your Trade Proposal",
    description: "You offered 800 credits to Article Aces for React (software)",
    tradeData: {
      direction: "outgoing",
      status: "pending",
      fromUser: "You",
      fromTeam: "Knowledge Kings",
      toUser: "Mike Johnson",
      toTeam: "Article Aces",
      offeredCredits: 800,
      requestedArticle: { title: "React (software)", basePrice: 900 },
      contractTier: "1 Week",
    },
  },
  // Contract expiring notifications
  {
    id: 4,
    leagueId: "global",
    type: "contract_expiring",
    read: false,
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
    title: "Contract Expiring Soon",
    description: "Your contract for \"Machine Learning\" expires in 2 days",
    contractData: {
      articleTitle: "Machine Learning",
      expiresAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    },
  },
  {
    id: 5,
    leagueId: "europe",
    type: "contract_expiring",
    read: false,
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
    title: "Contract Expiring Soon",
    description: "Your contract for \"Tour de France\" expires tomorrow",
    contractData: {
      articleTitle: "Tour de France",
      expiresAt: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    },
  },
  // Contract expired
  {
    id: 6,
    leagueId: "asia",
    type: "contract_expired",
    read: true,
    createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000),
    title: "Contract Expired",
    description: "Your contract for \"Tokyo Tower\" has expired. The article is now a free agent.",
    contractData: {
      articleTitle: "Tokyo Tower",
      expiresAt: new Date(Date.now() - 48 * 60 * 60 * 1000),
    },
  },
  // League starting
  {
    id: 7,
    leagueId: "global",
    type: "league_starting",
    read: false,
    createdAt: new Date(Date.now() - 30 * 60 * 1000),
    title: "League Starting Soon",
    description: "The Global Knowledge Cup starts in 3 days. Make sure your team is ready!",
    leagueData: {
      leagueName: "Global Knowledge Cup",
      date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    },
  },
  // League ending
  {
    id: 8,
    leagueId: "europe",
    type: "league_ending",
    read: false,
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
    title: "League Ending Soon",
    description: "The European Wiki League ends in 5 days. Final push for the leaderboard!",
    leagueData: {
      leagueName: "European Wiki League",
      date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    },
  },
  // Trade accepted
  {
    id: 9,
    leagueId: "global",
    type: "trade_accepted",
    read: true,
    createdAt: new Date(Date.now() - 72 * 60 * 60 * 1000),
    title: "Trade Accepted!",
    description: "Your trade for \"Quantum Computing\" has been accepted by Tech Titans.",
  },
  // Trade rejected
  {
    id: 10,
    leagueId: "asia",
    type: "trade_rejected",
    read: true,
    createdAt: new Date(Date.now() - 96 * 60 * 60 * 1000),
    title: "Trade Rejected",
    description: "Your offer for \"Mount Fuji\" was declined by Rising Sun FC.",
  },
];

interface NotificationsContextType {
  notifications: Notification[];
  setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
  getByLeague: (leagueId: string) => Notification[];
  getUnreadCountByLeague: (leagueId: string) => number;
  getTotalUnreadCount: () => number;
  getLeaguesWithUnread: () => string[];
  markAsRead: (id: number) => void;
  markAllAsRead: (leagueId?: string) => void;
  dismissNotification: (id: number) => void;
  // Keep trade-specific helpers for backward compat
  handleTradeAccept: (id: number) => void;
  handleTradeReject: (id: number) => void;
  handleTradeCancel: (id: number) => void;
}

const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined);

export function NotificationsProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  const getByLeague = (leagueId: string) =>
    notifications.filter(n => n.leagueId === leagueId);

  const getUnreadCountByLeague = (leagueId: string) =>
    notifications.filter(n => n.leagueId === leagueId && !n.read).length;

  const getTotalUnreadCount = () =>
    notifications.filter(n => !n.read).length;

  const getLeaguesWithUnread = () => {
    const ids = new Set<string>();
    notifications.forEach(n => { if (!n.read) ids.add(n.leagueId); });
    return Array.from(ids);
  };

  const markAsRead = (id: number) =>
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));

  const markAllAsRead = (leagueId?: string) =>
    setNotifications(prev =>
      prev.map(n => (leagueId && n.leagueId !== leagueId) ? n : { ...n, read: true })
    );

  const dismissNotification = (id: number) =>
    setNotifications(prev => prev.filter(n => n.id !== id));

  const handleTradeAccept = (id: number) =>
    setNotifications(prev =>
      prev.map(n =>
        n.id === id && n.tradeData
          ? { ...n, read: true, tradeData: { ...n.tradeData, status: "accepted" as const } }
          : n
      )
    );

  const handleTradeReject = (id: number) =>
    setNotifications(prev =>
      prev.map(n =>
        n.id === id && n.tradeData
          ? { ...n, read: true, tradeData: { ...n.tradeData, status: "rejected" as const } }
          : n
      )
    );

  const handleTradeCancel = (id: number) =>
    setNotifications(prev => prev.filter(n => n.id !== id));

  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        setNotifications,
        getByLeague,
        getUnreadCountByLeague,
        getTotalUnreadCount,
        getLeaguesWithUnread,
        markAsRead,
        markAllAsRead,
        dismissNotification,
        handleTradeAccept,
        handleTradeReject,
        handleTradeCancel,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationsContext);
  if (context === undefined) {
    throw new Error("useNotifications must be used within a NotificationsProvider");
  }
  return context;
}
