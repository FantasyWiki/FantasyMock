import { Article } from "@/pages/Team";
import { cn } from "@/lib/utils";
import { DragEvent } from "react";

interface ArticleNodeProps {
  article: Article;
  onClick: () => void;
  swapMode?: boolean;
  isGoalkeeper?: boolean;
  isBenched?: boolean;
  onDragStart?: (e: DragEvent<HTMLButtonElement>, article: Article) => void;
  onDragOver?: (e: DragEvent<HTMLButtonElement>) => void;
  onDrop?: (e: DragEvent<HTMLButtonElement>, article: Article) => void;
  isDragOver?: boolean;
}

export function ArticleNode({ 
  article, 
  onClick, 
  swapMode, 
  isGoalkeeper, 
  onDragStart,
  onDragOver,
  onDrop,
  isDragOver
}: ArticleNodeProps) {
  return (
    <button
      onClick={onClick}
      draggable
      onDragStart={(e) => onDragStart?.(e, article)}
      onDragOver={(e) => {
        e.preventDefault();
        onDragOver?.(e);
      }}
      onDrop={(e) => {
        e.preventDefault();
        onDrop?.(e, article);
      }}
      className={cn(
        "relative px-3 py-2 rounded-lg border-2 transition-all duration-200",
        "hover:scale-105 cursor-grab active:cursor-grabbing active:scale-95",
        "min-w-[80px] md:min-w-[100px]",
        "border-border bg-card",
        swapMode && "ring-2 ring-primary ring-offset-2 ring-offset-background animate-pulse",
        isGoalkeeper && "bg-gradient-to-b from-primary/20 to-primary/5",
        isDragOver && "ring-2 ring-accent ring-offset-2 ring-offset-background scale-105 bg-accent/10"
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
