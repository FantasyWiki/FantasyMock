import { useState, useMemo } from "react";
import { Header } from "@/components/Header";
import { TeamFormation } from "@/components/team/TeamFormation";
import { BenchSection } from "@/components/team/BenchSection";
import { FormationSelector } from "@/components/team/FormationSelector";
import { ArticleContractDetailDialog } from "@/components/team/ArticleContractDetailDialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Layers } from "lucide-react";
import { useLeague } from "@/contexts/LeagueContext";

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
  leagueId?: string;
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

// Mock data with league assignments
const allTeamArticles: Record<string, Article[]> = {
  global: [
    { id: "1", name: "Bitcoin", chemistry: "green", points: 45, contractEnd: "2024-03-15", contractLength: "1 Month", purchasePrice: 500, currentValue: 580, position: "forward", leagueId: "global" },
    { id: "2", name: "Ethereum", chemistry: "yellow", points: 38, contractEnd: "2024-02-28", contractLength: "2 Weeks", purchasePrice: 400, currentValue: 420, position: "forward", leagueId: "global" },
    { id: "3", name: "AI", chemistry: "green", points: 42, contractEnd: "2024-03-20", contractLength: "1 Month", purchasePrice: 450, currentValue: 510, position: "forward", leagueId: "global" },
    { id: "4", name: "Cloud Computing", chemistry: "yellow", points: 28, contractEnd: "2024-02-25", contractLength: "1 Week", purchasePrice: 300, currentValue: 290, position: "midfield", leagueId: "global" },
    { id: "5", name: "Machine Learning", chemistry: "green", points: 35, contractEnd: "2024-03-10", contractLength: "1 Month", purchasePrice: 380, currentValue: 400, position: "midfield", leagueId: "global" },
    { id: "6", name: "Blockchain", chemistry: "green", points: 32, contractEnd: "2024-03-05", contractLength: "2 Weeks", purchasePrice: 350, currentValue: 360, position: "midfield", leagueId: "global" },
    { id: "7", name: "Python", chemistry: "orange", points: 22, contractEnd: "2024-02-20", contractLength: "1 Week", purchasePrice: 250, currentValue: 240, position: "defense", leagueId: "global" },
    { id: "8", name: "JavaScript", chemistry: "green", points: 25, contractEnd: "2024-03-08", contractLength: "2 Weeks", purchasePrice: 280, currentValue: 300, position: "defense", leagueId: "global" },
    { id: "9", name: "React", chemistry: "yellow", points: 24, contractEnd: "2024-02-28", contractLength: "1 Week", purchasePrice: 260, currentValue: 270, position: "defense", leagueId: "global" },
    { id: "10", name: "TypeScript", chemistry: "green", points: 21, contractEnd: "2024-03-12", contractLength: "1 Month", purchasePrice: 240, currentValue: 255, position: "defense", leagueId: "global" },
    { id: "11", name: "Wikipedia", chemistry: "green", points: 50, contractEnd: "2024-03-25", contractLength: "1 Month", purchasePrice: 600, currentValue: 650, position: "goalkeeper", leagueId: "global" },
  ],
  europe: [
    { id: "e1", name: "Paris", chemistry: "green", points: 52, contractEnd: "2024-03-15", contractLength: "1 Month", purchasePrice: 520, currentValue: 600, position: "forward", leagueId: "europe" },
    { id: "e2", name: "Berlin", chemistry: "yellow", points: 40, contractEnd: "2024-02-28", contractLength: "2 Weeks", purchasePrice: 420, currentValue: 450, position: "forward", leagueId: "europe" },
    { id: "e3", name: "Rome", chemistry: "green", points: 38, contractEnd: "2024-03-20", contractLength: "1 Month", purchasePrice: 400, currentValue: 430, position: "forward", leagueId: "europe" },
    { id: "e4", name: "Madrid", chemistry: "green", points: 35, contractEnd: "2024-02-25", contractLength: "1 Week", purchasePrice: 350, currentValue: 380, position: "midfield", leagueId: "europe" },
    { id: "e5", name: "London", chemistry: "yellow", points: 42, contractEnd: "2024-03-10", contractLength: "1 Month", purchasePrice: 450, currentValue: 480, position: "midfield", leagueId: "europe" },
    { id: "e6", name: "Amsterdam", chemistry: "green", points: 30, contractEnd: "2024-03-05", contractLength: "2 Weeks", purchasePrice: 300, currentValue: 320, position: "midfield", leagueId: "europe" },
    { id: "e7", name: "Vienna", chemistry: "orange", points: 25, contractEnd: "2024-02-20", contractLength: "1 Week", purchasePrice: 280, currentValue: 270, position: "defense", leagueId: "europe" },
    { id: "e8", name: "Prague", chemistry: "green", points: 28, contractEnd: "2024-03-08", contractLength: "2 Weeks", purchasePrice: 300, currentValue: 320, position: "defense", leagueId: "europe" },
    { id: "e9", name: "Dublin", chemistry: "yellow", points: 22, contractEnd: "2024-02-28", contractLength: "1 Week", purchasePrice: 240, currentValue: 250, position: "defense", leagueId: "europe" },
    { id: "e10", name: "Stockholm", chemistry: "green", points: 26, contractEnd: "2024-03-12", contractLength: "1 Month", purchasePrice: 280, currentValue: 300, position: "defense", leagueId: "europe" },
    { id: "e11", name: "Euro", chemistry: "green", points: 55, contractEnd: "2024-03-25", contractLength: "1 Month", purchasePrice: 650, currentValue: 700, position: "goalkeeper", leagueId: "europe" },
  ],
  americas: [
    { id: "a1", name: "New York", chemistry: "green", points: 48, contractEnd: "2024-03-15", contractLength: "1 Month", purchasePrice: 480, currentValue: 550, position: "forward", leagueId: "americas" },
    { id: "a2", name: "Los Angeles", chemistry: "yellow", points: 44, contractEnd: "2024-02-28", contractLength: "2 Weeks", purchasePrice: 440, currentValue: 470, position: "forward", leagueId: "americas" },
    { id: "a3", name: "São Paulo", chemistry: "green", points: 36, contractEnd: "2024-03-20", contractLength: "1 Month", purchasePrice: 380, currentValue: 400, position: "forward", leagueId: "americas" },
    { id: "a4", name: "Toronto", chemistry: "yellow", points: 32, contractEnd: "2024-02-25", contractLength: "1 Week", purchasePrice: 320, currentValue: 340, position: "midfield", leagueId: "americas" },
    { id: "a5", name: "Chicago", chemistry: "green", points: 30, contractEnd: "2024-03-10", contractLength: "1 Month", purchasePrice: 300, currentValue: 320, position: "midfield", leagueId: "americas" },
    { id: "a6", name: "Mexico City", chemistry: "green", points: 34, contractEnd: "2024-03-05", contractLength: "2 Weeks", purchasePrice: 360, currentValue: 380, position: "midfield", leagueId: "americas" },
    { id: "a7", name: "Miami", chemistry: "orange", points: 26, contractEnd: "2024-02-20", contractLength: "1 Week", purchasePrice: 270, currentValue: 260, position: "defense", leagueId: "americas" },
    { id: "a8", name: "Vancouver", chemistry: "green", points: 24, contractEnd: "2024-03-08", contractLength: "2 Weeks", purchasePrice: 260, currentValue: 280, position: "defense", leagueId: "americas" },
    { id: "a9", name: "Buenos Aires", chemistry: "yellow", points: 28, contractEnd: "2024-02-28", contractLength: "1 Week", purchasePrice: 290, currentValue: 300, position: "defense", leagueId: "americas" },
    { id: "a10", name: "Lima", chemistry: "green", points: 22, contractEnd: "2024-03-12", contractLength: "1 Month", purchasePrice: 230, currentValue: 240, position: "defense", leagueId: "americas" },
    { id: "a11", name: "Dollar", chemistry: "green", points: 58, contractEnd: "2024-03-25", contractLength: "1 Month", purchasePrice: 620, currentValue: 680, position: "goalkeeper", leagueId: "americas" },
  ],
  asia: [
    { id: "as1", name: "Tokyo", chemistry: "green", points: 55, contractEnd: "2024-03-15", contractLength: "1 Month", purchasePrice: 560, currentValue: 620, position: "forward", leagueId: "asia" },
    { id: "as2", name: "Shanghai", chemistry: "yellow", points: 50, contractEnd: "2024-02-28", contractLength: "2 Weeks", purchasePrice: 500, currentValue: 530, position: "forward", leagueId: "asia" },
    { id: "as3", name: "Seoul", chemistry: "green", points: 46, contractEnd: "2024-03-20", contractLength: "1 Month", purchasePrice: 480, currentValue: 510, position: "forward", leagueId: "asia" },
    { id: "as4", name: "Singapore", chemistry: "green", points: 38, contractEnd: "2024-02-25", contractLength: "1 Week", purchasePrice: 400, currentValue: 420, position: "midfield", leagueId: "asia" },
    { id: "as5", name: "Hong Kong", chemistry: "yellow", points: 42, contractEnd: "2024-03-10", contractLength: "1 Month", purchasePrice: 450, currentValue: 470, position: "midfield", leagueId: "asia" },
    { id: "as6", name: "Mumbai", chemistry: "green", points: 35, contractEnd: "2024-03-05", contractLength: "2 Weeks", purchasePrice: 370, currentValue: 390, position: "midfield", leagueId: "asia" },
    { id: "as7", name: "Bangkok", chemistry: "orange", points: 28, contractEnd: "2024-02-20", contractLength: "1 Week", purchasePrice: 300, currentValue: 290, position: "defense", leagueId: "asia" },
    { id: "as8", name: "Taipei", chemistry: "green", points: 30, contractEnd: "2024-03-08", contractLength: "2 Weeks", purchasePrice: 320, currentValue: 340, position: "defense", leagueId: "asia" },
    { id: "as9", name: "Jakarta", chemistry: "yellow", points: 26, contractEnd: "2024-02-28", contractLength: "1 Week", purchasePrice: 280, currentValue: 290, position: "defense", leagueId: "asia" },
    { id: "as10", name: "Manila", chemistry: "green", points: 24, contractEnd: "2024-03-12", contractLength: "1 Month", purchasePrice: 260, currentValue: 275, position: "defense", leagueId: "asia" },
    { id: "as11", name: "Yen", chemistry: "green", points: 60, contractEnd: "2024-03-25", contractLength: "1 Month", purchasePrice: 680, currentValue: 750, position: "goalkeeper", leagueId: "asia" },
  ],
  premier: [
    { id: "p1", name: "Gold", chemistry: "green", points: 65, contractEnd: "2024-03-15", contractLength: "1 Month", purchasePrice: 700, currentValue: 780, position: "forward", leagueId: "premier" },
    { id: "p2", name: "Silver", chemistry: "yellow", points: 58, contractEnd: "2024-02-28", contractLength: "2 Weeks", purchasePrice: 600, currentValue: 640, position: "forward", leagueId: "premier" },
    { id: "p3", name: "Platinum", chemistry: "green", points: 52, contractEnd: "2024-03-20", contractLength: "1 Month", purchasePrice: 550, currentValue: 590, position: "forward", leagueId: "premier" },
    { id: "p4", name: "Diamond", chemistry: "green", points: 48, contractEnd: "2024-02-25", contractLength: "1 Week", purchasePrice: 500, currentValue: 530, position: "midfield", leagueId: "premier" },
    { id: "p5", name: "Ruby", chemistry: "yellow", points: 45, contractEnd: "2024-03-10", contractLength: "1 Month", purchasePrice: 480, currentValue: 500, position: "midfield", leagueId: "premier" },
    { id: "p6", name: "Emerald", chemistry: "green", points: 42, contractEnd: "2024-03-05", contractLength: "2 Weeks", purchasePrice: 450, currentValue: 470, position: "midfield", leagueId: "premier" },
    { id: "p7", name: "Sapphire", chemistry: "orange", points: 38, contractEnd: "2024-02-20", contractLength: "1 Week", purchasePrice: 400, currentValue: 390, position: "defense", leagueId: "premier" },
    { id: "p8", name: "Amethyst", chemistry: "green", points: 35, contractEnd: "2024-03-08", contractLength: "2 Weeks", purchasePrice: 380, currentValue: 400, position: "defense", leagueId: "premier" },
    { id: "p9", name: "Topaz", chemistry: "yellow", points: 32, contractEnd: "2024-02-28", contractLength: "1 Week", purchasePrice: 350, currentValue: 360, position: "defense", leagueId: "premier" },
    { id: "p10", name: "Opal", chemistry: "green", points: 30, contractEnd: "2024-03-12", contractLength: "1 Month", purchasePrice: 320, currentValue: 340, position: "defense", leagueId: "premier" },
    { id: "p11", name: "Crown", chemistry: "green", points: 70, contractEnd: "2024-03-25", contractLength: "1 Month", purchasePrice: 800, currentValue: 900, position: "goalkeeper", leagueId: "premier" },
  ],
  champions: [
    { id: "c1", name: "Universe", chemistry: "green", points: 75, contractEnd: "2024-03-15", contractLength: "1 Month", purchasePrice: 850, currentValue: 950, position: "forward", leagueId: "champions" },
    { id: "c2", name: "Galaxy", chemistry: "yellow", points: 68, contractEnd: "2024-02-28", contractLength: "2 Weeks", purchasePrice: 750, currentValue: 800, position: "forward", leagueId: "champions" },
    { id: "c3", name: "Cosmos", chemistry: "green", points: 62, contractEnd: "2024-03-20", contractLength: "1 Month", purchasePrice: 680, currentValue: 720, position: "forward", leagueId: "champions" },
    { id: "c4", name: "Nebula", chemistry: "green", points: 55, contractEnd: "2024-02-25", contractLength: "1 Week", purchasePrice: 600, currentValue: 640, position: "midfield", leagueId: "champions" },
    { id: "c5", name: "Supernova", chemistry: "yellow", points: 52, contractEnd: "2024-03-10", contractLength: "1 Month", purchasePrice: 580, currentValue: 610, position: "midfield", leagueId: "champions" },
    { id: "c6", name: "Quasar", chemistry: "green", points: 48, contractEnd: "2024-03-05", contractLength: "2 Weeks", purchasePrice: 520, currentValue: 550, position: "midfield", leagueId: "champions" },
    { id: "c7", name: "Pulsar", chemistry: "orange", points: 42, contractEnd: "2024-02-20", contractLength: "1 Week", purchasePrice: 460, currentValue: 450, position: "defense", leagueId: "champions" },
    { id: "c8", name: "Comet", chemistry: "green", points: 40, contractEnd: "2024-03-08", contractLength: "2 Weeks", purchasePrice: 440, currentValue: 460, position: "defense", leagueId: "champions" },
    { id: "c9", name: "Meteor", chemistry: "yellow", points: 38, contractEnd: "2024-02-28", contractLength: "1 Week", purchasePrice: 420, currentValue: 430, position: "defense", leagueId: "champions" },
    { id: "c10", name: "Asteroid", chemistry: "green", points: 35, contractEnd: "2024-03-12", contractLength: "1 Month", purchasePrice: 380, currentValue: 400, position: "defense", leagueId: "champions" },
    { id: "c11", name: "Star", chemistry: "green", points: 80, contractEnd: "2024-03-25", contractLength: "1 Month", purchasePrice: 950, currentValue: 1100, position: "goalkeeper", leagueId: "champions" },
  ],
};

