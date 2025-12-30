import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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

  const handleArticleClick = (article: typeof mockArticles[0]) => {
    setSelectedArticle(article);
    if (article.owner) {
      setShowContractDialog(true);
    } else {
      setShowPurchaseDialog(true);
    }
  };

  const handlePurchaseComplete = () => {
    setShowPurchaseDialog(false);
    setSelectedArticle(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-6 pt-20 md:pt-24">
        {/* Back Button & Header */}
        <div className="mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/dashboard")}
            className="mb-3 text-muted-foreground hover:text-foreground -ml-2"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Dashboard
          </Button>
          
          <div className="flex items-center justify-between gap-3">
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl md:text-4xl font-bold text-foreground truncate">
                Article Market
              </h1>
              <p className="text-sm text-muted-foreground hidden sm:block">
                Search and purchase Wikipedia articles
              </p>
            </div>
            <div className="flex items-center gap-1.5 bg-card px-3 py-1.5 rounded-lg border border-border shrink-0">
              <span className="text-xs text-muted-foreground hidden sm:inline">Balance:</span>
              <span className="text-base font-bold text-primary">{userBalance} Cr</span>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-card border-border h-12"
            />
          </div>
          
          {searchQuery && (
            <p className="text-sm text-muted-foreground mt-2">
              {filteredArticles.length} result{filteredArticles.length !== 1 ? "s" : ""} for "{searchQuery}"
            </p>
          )}
        </div>

        {/* Results - Mobile Card View */}
        <div className="space-y-3">
          {filteredArticles.map((article) => {
            const trendMultiplier = calculateTrendMultiplier(article.viewsLast7d, article.viewsPrev7d);
            const rarityMultiplier = calculateRarityMultiplier(article.views30d);
            const adjustedPrice = Math.round(article.basePrice * trendMultiplier * rarityMultiplier);
            const daysUntilExpiry = getDaysUntilExpiry(article.expiresAt);
            const isFreeAgent = !article.owner;

            return (
              <Card
                key={article.id}
                className={`bg-card border-border cursor-pointer transition-all active:scale-[0.98] hover:shadow-md ${
                  isFreeAgent ? "hover:border-primary/50" : "hover:border-border"
                }`}
                onClick={() => handleArticleClick(article)}
              >
                <CardContent className="p-4">
                  {/* Top Row: Title + Status Badge */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h3 className="font-semibold text-foreground text-lg leading-tight">
                      {article.title}
                    </h3>
                    {isFreeAgent ? (
                      <Badge className="bg-primary/10 text-primary hover:bg-primary/10 shrink-0">
                        Free Agent
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="shrink-0">
                        Owned
                      </Badge>
                    )}
                  </div>

                  {/* Bottom Row: Stats */}
                  <div className="flex items-center justify-between gap-2 text-sm">
                    <div className="flex items-center gap-3">
                      {/* Views */}
                      <span className="text-muted-foreground">
                        {formatViews(article.views30d)} views
                      </span>
                      
                      {/* Trend */}
                      <div className={`flex items-center gap-0.5 ${
                        article.trend === "up" ? "text-primary" : "text-destructive"
                      }`}>
                        {article.trend === "up" ? (
                          <TrendingUp className="h-3.5 w-3.5" />
                        ) : (
                          <TrendingDown className="h-3.5 w-3.5" />
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {/* Owner info or Price */}
                      {article.owner ? (
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <User className="h-3.5 w-3.5" />
                          <span className="truncate max-w-[100px]">{article.owner.teamName}</span>
                          {daysUntilExpiry !== null && (
                            <span className="text-xs">• {daysUntilExpiry}d</span>
                          )}
                        </div>
                      ) : (
                        <span className="font-bold text-primary">{adjustedPrice} Cr</span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
            <p className="text-muted-foreground">No articles found matching "{searchQuery}"</p>
          </div>
        )}
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
