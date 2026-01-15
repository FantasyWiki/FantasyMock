import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trophy, TrendingUp, TrendingDown, ChevronRight, Crown, Medal } from "lucide-react";
import { Link } from "react-router-dom";
import { useLeague } from "@/contexts/LeagueContext";
import { useMemo } from "react";

// Mock data - different leaderboards per league
const leaderboardsByLeague: Record<string, { rank: number; name: string; points: number; change: number; isCurrentUser: boolean }[]> = {
  global: [
    { rank: 1, name: "CryptoGod", points: 3850, change: 12, isCurrentUser: false },
    { rank: 2, name: "WordHunter", points: 3720, change: 5, isCurrentUser: false },
    { rank: 3, name: "BullishBot", points: 3610, change: -3, isCurrentUser: false },
    { rank: 4, name: "You", points: 2340, change: 2, isCurrentUser: true },
    { rank: 5, name: "DataDragon", points: 2280, change: 8, isCurrentUser: false },
    { rank: 6, name: "TrendMaster", points: 2150, change: -1, isCurrentUser: false },
    { rank: 7, name: "WikiWarrior", points: 2050, change: 4, isCurrentUser: false },
    { rank: 8, name: "QuantumQuest", points: 1980, change: -2, isCurrentUser: false },
  ],
  europe: [
    { rank: 1, name: "EuroTrader", points: 4200, change: 8, isCurrentUser: false },
    { rank: 2, name: "WikiMaster", points: 3950, change: 3, isCurrentUser: false },
    { rank: 3, name: "You", points: 3100, change: 15, isCurrentUser: true },
    { rank: 4, name: "CryptoKing", points: 2890, change: -2, isCurrentUser: false },
    { rank: 5, name: "DataWizard", points: 2750, change: 6, isCurrentUser: false },
  ],
  americas: [
    { rank: 1, name: "AmericaFirst", points: 3600, change: 10, isCurrentUser: false },
    { rank: 2, name: "TechGuru", points: 3400, change: 7, isCurrentUser: false },
    { rank: 3, name: "BlockchainBoss", points: 3200, change: -1, isCurrentUser: false },
    { rank: 4, name: "You", points: 2100, change: 4, isCurrentUser: true },
    { rank: 5, name: "AIExpert", points: 1950, change: 2, isCurrentUser: false },
  ],
  asia: [
    { rank: 1, name: "AsiaLeader", points: 4500, change: 18, isCurrentUser: false },
    { rank: 2, name: "TechNinja", points: 4100, change: 9, isCurrentUser: false },
    { rank: 3, name: "You", points: 3800, change: 12, isCurrentUser: true },
    { rank: 4, name: "CryptoSamurai", points: 3500, change: 5, isCurrentUser: false },
    { rank: 5, name: "DataSensei", points: 3200, change: -3, isCurrentUser: false },
  ],
  premier: [
    { rank: 1, name: "ElitePlayer", points: 5200, change: 20, isCurrentUser: false },
    { rank: 2, name: "TopTrader", points: 4900, change: 15, isCurrentUser: false },
    { rank: 3, name: "ChampionX", points: 4600, change: 8, isCurrentUser: false },
    { rank: 4, name: "You", points: 4200, change: 10, isCurrentUser: true },
    { rank: 5, name: "ProGamer", points: 3900, change: 5, isCurrentUser: false },
  ],
  champions: [
    { rank: 1, name: "WorldChamp", points: 6000, change: 25, isCurrentUser: false },
    { rank: 2, name: "You", points: 5500, change: 18, isCurrentUser: true },
    { rank: 3, name: "LegendaryOne", points: 5200, change: 12, isCurrentUser: false },
    { rank: 4, name: "UltimateWiki", points: 4800, change: 7, isCurrentUser: false },
    { rank: 5, name: "MasterMind", points: 4500, change: 3, isCurrentUser: false },
  ],
};

const leagueInfo: Record<string, { totalPlayers: number; endDate: string; language: string }> = {
  global: { totalPlayers: 523, endDate: "Jan 15, 2026", language: "All Languages" },
  europe: { totalPlayers: 312, endDate: "Jan 20, 2026", language: "European" },
  americas: { totalPlayers: 245, endDate: "Jan 18, 2026", language: "English/Spanish" },
  asia: { totalPlayers: 489, endDate: "Jan 22, 2026", language: "Asian" },
  premier: { totalPlayers: 128, endDate: "Feb 1, 2026", language: "English" },
  champions: { totalPlayers: 64, endDate: "Feb 15, 2026", language: "All Languages" },
};

const getRankIcon = (rank: number) => {
  if (rank === 1) return <Crown className="h-4 w-4 text-[hsl(var(--wiki-gold))]" />;
  if (rank <= 3) return <Medal className="h-4 w-4 text-primary" />;
  return null;
};

export const LeagueLeaderboard = () => {
  const { currentLeague } = useLeague();

  const leaderboardData = useMemo(() => {
    return leaderboardsByLeague[currentLeague.id] || leaderboardsByLeague.global;
  }, [currentLeague.id]);

  const currentLeagueInfo = useMemo(() => {
    return leagueInfo[currentLeague.id] || leagueInfo.global;
  }, [currentLeague.id]);

  return (
    <Card className="bg-card border-border sticky top-24">
      <CardHeader>
        <div className="flex items-center gap-3 mb-4">
          <div className="h-10 w-10 rounded-lg bg-[hsl(var(--wiki-gold))]/20 flex items-center justify-center">
            <Trophy className="h-5 w-5 text-[hsl(var(--wiki-gold))]" />
          </div>
          <div>
            <CardTitle className="text-xl">League Standings</CardTitle>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <span>{currentLeague.icon}</span>
              <span>{currentLeague.name}</span>
            </p>
          </div>
        </div>
        
        {/* League Info */}
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="text-xs">
            {currentLeagueInfo.language}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {currentLeagueInfo.totalPlayers} players
          </Badge>
          <Badge variant="outline" className="text-xs">
            Ends {currentLeagueInfo.endDate}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-2">
        {leaderboardData.map((player) => (
          <div
            key={player.rank}
            className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
              player.isCurrentUser
                ? 'bg-primary/10 border border-primary/30'
                : 'hover:bg-muted/50'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
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
                </div>
                <span className="text-sm text-muted-foreground">
                  {player.points.toLocaleString()} pts
                </span>
              </div>
            </div>
            
            <div className={`flex items-center gap-1 text-sm ${
              player.change >= 0 ? 'text-primary' : 'text-destructive'
            }`}>
              {player.change >= 0 ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
              <span>{player.change >= 0 ? '+' : ''}{player.change}%</span>
            </div>
          </div>
        ))}

        {/* View Full Leaderboard */}
        <Link to="/leaderboard" className="block mt-4">
          <Button variant="outline" className="w-full gap-2">
            View Full Leaderboard
            <ChevronRight className="h-4 w-4" />
          </Button>
        </Link>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-2 pt-4 border-t border-border">
          <Link to="/leagues">
            <Button variant="secondary" size="sm" className="w-full text-xs">
              My Leagues
            </Button>
          </Link>
          <Link to="/market">
            <Button variant="default" size="sm" className="w-full text-xs">
              Buy Articles
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};