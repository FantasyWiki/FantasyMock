import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Layers, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

// Mock data - formation visual (4-3-3 style)
const formationData = {
  forward: [
    { name: "Bitcoin", chemistry: "green", points: 45 },
    { name: "Ethereum", chemistry: "yellow", points: 38 },
    { name: "AI", chemistry: "green", points: 42 },
  ],
  midfield: [
    { name: "Cloud Computing", chemistry: "yellow", points: 28 },
    { name: "Machine Learning", chemistry: "green", points: 35 },
    { name: "Blockchain", chemistry: "green", points: 32 },
  ],
  defense: [
    { name: "Python", chemistry: "orange", points: 22 },
    { name: "JavaScript", chemistry: "green", points: 25 },
    { name: "React", chemistry: "yellow", points: 24 },
    { name: "TypeScript", chemistry: "green", points: 21 },
  ],
  goalkeeper: { name: "Wikipedia", chemistry: "green", points: 50 },
};

const getChemistryColor = (chemistry: string) => {
  switch (chemistry) {
    case "green":
      return "border-primary bg-primary/10";
    case "yellow":
      return "border-[hsl(var(--wiki-gold))] bg-[hsl(var(--wiki-gold))]/10";
    case "orange":
      return "border-orange-500 bg-orange-500/10";
    case "red":
      return "border-destructive bg-destructive/10";
    default:
      return "border-muted bg-muted/50";
  }
};

const getChemistryLine = (chemistry: string) => {
  switch (chemistry) {
    case "green":
      return "bg-primary";
    case "yellow":
      return "bg-[hsl(var(--wiki-gold))]";
    case "orange":
      return "bg-orange-500";
    default:
      return "bg-muted-foreground/30";
  }
};

interface ArticleNodeProps {
  name: string;
  chemistry: string;
  points: number;
}

const ArticleNode = ({ name, chemistry, points }: ArticleNodeProps) => (
  <div
    className={`relative px-3 py-2 rounded-lg border-2 ${getChemistryColor(chemistry)} transition-transform hover:scale-105 cursor-pointer`}
  >
    <p className="text-xs font-semibold text-foreground truncate max-w-[80px]">
      {name}
    </p>
    <p className="text-xs text-muted-foreground">{points} pts</p>
  </div>
);

export const TeamPortfolio = () => {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Layers className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-xl">Team Formation</CardTitle>
            <p className="text-sm text-muted-foreground">4-3-3 Chemistry View</p>
          </div>
        </div>
        <Link to="/team">
          <Button variant="outline" size="sm" className="gap-2">
            Manage Team <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        {/* Formation Pitch */}
        <div className="relative bg-gradient-to-b from-primary/5 to-primary/10 rounded-xl p-6 min-h-[320px] border border-primary/20">
          {/* Pitch lines */}
          <div className="absolute inset-x-6 top-1/2 h-px bg-primary/20" />
          <div className="absolute left-1/2 inset-y-6 w-px bg-primary/20" />
          <div className="absolute left-1/2 top-1/2 w-20 h-20 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/20" />

          {/* Forwards */}
          <div className="flex justify-around mb-8">
            {formationData.forward.map((article, i) => (
              <ArticleNode key={i} {...article} />
            ))}
          </div>

          {/* Midfield */}
          <div className="flex justify-around mb-8 px-8">
            {formationData.midfield.map((article, i) => (
              <ArticleNode key={i} {...article} />
            ))}
          </div>

          {/* Defense */}
          <div className="flex justify-around mb-8 px-4">
            {formationData.defense.map((article, i) => (
              <ArticleNode key={i} {...article} />
            ))}
          </div>

          {/* Goalkeeper */}
          <div className="flex justify-center">
            <ArticleNode {...formationData.goalkeeper} />
          </div>
        </div>

        {/* Chemistry Legend */}
        <div className="flex flex-wrap gap-4 mt-4 text-sm">
          <div className="flex items-center gap-2">
            <div className={`w-4 h-1 rounded ${getChemistryLine("green")}`} />
            <span className="text-muted-foreground">Mutual Links (+20%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-4 h-1 rounded ${getChemistryLine("yellow")}`} />
            <span className="text-muted-foreground">One-way Link (+10%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-4 h-1 rounded ${getChemistryLine("orange")}`} />
            <span className="text-muted-foreground">Weak Link (+5%)</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
