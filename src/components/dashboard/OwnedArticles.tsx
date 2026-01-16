import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { FileText, TrendingUp, TrendingDown, Clock, RotateCcw, AlertTriangle, ArrowRightLeft, Coins, Calendar, Plus, CheckCircle, XCircle } from "lucide-react";
import { useLeague } from "@/contexts/LeagueContext";
import { useTradeProposals } from "@/contexts/TradeProposalsContext";

interface OwnedArticlesProps {
  onBuyArticles?: () => void;
}

interface OwnedArticle {
  id: string;
  name: string;
  purchasePrice: number;
  currentPrice: number;
  yesterdayPoints: number;
  change: number;
  expiresIn: number;
  tier: string;
  contractEnd: string;
  contractLength: string;
  leagueId: string;
}

// Mock data with leagueId and trade-linked articles
const allOwnedArticles: OwnedArticle[] = [
  {
    id: "btc-1",
    name: "Bitcoin",
    purchasePrice: 150,
    currentPrice: 165,
    yesterdayPoints: 45,
    change: 12.5,
    expiresIn: 2,
    tier: "MEDIUM",
    contractEnd: "2024-01-15",
    contractLength: "2 Weeks",
    leagueId: "premier",
  },
  {
    id: "eth-1",
    name: "Ethereum",
    purchasePrice: 120,
    currentPrice: 115,
    yesterdayPoints: 38,
    change: -4.2,
    expiresIn: 5,
    tier: "MEDIUM",
    contractEnd: "2024-01-20",
    contractLength: "2 Weeks",
    leagueId: "premier",
  },
  {
    id: "ai-1",
    name: "Artificial Intelligence",
    purchasePrice: 200,
    currentPrice: 220,
    yesterdayPoints: 42,
    change: 10.0,
    expiresIn: 1,
    tier: "LONG",
    contractEnd: "2024-01-12",
    contractLength: "1 Month",
    leagueId: "premier",
  },
  {
    id: "ml-1",
    name: "Machine Learning",
    purchasePrice: 80,
    currentPrice: 85,
    yesterdayPoints: 35,
    change: 6.3,
    expiresIn: 7,
    tier: "SHORT",
    contractEnd: "2024-01-22",
    contractLength: "1 Week",
    leagueId: "champions",
  },
  {
    id: "cloud-1",
    name: "Cloud Computing",
    purchasePrice: 100,
    currentPrice: 98,
    yesterdayPoints: 28,
    change: -2.0,
    expiresIn: 1,
    tier: "MEDIUM",
    contractEnd: "2024-01-12",
    contractLength: "2 Weeks",
    leagueId: "champions",
  },
  {
    id: "blockchain-1",
    name: "Blockchain",
    purchasePrice: 90,
    currentPrice: 105,
    yesterdayPoints: 32,
    change: 16.7,
    expiresIn: 6,
    tier: "MEDIUM",
    contractEnd: "2024-01-21",
    contractLength: "2 Weeks",
    leagueId: "europa",
  },
];

const getTierBadge = (tier: string) => {
  switch (tier) {
    case "SHORT":
      return <Badge variant="outline" className="text-xs border-orange-500 text-orange-600 dark:text-orange-400">Short</Badge>;
    case "MEDIUM":
      return <Badge variant="outline" className="text-xs border-primary text-primary">Medium</Badge>;
    case "LONG":
      return <Badge variant="outline" className="text-xs border-[hsl(var(--wiki-gold))] text-[hsl(var(--wiki-gold))]">Long</Badge>;
    default:
      return <Badge variant="outline" className="text-xs">Unknown</Badge>;
  }
};