const allBenchArticles: Record<string, Article[]> = {
  global: [
    { id: "12", name: "Vue.js", chemistry: "none", points: 18, contractEnd: "2024-02-18", contractLength: "1 Week", purchasePrice: 200, currentValue: 210, position: "midfield", leagueId: "global" },
    { id: "13", name: "Angular", chemistry: "none", points: 15, contractEnd: "2024-02-22", contractLength: "1 Week", purchasePrice: 180, currentValue: 175, position: "defense", leagueId: "global" },
    { id: "14", name: "Solana", chemistry: "none", points: 30, contractEnd: "2024-03-01", contractLength: "2 Weeks", purchasePrice: 320, currentValue: 350, position: "forward", leagueId: "global" },
  ],
  europe: [
    { id: "eb1", name: "Brussels", chemistry: "none", points: 20, contractEnd: "2024-02-18", contractLength: "1 Week", purchasePrice: 220, currentValue: 230, position: "midfield", leagueId: "europe" },
    { id: "eb2", name: "Warsaw", chemistry: "none", points: 18, contractEnd: "2024-02-22", contractLength: "1 Week", purchasePrice: 200, currentValue: 210, position: "defense", leagueId: "europe" },
  ],
  americas: [
    { id: "ab1", name: "Seattle", chemistry: "none", points: 22, contractEnd: "2024-02-18", contractLength: "1 Week", purchasePrice: 240, currentValue: 250, position: "midfield", leagueId: "americas" },
    { id: "ab2", name: "Denver", chemistry: "none", points: 19, contractEnd: "2024-02-22", contractLength: "1 Week", purchasePrice: 210, currentValue: 220, position: "defense", leagueId: "americas" },
  ],
  asia: [
    { id: "asb1", name: "Osaka", chemistry: "none", points: 28, contractEnd: "2024-02-18", contractLength: "1 Week", purchasePrice: 300, currentValue: 310, position: "midfield", leagueId: "asia" },
    { id: "asb2", name: "Delhi", chemistry: "none", points: 24, contractEnd: "2024-02-22", contractLength: "1 Week", purchasePrice: 260, currentValue: 270, position: "defense", leagueId: "asia" },
  ],
  premier: [
    { id: "pb1", name: "Pearl", chemistry: "none", points: 28, contractEnd: "2024-02-18", contractLength: "1 Week", purchasePrice: 300, currentValue: 310, position: "midfield", leagueId: "premier" },
  ],
  champions: [
    { id: "cb1", name: "Orbit", chemistry: "none", points: 35, contractEnd: "2024-02-18", contractLength: "1 Week", purchasePrice: 380, currentValue: 400, position: "forward", leagueId: "champions" },
  ],
};

