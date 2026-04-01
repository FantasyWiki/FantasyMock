import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Bell,
  ArrowLeftRight,
  Coins,
  Check,
  X,
  Clock,
  User,
  AlertTriangle,
  Trophy,
  FileText,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useLeague, leagues } from "@/contexts/LeagueContext";
import { useNotifications, Notification } from "@/contexts/NotificationsContext";

const formatTimeAgo = (date: Date): string => {
  const diff = Date.now() - date.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  if (hours < 1) return "Just now";
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
};

const getNotificationIcon = (type: Notification["type"]) => {
  switch (type) {
    case "trade":
      return <ArrowLeftRight className="h-4 w-4 text-primary" />;
    case "contract_expiring":
      return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
    case "contract_expired":
      return <Clock className="h-4 w-4 text-destructive" />;
    case "league_starting":
      return <Trophy className="h-4 w-4 text-primary" />;
    case "league_ending":
      return <Trophy className="h-4 w-4 text-yellow-500" />;
    case "trade_accepted":
      return <CheckCircle className="h-4 w-4 text-primary" />;
    case "trade_rejected":
      return <XCircle className="h-4 w-4 text-destructive" />;
    default:
      return <Bell className="h-4 w-4 text-muted-foreground" />;
  }
};

const getCategoryForType = (type: Notification["type"]): string => {
  if (type === "trade" || type === "trade_accepted" || type === "trade_rejected") return "trades";
  if (type === "contract_expiring" || type === "contract_expired") return "contracts";
  if (type === "league_starting" || type === "league_ending") return "leagues";
  return "all";
};

export const NotificationInbox = () => {
  const { currentLeague } = useLeague();
  const {
    getByLeague,
    getUnreadCountByLeague,
    markAsRead,
    markAllAsRead,
    dismissNotification,
    handleTradeAccept,
    handleTradeReject,
    handleTradeCancel,
  } = useNotifications();
  const [activeTab, setActiveTab] = useState("all");

  const leagueNotifications = getByLeague(currentLeague.id);
  const unreadCount = getUnreadCountByLeague(currentLeague.id);

  const filteredNotifications =
    activeTab === "all"
      ? leagueNotifications
      : leagueNotifications.filter(n => getCategoryForType(n.type) === activeTab);

  const sortedNotifications = [...filteredNotifications].sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
  );

  const tradeCount = leagueNotifications.filter(n => getCategoryForType(n.type) === "trades" && !n.read).length;
  const contractCount = leagueNotifications.filter(n => getCategoryForType(n.type) === "contracts" && !n.read).length;
  const leagueCount = leagueNotifications.filter(n => getCategoryForType(n.type) === "leagues" && !n.read).length;

  const onAcceptTrade = (id: number) => {
    handleTradeAccept(id);
    toast({ title: "Trade Accepted!", description: "The article has been transferred to your inventory." });
  };

  const onRejectTrade = (id: number) => {
    handleTradeReject(id);
    toast({ title: "Trade Rejected", description: "The proposal has been declined." });
  };

  const onCancelTrade = (id: number) => {
    handleTradeCancel(id);
    toast({ title: "Proposal Cancelled", description: "Your trade proposal has been withdrawn." });
  };

  const renderTradeCard = (notification: Notification) => {
    const trade = notification.tradeData!;
    const isIncoming = trade.direction === "incoming";

    return (
      <div className="bg-muted/50 rounded-lg p-3 space-y-2 mt-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            {isIncoming ? "They offer" : "You offer"}:
          </span>
          <span className="font-medium text-foreground flex items-center gap-1">
            {trade.offeredArticle ? (
              <>
                <ArrowLeftRight className="h-3 w-3" />
                {trade.offeredArticle.title}
              </>
            ) : (
              <>
                <Coins className="h-3 w-3" />
                {trade.offeredCredits} credits
              </>
            )}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            {isIncoming ? "For your" : "For their"}:
          </span>
          <span className="font-medium text-foreground">
            {trade.requestedArticle.title}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Contract:</span>
          <Badge variant="outline" className="text-xs">
            {trade.contractTier}
          </Badge>
        </div>
        {trade.status === "pending" && (
          <div className="flex justify-end gap-2 pt-1">
            {isIncoming ? (
              <>
                <Button size="sm" variant="outline" onClick={() => onRejectTrade(notification.id)} className="h-7">
                  <X className="h-3 w-3" />
                </Button>
                <Button size="sm" onClick={() => onAcceptTrade(notification.id)} className="h-7 bg-primary text-primary-foreground">
                  <Check className="h-3 w-3 mr-1" />
                  Accept
                </Button>
              </>
            ) : (
              <Button size="sm" variant="destructive" onClick={() => onCancelTrade(notification.id)} className="h-7">
                Cancel
              </Button>
            )}
          </div>
        )}
      </div>
    );
  };

  const renderNotificationCard = (notification: Notification) => (
    <Card
      key={notification.id}
      className={`border-border bg-card transition-colors ${!notification.read ? "border-l-2 border-l-primary" : ""}`}
      onClick={() => !notification.read && markAsRead(notification.id)}
    >
      <CardContent className="p-4 space-y-1">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-start gap-3 min-w-0">
            <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center shrink-0 mt-0.5">
              {getNotificationIcon(notification.type)}
            </div>
            <div className="min-w-0 flex-1">
              <p className={`text-sm ${!notification.read ? "font-semibold" : "font-medium"} text-foreground`}>
                {notification.title}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {notification.description}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <span className="text-xs text-muted-foreground whitespace-nowrap">
              {formatTimeAgo(notification.createdAt)}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={(e) => {
                e.stopPropagation();
                dismissNotification(notification.id);
              }}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        </div>

        {/* Trade-specific details */}
        {notification.type === "trade" && notification.tradeData && renderTradeCard(notification)}

        {/* Contract expiring details */}
        {notification.type === "contract_expiring" && notification.contractData && (
          <div className="flex items-center gap-2 mt-2 p-2 bg-yellow-500/10 rounded text-xs text-yellow-600 dark:text-yellow-400">
            <AlertTriangle className="h-3 w-3 shrink-0" />
            Expires {new Date(notification.contractData.expiresAt).toLocaleDateString()}
          </div>
        )}

        {/* League date details */}
        {(notification.type === "league_starting" || notification.type === "league_ending") && notification.leagueData && (
          <div className="flex items-center gap-2 mt-2 p-2 bg-primary/10 rounded text-xs text-primary">
            <Trophy className="h-3 w-3 shrink-0" />
            {notification.type === "league_starting" ? "Starts" : "Ends"}{" "}
            {new Date(notification.leagueData.date).toLocaleDateString()}
          </div>
        )}
      </CardContent>
    </Card>
  );

  const currentLeagueInfo = leagues.find(l => l.id === currentLeague.id);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-destructive text-destructive-foreground text-xs flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md bg-background border-border">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            Notifications
            <Badge variant="outline" className="ml-2">
              {currentLeagueInfo?.icon} {currentLeague.name}
            </Badge>
          </SheetTitle>
          <SheetDescription className="flex items-center justify-between">
            <span>{currentLeague.name} notifications</span>
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                className="text-xs h-7"
                onClick={() => markAllAsRead(currentLeague.id)}
              >
                Mark all as read
              </Button>
            )}
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-3 max-h-[calc(100vh-220px)] overflow-y-auto">
          {sortedNotifications.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Bell className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No notifications</p>
            </div>
          ) : (
            sortedNotifications.map(n => renderNotificationCard(n))
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