export const OwnedArticles = ({ onBuyArticles }: OwnedArticlesProps) => {
  const { currentLeague } = useLeague();
  const { proposals } = useTradeProposals();
  const [selectedArticle, setSelectedArticle] = useState<OwnedArticle | null>(null);

  // Get trade proposals for the current league that involve our articles (incoming pending)
  const leagueProposals = proposals.filter(p => 
    p.leagueId === currentLeague.id && p.status === "pending" && p.type === "incoming"
  );

  // Get article names that have pending trade proposals (requested from us)
  const articlesWithTrades = new Set(
    leagueProposals.map(p => p.requestedArticle.title.toLowerCase())
  );

  // Filter articles for this league that are either expiring soon (<=3 days) or have trade proposals
  const leagueArticles = allOwnedArticles.filter(a => a.leagueId === currentLeague.id);
  const urgentArticles = leagueArticles.filter(article => 
    article.expiresIn <= 3 || articlesWithTrades.has(article.name.toLowerCase())
  );

  // Find linked trade proposal for an article
  const getLinkedProposal = (articleName: string) => {
    return leagueProposals.find(p => 
      p.requestedArticle.title.toLowerCase() === articleName.toLowerCase()
    );
  };

  const linkedProposal = selectedArticle ? getLinkedProposal(selectedArticle.name) : null;

  const valueChange = selectedArticle ? selectedArticle.currentPrice - selectedArticle.purchasePrice : 0;
  const valueChangePercent = selectedArticle ? ((valueChange / selectedArticle.purchasePrice) * 100).toFixed(1) : "0";
  const isPositive = valueChange >= 0;

  return (
    <>
      <Card className="bg-card border-border">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <AlertTriangle className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl">Attention Needed</CardTitle>
              <p className="text-sm text-muted-foreground">
                {urgentArticles.length} contract{urgentArticles.length !== 1 ? 's' : ''} requiring action
              </p>
            </div>
          </div>
          {onBuyArticles && (
            <Button
              onClick={onBuyArticles}
              variant="outline"
              size="sm"
              className="gap-2 border-primary text-primary hover:bg-primary/10"
            >
              <Plus className="h-4 w-4" />
              Buy More
            </Button>
          )}
        </CardHeader>
        <CardContent>
          {urgentArticles.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <FileText className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No contracts need attention right now</p>
            </div>
          ) : (
            <div className="space-y-2">
              {urgentArticles.map((article) => {
                const hasTradeProposal = getLinkedProposal(article.name);
                return (
                  <div
                    key={article.id}
                    onClick={() => setSelectedArticle(article)}
                    className="flex items-center justify-between p-3 rounded-lg border border-border bg-card hover:bg-muted/50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-foreground">{article.name}</span>
                          {getTierBadge(article.tier)}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          {article.expiresIn <= 3 && (
                            <Badge variant="destructive" className="text-xs gap-1">
                              <Clock className="h-3 w-3" />
                              {article.expiresIn}d left
                            </Badge>
                          )}
                          {hasTradeProposal && (
                            <Badge variant="secondary" className="text-xs gap-1 bg-primary/10 text-primary">
                              <ArrowRightLeft className="h-3 w-3" />
                              Trade Offer
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-semibold text-foreground">{article.yesterdayPoints} pts</span>
                      <div className={`flex items-center justify-end gap-1 text-sm ${article.change >= 0 ? 'text-primary' : 'text-destructive'}`}>
                        {article.change >= 0 ? (
                          <TrendingUp className="h-3 w-3" />
                        ) : (
                          <TrendingDown className="h-3 w-3" />
                        )}
                        <span>{article.change >= 0 ? '+' : ''}{article.change}%</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Article Detail Dialog */}
      <Dialog open={!!selectedArticle} onOpenChange={(open) => !open && setSelectedArticle(null)}>
        <DialogContent className="max-w-md mx-4 max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl flex items-center gap-2">
              {selectedArticle?.name}
              {selectedArticle && getTierBadge(selectedArticle.tier)}
            </DialogTitle>
          </DialogHeader>

          {selectedArticle && (
            <div className="space-y-4">
              {/* Points & Status */}
              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div>
                  <p className="text-sm text-muted-foreground">Yesterday's Points</p>
                  <p className="text-3xl font-bold text-primary">{selectedArticle.yesterdayPoints}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Current Value</p>
                  <p className="text-lg font-medium">{selectedArticle.currentPrice} credits</p>
                </div>
              </div>

              <Separator />

              {/* Contract Details */}
              <div className="space-y-3">
                <h4 className="font-semibold flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  Contract Details
                </h4>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="p-3 bg-card rounded-lg border">
                    <p className="text-muted-foreground mb-1">Contract Length</p>
                    <p className="font-medium">{selectedArticle.contractLength}</p>
                  </div>
                  <div className="p-3 bg-card rounded-lg border">
                    <p className="text-muted-foreground mb-1 flex items-center gap-1">
                      <Calendar className="h-3 w-3" /> Expires
                    </p>
                    <p className={`font-medium ${selectedArticle.expiresIn <= 3 ? 'text-destructive' : ''}`}>
                      {selectedArticle.expiresIn} days
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Value Tracking */}
              <div className="space-y-3">
                <h4 className="font-semibold flex items-center gap-2">
                  <Coins className="h-4 w-4 text-muted-foreground" />
                  Value Tracking
                </h4>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="p-3 bg-card rounded-lg border">
                    <p className="text-muted-foreground mb-1">Purchase Price</p>
                    <p className="font-medium">{selectedArticle.purchasePrice} credits</p>
                  </div>
                  <div className="p-3 bg-card rounded-lg border">
                    <p className="text-muted-foreground mb-1">Current Value</p>
                    <p className="font-medium">{selectedArticle.currentPrice} credits</p>
                  </div>
                </div>

                <div className={`flex items-center justify-center gap-2 p-3 rounded-lg ${isPositive ? 'bg-primary/10 text-primary' : 'bg-destructive/10 text-destructive'}`}>
                  {isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                  <span className="font-medium">
                    {isPositive ? "+" : ""}{valueChange} credits ({isPositive ? "+" : ""}{valueChangePercent}%)
                  </span>
                </div>
              </div>

              {/* Linked Trade Proposal */}
              {linkedProposal && (
                <>
                  <Separator />
                  <div className="space-y-3">
                    <h4 className="font-semibold flex items-center gap-2">
                      <ArrowRightLeft className="h-4 w-4 text-muted-foreground" />
                      Pending Trade Proposal
                    </h4>
                    
                    <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm text-muted-foreground">From</span>
                        <span className="font-medium">{linkedProposal.fromUser}</span>
                      </div>
                      
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">They offer:</p>
                        <div className="flex flex-wrap gap-1">
                          {linkedProposal.offeredArticle && (
                            <Badge variant="outline" className="text-xs">
                              {linkedProposal.offeredArticle.title}
                            </Badge>
                          )}
                          {linkedProposal.offeredCredits && (
                            <Badge variant="outline" className="text-xs">
                              {linkedProposal.offeredCredits} credits
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-2 mt-4">
                        <Button size="sm" className="flex-1 gap-1">
                          <CheckCircle className="h-3 w-3" />
                          Accept
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1 gap-1">
                          <XCircle className="h-3 w-3" />
                          Decline
                        </Button>
                      </div>
                    </div>
                  </div>
                </>
              )}

              <Separator />

              {/* Actions */}
              <div className="flex flex-col gap-2">
                {selectedArticle.expiresIn <= 3 && (
                  <Button variant="default" className="w-full gap-2">
                    <RotateCcw className="h-4 w-4" />
                    Renew Contract
                  </Button>
                )}
                <Button onClick={() => setSelectedArticle(null)} variant="ghost" className="w-full">
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
