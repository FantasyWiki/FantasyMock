import { Trophy } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const leagues = [
  { id: "global", name: "Global League", icon: "🌍" },
  { id: "europe", name: "European League", icon: "🇪🇺" },
  { id: "americas", name: "Americas League", icon: "🌎" },
  { id: "asia", name: "Asia-Pacific League", icon: "🌏" },
  { id: "premier", name: "Premier League", icon: "⭐" },
  { id: "champions", name: "Champions League", icon: "🏆" },
];

export function LeagueSelector() {
  const [currentLeague, setCurrentLeague] = useState(leagues[0]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-9 gap-2 rounded-full bg-secondary/50 px-3 hover:bg-secondary"
        >
          <Trophy className="h-4 w-4" />
          <span className="hidden sm:inline">{currentLeague.icon}</span>
          <span className="hidden md:inline text-sm truncate max-w-[80px]">{currentLeague.name.split(' ')[0]}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {leagues.map((league) => (
          <DropdownMenuItem
            key={league.id}
            onClick={() => setCurrentLeague(league)}
            className="cursor-pointer gap-2"
          >
            <span>{league.icon}</span>
            <span>{league.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
