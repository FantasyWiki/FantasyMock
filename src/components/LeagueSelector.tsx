import { useState, useEffect } from "react";
import { Trophy } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useLeague, leagues, League } from "@/contexts/LeagueContext";
import { useTradeProposals } from "@/contexts/TradeProposalsContext";

export function LeagueSelector() {
  const { currentLeague, setCurrentLeague } = useLeague();
  const { getTotalPendingCount, getPendingCountByLeague } = useTradeProposals();
  const [isAnimating, setIsAnimating] = useState(false);
  const [previousLeague, setPreviousLeague] = useState<League>(currentLeague);

  const totalPendingCount = getTotalPendingCount();

  useEffect(() => {
    if (previousLeague.id !== currentLeague.id) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setIsAnimating(false);
        setPreviousLeague(currentLeague);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [currentLeague, previousLeague]);

  const handleLeagueChange = (league: League) => {
    if (league.id !== currentLeague.id) {
      setCurrentLeague(league);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-9 gap-2 rounded-full bg-secondary/50 px-3 hover:bg-secondary relative overflow-hidden"
        >
          <span 
            className={`sm:hidden text-base transition-all duration-300 ${
              isAnimating ? "animate-scale-in" : ""
            }`}
            key={currentLeague.id}
          >
            {currentLeague.icon}
          </span>
          <Trophy className="h-4 w-4 hidden sm:block" />
          <span 
            className={`hidden sm:inline transition-all duration-300 ${
              isAnimating ? "animate-scale-in" : ""
            }`}
            key={`icon-${currentLeague.id}`}
          >
            {currentLeague.icon}
          </span>
          <span 
            className={`hidden md:inline text-sm truncate max-w-[80px] transition-all duration-300 ${
              isAnimating ? "animate-fade-in" : ""
            }`}
            key={`name-${currentLeague.id}`}
          >
            {currentLeague.name.split(' ')[0]}
          </span>
          {totalPendingCount > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-destructive text-destructive-foreground text-xs flex items-center justify-center">
              {totalPendingCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 animate-scale-in">
        {leagues.map((league) => {
          const pendingCount = getPendingCountByLeague(league.id);
          const hasPending = pendingCount > 0;
          const isSelected = league.id === currentLeague.id;
          
          return (
            <DropdownMenuItem
              key={league.id}
              onClick={() => handleLeagueChange(league)}
              className={`cursor-pointer gap-2 flex items-center justify-between transition-colors duration-200 ${
                isSelected ? "bg-primary/10 text-primary" : ""
              }`}
            >
              <div className="flex items-center gap-2">
                <span className={`transition-transform duration-200 ${isSelected ? "scale-110" : ""}`}>
                  {league.icon}
                </span>
                <span>{league.name}</span>
              </div>
              {hasPending && (
                <span className="h-5 min-w-5 px-1 rounded-full bg-destructive text-destructive-foreground text-xs flex items-center justify-center animate-pulse">
                  {pendingCount}
                </span>
              )}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
