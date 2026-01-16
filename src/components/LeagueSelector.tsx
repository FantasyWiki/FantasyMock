import { Trophy } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useLeague, leagues } from "@/contexts/LeagueContext";
import { useTradeProposals } from "@/contexts/TradeProposalsContext";

export function LeagueSelector() {
  const { currentLeague, setCurrentLeague } = useLeague();
  const { getTotalPendingCount, getPendingCountByLeague, getLeaguesWithPending } = useTradeProposals();

  const totalPendingCount = getTotalPendingCount();
  const leaguesWithPending = getLeaguesWithPending();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-9 gap-2 rounded-full bg-secondary/50 px-3 hover:bg-secondary relative"
        >
          <Trophy className="h-4 w-4" />
          <span className="hidden sm:inline">{currentLeague.icon}</span>
          <span className="hidden md:inline text-sm truncate max-w-[80px]">{currentLeague.name.split(' ')[0]}</span>
          {totalPendingCount > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-destructive text-destructive-foreground text-xs flex items-center justify-center">
              {totalPendingCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {leagues.map((league) => {
          const pendingCount = getPendingCountByLeague(league.id);
          const hasPending = pendingCount > 0;
          
          return (
            <DropdownMenuItem
              key={league.id}
              onClick={() => setCurrentLeague(league)}
              className="cursor-pointer gap-2 flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <span>{league.icon}</span>
                <span>{league.name}</span>
              </div>
              {hasPending && (
                <span className="h-5 min-w-5 px-1 rounded-full bg-destructive text-destructive-foreground text-xs flex items-center justify-center">
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