export default function Team() {
  const { currentLeague } = useLeague();
  const [currentFormation, setCurrentFormation] = useState<Formation>(formations[0]);
  
  // Get articles for current league
  const leagueTeamArticles = useMemo(() => {
    return allTeamArticles[currentLeague.id] || allTeamArticles.global;
  }, [currentLeague.id]);
  
  const leagueBenchArticles = useMemo(() => {
    return allBenchArticles[currentLeague.id] || allBenchArticles.global;
  }, [currentLeague.id]);
  
  const [teamArticles, setTeamArticles] = useState<Article[]>(leagueTeamArticles);
  const [benchArticles, setBenchArticles] = useState<Article[]>(leagueBenchArticles);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [swapMode, setSwapMode] = useState<{ enabled: boolean; article: Article | null }>({ enabled: false, article: null });
  const [draggedArticle, setDraggedArticle] = useState<Article | null>(null);
  const [dragOverArticle, setDragOverArticle] = useState<Article | null>(null);

  // Update articles when league changes
  useMemo(() => {
    setTeamArticles(leagueTeamArticles);
    setBenchArticles(leagueBenchArticles);
  }, [leagueTeamArticles, leagueBenchArticles]);

  const handleArticleClick = (article: Article) => {
    if (swapMode.enabled && swapMode.article) {
      handleSwapArticles(swapMode.article, article);
      setSwapMode({ enabled: false, article: null });
    } else {
      setSelectedArticle(article);
    }
  };

  const handleSwapArticles = (fromArticle: Article, toArticle: Article) => {
    if (fromArticle.id === toArticle.id) return;
    
    const fromInTeam = teamArticles.find(a => a.id === fromArticle.id);
    const toInTeam = teamArticles.find(a => a.id === toArticle.id);

    if (fromInTeam && toInTeam) {
      setTeamArticles(prev => prev.map(a => {
        if (a.id === fromArticle.id) return { ...toArticle, position: fromArticle.position };
        if (a.id === toArticle.id) return { ...fromArticle, position: toArticle.position };
        return a;
      }));
    } else if (fromInTeam && !toInTeam) {
      setTeamArticles(prev => prev.map(a => 
        a.id === fromArticle.id ? { ...toArticle, position: fromArticle.position } : a
      ));
      setBenchArticles(prev => [...prev.filter(a => a.id !== toArticle.id), { ...fromArticle, position: "bench" }]);
    } else if (!fromInTeam && toInTeam) {
      setTeamArticles(prev => prev.map(a => 
        a.id === toArticle.id ? { ...fromArticle, position: toArticle.position } : a
      ));
      setBenchArticles(prev => [...prev.filter(a => a.id !== fromArticle.id), { ...toArticle, position: "bench" }]);
    } else {
      // Both on bench - just swap positions in bench array
      setBenchArticles(prev => {
        const fromIdx = prev.findIndex(a => a.id === fromArticle.id);
        const toIdx = prev.findIndex(a => a.id === toArticle.id);
        const newBench = [...prev];
        [newBench[fromIdx], newBench[toIdx]] = [newBench[toIdx], newBench[fromIdx]];
        return newBench;
      });
    }
  };

  const handleDragStart = (article: Article) => {
    setDraggedArticle(article);
  };

  const handleDragOver = (article: Article) => {
    if (draggedArticle && article.id !== draggedArticle.id) {
      setDragOverArticle(article);
    }
  };

  const handleDrop = (targetArticle: Article) => {
    if (draggedArticle && draggedArticle.id !== targetArticle.id) {
      handleSwapArticles(draggedArticle, targetArticle);
    }
    setDraggedArticle(null);
    setDragOverArticle(null);
  };

  const handleDragEnd = () => {
    setDraggedArticle(null);
    setDragOverArticle(null);
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
            <div>
              <h1 className="text-2xl md:text-3xl font-serif font-bold">Team Management</h1>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="secondary" className="text-xs">
                  {currentLeague.icon} {currentLeague.name}
                </Badge>
              </div>
            </div>
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
          <CardContent className="p-2 md:p-6" onDragEnd={handleDragEnd}>
            <TeamFormation
              formation={currentFormation}
              articles={getArticlesByPosition()}
              onArticleClick={handleArticleClick}
              swapMode={swapMode.enabled}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              dragOverArticle={dragOverArticle}
            />
          </CardContent>
        </Card>

        {/* Bench Section */}
        <BenchSection
          articles={benchArticles}
          onArticleClick={handleArticleClick}
          swapMode={swapMode.enabled}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onDragEnd={handleDragEnd}
          dragOverArticle={dragOverArticle}
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
