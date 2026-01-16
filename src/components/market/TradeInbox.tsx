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
import { Bell, ArrowLeftRight, Coins, Check, X, Clock, User } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useLeague, leagues } from "@/contexts/LeagueContext";
import { useTradeProposals } from "@/contexts/TradeProposalsContext";

const formatTimeAgo = (date: Date): string => {
  const diff = Date.now() - date.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  if (hours < 1) return "Just now";
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
};

export const TradeInbox = () => {
  const { currentLeague } = useLeague();
  const { proposals, setProposals, getProposalsByLeague, getPendingCountByLeague } = useTradeProposals();
  const [activeTab, setActiveTab] = useState("incoming");

  const leagueProposals = getProposalsByLeague(currentLeague.id);
  const pendingCount = getPendingCountByLeague(currentLeague.id);

  const handleAccept = (proposalId: number) => {
    setProposals(prev => 
      prev.map(p => p.id === proposalId ? { ...p, status: "accepted" as const } : p)
    );
    toast({
      title: "Trade Accepted!",
      description: "The article has been transferred to your inventory.",
    });
  };

  const handleReject = (proposalId: number) => {
    setProposals(prev => 
      prev.map(p => p.id === proposalId ? { ...p, status: "rejected" as const } : p)
    );
    toast({
      title: "Trade Rejected",
      description: "The proposal has been declined.",
    });
  };

  const handleCancel = (proposalId: number) => {
    setProposals(prev => prev.filter(p => p.id !== proposalId));
    toast({
      title: "Proposal Cancelled",
      description: "Your trade proposal has been withdrawn.",
    });
  };

  const incomingProposals = leagueProposals.filter(p => p.type === "incoming");
  const outgoingProposals = leagueProposals.filter(p => p.type === "outgoing");

  const renderProposalCard = (proposal: typeof leagueProposals[0], isIncoming: boolean) => (
    <Card key={proposal.id} className="border-border bg-card">
      <CardContent className="p-4 space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
              <User className="h-4 w-4 text-primary" />
            </div>
            <div className="min-w-0">
              <p className="font-medium text-foreground text-sm truncate">
                {isIncoming ? proposal.fromUser : proposal.toUser}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {isIncoming ? proposal.fromTeam : proposal.toTeam}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {proposal.status === "pending" ? (
              <Badge variant="secondary" className="text-xs">
                <Clock className="h-3 w-3 mr-1" />
                Pending
              </Badge>
            ) : proposal.status === "accepted" ? (
              <Badge className="bg-primary/20 text-primary border-primary/30 text-xs">
                <Check className="h-3 w-3 mr-1" />
                Accepted
              </Badge>
            ) : (
              <Badge variant="destructive" className="text-xs">
                <X className="h-3 w-3 mr-1" />
                Rejected
              </Badge>
            )}
          </div>
        </div>

        {/* Trade Details */}
        <div className="bg-muted/50 rounded-lg p-3 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              {isIncoming ? "They offer" : "You offer"}:
            </span>
            <span className="font-medium text-foreground flex items-center gap-1">
              {proposal.offeredArticle ? (
                <>
                  <ArrowLeftRight className="h-3 w-3" />
                  {proposal.offeredArticle.title}
                </>
              ) : (
                <>
                  <Coins className="h-3 w-3" />
                  {proposal.offeredCredits} credits
                </>
              )}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              {isIncoming ? "For your" : "For their"}:
            </span>
            <span className="font-medium text-foreground">
              {proposal.requestedArticle.title}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Contract:</span>
            <Badge variant="outline" className="text-xs">
              {proposal.contractTier}
            </Badge>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            {formatTimeAgo(proposal.createdAt)}
          </span>
          
          {proposal.status === "pending" && (
            <div className="flex gap-2">
              {isIncoming ? (
                <>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleReject(proposal.id)}
                    className="h-8"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleAccept(proposal.id)}
                    className="h-8 bg-primary text-primary-foreground"
                  >
                    <Check className="h-4 w-4 mr-1" />
                    Accept
                  </Button>
                </>
              ) : (
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleCancel(proposal.id)}
                  className="h-8"
                >
                  Cancel
                </Button>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  const currentLeagueInfo = leagues.find(l => l.id === currentLeague.id);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {pendingCount > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-destructive text-destructive-foreground text-xs flex items-center justify-center">
              {pendingCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md bg-background border-border">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ArrowLeftRight className="h-5 w-5 text-primary" />
            Trade Proposals
            <Badge variant="outline" className="ml-2">
              {currentLeagueInfo?.icon} {currentLeague.name}
            </Badge>
          </SheetTitle>
          <SheetDescription>
            Manage trade requests for {currentLeague.name}
          </SheetDescription>
        </SheetHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="incoming" className="relative">
              Incoming
              {pendingCount > 0 && (
                <Badge className="ml-2 h-5 w-5 p-0 flex items-center justify-center bg-destructive text-destructive-foreground text-xs">
                  {pendingCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="outgoing">Outgoing</TabsTrigger>
          </TabsList>

          <TabsContent value="incoming" className="mt-4 space-y-3 max-h-[calc(100vh-250px)] overflow-y-auto">
            {incomingProposals.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Bell className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No incoming trade proposals in {currentLeague.name}</p>
              </div>
            ) : (
              incomingProposals.map(p => renderProposalCard(p, true))
            )}
          </TabsContent>

          <TabsContent value="outgoing" className="mt-4 space-y-3 max-h-[calc(100vh-250px)] overflow-y-auto">
            {outgoingProposals.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <ArrowLeftRight className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No outgoing trade proposals in {currentLeague.name}</p>
              </div>
            ) : (
              outgoingProposals.map(p => renderProposalCard(p, false))
            )}
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
};
