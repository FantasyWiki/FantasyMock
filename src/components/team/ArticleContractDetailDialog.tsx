import { Article } from "@/pages/Team";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Calendar, TrendingUp, TrendingDown, Clock, ArrowRightLeft, Coins, Link2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { NeighborChemistry, getChemistryLabel, getChemistryColor, calculateChemistry, getArticleNeighbors } from "@/lib/chemistry";

interface ArticleContractDetailDialogProps {
  article: Article | null;
  onClose: () => void;
  onSwap: (article: Article) => void;
  allArticles?: {
    forwards: Article[];
    midfielders: Article[];
    defenders: Article[];
    goalkeeper: Article | undefined;
  };
}

export function ArticleContractDetailDialog({ article, onClose, onSwap, allArticles }: ArticleContractDetailDialogProps) {
  if (!article) return null;

  const valueChange = article.currentValue - article.purchasePrice;
  const valueChangePercent = ((valueChange / article.purchasePrice) * 100).toFixed(1);
  const isPositive = valueChange >= 0;

  const handleSwap = () => {
    onSwap(article);
    onClose();
  };

  // Get neighbors and their chemistry for formation articles
  const neighbors: NeighborChemistry[] = [];
  if (allArticles) {
    const neighborArticles = getArticleNeighbors(article.id, allArticles);
    neighborArticles.forEach(neighbor => {
      neighbors.push({
        article: neighbor,
        chemistry: calculateChemistry(article, neighbor)
      });
    });
  }

  return (
    <Dialog open={!!article} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">{article.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Points & Position */}
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
            <div>
              <p className="text-sm text-muted-foreground">Current Points</p>
              <p className="text-3xl font-bold text-primary">{article.points}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Position</p>
              <p className="text-lg font-medium capitalize">{article.position}</p>
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
                <p className="font-medium">{article.contractLength}</p>
              </div>
              <div className="p-3 bg-card rounded-lg border">
                <p className="text-muted-foreground mb-1 flex items-center gap-1">
                  <Calendar className="h-3 w-3" /> Expires
                </p>
                <p className="font-medium">{new Date(article.contractEnd).toLocaleDateString()}</p>
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
                <p className="font-medium">{article.purchasePrice} credits</p>
              </div>
              <div className="p-3 bg-card rounded-lg border">
                <p className="text-muted-foreground mb-1">Current Value</p>
                <p className="font-medium">{article.currentValue} credits</p>
              </div>
            </div>

            <div className={cn(
              "flex items-center justify-center gap-2 p-3 rounded-lg",
              isPositive ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive"
            )}>
              {isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
              <span className="font-medium">
                {isPositive ? "+" : ""}{valueChange} credits ({isPositive ? "+" : ""}{valueChangePercent}%)
              </span>
            </div>
          </div>

          {/* Chemistry with Neighbors - only show for formation articles */}
          {neighbors.length > 0 && (
            <>
              <Separator />
              <div className="space-y-3">
                <h4 className="font-semibold flex items-center gap-2">
                  <Link2 className="h-4 w-4 text-muted-foreground" />
                  Chemistry Links
                </h4>
                
                <div className="space-y-2">
                  {neighbors.map((neighbor) => {
                    const chemInfo = getChemistryLabel(neighbor.chemistry);
                    return (
                      <div 
                        key={neighbor.article.id}
                        className="flex items-center justify-between p-3 bg-card rounded-lg border"
                      >
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: getChemistryColor(neighbor.chemistry) }}
                          />
                          <span className="font-medium text-sm">{neighbor.article.name}</span>
                        </div>
                        <div className="text-right">
                          <span 
                            className="text-sm font-medium"
                            style={{ color: getChemistryColor(neighbor.chemistry) }}
                          >
                            {chemInfo.label}
                          </span>
                          <p className="text-xs text-muted-foreground">{chemInfo.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}

          <Separator />

          {/* Actions */}
          <div className="flex flex-col gap-2">
            <Button onClick={handleSwap} variant="outline" className="w-full gap-2">
              <ArrowRightLeft className="h-4 w-4" />
              Swap Article
            </Button>
            <Button onClick={onClose} variant="ghost" className="w-full">
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
