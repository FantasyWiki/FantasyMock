import { TrendingUp, Trophy, Coins, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

// Mock data - replace with real data
const summaryData = {
  yesterdayPoints: 127,
  pointsChange: 12.5,
  leagueStanding: 4,
  totalPlayers: 523,
  credits: 550,
  portfolioValue: 450,
  activeContracts: 6,
  maxContracts: 10,
};

export const DashboardSummary = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Yesterday's Points */}
      <Card className="bg-card border-border hover:shadow-lg transition-shadow duration-300">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">
                Yesterday's Points
              </p>
              <p className="text-3xl font-bold text-foreground">
                {summaryData.yesterdayPoints}
              </p>
              <p className={`text-sm mt-1 ${summaryData.pointsChange >= 0 ? 'text-primary' : 'text-destructive'}`}>
                {summaryData.pointsChange >= 0 ? '+' : ''}{summaryData.pointsChange}%
              </p>
            </div>
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* League Standing */}
      <Card className="bg-card border-border hover:shadow-lg transition-shadow duration-300">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">
                League Standing
              </p>
              <p className="text-3xl font-bold text-foreground">
                #{summaryData.leagueStanding}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                of {summaryData.totalPlayers} players
              </p>
            </div>
            <div className="h-12 w-12 rounded-full bg-wiki-gold/20 flex items-center justify-center">
              <Trophy className="h-6 w-6 text-[hsl(var(--wiki-gold))]" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Credits */}
      <Card className="bg-card border-border hover:shadow-lg transition-shadow duration-300">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">
                Available Credits
              </p>
              <p className="text-3xl font-bold text-foreground">
                {summaryData.credits}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Portfolio: {summaryData.portfolioValue} Cr
              </p>
            </div>
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Coins className="h-6 w-6 text-primary" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Active Contracts */}
      <Card className="bg-card border-border hover:shadow-lg transition-shadow duration-300">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">
                Active Contracts
              </p>
              <p className="text-3xl font-bold text-foreground">
                {summaryData.activeContracts}/{summaryData.maxContracts}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {summaryData.maxContracts - summaryData.activeContracts} slots available
              </p>
            </div>
            <div className="h-12 w-12 rounded-full bg-accent flex items-center justify-center">
              <FileText className="h-6 w-6 text-accent-foreground" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};