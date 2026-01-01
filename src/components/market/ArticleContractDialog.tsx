import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { TrendingUp, TrendingDown, User, Calendar, Clock, FileText, ArrowLeftRight, Coins, Send } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ArticleOwner {
  name: string;
  teamName: string;
}

interface Article {
  id: number;
  title: string;
  views30d: number;
  viewsLast7d: number;
  viewsPrev7d: number;
  basePrice: number;
  trend: "up" | "down";
  owner: ArticleOwner | null;
  expiresAt: Date | null;
}

interface ArticleContractDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  article: Article;
}

const CONTRACT_TIERS = [
  { id: "1week", label: "1 Week", multiplier: 1, description: "Short-term contract" },
  { id: "2weeks", label: "2 Weeks", multiplier: 1.8, description: "Standard contract" },
  { id: "1month", label: "1 Month", multiplier: 3.2, description: "Long-term commitment" },
];

const formatViews = (views: number): string => {
  if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
  if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
  return views.toString();
};

const getPercentageChange = (current: number, previous: number): number => {
  return ((current - previous) / previous) * 100;
};

const getDaysUntilExpiry = (expiresAt: Date | null): number | null => {
  if (!expiresAt) return null;
  const diff = expiresAt.getTime() - Date.now();
  return Math.ceil(diff / (24 * 60 * 60 * 1000));
};

