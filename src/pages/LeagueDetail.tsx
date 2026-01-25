import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Trophy, 
  TrendingUp, 
  TrendingDown, 
  Crown, 
  Medal, 
  Users, 
  Globe, 
  Calendar,
  ChevronUp,
  ChevronDown,
  ArrowLeft
} from "lucide-react";
import { useLeague } from "@/contexts/LeagueContext";
import { 
  leaderboardsByLeague, 
  leagueInfo, 
  getPlayersAroundUser, 
  getTopPlayers,
  type LeaderboardPlayer 
} from "@/data/leagueData";

type ViewMode = "around-me" | "top" | "full";

const getRankIcon = (rank: number) => {
  if (rank === 1) return <Crown className="h-4 w-4 text-[hsl(var(--wiki-gold))]" />;
  if (rank <= 3) return <Medal className="h-4 w-4 text-primary" />;
  return null;
};

const LeagueDetail = () => {
  const navigate = useNavigate();
  const { currentLeague } = useLeague();
  const [viewMode, setViewMode] = useState<ViewMode>("around-me");
  const [isExpanded, setIsExpanded] = useState(false);

  const currentLeagueInfo = useMemo(() => {
    return leagueInfo[currentLeague.id] || leagueInfo.global;
  }, [currentLeague.id]);

  const allPlayers = useMemo(() => {
    return leaderboardsByLeague[currentLeague.id] || leaderboardsByLeague.global;
  }, [currentLeague.id]);

  const displayedPlayers = useMemo(() => {
    let players: LeaderboardPlayer[];
    
    switch (viewMode) {
      case "top":
        players = getTopPlayers(currentLeague.id, 10);
        break;
      case "full":
        players = [...allPlayers].sort((a, b) => a.rank - b.rank);
        break;
      case "around-me":
      default:
        players = getPlayersAroundUser(currentLeague.id, 2);
        break;
    }

    if (!isExpanded && viewMode !== "full") {
      return players.slice(0, 5);
    }
    
    return players;
  }, [currentLeague.id, viewMode, isExpanded, allPlayers]);

  const userPlayer = allPlayers.find(p => p.isCurrentUser);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 pt-24">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate("/dashboard")}
          className="mb-6 gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Button>

        {/* League Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-16 w-16 rounded-xl bg-[hsl(var(--wiki-gold))]/20 flex items-center justify-center text-3xl">
              {currentLeague.icon}
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                {currentLeague.name}
              </h1>
              <p className="text-muted-foreground mt-1">
                {currentLeagueInfo.description}
              </p>
            </div>
          </div>

          {/* League Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <Card className="bg-card">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{currentLeagueInfo.totalPlayers}</p>
                  <p className="text-sm text-muted-foreground">Participants</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Globe className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-lg font-bold text-foreground">{currentLeagueInfo.language}</p>
                  <p className="text-sm text-muted-foreground">Wikipedia</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-lg font-bold text-foreground">{currentLeagueInfo.endDate}</p>
                  <p className="text-sm text-muted-foreground">Season Ends</p>
                </div>
              </CardContent>
            </Card>

            {userPlayer && (
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Trophy className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-primary">#{userPlayer.rank}</p>
                    <p className="text-sm text-muted-foreground">Your Rank</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Leaderboard */}
        <Card className="bg-card">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-[hsl(var(--wiki-gold))]" />
                Leaderboard
              </CardTitle>
              
              {/* View Mode Buttons */}
              <div className="flex gap-2 flex-wrap">
                <Button
                  variant={viewMode === "around-me" ? "default" : "outline"}
                  size="sm"
                  onClick={() => { setViewMode("around-me"); setIsExpanded(false); }}
                >
                  Around Me
                </Button>
                <Button
                  variant={viewMode === "top" ? "default" : "outline"}
                  size="sm"
                  onClick={() => { setViewMode("top"); setIsExpanded(false); }}
                >
                  Top 10
                </Button>
                <Button
                  variant={viewMode === "full" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("full")}
                >
                  Full Leaderboard
                </Button>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-2">
            {displayedPlayers.map((player) => (
              <div
                key={player.rank}
                className={`flex items-center justify-between p-4 rounded-lg transition-colors ${
                  player.isCurrentUser
                    ? 'bg-primary/10 border border-primary/30'
                    : 'hover:bg-muted/50'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                    player.rank <= 3
                      ? 'bg-[hsl(var(--wiki-gold))]/20 text-[hsl(var(--wiki-gold))]'
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {player.rank}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`font-medium ${player.isCurrentUser ? 'text-primary' : 'text-foreground'}`}>
                        {player.name}
                      </span>
                      {getRankIcon(player.rank)}
                      {player.isCurrentUser && (
                        <Badge variant="secondary" className="text-xs">You</Badge>
                      )}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {player.points.toLocaleString()} points
                    </span>
                  </div>
                </div>
                
                <div className={`flex items-center gap-1 text-sm ${
                  player.change >= 0 ? 'text-primary' : 'text-destructive'
                }`}>
                  {player.change >= 0 ? (
                    <TrendingUp className="h-4 w-4" />
                  ) : (
                    <TrendingDown className="h-4 w-4" />
                  )}
                  <span>{player.change >= 0 ? '+' : ''}{player.change}%</span>
                </div>
              </div>
            ))}

            {/* Expand/Collapse Button */}
            {viewMode !== "full" && (
              <Button
                variant="ghost"
                className="w-full mt-4 gap-2"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? (
                  <>
                    <ChevronUp className="h-4 w-4" />
                    Show Less
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-4 w-4" />
                    Show More
                  </>
                )}
              </Button>
            )}
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default LeagueDetail;
