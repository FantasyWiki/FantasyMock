import { Article } from "@/pages/Team";
import { cn } from "@/lib/utils";

interface ArticleNodeProps {
  article: Article;
  onClick: () => void;
  swapMode?: boolean;
  isGoalkeeper?: boolean;
}

const getChemistryStyles = (chemistry: string) => {
  switch (chemistry) {
    case "green":
      return "border-primary bg-primary/10 shadow-[0_0_12px_hsl(var(--primary)/0.3)]";
    case "yellow":
      return "border-[hsl(var(--wiki-gold))] bg-[hsl(var(--wiki-gold))]/10 shadow-[0_0_12px_hsl(var(--wiki-gold)/0.3)]";
    case "orange":
      return "border-orange-500 bg-orange-500/10 shadow-[0_0_12px_rgba(249,115,22,0.3)]";
    case "red":
      return "border-destructive bg-destructive/10";
    default:
      return "border-muted bg-muted/50";
  }
};

export function ArticleNode({ article, onClick, swapMode, isGoalkeeper }: ArticleNodeProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative px-3 py-2 rounded-lg border-2 transition-all duration-200",
        "hover:scale-105 cursor-pointer active:scale-95",
        "min-w-[80px] md:min-w-[100px]",
        getChemistryStyles(article.chemistry),
        swapMode && "ring-2 ring-primary ring-offset-2 ring-offset-background animate-pulse",
        isGoalkeeper && "bg-gradient-to-b from-primary/20 to-primary/5"
      )}
    >
      {/* Chemistry indicator dot */}
      <div className={cn(
        "absolute -top-1 -right-1 w-3 h-3 rounded-full",
        article.chemistry === "green" && "bg-primary",
        article.chemistry === "yellow" && "bg-[hsl(var(--wiki-gold))]",
        article.chemistry === "orange" && "bg-orange-500",
        article.chemistry === "red" && "bg-destructive",
        article.chemistry === "none" && "bg-muted-foreground"
      )} />
      
      <p className="text-xs md:text-sm font-semibold text-foreground truncate max-w-[70px] md:max-w-[90px]">
        {article.name}
      </p>
      <p className="text-xs text-muted-foreground">{article.points} pts</p>
      
      {isGoalkeeper && (
        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-[10px] font-bold text-primary bg-background px-1 rounded">
          GK
        </span>
      )}
    </button>
  );
}