const formatDate = (date: Date): string => {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

// Mock owned articles for trade proposal
const mockOwnedArticles = [
  { id: 101, title: "Albert Einstein", basePrice: 850 },
  { id: 102, title: "World War II", basePrice: 1200 },
  { id: 103, title: "Solar System", basePrice: 650 },
];

export const ArticleContractDialog = ({
  open,
  onOpenChange,
  article,
}: ArticleContractDialogProps) => {
  const [showTradePanel, setShowTradePanel] = useState(false);
  const [tradeType, setTradeType] = useState<"article" | "credits">("article");
  const [selectedArticleId, setSelectedArticleId] = useState<number | null>(null);
  const [creditOffer, setCreditOffer] = useState("");
  const [selectedTier, setSelectedTier] = useState("1week");

  const percentChange = getPercentageChange(article.viewsLast7d, article.viewsPrev7d);
  const daysUntilExpiry = getDaysUntilExpiry(article.expiresAt);

  const selectedTierData = CONTRACT_TIERS.find(t => t.id === selectedTier);

  const handleProposeTrade = () => {
    if (tradeType === "article" && !selectedArticleId) {
      toast({
        title: "Select an article",
        description: "Please select an article to offer in trade.",
        variant: "destructive",
      });
      return;
    }
    if (tradeType === "credits" && (!creditOffer || parseInt(creditOffer) <= 0)) {
      toast({
        title: "Enter credit amount",
        description: "Please enter a valid credit amount.",
        variant: "destructive",
      });
      return;
    }

    const offerDetails = tradeType === "article" 
      ? mockOwnedArticles.find(a => a.id === selectedArticleId)?.title
      : `${creditOffer} credits`;

    toast({
      title: "Trade Proposed!",
      description: `Your offer of ${offerDetails} for "${article.title}" (${selectedTierData?.label} contract) has been sent to ${article.owner?.name}.`,
    });
    
    setShowTradePanel(false);
    setSelectedArticleId(null);
    setCreditOffer("");
    setSelectedTier("1week");
    onOpenChange(false);
  };

  const resetTradePanel = () => {
    setShowTradePanel(false);
    setSelectedArticleId(null);
    setCreditOffer("");
    setSelectedTier("1week");
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      if (!isOpen) resetTradePanel();
      onOpenChange(isOpen);
    }}>
      <DialogContent className="sm:max-w-md bg-card border-border max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-serif flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            {showTradePanel ? "Propose Trade" : "Contract Details"}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {showTradePanel 
              ? `Offer a trade for "${article.title}"`
              : "This article is currently under contract"
            }
          </DialogDescription>
        </DialogHeader>

        {!showTradePanel ? (
          <div className="space-y-4 py-2">
            {/* Article Info */}
            <div className="text-center">
              <h3 className="text-lg font-semibold text-foreground">{article.title}</h3>
              <Badge 
                variant="outline" 
                className={`mt-2 ${article.trend === "up" ? "border-primary text-primary" : "border-destructive text-destructive"}`}
              >
                {article.trend === "up" ? (
                  <TrendingUp className="h-3 w-3 mr-1" />
                ) : (
                  <TrendingDown className="h-3 w-3 mr-1" />
                )}
                {percentChange >= 0 ? "+" : ""}{percentChange.toFixed(1)}% this week
              </Badge>
            </div>

            {/* Owner Information */}
            {article.owner && (
              <Card className="bg-muted/50 border-border">
                <CardContent className="p-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-foreground truncate">{article.owner.teamName}</p>
                      <p className="text-sm text-muted-foreground truncate">Owned by {article.owner.name}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Contract Expiration */}
            {article.expiresAt && daysUntilExpiry !== null && (
              <Card className="bg-muted/50 border-border">
                <CardContent className="p-3">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <Calendar className="h-4 w-4 text-muted-foreground shrink-0" />
                      <span className="text-sm text-muted-foreground">Expires</span>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-foreground text-sm">{formatDate(article.expiresAt)}</p>
                      <div className={`flex items-center justify-end gap-1 text-xs ${daysUntilExpiry <= 2 ? "text-destructive" : "text-muted-foreground"}`}>
                        <Clock className="h-3 w-3" />
                        <span>{daysUntilExpiry}d left</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Performance Stats */}
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-2">Last Month Performance</h4>
              <div className="grid grid-cols-3 gap-2">
                <div className="text-center p-2 bg-muted/30 rounded-lg">
                  <p className="text-xs text-muted-foreground">30d</p>
                  <p className="font-semibold text-foreground text-sm">{formatViews(article.views30d)}</p>
                </div>
                <div className="text-center p-2 bg-muted/30 rounded-lg">
                  <p className="text-xs text-muted-foreground">This Wk</p>
                  <p className="font-semibold text-foreground text-sm">{formatViews(article.viewsLast7d)}</p>
                </div>
                <div className="text-center p-2 bg-muted/30 rounded-lg">
                  <p className="text-xs text-muted-foreground">Prev Wk</p>
                  <p className="font-semibold text-foreground text-sm">{formatViews(article.viewsPrev7d)}</p>
                </div>
              </div>
            </div>

            {/* Trade Proposal CTA */}
            <div className="space-y-2 pt-2">
              <Button
                onClick={() => setShowTradePanel(true)}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <ArrowLeftRight className="h-4 w-4 mr-2" />
                Propose a Trade
              </Button>
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="w-full"
              >
                Close
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4 py-2">
            {/* Trade Type Tabs */}
            <Tabs value={tradeType} onValueChange={(v) => setTradeType(v as "article" | "credits")}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="article" className="flex items-center gap-2">
                  <ArrowLeftRight className="h-4 w-4" />
                  <span className="hidden xs:inline">Trade</span> Article
                </TabsTrigger>
                <TabsTrigger value="credits" className="flex items-center gap-2">
                  <Coins className="h-4 w-4" />
                  <span className="hidden xs:inline">Offer</span> Credits
                </TabsTrigger>
              </TabsList>

              <TabsContent value="article" className="space-y-3 mt-4">
                <Label className="text-sm text-muted-foreground">Select an article to offer:</Label>
                <div className="space-y-2 max-h-36 overflow-y-auto">
                  {mockOwnedArticles.map((ownedArticle) => (
                    <Card 
                      key={ownedArticle.id}
                      className={`cursor-pointer transition-all ${
                        selectedArticleId === ownedArticle.id 
                          ? "border-primary bg-primary/10" 
                          : "border-border hover:border-primary/50"
                      }`}
                      onClick={() => setSelectedArticleId(ownedArticle.id)}
                    >
                      <CardContent className="p-3 flex items-center justify-between">
                        <span className="font-medium text-foreground">{ownedArticle.title}</span>
                        <Badge variant="secondary" className="text-xs">
                          {ownedArticle.basePrice} credits
                        </Badge>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                {mockOwnedArticles.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    You don't own any articles to trade.
                  </p>
                )}
              </TabsContent>

              <TabsContent value="credits" className="space-y-3 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="creditOffer" className="text-sm text-muted-foreground">
                    Credit amount to offer:
                  </Label>
                  <div className="relative">
                    <Coins className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="creditOffer"
                      type="number"
                      placeholder="Enter amount"
                      value={creditOffer}
                      onChange={(e) => setCreditOffer(e.target.value)}
                      className="pl-10"
                      min="1"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Suggested: {Math.round(article.basePrice * 0.8)} - {Math.round(article.basePrice * 1.2)} credits
                  </p>
                </div>
              </TabsContent>
            </Tabs>

            {/* Contract Tier Selection */}
            <div className="space-y-3">
              <Label className="text-sm text-muted-foreground">Contract Length:</Label>
              <RadioGroup
                value={selectedTier}
                onValueChange={setSelectedTier}
                className="space-y-2"
              >
                {CONTRACT_TIERS.map((tier) => (
                  <div
                    key={tier.id}
                    className={`flex items-center space-x-3 p-3 rounded-lg border transition-all cursor-pointer ${
                      selectedTier === tier.id
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/50"
                    }`}
                    onClick={() => setSelectedTier(tier.id)}
                  >
                    <RadioGroupItem value={tier.id} id={tier.id} />
                    <div className="flex-1 min-w-0">
                      <Label
                        htmlFor={tier.id}
                        className="font-medium text-foreground cursor-pointer"
                      >
                        {tier.label}
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        {tier.description}
                      </p>
                    </div>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2 pt-2">
              <Button
                onClick={handleProposeTrade}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Send className="h-4 w-4 mr-2" />
                Send Trade Proposal
              </Button>
              <Button
                variant="outline"
                onClick={resetTradePanel}
                className="w-full"
              >
                Back
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};