import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, TrendingUp, TrendingDown, ArrowLeft, User, Calendar, ShoppingCart } from "lucide-react";
import { ContractPurchaseDialog } from "@/components/market/ContractPurchaseDialog";
import { ArticleContractDialog } from "@/components/market/ArticleContractDialog";

// Mock data - replace with real API data
const mockArticles = [
  {
    id: 1,
    title: "Bitcoin",
    views30d: 125000,
    viewsLast7d: 35000,
    viewsPrev7d: 28000,
    basePrice: 150,
    trend: "up" as const,
    owner: null,
    expiresAt: null,
  },
  {
    id: 2,
    title: "Ethereum",
    views30d: 95000,
    viewsLast7d: 22000,
    viewsPrev7d: 25000,
    basePrice: 120,
    trend: "down" as const,
    owner: null,
    expiresAt: null,
  },
  {
    id: 3,
    title: "Artificial Intelligence",
    views30d: 250000,
    viewsLast7d: 75000,
    viewsPrev7d: 60000,
    basePrice: 200,
    trend: "up" as const,
    owner: { name: "CryptoKing42", teamName: "Tech Titans" },
    expiresAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
  },
  {
    id: 4,
    title: "Machine Learning",
    views30d: 80000,
    viewsLast7d: 18000,
    viewsPrev7d: 20000,
    basePrice: 85,
    trend: "down" as const,
    owner: null,
    expiresAt: null,
  },
  {
    id: 5,
    title: "Blockchain",
    views30d: 110000,
    viewsLast7d: 30000,
    viewsPrev7d: 28000,
    basePrice: 105,
    trend: "up" as const,
    owner: { name: "WikiMaster", teamName: "Knowledge Base" },
    expiresAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
  },
  {
    id: 6,
    title: "Cryptocurrency",
    views30d: 180000,
    viewsLast7d: 45000,
    viewsPrev7d: 42000,
    basePrice: 160,
    trend: "up" as const,
    owner: null,
    expiresAt: null,
  },
  {
    id: 7,
    title: "Satoshi Nakamoto",
    views30d: 45000,
    viewsLast7d: 12000,
    viewsPrev7d: 10000,
    basePrice: 75,
    trend: "up" as const,
    owner: null,
    expiresAt: null,
  },
  {
    id: 8,
    title: "Cloud Computing",
    views30d: 130000,
    viewsLast7d: 32000,
    viewsPrev7d: 35000,
    basePrice: 115,
    trend: "down" as const,
    owner: null,
    expiresAt: null,
  },
  {
    id: 9,
    title: "NFT",
    views30d: 65000,
    viewsLast7d: 15000,
    viewsPrev7d: 18000,
    basePrice: 70,
    trend: "down" as const,
    owner: { name: "ArtCollector", teamName: "Digital Dreams" },
    expiresAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
  },
  {
    id: 10,
    title: "Smart Contract",
    views30d: 55000,
    viewsLast7d: 14000,
    viewsPrev7d: 12000,
    basePrice: 65,
    trend: "up" as const,
    owner: null,
    expiresAt: null,
  },
];

// Mock user balance
const userBalance = 550;

