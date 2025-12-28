import { Trophy, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";

const leaderboardData = [
  { rank: 1, name: "CryptoGod", points: 3850, change: 12, trend: "up" },
  { rank: 2, name: "WordHunter", points: 3720, change: 5, trend: "up" },
  { rank: 3, name: "BullishBot", points: 3610, change: -3, trend: "down" },
  { rank: 4, name: "TrendMaster", points: 3480, change: 8, trend: "up" },
  { rank: 5, name: "WikiWizard", points: 3350, change: 0, trend: "neutral" },
  { rank: 6, name: "ArticleAce", points: 3210, change: -1, trend: "down" },
  { rank: 7, name: "PageviewPro", points: 3100, change: 4, trend: "up" },
  { rank: 8, name: "KnowledgeKing", points: 2980, change: 2, trend: "up" },
];

export function LeaderboardPreview() {
  return (
    <section id="leagues" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-wiki-gold/20 text-wiki-gold text-sm font-medium">
              <Trophy className="h-4 w-4" />
              Weekly Tournament
            </div>

            <h2 className="text-3xl md:text-4xl font-serif font-bold">
              Compete for Glory
            </h2>

            <p className="text-lg text-muted-foreground">
              Every week, all active players automatically enter a competitive tournament. 
              Climb the ranks, earn bonus points, and prove your knowledge dominance.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-full bg-wiki-gold flex items-center justify-center text-sm font-bold shrink-0">
                  🥇
                </div>
                <div>
                  <div className="font-medium">Top 10</div>
                  <div className="text-sm text-muted-foreground">+20 bonus points/day in main game</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-sm font-bold shrink-0">
                  🥈
                </div>
                <div>
                  <div className="font-medium">Top 100</div>
                  <div className="text-sm text-muted-foreground">+10 bonus points/day in main game</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-sm font-bold shrink-0">
                  🥉
                </div>
                <div>
                  <div className="font-medium">Top 1000</div>
                  <div className="text-sm text-muted-foreground">+5 bonus points/day in main game</div>
                </div>
              </div>
            </div>

            <Button size="lg" className="gap-2 shadow-glow">
              Join the Competition
              <Trophy className="h-4 w-4" />
            </Button>
          </div>

          {/* Right - Leaderboard */}
          <div className="bg-card rounded-2xl border border-border shadow-lg overflow-hidden">
            <div className="p-4 border-b border-border bg-secondary/50">
              <div className="flex items-center justify-between">
                <h3 className="font-serif font-bold">🏆 Global Leaderboard</h3>
                <span className="text-xs text-muted-foreground">Updated hourly</span>
              </div>
            </div>

            <div className="divide-y divide-border">
              {leaderboardData.map((player) => (
                <div
                  key={player.rank}
                  className={`flex items-center gap-4 p-4 hover:bg-secondary/50 transition-colors ${
                    player.rank <= 3 ? 'bg-wiki-gold/5' : ''
                  }`}
                >
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    player.rank === 1 ? 'bg-wiki-gold text-foreground' :
                    player.rank === 2 ? 'bg-muted text-foreground' :
                    player.rank === 3 ? 'bg-wiki-gold/50 text-foreground' :
                    'bg-secondary text-muted-foreground'
                  }`}>
                    {player.rank}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{player.name}</div>
                  </div>

                  <div className="text-right">
                    <div className="font-bold">{player.points.toLocaleString()}</div>
                    <div className={`flex items-center justify-end gap-1 text-xs ${
                      player.trend === 'up' ? 'text-primary' :
                      player.trend === 'down' ? 'text-destructive' :
                      'text-muted-foreground'
                    }`}>
                      {player.trend === 'up' && <TrendingUp className="h-3 w-3" />}
                      {player.trend === 'down' && <TrendingDown className="h-3 w-3" />}
                      {player.trend === 'neutral' && <Minus className="h-3 w-3" />}
                      {player.change > 0 ? '+' : ''}{player.change}%
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-border bg-secondary/30">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Your Rank</span>
                <span className="font-bold text-primary">#4,523</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
