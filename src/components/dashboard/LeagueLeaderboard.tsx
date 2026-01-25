import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trophy, TrendingUp, TrendingDown, ChevronRight, Crown, Medal } from "lucide-react";
import { Link } from "react-router-dom";
import { useLeague } from "@/contexts/LeagueContext";
import { useMemo } from "react";
import { leaderboardsByLeague, leagueInfo, getPlayersAroundUser } from "@/data/leagueData";

const getRankIcon = (rank: number) => {
  if (rank === 1) return <Crown className="h-4 w-4 text-[hsl(var(--wiki-gold))]" />;
  if (rank <= 3) return <Medal className="h-4 w-4 text-primary" />;
  return null;
};

export const LeagueLeaderboard = () => {
  const { currentLeague } = useLeague();

  const leaderboardData = useMemo(() => {
    // Show players around the user for the dashboard preview
    return getPlayersAroundUser(currentLeague.id, 2);
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
        <Link to="/league" className="block mt-4">
          <Button variant="outline" className="w-full gap-2">
            View League Details
            <ChevronRight className="h-4 w-4" />
          </Button>
        </Link>

        {/* Quick Action */}
        <div className="pt-4 border-t border-border">
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