const calculateTrendMultiplier = (viewsLast7d: number, viewsPrev7d: number): number => {
  const ratio = viewsLast7d / viewsPrev7d;
  if (ratio > 1.2) return 1.15; // upturn boost
  if (ratio < 0.8) return 0.85; // downturn discount
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

const getDaysUntilExpiry = (expiresAt: Date | null): number | null => {
  if (!expiresAt) return null;
  const diff = expiresAt.getTime() - Date.now();
  return Math.ceil(diff / (24 * 60 * 60 * 1000));
};

const Market = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArticle, setSelectedArticle] = useState<typeof mockArticles[0] | null>(null);
  const [showPurchaseDialog, setShowPurchaseDialog] = useState(false);
  const [showContractDialog, setShowContractDialog] = useState(false);

  const filteredArticles = useMemo(() => {
    if (!searchQuery.trim()) return mockArticles;
    return mockArticles.filter((article) =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleBuyClick = (article: typeof mockArticles[0]) => {
    setSelectedArticle(article);
    setShowPurchaseDialog(true);
  };

  const handleViewContract = (article: typeof mockArticles[0]) => {
    setSelectedArticle(article);
    setShowContractDialog(true);
  };

  const handlePurchaseComplete = () => {
    setShowPurchaseDialog(false);
    setSelectedArticle(null);
    // Here you would refresh the data or update state
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8 pt-24">
        {/* Back Button & Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/dashboard")}
            className="mb-4 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                Article Market
              </h1>
              <p className="text-muted-foreground">
                Search and purchase Wikipedia articles for your team
              </p>
            </div>
            <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-lg border border-border">
              <span className="text-sm text-muted-foreground">Balance:</span>
              <span className="text-lg font-bold text-primary">{userBalance} Cr</span>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <Card className="mb-8 bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5 text-primary" />
              Search Articles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Type article name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-background border-border"
                />
              </div>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
            
            {/* Suggestions */}
            {searchQuery && (
              <div className="mt-4">
                <p className="text-sm text-muted-foreground mb-2">
                  Showing {filteredArticles.length} results for "{searchQuery}"
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results Table */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5 text-primary" />
              Available Articles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-border">
                    <TableHead className="text-muted-foreground">Article</TableHead>
                    <TableHead className="text-muted-foreground text-right">Performance</TableHead>
                    <TableHead className="text-muted-foreground text-right">Price</TableHead>
                    <TableHead className="text-muted-foreground">Owner</TableHead>
                    <TableHead className="text-muted-foreground">Expires</TableHead>
                    <TableHead className="text-muted-foreground text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredArticles.map((article) => {
                    const trendMultiplier = calculateTrendMultiplier(article.viewsLast7d, article.viewsPrev7d);
                    const rarityMultiplier = calculateRarityMultiplier(article.views30d);
                    const adjustedPrice = Math.round(article.basePrice * trendMultiplier * rarityMultiplier);
                    const daysUntilExpiry = getDaysUntilExpiry(article.expiresAt);

                    return (
                      <TableRow key={article.id} className="border-border hover:bg-muted/50 transition-colors">
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-foreground">{article.title}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <span className="text-foreground">{formatViews(article.views30d)}</span>
                            {article.trend === "up" ? (
                              <Badge variant="outline" className="text-xs border-primary text-primary">
                                <TrendingUp className="h-3 w-3 mr-1" />
                                Up
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="text-xs border-destructive text-destructive">
                                <TrendingDown className="h-3 w-3 mr-1" />
                                Down
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <span className="font-semibold text-foreground">{adjustedPrice} Cr</span>
                        </TableCell>
                        <TableCell>
                          {article.owner ? (
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4 text-muted-foreground" />
                              <span className="text-muted-foreground">{article.owner.teamName}</span>
                            </div>
                          ) : (
                            <Badge variant="secondary" className="text-xs">
                              Free Agent
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          {article.owner && daysUntilExpiry !== null ? (
                            <div className="flex items-center gap-1 text-muted-foreground">
                              <Calendar className="h-4 w-4" />
                              <span>{daysUntilExpiry}d</span>
                            </div>
                          ) : (
                            <span className="text-muted-foreground">—</span>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          {article.owner ? (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleViewContract(article)}
                              className="border-border text-muted-foreground hover:text-foreground"
                            >
                              View Contract
                            </Button>
                          ) : (
                            <Button
                              size="sm"
                              onClick={() => handleBuyClick(article)}
                              className="bg-primary text-primary-foreground hover:bg-primary/90"
                            >
                              Buy
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>

            {filteredArticles.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No articles found matching "{searchQuery}"</p>
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      <Footer />

      {/* Purchase Dialog */}
      {selectedArticle && !selectedArticle.owner && (
        <ContractPurchaseDialog
          open={showPurchaseDialog}
          onOpenChange={setShowPurchaseDialog}
          article={selectedArticle}
          userBalance={userBalance}
          onPurchaseComplete={handlePurchaseComplete}
        />
      )}

      {/* Contract View Dialog */}
      {selectedArticle && selectedArticle.owner && (
        <ArticleContractDialog
          open={showContractDialog}
          onOpenChange={setShowContractDialog}
          article={selectedArticle}
        />
      )}
    </div>
  );
};

export default Market;
