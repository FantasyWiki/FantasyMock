import { useState } from "react";
import { Header } from "@/components/Header";
import { TeamFormation } from "@/components/team/TeamFormation";
import { BenchSection } from "@/components/team/BenchSection";
import { FormationSelector } from "@/components/team/FormationSelector";
import { ArticleContractDetailDialog } from "@/components/team/ArticleContractDetailDialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Layers } from "lucide-react";

export interface Article {
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

export interface Formation {
  id: string;
  name: string;
  positions: {
    forwards: number;
    midfielders: number;
    defenders: number;
  };
}

const formations: Formation[] = [
  { id: "4-3-3", name: "4-3-3", positions: { forwards: 3, midfielders: 3, defenders: 4 } },
  { id: "4-4-2", name: "4-4-2", positions: { forwards: 2, midfielders: 4, defenders: 4 } },
  { id: "3-5-2", name: "3-5-2", positions: { forwards: 2, midfielders: 5, defenders: 3 } },
  { id: "4-2-3-1", name: "4-2-3-1", positions: { forwards: 1, midfielders: 5, defenders: 4 } },
  { id: "5-3-2", name: "5-3-2", positions: { forwards: 2, midfielders: 3, defenders: 5 } },
];

// Mock data
const mockTeamArticles: Article[] = [
  { id: "1", name: "Bitcoin", chemistry: "green", points: 45, contractEnd: "2024-03-15", contractLength: "1 Month", purchasePrice: 500, currentValue: 580, position: "forward" },
  { id: "2", name: "Ethereum", chemistry: "yellow", points: 38, contractEnd: "2024-02-28", contractLength: "2 Weeks", purchasePrice: 400, currentValue: 420, position: "forward" },
  { id: "3", name: "AI", chemistry: "green", points: 42, contractEnd: "2024-03-20", contractLength: "1 Month", purchasePrice: 450, currentValue: 510, position: "forward" },
  { id: "4", name: "Cloud Computing", chemistry: "yellow", points: 28, contractEnd: "2024-02-25", contractLength: "1 Week", purchasePrice: 300, currentValue: 290, position: "midfield" },
  { id: "5", name: "Machine Learning", chemistry: "green", points: 35, contractEnd: "2024-03-10", contractLength: "1 Month", purchasePrice: 380, currentValue: 400, position: "midfield" },
  { id: "6", name: "Blockchain", chemistry: "green", points: 32, contractEnd: "2024-03-05", contractLength: "2 Weeks", purchasePrice: 350, currentValue: 360, position: "midfield" },
  { id: "7", name: "Python", chemistry: "orange", points: 22, contractEnd: "2024-02-20", contractLength: "1 Week", purchasePrice: 250, currentValue: 240, position: "defense" },
  { id: "8", name: "JavaScript", chemistry: "green", points: 25, contractEnd: "2024-03-08", contractLength: "2 Weeks", purchasePrice: 280, currentValue: 300, position: "defense" },
  { id: "9", name: "React", chemistry: "yellow", points: 24, contractEnd: "2024-02-28", contractLength: "1 Week", purchasePrice: 260, currentValue: 270, position: "defense" },
  { id: "10", name: "TypeScript", chemistry: "green", points: 21, contractEnd: "2024-03-12", contractLength: "1 Month", purchasePrice: 240, currentValue: 255, position: "defense" },
  { id: "11", name: "Wikipedia", chemistry: "green", points: 50, contractEnd: "2024-03-25", contractLength: "1 Month", purchasePrice: 600, currentValue: 650, position: "goalkeeper" },
];

const mockBenchArticles: Article[] = [
  { id: "12", name: "Vue.js", chemistry: "none", points: 18, contractEnd: "2024-02-18", contractLength: "1 Week", purchasePrice: 200, currentValue: 210, position: "midfield" },
  { id: "13", name: "Angular", chemistry: "none", points: 15, contractEnd: "2024-02-22", contractLength: "1 Week", purchasePrice: 180, currentValue: 175, position: "defense" },
  { id: "14", name: "Solana", chemistry: "none", points: 30, contractEnd: "2024-03-01", contractLength: "2 Weeks", purchasePrice: 320, currentValue: 350, position: "forward" },
  { id: "15", name: "Cardano", chemistry: "none", points: 20, contractEnd: "2024-02-26", contractLength: "1 Week", purchasePrice: 220, currentValue: 215, position: "midfield" },
];

export default function Team() {
  const [currentFormation, setCurrentFormation] = useState<Formation>(formations[0]);
  const [teamArticles, setTeamArticles] = useState<Article[]>(mockTeamArticles);
  const [benchArticles, setBenchArticles] = useState<Article[]>(mockBenchArticles);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [swapMode, setSwapMode] = useState<{ enabled: boolean; article: Article | null }>({ enabled: false, article: null });

  const handleArticleClick = (article: Article) => {
    if (swapMode.enabled && swapMode.article) {
      // Perform swap
      handleSwapArticles(swapMode.article, article);
      setSwapMode({ enabled: false, article: null });
    } else {
      setSelectedArticle(article);
    }
  };

  const handleSwapArticles = (fromArticle: Article, toArticle: Article) => {
    const fromInTeam = teamArticles.find(a => a.id === fromArticle.id);
    const toInTeam = teamArticles.find(a => a.id === toArticle.id);

    if (fromInTeam && toInTeam) {
      // Both in team - swap positions
      setTeamArticles(prev => prev.map(a => {
        if (a.id === fromArticle.id) return { ...toArticle, position: fromArticle.position };
        if (a.id === toArticle.id) return { ...fromArticle, position: toArticle.position };
        return a;
      }));
    } else if (fromInTeam && !toInTeam) {
      // From team to bench
      setTeamArticles(prev => prev.map(a => 
        a.id === fromArticle.id ? { ...toArticle, position: fromArticle.position } : a
      ));
      setBenchArticles(prev => [...prev.filter(a => a.id !== toArticle.id), { ...fromArticle, position: "bench" }]);
    } else if (!fromInTeam && toInTeam) {
      // From bench to team
      setTeamArticles(prev => prev.map(a => 
        a.id === toArticle.id ? { ...fromArticle, position: toArticle.position } : a
      ));
      setBenchArticles(prev => [...prev.filter(a => a.id !== fromArticle.id), { ...toArticle, position: "bench" }]);
    }
  };

  const handleInitiateSwap = (article: Article) => {
    setSwapMode({ enabled: true, article });
    setSelectedArticle(null);
  };

  const handleCancelSwap = () => {
    setSwapMode({ enabled: false, article: null });
  };

  const getArticlesByPosition = () => {
    const forwards = teamArticles.filter(a => a.position === "forward").slice(0, currentFormation.positions.forwards);
    const midfielders = teamArticles.filter(a => a.position === "midfield").slice(0, currentFormation.positions.midfielders);
    const defenders = teamArticles.filter(a => a.position === "defense").slice(0, currentFormation.positions.defenders);
    const goalkeeper = teamArticles.find(a => a.position === "goalkeeper");
    
    return { forwards, midfielders, defenders, goalkeeper };
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Header />
      
      <main className="container mx-auto px-4 pt-20 md:pt-24">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Layers className="h-5 w-5 text-primary" />
            </div>
            <h1 className="text-2xl md:text-3xl font-serif font-bold">Team Management</h1>
          </div>
          <p className="text-muted-foreground">Manage your formation and article lineup</p>
        </div>

        {/* Swap Mode Indicator */}
        {swapMode.enabled && (
          <Card className="mb-4 border-primary bg-primary/5">
            <CardContent className="py-3 flex items-center justify-between">
              <p className="text-sm font-medium">
                Select an article to swap with <span className="text-primary">{swapMode.article?.name}</span>
              </p>
              <button 
                onClick={handleCancelSwap}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Cancel
              </button>
            </CardContent>
          </Card>
        )}

        {/* Formation Selector */}
        <FormationSelector
          formations={formations}
          currentFormation={currentFormation}
          onFormationChange={setCurrentFormation}
        />

        {/* Team Formation */}
        <Card className="mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Starting Lineup</CardTitle>
          </CardHeader>
          <CardContent className="p-2 md:p-6">
            <TeamFormation
              formation={currentFormation}
              articles={getArticlesByPosition()}
              onArticleClick={handleArticleClick}
              swapMode={swapMode.enabled}
            />
          </CardContent>
        </Card>

        {/* Bench Section */}
        <BenchSection
          articles={benchArticles}
          onArticleClick={handleArticleClick}
          swapMode={swapMode.enabled}
        />

        {/* Contract Detail Dialog */}
        <ArticleContractDetailDialog
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
          onSwap={handleInitiateSwap}
          allArticles={getArticlesByPosition()}
        />
      </main>
    </div>
  );
}
