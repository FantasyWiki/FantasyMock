import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText, TrendingUp, TrendingDown, Clock, RotateCcw, DollarSign, Plus } from "lucide-react";

interface OwnedArticlesProps {
  onBuyArticles?: () => void;
}

// Mock data - replace with real data
const ownedArticles = [
  {
    id: 1,
    name: "Bitcoin",
    purchasePrice: 150,
    currentPrice: 165,
    yesterdayPoints: 45,
    change: 12.5,
    expiresIn: 3,
    tier: "MEDIUM",
  },
  {
    id: 2,
    name: "Ethereum",
    purchasePrice: 120,
    currentPrice: 115,
    yesterdayPoints: 38,
    change: -4.2,
    expiresIn: 5,
    tier: "MEDIUM",
  },
  {
    id: 3,
    name: "Artificial Intelligence",
    purchasePrice: 200,
    currentPrice: 220,
    yesterdayPoints: 42,
    change: 10.0,
    expiresIn: 1,
    tier: "LONG",
  },
  {
    id: 4,
    name: "Machine Learning",
    purchasePrice: 80,
    currentPrice: 85,
    yesterdayPoints: 35,
    change: 6.3,
    expiresIn: 7,
    tier: "SHORT",
  },
  {
    id: 5,
    name: "Cloud Computing",
    purchasePrice: 100,
    currentPrice: 98,
    yesterdayPoints: 28,
    change: -2.0,
    expiresIn: 4,
    tier: "MEDIUM",
  },
  {
    id: 6,
    name: "Blockchain",
    purchasePrice: 90,
    currentPrice: 105,
    yesterdayPoints: 32,
    change: 16.7,
    expiresIn: 6,
    tier: "MEDIUM",
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
  return (
    <Card className="bg-card border-border">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <FileText className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-xl">Owned Articles</CardTitle>
            <p className="text-sm text-muted-foreground">{ownedArticles.length} active contracts</p>
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
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border">
                <TableHead className="text-muted-foreground">Article</TableHead>
                <TableHead className="text-muted-foreground text-right">Points</TableHead>
                <TableHead className="text-muted-foreground text-right hidden sm:table-cell">Price</TableHead>
                <TableHead className="text-muted-foreground text-right hidden md:table-cell">Change</TableHead>
                <TableHead className="text-muted-foreground text-center">Expires</TableHead>
                <TableHead className="text-muted-foreground text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ownedArticles.map((article) => (
                <TableRow key={article.id} className="border-border hover:bg-muted/50 transition-colors">
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground">{article.name}</span>
                      {getTierBadge(article.tier)}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <span className="font-semibold text-foreground">{article.yesterdayPoints}</span>
                  </TableCell>
                  <TableCell className="text-right hidden sm:table-cell">
                    <span className="text-foreground">{article.currentPrice} Cr</span>
                  </TableCell>
                  <TableCell className="text-right hidden md:table-cell">
                    <div className={`flex items-center justify-end gap-1 ${article.change >= 0 ? 'text-primary' : 'text-destructive'}`}>
                      {article.change >= 0 ? (
                        <TrendingUp className="h-4 w-4" />
                      ) : (
                        <TrendingDown className="h-4 w-4" />
                      )}
                      <span>{article.change >= 0 ? '+' : ''}{article.change}%</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className={`flex items-center justify-center gap-1 ${article.expiresIn <= 1 ? 'text-destructive' : 'text-muted-foreground'}`}>
                      <Clock className="h-4 w-4" />
                      <span>{article.expiresIn}d</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      {article.expiresIn <= 1 && (
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-primary hover:text-primary hover:bg-primary/10">
                          <RotateCcw className="h-4 w-4" />
                        </Button>
                      )}
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground">
                        <DollarSign className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};