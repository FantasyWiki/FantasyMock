import { useRef, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Layers, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { ArticleNode } from "@/components/team/ArticleNode";
import { ChemistryLinks } from "@/components/team/ChemistryLinks";
import { useLeague } from "@/contexts/LeagueContext";
import { ArticleContractDetailDialog } from "@/components/team/ArticleContractDetailDialog";

interface DashboardArticle {
  id: string;
  name: string;
  chemistry: "green" | "yellow" | "orange" | "red" | "none";
  points: number;
  contractEnd: string;
  contractLength: string;
  purchasePrice: number;
  currentValue: number;
  position: string;
}

// Mock data per league with full article structure
const formationDataByLeague: Record<string, {
  forwards: DashboardArticle[];
  midfielders: DashboardArticle[];
  defenders: DashboardArticle[];
  goalkeeper: DashboardArticle | undefined;
}> = {
  global: {
    forwards: [
      { id: "1", name: "Bitcoin", chemistry: "green", points: 45, contractEnd: "2024-03-15", contractLength: "1 Month", purchasePrice: 500, currentValue: 580, position: "forward" },
      { id: "2", name: "Ethereum", chemistry: "yellow", points: 38, contractEnd: "2024-02-28", contractLength: "2 Weeks", purchasePrice: 400, currentValue: 420, position: "forward" },
      { id: "3", name: "AI", chemistry: "green", points: 42, contractEnd: "2024-03-20", contractLength: "1 Month", purchasePrice: 450, currentValue: 510, position: "forward" },
    ],
    midfielders: [
      { id: "4", name: "Cloud Computing", chemistry: "yellow", points: 28, contractEnd: "2024-02-25", contractLength: "1 Week", purchasePrice: 300, currentValue: 290, position: "midfield" },
      { id: "5", name: "Machine Learning", chemistry: "green", points: 35, contractEnd: "2024-03-10", contractLength: "1 Month", purchasePrice: 380, currentValue: 400, position: "midfield" },
      { id: "6", name: "Blockchain", chemistry: "green", points: 32, contractEnd: "2024-03-05", contractLength: "2 Weeks", purchasePrice: 350, currentValue: 360, position: "midfield" },
    ],
    defenders: [
      { id: "7", name: "Python", chemistry: "orange", points: 22, contractEnd: "2024-02-20", contractLength: "1 Week", purchasePrice: 250, currentValue: 240, position: "defense" },
      { id: "8", name: "JavaScript", chemistry: "green", points: 25, contractEnd: "2024-03-08", contractLength: "2 Weeks", purchasePrice: 280, currentValue: 300, position: "defense" },
      { id: "9", name: "React", chemistry: "yellow", points: 24, contractEnd: "2024-02-28", contractLength: "1 Week", purchasePrice: 260, currentValue: 270, position: "defense" },
      { id: "10", name: "TypeScript", chemistry: "green", points: 21, contractEnd: "2024-03-12", contractLength: "1 Month", purchasePrice: 240, currentValue: 255, position: "defense" },
    ],
    goalkeeper: { id: "11", name: "Wikipedia", chemistry: "green", points: 50, contractEnd: "2024-03-25", contractLength: "1 Month", purchasePrice: 600, currentValue: 650, position: "goalkeeper" },
  },
  europe: {
    forwards: [
      { id: "e1", name: "Paris", chemistry: "green", points: 52, contractEnd: "2024-03-15", contractLength: "1 Month", purchasePrice: 520, currentValue: 600, position: "forward" },
      { id: "e2", name: "Berlin", chemistry: "yellow", points: 40, contractEnd: "2024-02-28", contractLength: "2 Weeks", purchasePrice: 420, currentValue: 450, position: "forward" },
      { id: "e3", name: "Rome", chemistry: "green", points: 38, contractEnd: "2024-03-20", contractLength: "1 Month", purchasePrice: 400, currentValue: 430, position: "forward" },
    ],
    midfielders: [
      { id: "e4", name: "Madrid", chemistry: "green", points: 35, contractEnd: "2024-02-25", contractLength: "1 Week", purchasePrice: 350, currentValue: 380, position: "midfield" },
      { id: "e5", name: "London", chemistry: "yellow", points: 42, contractEnd: "2024-03-10", contractLength: "1 Month", purchasePrice: 450, currentValue: 480, position: "midfield" },
      { id: "e6", name: "Amsterdam", chemistry: "green", points: 30, contractEnd: "2024-03-05", contractLength: "2 Weeks", purchasePrice: 300, currentValue: 320, position: "midfield" },
    ],
    defenders: [
      { id: "e7", name: "Vienna", chemistry: "orange", points: 25, contractEnd: "2024-02-20", contractLength: "1 Week", purchasePrice: 280, currentValue: 270, position: "defense" },
      { id: "e8", name: "Prague", chemistry: "green", points: 28, contractEnd: "2024-03-08", contractLength: "2 Weeks", purchasePrice: 300, currentValue: 320, position: "defense" },
      { id: "e9", name: "Dublin", chemistry: "yellow", points: 22, contractEnd: "2024-02-28", contractLength: "1 Week", purchasePrice: 240, currentValue: 250, position: "defense" },
      { id: "e10", name: "Stockholm", chemistry: "green", points: 26, contractEnd: "2024-03-12", contractLength: "1 Month", purchasePrice: 280, currentValue: 300, position: "defense" },
    ],
    goalkeeper: { id: "e11", name: "Euro", chemistry: "green", points: 55, contractEnd: "2024-03-25", contractLength: "1 Month", purchasePrice: 650, currentValue: 700, position: "goalkeeper" },
  },
  americas: {
    forwards: [
      { id: "a1", name: "New York", chemistry: "green", points: 48, contractEnd: "2024-03-15", contractLength: "1 Month", purchasePrice: 480, currentValue: 550, position: "forward" },
      { id: "a2", name: "Los Angeles", chemistry: "yellow", points: 44, contractEnd: "2024-02-28", contractLength: "2 Weeks", purchasePrice: 440, currentValue: 470, position: "forward" },
      { id: "a3", name: "São Paulo", chemistry: "green", points: 36, contractEnd: "2024-03-20", contractLength: "1 Month", purchasePrice: 380, currentValue: 400, position: "forward" },
    ],
    midfielders: [
      { id: "a4", name: "Toronto", chemistry: "yellow", points: 32, contractEnd: "2024-02-25", contractLength: "1 Week", purchasePrice: 320, currentValue: 340, position: "midfield" },
      { id: "a5", name: "Chicago", chemistry: "green", points: 30, contractEnd: "2024-03-10", contractLength: "1 Month", purchasePrice: 300, currentValue: 320, position: "midfield" },
      { id: "a6", name: "Mexico City", chemistry: "green", points: 34, contractEnd: "2024-03-05", contractLength: "2 Weeks", purchasePrice: 360, currentValue: 380, position: "midfield" },
    ],
    defenders: [
      { id: "a7", name: "Miami", chemistry: "orange", points: 26, contractEnd: "2024-02-20", contractLength: "1 Week", purchasePrice: 270, currentValue: 260, position: "defense" },
      { id: "a8", name: "Vancouver", chemistry: "green", points: 24, contractEnd: "2024-03-08", contractLength: "2 Weeks", purchasePrice: 260, currentValue: 280, position: "defense" },
      { id: "a9", name: "Buenos Aires", chemistry: "yellow", points: 28, contractEnd: "2024-02-28", contractLength: "1 Week", purchasePrice: 290, currentValue: 300, position: "defense" },
      { id: "a10", name: "Lima", chemistry: "green", points: 22, contractEnd: "2024-03-12", contractLength: "1 Month", purchasePrice: 230, currentValue: 240, position: "defense" },
    ],
    goalkeeper: { id: "a11", name: "Dollar", chemistry: "green", points: 58, contractEnd: "2024-03-25", contractLength: "1 Month", purchasePrice: 620, currentValue: 680, position: "goalkeeper" },
  },
  asia: {
    forwards: [
      { id: "as1", name: "Tokyo", chemistry: "green", points: 55, contractEnd: "2024-03-15", contractLength: "1 Month", purchasePrice: 560, currentValue: 620, position: "forward" },
      { id: "as2", name: "Shanghai", chemistry: "yellow", points: 50, contractEnd: "2024-02-28", contractLength: "2 Weeks", purchasePrice: 500, currentValue: 530, position: "forward" },
      { id: "as3", name: "Seoul", chemistry: "green", points: 46, contractEnd: "2024-03-20", contractLength: "1 Month", purchasePrice: 480, currentValue: 510, position: "forward" },
    ],
    midfielders: [
      { id: "as4", name: "Singapore", chemistry: "green", points: 38, contractEnd: "2024-02-25", contractLength: "1 Week", purchasePrice: 400, currentValue: 420, position: "midfield" },
      { id: "as5", name: "Hong Kong", chemistry: "yellow", points: 42, contractEnd: "2024-03-10", contractLength: "1 Month", purchasePrice: 450, currentValue: 470, position: "midfield" },
      { id: "as6", name: "Mumbai", chemistry: "green", points: 35, contractEnd: "2024-03-05", contractLength: "2 Weeks", purchasePrice: 370, currentValue: 390, position: "midfield" },
    ],
    defenders: [
      { id: "as7", name: "Bangkok", chemistry: "orange", points: 28, contractEnd: "2024-02-20", contractLength: "1 Week", purchasePrice: 300, currentValue: 290, position: "defense" },
      { id: "as8", name: "Taipei", chemistry: "green", points: 30, contractEnd: "2024-03-08", contractLength: "2 Weeks", purchasePrice: 320, currentValue: 340, position: "defense" },
      { id: "as9", name: "Jakarta", chemistry: "yellow", points: 26, contractEnd: "2024-02-28", contractLength: "1 Week", purchasePrice: 280, currentValue: 290, position: "defense" },
      { id: "as10", name: "Manila", chemistry: "green", points: 24, contractEnd: "2024-03-12", contractLength: "1 Month", purchasePrice: 260, currentValue: 275, position: "defense" },
    ],
    goalkeeper: { id: "as11", name: "Yen", chemistry: "green", points: 60, contractEnd: "2024-03-25", contractLength: "1 Month", purchasePrice: 680, currentValue: 750, position: "goalkeeper" },
  },
  premier: {
    forwards: [
      { id: "p1", name: "Gold", chemistry: "green", points: 65, contractEnd: "2024-03-15", contractLength: "1 Month", purchasePrice: 700, currentValue: 780, position: "forward" },
      { id: "p2", name: "Silver", chemistry: "yellow", points: 58, contractEnd: "2024-02-28", contractLength: "2 Weeks", purchasePrice: 600, currentValue: 640, position: "forward" },
      { id: "p3", name: "Platinum", chemistry: "green", points: 52, contractEnd: "2024-03-20", contractLength: "1 Month", purchasePrice: 550, currentValue: 590, position: "forward" },
    ],
    midfielders: [
      { id: "p4", name: "Diamond", chemistry: "green", points: 48, contractEnd: "2024-02-25", contractLength: "1 Week", purchasePrice: 500, currentValue: 530, position: "midfield" },
      { id: "p5", name: "Ruby", chemistry: "yellow", points: 45, contractEnd: "2024-03-10", contractLength: "1 Month", purchasePrice: 480, currentValue: 500, position: "midfield" },
      { id: "p6", name: "Emerald", chemistry: "green", points: 42, contractEnd: "2024-03-05", contractLength: "2 Weeks", purchasePrice: 450, currentValue: 470, position: "midfield" },
    ],
    defenders: [
      { id: "p7", name: "Sapphire", chemistry: "orange", points: 38, contractEnd: "2024-02-20", contractLength: "1 Week", purchasePrice: 400, currentValue: 390, position: "defense" },
      { id: "p8", name: "Amethyst", chemistry: "green", points: 35, contractEnd: "2024-03-08", contractLength: "2 Weeks", purchasePrice: 380, currentValue: 400, position: "defense" },
      { id: "p9", name: "Topaz", chemistry: "yellow", points: 32, contractEnd: "2024-02-28", contractLength: "1 Week", purchasePrice: 350, currentValue: 360, position: "defense" },
      { id: "p10", name: "Opal", chemistry: "green", points: 30, contractEnd: "2024-03-12", contractLength: "1 Month", purchasePrice: 320, currentValue: 340, position: "defense" },
    ],
    goalkeeper: { id: "p11", name: "Crown", chemistry: "green", points: 70, contractEnd: "2024-03-25", contractLength: "1 Month", purchasePrice: 800, currentValue: 900, position: "goalkeeper" },
  },
  champions: {
    forwards: [
      { id: "c1", name: "Universe", chemistry: "green", points: 75, contractEnd: "2024-03-15", contractLength: "1 Month", purchasePrice: 850, currentValue: 950, position: "forward" },
      { id: "c2", name: "Galaxy", chemistry: "yellow", points: 68, contractEnd: "2024-02-28", contractLength: "2 Weeks", purchasePrice: 750, currentValue: 800, position: "forward" },
      { id: "c3", name: "Cosmos", chemistry: "green", points: 62, contractEnd: "2024-03-20", contractLength: "1 Month", purchasePrice: 680, currentValue: 720, position: "forward" },
    ],
    midfielders: [
      { id: "c4", name: "Nebula", chemistry: "green", points: 55, contractEnd: "2024-02-25", contractLength: "1 Week", purchasePrice: 600, currentValue: 640, position: "midfield" },
      { id: "c5", name: "Supernova", chemistry: "yellow", points: 52, contractEnd: "2024-03-10", contractLength: "1 Month", purchasePrice: 580, currentValue: 610, position: "midfield" },
      { id: "c6", name: "Quasar", chemistry: "green", points: 48, contractEnd: "2024-03-05", contractLength: "2 Weeks", purchasePrice: 520, currentValue: 550, position: "midfield" },
    ],
    defenders: [
      { id: "c7", name: "Pulsar", chemistry: "orange", points: 42, contractEnd: "2024-02-20", contractLength: "1 Week", purchasePrice: 460, currentValue: 450, position: "defense" },
      { id: "c8", name: "Comet", chemistry: "green", points: 40, contractEnd: "2024-03-08", contractLength: "2 Weeks", purchasePrice: 440, currentValue: 460, position: "defense" },
      { id: "c9", name: "Meteor", chemistry: "yellow", points: 38, contractEnd: "2024-02-28", contractLength: "1 Week", purchasePrice: 420, currentValue: 430, position: "defense" },
      { id: "c10", name: "Asteroid", chemistry: "green", points: 35, contractEnd: "2024-03-12", contractLength: "1 Month", purchasePrice: 380, currentValue: 400, position: "defense" },
    ],
    goalkeeper: { id: "c11", name: "Star", chemistry: "green", points: 80, contractEnd: "2024-03-25", contractLength: "1 Month", purchasePrice: 950, currentValue: 1100, position: "goalkeeper" },
  },
};

export const TeamPortfolio = () => {
  const { currentLeague } = useLeague();
  const navigate = useNavigate();
  const mobileContainerRef = useRef<HTMLDivElement>(null);
  const desktopContainerRef = useRef<HTMLDivElement>(null);
  const [selectedArticle, setSelectedArticle] = useState<DashboardArticle | null>(null);

  const articles = useMemo(() => {
    return formationDataByLeague[currentLeague.id] || formationDataByLeague.global;
  }, [currentLeague.id]);

  const { forwards, midfielders, defenders, goalkeeper } = articles;

  const handleArticleClick = (article: DashboardArticle) => {
    setSelectedArticle(article);
  };

  const handleSwap = () => {
    // Navigate to team page for swapping
    navigate("/team");
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Layers className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-xl">Team Formation</CardTitle>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="secondary" className="text-xs">
                {currentLeague.icon} {currentLeague.name}
              </Badge>
              <span className="text-xs text-muted-foreground">4-3-3</span>
            </div>
          </div>
        </div>
        <Link to="/team">
          <Button variant="outline" size="sm" className="gap-2">
            Manage <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent className="p-2 md:p-6">
        <div className="relative bg-gradient-to-b from-primary/5 to-primary/10 rounded-xl border border-primary/20 overflow-hidden">
          {/* Pitch markings */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute left-1/2 inset-y-0 w-px bg-primary/20 md:hidden" />
            <div className="absolute inset-x-0 top-1/2 h-px bg-primary/20 hidden md:block" />
            <div className="absolute left-1/2 top-1/2 w-16 h-16 md:w-20 md:h-20 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/20" />
          </div>

          {/* Mobile Layout (Vertical) */}
          <div ref={mobileContainerRef} className="md:hidden relative flex flex-col gap-6 p-4 min-h-[420px]">
            <ChemistryLinks articles={articles} containerRef={mobileContainerRef} />
            
            {/* Forwards */}
            <div className="flex justify-center gap-3 flex-wrap relative z-10">
              {forwards.map((article) => (
                <div key={article.id} data-article-id={article.id}>
                  <ArticleNode article={article} onClick={() => handleArticleClick(article)} />
                </div>
              ))}
            </div>

            {/* Midfield */}
            <div className="flex justify-center gap-3 flex-wrap flex-1 items-center relative z-10">
              {midfielders.map((article) => (
                <div key={article.id} data-article-id={article.id}>
                  <ArticleNode article={article} onClick={() => handleArticleClick(article)} />
                </div>
              ))}
            </div>

            {/* Defense */}
            <div className="flex justify-center gap-3 flex-wrap relative z-10">
              {defenders.map((article) => (
                <div key={article.id} data-article-id={article.id}>
                  <ArticleNode article={article} onClick={() => handleArticleClick(article)} />
                </div>
              ))}
            </div>

            {/* Goalkeeper */}
            <div className="flex justify-center relative z-10">
              {goalkeeper && (
                <div data-article-id={goalkeeper.id}>
                  <ArticleNode article={goalkeeper} onClick={() => handleArticleClick(goalkeeper)} isGoalkeeper />
                </div>
              )}
            </div>
          </div>

          {/* Desktop Layout (Horizontal) */}
          <div ref={desktopContainerRef} className="hidden md:grid grid-cols-4 gap-6 p-6 min-h-[280px] relative">
            <ChemistryLinks articles={articles} containerRef={desktopContainerRef} />
            
            {/* Goalkeeper (Left) */}
            <div className="flex items-center justify-center relative z-10">
              {goalkeeper && (
                <div data-article-id={goalkeeper.id}>
                  <ArticleNode article={goalkeeper} onClick={() => handleArticleClick(goalkeeper)} isGoalkeeper />
                </div>
              )}
            </div>

            {/* Defense */}
            <div className="flex flex-col justify-around items-center relative z-10">
              {defenders.map((article) => (
                <div key={article.id} data-article-id={article.id}>
                  <ArticleNode article={article} onClick={() => handleArticleClick(article)} />
                </div>
              ))}
            </div>

            {/* Midfield */}
            <div className="flex flex-col justify-around items-center relative z-10">
              {midfielders.map((article) => (
                <div key={article.id} data-article-id={article.id}>
                  <ArticleNode article={article} onClick={() => handleArticleClick(article)} />
                </div>
              ))}
            </div>

            {/* Forwards (Right) */}
            <div className="flex flex-col justify-around items-center relative z-10">
              {forwards.map((article) => (
                <div key={article.id} data-article-id={article.id}>
                  <ArticleNode article={article} onClick={() => handleArticleClick(article)} />
                </div>
              ))}
            </div>
          </div>

          {/* Chemistry Legend */}
          <div className="flex flex-wrap gap-3 p-3 border-t border-primary/20 bg-background/50 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-4 h-1 rounded bg-primary" />
              <span className="text-muted-foreground">Excellent</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-1 rounded bg-[hsl(var(--wiki-gold))]" />
              <span className="text-muted-foreground">Good</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-1 rounded bg-orange-500" />
              <span className="text-muted-foreground">Weak</span>
            </div>
          </div>
        </div>
      </CardContent>

      {/* Contract Detail Dialog */}
      <ArticleContractDetailDialog
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
        onSwap={handleSwap}
        allArticles={articles}
      />
    </Card>
  );
};
