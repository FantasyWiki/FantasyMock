import { useRef, DragEvent } from "react";
import { Article, Formation } from "@/pages/Team";
import { ArticleNode } from "./ArticleNode";
import { ChemistryLinks } from "./ChemistryLinks";

interface TeamFormationProps {
  formation: Formation;
  articles: {
    forwards: Article[];
    midfielders: Article[];
    defenders: Article[];
    goalkeeper: Article | undefined;
  };
  onArticleClick: (article: Article) => void;
  swapMode: boolean;
  onDragStart?: (article: Article) => void;
  onDragOver?: (article: Article) => void;
  onDrop?: (article: Article) => void;
  dragOverArticle?: Article | null;
}

export function TeamFormation({ 
  formation, 
  articles, 
  onArticleClick, 
  swapMode,
  onDragStart,
  onDragOver,
  onDrop,
  dragOverArticle
}: TeamFormationProps) {
  const { forwards, midfielders, defenders, goalkeeper } = articles;
  const mobileContainerRef = useRef<HTMLDivElement>(null);
  const desktopContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative bg-gradient-to-b from-primary/5 to-primary/10 rounded-xl border border-primary/20 overflow-hidden">
      {/* Pitch markings */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Center line */}
        <div className="absolute left-1/2 inset-y-0 w-px bg-primary/20 md:hidden" />
        <div className="absolute inset-x-0 top-1/2 h-px bg-primary/20 hidden md:block" />
        {/* Center circle */}
        <div className="absolute left-1/2 top-1/2 w-16 h-16 md:w-20 md:h-20 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/20" />
      </div>

      {/* Mobile Layout (Vertical) */}
      <div ref={mobileContainerRef} className="md:hidden relative flex flex-col gap-6 p-4 min-h-[520px]">
        <ChemistryLinks articles={articles} containerRef={mobileContainerRef} />
        
        {/* Forwards (Top) */}
        <div className="flex justify-center gap-3 flex-wrap relative z-10">
          {forwards.map((article) => (
            <div key={article.id} data-article-id={article.id}>
              <ArticleNode
                article={article}
                onClick={() => onArticleClick(article)}
                swapMode={swapMode}
                onDragStart={(e) => onDragStart?.(article)}
                onDragOver={(e) => onDragOver?.(article)}
                onDrop={(e) => onDrop?.(article)}
                isDragOver={dragOverArticle?.id === article.id}
              />
            </div>
          ))}
          {Array.from({ length: formation.positions.forwards - forwards.length }).map((_, i) => (
            <div key={`empty-f-${i}`} className="w-20 h-14 rounded-lg border-2 border-dashed border-muted-foreground/30 flex items-center justify-center">
              <span className="text-xs text-muted-foreground">Empty</span>
            </div>
          ))}
        </div>

        {/* Midfield */}
        <div className="flex justify-center gap-3 flex-wrap flex-1 items-center relative z-10">
          {midfielders.map((article) => (
            <div key={article.id} data-article-id={article.id}>
              <ArticleNode
                article={article}
                onClick={() => onArticleClick(article)}
                swapMode={swapMode}
                onDragStart={(e) => onDragStart?.(article)}
                onDragOver={(e) => onDragOver?.(article)}
                onDrop={(e) => onDrop?.(article)}
                isDragOver={dragOverArticle?.id === article.id}
              />
            </div>
          ))}
          {Array.from({ length: formation.positions.midfielders - midfielders.length }).map((_, i) => (
            <div key={`empty-m-${i}`} className="w-20 h-14 rounded-lg border-2 border-dashed border-muted-foreground/30 flex items-center justify-center">
              <span className="text-xs text-muted-foreground">Empty</span>
            </div>
          ))}
        </div>

        {/* Defense */}
        <div className="flex justify-center gap-3 flex-wrap relative z-10">
          {defenders.map((article) => (
            <div key={article.id} data-article-id={article.id}>
              <ArticleNode
                article={article}
                onClick={() => onArticleClick(article)}
                swapMode={swapMode}
                onDragStart={(e) => onDragStart?.(article)}
                onDragOver={(e) => onDragOver?.(article)}
                onDrop={(e) => onDrop?.(article)}
                isDragOver={dragOverArticle?.id === article.id}
              />
            </div>
          ))}
          {Array.from({ length: formation.positions.defenders - defenders.length }).map((_, i) => (
            <div key={`empty-d-${i}`} className="w-20 h-14 rounded-lg border-2 border-dashed border-muted-foreground/30 flex items-center justify-center">
              <span className="text-xs text-muted-foreground">Empty</span>
            </div>
          ))}
        </div>

        {/* Goalkeeper (Bottom) */}
        <div className="flex justify-center relative z-10">
          {goalkeeper ? (
            <div data-article-id={goalkeeper.id}>
              <ArticleNode
                article={goalkeeper}
                onClick={() => onArticleClick(goalkeeper)}
                swapMode={swapMode}
                isGoalkeeper
                onDragStart={(e) => onDragStart?.(goalkeeper)}
                onDragOver={(e) => onDragOver?.(goalkeeper)}
                onDrop={(e) => onDrop?.(goalkeeper)}
                isDragOver={dragOverArticle?.id === goalkeeper.id}
              />
            </div>
          ) : (
            <div className="w-20 h-14 rounded-lg border-2 border-dashed border-muted-foreground/30 flex items-center justify-center">
              <span className="text-xs text-muted-foreground">GK</span>
            </div>
          )}
        </div>
      </div>

      {/* Desktop Layout (Horizontal) */}
      <div ref={desktopContainerRef} className="hidden md:grid grid-cols-4 gap-6 p-6 min-h-[320px] relative">
        <ChemistryLinks articles={articles} containerRef={desktopContainerRef} />
        
        {/* Goalkeeper (Left) */}
        <div className="flex items-center justify-center relative z-10">
          {goalkeeper ? (
            <div data-article-id={goalkeeper.id}>
              <ArticleNode
                article={goalkeeper}
                onClick={() => onArticleClick(goalkeeper)}
                swapMode={swapMode}
                isGoalkeeper
                onDragStart={(e) => onDragStart?.(goalkeeper)}
                onDragOver={(e) => onDragOver?.(goalkeeper)}
                onDrop={(e) => onDrop?.(goalkeeper)}
                isDragOver={dragOverArticle?.id === goalkeeper.id}
              />
            </div>
          ) : (
            <div className="w-24 h-16 rounded-lg border-2 border-dashed border-muted-foreground/30 flex items-center justify-center">
              <span className="text-sm text-muted-foreground">GK</span>
            </div>
          )}
        </div>

        {/* Defense */}
        <div className="flex flex-col justify-around items-center relative z-10">
          {defenders.map((article) => (
            <div key={article.id} data-article-id={article.id}>
              <ArticleNode
                article={article}
                onClick={() => onArticleClick(article)}
                swapMode={swapMode}
                onDragStart={(e) => onDragStart?.(article)}
                onDragOver={(e) => onDragOver?.(article)}
                onDrop={(e) => onDrop?.(article)}
                isDragOver={dragOverArticle?.id === article.id}
              />
            </div>
          ))}
          {Array.from({ length: formation.positions.defenders - defenders.length }).map((_, i) => (
            <div key={`empty-d-${i}`} className="w-24 h-14 rounded-lg border-2 border-dashed border-muted-foreground/30 flex items-center justify-center">
              <span className="text-sm text-muted-foreground">DEF</span>
            </div>
          ))}
        </div>

        {/* Midfield */}
        <div className="flex flex-col justify-around items-center relative z-10">
          {midfielders.map((article) => (
            <div key={article.id} data-article-id={article.id}>
              <ArticleNode
                article={article}
                onClick={() => onArticleClick(article)}
                swapMode={swapMode}
                onDragStart={(e) => onDragStart?.(article)}
                onDragOver={(e) => onDragOver?.(article)}
                onDrop={(e) => onDrop?.(article)}
                isDragOver={dragOverArticle?.id === article.id}
              />
            </div>
          ))}
          {Array.from({ length: formation.positions.midfielders - midfielders.length }).map((_, i) => (
            <div key={`empty-m-${i}`} className="w-24 h-14 rounded-lg border-2 border-dashed border-muted-foreground/30 flex items-center justify-center">
              <span className="text-sm text-muted-foreground">MID</span>
            </div>
          ))}
        </div>

        {/* Forwards (Right) */}
        <div className="flex flex-col justify-around items-center relative z-10">
          {forwards.map((article) => (
            <div key={article.id} data-article-id={article.id}>
              <ArticleNode
                article={article}
                onClick={() => onArticleClick(article)}
                swapMode={swapMode}
                onDragStart={(e) => onDragStart?.(article)}
                onDragOver={(e) => onDragOver?.(article)}
                onDrop={(e) => onDrop?.(article)}
                isDragOver={dragOverArticle?.id === article.id}
              />
            </div>
          ))}
          {Array.from({ length: formation.positions.forwards - forwards.length }).map((_, i) => (
            <div key={`empty-f-${i}`} className="w-24 h-14 rounded-lg border-2 border-dashed border-muted-foreground/30 flex items-center justify-center">
              <span className="text-sm text-muted-foreground">FWD</span>
            </div>
          ))}
        </div>
      </div>

      {/* Chemistry Legend */}
      <div className="flex flex-wrap gap-3 p-4 border-t border-primary/20 bg-background/50 text-xs md:text-sm">
        <div className="flex items-center gap-2">
          <div className="w-6 h-1 rounded bg-primary" />
          <span className="text-muted-foreground">Excellent (+20%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-1 rounded bg-[hsl(var(--wiki-gold))]" />
          <span className="text-muted-foreground">Good (+10%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-1 rounded bg-orange-500" />
          <span className="text-muted-foreground">Weak (+5%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-1 rounded bg-destructive" />
          <span className="text-muted-foreground">Poor (0%)</span>
        </div>
      </div>
    </div>
  );
}
