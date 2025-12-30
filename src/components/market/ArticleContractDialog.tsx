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
import { TrendingUp, TrendingDown, User, Calendar, Clock, FileText } from "lucide-react";

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

export const ArticleContractDialog = ({
  open,
  onOpenChange,
  article,
}: ArticleContractDialogProps) => {
  const percentChange = getPercentageChange(article.viewsLast7d, article.viewsPrev7d);
  const daysUntilExpiry = getDaysUntilExpiry(article.expiresAt);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif flex items-center gap-2">
            <FileText className="h-6 w-6 text-primary" />
            Contract Details
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            This article is currently under contract
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Article Info */}
          <div className="text-center">
            <h3 className="text-xl font-semibold text-foreground">{article.title}</h3>
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
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{article.owner.teamName}</p>
                    <p className="text-sm text-muted-foreground">Owned by {article.owner.name}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Contract Expiration */}
          {article.expiresAt && daysUntilExpiry !== null && (
            <Card className="bg-muted/50 border-border">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <span className="text-muted-foreground">Contract Expires</span>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-foreground">{formatDate(article.expiresAt)}</p>
                    <div className={`flex items-center gap-1 text-sm ${daysUntilExpiry <= 2 ? "text-destructive" : "text-muted-foreground"}`}>
                      <Clock className="h-3 w-3" />
                      <span>{daysUntilExpiry} days remaining</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Performance Stats */}
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

          {/* Info Message */}
          <div className="bg-accent/50 p-4 rounded-lg">
            <p className="text-sm text-accent-foreground">
              This article will become available as a free agent when the current contract expires.
              {daysUntilExpiry !== null && daysUntilExpiry <= 3 && (
                <span className="block mt-1 font-medium text-primary">
                  Check back in {daysUntilExpiry} day{daysUntilExpiry !== 1 ? "s" : ""}!
                </span>
              )}
            </p>
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            onClick={() => onOpenChange(false)}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
