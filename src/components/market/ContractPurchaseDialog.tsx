import { useState, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Clock, AlertCircle, CheckCircle } from "lucide-react";
import { toast } from "sonner";

interface Article {
  id: number;
  title: string;
  views30d: number;
  viewsLast7d: number;
  viewsPrev7d: number;
  basePrice: number;
  trend: "up" | "down";
}

interface ContractPurchaseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  article: Article;
  userBalance: number;
  onPurchaseComplete: () => void;
}

type ContractTier = "SHORT" | "MEDIUM" | "LONG" | "SEASON";

const tierDetails: Record<ContractTier, { label: string; days: number; multiplier: number; renewalCost: number }> = {
  SHORT: { label: "Short", days: 3, multiplier: 0.6, renewalCost: 5 },
  MEDIUM: { label: "Medium", days: 7, multiplier: 1.0, renewalCost: 10 },
  LONG: { label: "Long", days: 14, multiplier: 1.7, renewalCost: 15 },
  SEASON: { label: "Season", days: 90, multiplier: 4.5, renewalCost: 0 },
};

const calculateTrendMultiplier = (viewsLast7d: number, viewsPrev7d: number): number => {
  const ratio = viewsLast7d / viewsPrev7d;
  if (ratio > 1.2) return 1.15;
  if (ratio < 0.8) return 0.85;
  return 1.0;
};

const calculateRarityMultiplier = (views30d: number): number => {
  if (views30d < 1000) return 0.7;
  return 1.0;
};

const formatViews = (views: number): string => {
  if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
  if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
  return views.toString();
};

const getPercentageChange = (current: number, previous: number): number => {
  return ((current - previous) / previous) * 100;
};

export const ContractPurchaseDialog = ({
  open,
  onOpenChange,
  article,
  userBalance,
  onPurchaseComplete,
}: ContractPurchaseDialogProps) => {
  const [selectedTier, setSelectedTier] = useState<ContractTier>("MEDIUM");
  const [isPurchasing, setIsPurchasing] = useState(false);

  const trendMultiplier = useMemo(
    () => calculateTrendMultiplier(article.viewsLast7d, article.viewsPrev7d),
    [article.viewsLast7d, article.viewsPrev7d]
  );

  const rarityMultiplier = useMemo(
    () => calculateRarityMultiplier(article.views30d),
    [article.views30d]
  );

  const baseAdjustedPrice = useMemo(
    () => Math.round(article.basePrice * trendMultiplier * rarityMultiplier),
    [article.basePrice, trendMultiplier, rarityMultiplier]
  );

  const finalPrice = useMemo(
    () => Math.round(baseAdjustedPrice * tierDetails[selectedTier].multiplier),
    [baseAdjustedPrice, selectedTier]
  );

  const canAfford = userBalance >= finalPrice;
  const percentChange = getPercentageChange(article.viewsLast7d, article.viewsPrev7d);

  const handlePurchase = async () => {
    if (!canAfford) {
      toast.error("Insufficient credits", {
        description: `You need ${finalPrice - userBalance} more credits to purchase this contract.`,
      });
      return;
    }

    setIsPurchasing(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    toast.success("Contract signed!", {
      description: `You've acquired ${article.title} for ${finalPrice} Cr (${tierDetails[selectedTier].days} days)`,
    });
    
    setIsPurchasing(false);
    onPurchaseComplete();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif">Sign Contract</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Purchase a contract for "{article.title}"
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Article Info */}
          <Card className="bg-muted/50 border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-lg text-foreground">{article.title}</h3>
                  <p className="text-sm text-muted-foreground">30-day views: {formatViews(article.views30d)}</p>
                </div>
                <div className="text-right">
                  <div className={`flex items-center gap-1 ${article.trend === "up" ? "text-primary" : "text-destructive"}`}>
                    {article.trend === "up" ? (
                      <TrendingUp className="h-5 w-5" />
                    ) : (
                      <TrendingDown className="h-5 w-5" />
                    )}
                    <span className="font-medium">
                      {percentChange >= 0 ? "+" : ""}{percentChange.toFixed(1)}%
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">Last 7 days vs previous</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Last Month Progress */}
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-3">Last Month Performance</h4>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-3 bg-muted/30 rounded-lg">
                <p className="text-xs text-muted-foreground">Views (30d)</p>
                <p className="font-semibold text-foreground">{formatViews(article.views30d)}</p>
              </div>
              <div className="text-center p-3 bg-muted/30 rounded-lg">
                <p className="text-xs text-muted-foreground">This Week</p>
                <p className="font-semibold text-foreground">{formatViews(article.viewsLast7d)}</p>
              </div>
              <div className="text-center p-3 bg-muted/30 rounded-lg">
                <p className="text-xs text-muted-foreground">Prev Week</p>
                <p className="font-semibold text-foreground">{formatViews(article.viewsPrev7d)}</p>
              </div>
            </div>
          </div>

          {/* Contract Tier Selection */}
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-3">Contract Duration</h4>
            <RadioGroup
              value={selectedTier}
              onValueChange={(value) => setSelectedTier(value as ContractTier)}
              className="grid grid-cols-2 gap-3"
            >
              {(Object.keys(tierDetails) as ContractTier[]).map((tier) => {
                const detail = tierDetails[tier];
                const tierPrice = Math.round(baseAdjustedPrice * detail.multiplier);
                const isSelected = selectedTier === tier;

                return (
                  <div key={tier}>
                    <RadioGroupItem value={tier} id={tier} className="peer sr-only" />
                    <Label
                      htmlFor={tier}
                      className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        isSelected
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50 bg-background"
                      }`}
                    >
                      <span className="font-semibold text-foreground">{detail.label}</span>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                        <Clock className="h-3 w-3" />
                        <span>{detail.days} days</span>
                      </div>
                      <span className="font-bold text-lg text-primary mt-2">{tierPrice} Cr</span>
                      {tier === "MEDIUM" && (
                        <Badge className="mt-2 text-xs bg-primary/20 text-primary hover:bg-primary/20">
                          Default
                        </Badge>
                      )}
                    </Label>
                  </div>
                );
              })}
            </RadioGroup>
          </div>

          {/* Price Summary */}
          <Card className={`border-2 ${canAfford ? "border-primary/50 bg-primary/5" : "border-destructive/50 bg-destructive/5"}`}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Price</p>
                  <p className="text-2xl font-bold text-foreground">{finalPrice} Cr</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Your Balance</p>
                  <p className={`text-lg font-semibold ${canAfford ? "text-primary" : "text-destructive"}`}>
                    {userBalance} Cr
                  </p>
                </div>
              </div>
              
              {!canAfford && (
                <div className="flex items-center gap-2 mt-3 text-destructive text-sm">
                  <AlertCircle className="h-4 w-4" />
                  <span>Insufficient credits. You need {finalPrice - userBalance} more.</span>
                </div>
              )}
              
              {canAfford && (
                <div className="flex items-center gap-2 mt-3 text-primary text-sm">
                  <CheckCircle className="h-4 w-4" />
                  <span>You'll have {userBalance - finalPrice} Cr remaining after purchase.</span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-border"
          >
            Cancel
          </Button>
          <Button
            onClick={handlePurchase}
            disabled={!canAfford || isPurchasing}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {isPurchasing ? "Signing..." : `Sign Contract (${finalPrice} Cr)`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
