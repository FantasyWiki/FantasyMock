import { useState, useMemo, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, ArrowLeft, ExternalLink, ArrowUpDown, ArrowUp, ArrowDown, Eye, TrendingUp, ChevronLeft, ChevronRight } from "lucide-react";
import { ContractPurchaseDialog } from "@/components/market/ContractPurchaseDialog";
import { ArticleContractDialog } from "@/components/market/ArticleContractDialog";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLeague } from "@/contexts/LeagueContext";
import { getMarketArticles, type MarketArticle } from "@/data/leagueData";

const formatViews = (views: number): string => {
  if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
  if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
  return views.toString();
};

const userBalance = 550;

type SortKey = "title" | "status" | "yesterdayViews" | "weekViews" | "monthViews" | "yearViews" | "price";
type SortDir = "asc" | "desc";
type StatusFilter = "all" | "free" | "owned";

const ITEMS_PER_PAGE = 10;

const Market = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { currentLeague } = useLeague();
  const articles = useMemo(() => getMarketArticles(currentLeague.id), [currentLeague.id]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<MarketArticle | null>(null);
  const [showPurchaseDialog, setShowPurchaseDialog] = useState(false);
  const [showContractDialog, setShowContractDialog] = useState(false);
  const [sortKey, setSortKey] = useState<SortKey>("price");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const searchRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  };

  const SortIcon = ({ column }: { column: SortKey }) => {
    if (sortKey !== column) return <ArrowUpDown className="h-3 w-3 ml-1 opacity-40" />;
    return sortDir === "asc"
      ? <ArrowUp className="h-3 w-3 ml-1" />
      : <ArrowDown className="h-3 w-3 ml-1" />;
  };

  const searchSuggestions = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return articles
      .filter((a) => a.title.toLowerCase().includes(searchQuery.toLowerCase()))
      .slice(0, 5);
  }, [searchQuery, articles]);

  const handleArticleClick = (article: MarketArticle) => {
    setSelectedArticle(article);
    if (article.owner) {
      setShowContractDialog(true);
    } else {
      setShowPurchaseDialog(true);
    }
  };

  const handleSuggestionClick = (article: MarketArticle) => {
    setSearchQuery(article.title);
    setIsSearchFocused(false);
  };

  const handlePurchaseComplete = () => {
    setShowPurchaseDialog(false);
    setSelectedArticle(null);
  };

  // Reset page when filters change
  const handleFilterChange = useCallback((filter: StatusFilter) => {
    setStatusFilter(filter);
    setCurrentPage(1);
  }, []);

  const filteredArticles = useMemo(() => {
    let filtered = articles;

    if (searchQuery.trim()) {
      articles = articles.filter((a) =>
        a.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (statusFilter === "free") {
      articles = articles.filter((a) => !a.owner);
    } else if (statusFilter === "owned") {
      articles = articles.filter((a) => !!a.owner);
    }

    const sorted = [...articles].sort((a, b) => {
      let cmp = 0;
      switch (sortKey) {
        case "title": cmp = a.title.localeCompare(b.title); break;
        case "status": cmp = (a.owner ? 1 : 0) - (b.owner ? 1 : 0); break;
        case "yesterdayViews": cmp = a.yesterdayViews - b.yesterdayViews; break;
        case "weekViews": cmp = a.weekViews - b.weekViews; break;
        case "monthViews": cmp = a.monthViews - b.monthViews; break;
        case "yearViews": cmp = a.yearViews - b.yearViews; break;
        case "price": cmp = a.weekViews - b.weekViews; break;
      }
      return sortDir === "asc" ? cmp : -cmp;
    });

    return sorted;
  }, [searchQuery, sortKey, sortDir, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredArticles.length / ITEMS_PER_PAGE));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginatedArticles = filteredArticles.slice(
    (safeCurrentPage - 1) * ITEMS_PER_PAGE,
    safeCurrentPage * ITEMS_PER_PAGE
  );

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

        {/* Search & Status Filter */}
        <div className="mb-6 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1" ref={searchRef}>
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
              className="pl-10 bg-card border-border h-12"
            />
            {isSearchFocused && searchQuery.trim() && searchSuggestions.length > 0 && (
              <div className="absolute z-50 top-full mt-1 w-full rounded-md border border-border bg-popover shadow-lg">
                {searchSuggestions.map((article) => (
                  <button
                    key={article.id}
                    className="w-full text-left px-4 py-2.5 text-sm hover:bg-accent transition-colors flex items-center justify-between"
                    onMouseDown={() => handleSuggestionClick(article)}
                  >
                    <span className="font-medium text-foreground">{article.title}</span>
                    <span className="text-xs text-muted-foreground">{formatViews(article.weekViews)} Cr</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="flex gap-1.5 shrink-0">
            {(["all", "free", "owned"] as StatusFilter[]).map((f) => (
              <Button
                key={f}
                variant={statusFilter === f ? "default" : "outline"}
                size="sm"
                className="h-12 capitalize"
                onClick={() => handleFilterChange(f)}
              >
                {f === "all" ? "All" : f === "free" ? "Free Agents" : "Owned"}
              </Button>
            ))}
          </div>
        </div>

        {/* Articles - Desktop Table */}
        {!isMobile ? (
          <div className="rounded-lg border border-border bg-card overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="cursor-pointer select-none" onClick={() => toggleSort("title")}>
                    <span className="flex items-center">Article <SortIcon column="title" /></span>
                  </TableHead>
                  <TableHead className="cursor-pointer select-none" onClick={() => toggleSort("status")}>
                    <span className="flex items-center">Status <SortIcon column="status" /></span>
                  </TableHead>
                  <TableHead className="cursor-pointer select-none text-right" onClick={() => toggleSort("yesterdayViews")}>
                    <span className="flex items-center justify-end">Yesterday <SortIcon column="yesterdayViews" /></span>
                  </TableHead>
                  <TableHead className="cursor-pointer select-none text-right" onClick={() => toggleSort("weekViews")}>
                    <span className="flex items-center justify-end">Week <SortIcon column="weekViews" /></span>
                  </TableHead>
                  <TableHead className="cursor-pointer select-none text-right" onClick={() => toggleSort("monthViews")}>
                    <span className="flex items-center justify-end">Month <SortIcon column="monthViews" /></span>
                  </TableHead>
                  <TableHead className="cursor-pointer select-none text-right" onClick={() => toggleSort("yearViews")}>
                    <span className="flex items-center justify-end">Year <SortIcon column="yearViews" /></span>
                  </TableHead>
                  <TableHead className="cursor-pointer select-none text-right" onClick={() => toggleSort("price")}>
                    <span className="flex items-center justify-end">Price <SortIcon column="price" /></span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedArticles.map((article) => (
                  <TableRow
                    key={article.id}
                    className="cursor-pointer"
                    onClick={() => handleArticleClick(article)}
                  >
                    <TableCell>
                      <div>
                        <span className="font-medium text-foreground">{article.title}</span>
                        <a
                          href={`https://en.wikipedia.org/wiki/${article.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors mt-0.5"
                          onClick={(e) => e.stopPropagation()}
                        >
                          wikipedia.org
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    </TableCell>
                    <TableCell>
                      {article.owner ? (
                        <span className="text-xs font-medium text-accent-foreground bg-accent px-2 py-1 rounded-full">
                          {article.owner.name}
                        </span>
                      ) : (
                        <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                          Free Agent
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-right text-muted-foreground">{formatViews(article.yesterdayViews)}</TableCell>
                    <TableCell className="text-right text-muted-foreground">{formatViews(article.weekViews)}</TableCell>
                    <TableCell className="text-right text-muted-foreground">{formatViews(article.monthViews)}</TableCell>
                    <TableCell className="text-right text-muted-foreground">{formatViews(article.yearViews)}</TableCell>
                    <TableCell className="text-right font-bold text-primary">{formatViews(article.weekViews)} Cr</TableCell>
                  </TableRow>
                ))}
                {filteredArticles.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-12 text-muted-foreground">
                      No articles found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        ) : (
          /* Articles - Mobile Cards */
          <div className="flex flex-col gap-3">
            {/* Mobile Sort Controls */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              <span className="text-xs text-muted-foreground shrink-0">Sort:</span>
              {([
                { key: "price" as SortKey, label: "Price" },
                { key: "yesterdayViews" as SortKey, label: "Yesterday" },
                { key: "weekViews" as SortKey, label: "Week" },
                { key: "monthViews" as SortKey, label: "Month" },
              ]).map(({ key, label }) => (
                <Button
                  key={key}
                  variant={sortKey === key ? "default" : "outline"}
                  size="sm"
                  className="h-7 text-xs shrink-0"
                  onClick={() => toggleSort(key)}
                >
                  {label}
                  {sortKey === key && (
                    sortDir === "asc" ? <ArrowUp className="h-3 w-3 ml-1" /> : <ArrowDown className="h-3 w-3 ml-1" />
                  )}
                </Button>
              ))}
            </div>

            {paginatedArticles.map((article) => (
              <Card
                key={article.id}
                className="cursor-pointer hover:bg-accent/50 transition-colors"
                onClick={() => handleArticleClick(article)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="min-w-0">
                      <h3 className="font-semibold text-foreground text-sm truncate">{article.title}</h3>
                      <a
                        href={`https://en.wikipedia.org/wiki/${article.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        wikipedia.org
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-bold text-primary">{formatViews(article.weekViews)} Cr</p>
                      {article.owner ? (
                        <Badge variant="secondary" className="text-[10px] mt-1">
                          {article.owner.name}
                        </Badge>
                      ) : (
                        <Badge className="text-[10px] mt-1 bg-primary/10 text-primary hover:bg-primary/20 border-0">
                          Free Agent
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-2 text-center">
                    <div>
                      <p className="text-xs text-muted-foreground">Yesterday</p>
                      <p className="text-sm font-medium text-foreground">{formatViews(article.yesterdayViews)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Week</p>
                      <p className="text-sm font-medium text-foreground">{formatViews(article.weekViews)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Month</p>
                      <p className="text-sm font-medium text-foreground">{formatViews(article.monthViews)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Year</p>
                      <p className="text-sm font-medium text-foreground">{formatViews(article.yearViews)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            {filteredArticles.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                No articles found
              </div>
            )}
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-6 mb-4">
            <p className="text-sm text-muted-foreground">
              Showing {(safeCurrentPage - 1) * ITEMS_PER_PAGE + 1}–{Math.min(safeCurrentPage * ITEMS_PER_PAGE, filteredArticles.length)} of {filteredArticles.length}
            </p>
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="sm"
                disabled={safeCurrentPage <= 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((page) => {
                  if (totalPages <= 5) return true;
                  if (page === 1 || page === totalPages) return true;
                  return Math.abs(page - safeCurrentPage) <= 1;
                })
                .reduce<(number | "ellipsis")[]>((acc, page, idx, arr) => {
                  if (idx > 0 && page - (arr[idx - 1] as number) > 1) acc.push("ellipsis");
                  acc.push(page);
                  return acc;
                }, [])
                .map((item, idx) =>
                  item === "ellipsis" ? (
                    <span key={`e-${idx}`} className="px-2 text-muted-foreground text-sm">…</span>
                  ) : (
                    <Button
                      key={item}
                      variant={safeCurrentPage === item ? "default" : "outline"}
                      size="sm"
                      className="w-9"
                      onClick={() => setCurrentPage(item as number)}
                    >
                      {item}
                    </Button>
                  )
                )}
              <Button
                variant="outline"
                size="sm"
                disabled={safeCurrentPage >= totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </main>

      <Footer />

      {selectedArticle && !selectedArticle.owner && (
        <ContractPurchaseDialog
          open={showPurchaseDialog}
          onOpenChange={setShowPurchaseDialog}
          article={{
            ...selectedArticle,
            basePrice: selectedArticle.weekViews,
            views30d: selectedArticle.monthViews,
            viewsLast7d: selectedArticle.weekViews,
            viewsPrev7d: selectedArticle.weekViews,
            trend: "up" as const,
          }}
          userBalance={userBalance}
          onPurchaseComplete={handlePurchaseComplete}
        />
      )}

      {selectedArticle && selectedArticle.owner && (
        <ArticleContractDialog
          open={showContractDialog}
          onOpenChange={setShowContractDialog}
          article={{
            ...selectedArticle,
            basePrice: selectedArticle.weekViews,
            views30d: selectedArticle.monthViews,
            viewsLast7d: selectedArticle.weekViews,
            viewsPrev7d: selectedArticle.weekViews,
            trend: "up" as const,
          }}
        />
      )}
    </div>
  );
};

export default Market;
