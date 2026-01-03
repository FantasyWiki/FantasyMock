import { Article } from "@/pages/Team";
import { cn } from "@/lib/utils";

interface ArticleNodeProps {
  article: Article;
  onClick: () => void;
  swapMode?: boolean;
  isGoalkeeper?: boolean;
  isBenched?: boolean;
}

export function ArticleNode({ article, onClick, swapMode, isGoalkeeper, isBenched }: ArticleNodeProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative px-3 py-2 rounded-lg border-2 transition-all duration-200",
        "hover:scale-105 cursor-pointer active:scale-95",
        "min-w-[80px] md:min-w-[100px]",
        "border-border bg-card",
        swapMode && "ring-2 ring-primary ring-offset-2 ring-offset-background animate-pulse",
        isGoalkeeper && "bg-gradient-to-b from-primary/20 to-primary/5"
      )}
    >
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
