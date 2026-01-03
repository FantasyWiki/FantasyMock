import { Article, Formation } from "@/pages/Team";
import { ArticleNode } from "./ArticleNode";

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
}

export function TeamFormation({ formation, articles, onArticleClick, swapMode }: TeamFormationProps) {
  const { forwards, midfielders, defenders, goalkeeper } = articles;

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
      <div className="md:hidden flex flex-col gap-4 p-4 min-h-[500px]">
        {/* Forwards (Top) */}
        <div className="flex justify-center gap-2 flex-wrap">
          {forwards.map((article) => (
            <ArticleNode
              key={article.id}
              article={article}
              onClick={() => onArticleClick(article)}
              swapMode={swapMode}
            />
          ))}
          {/* Empty slots */}
          {Array.from({ length: formation.positions.forwards - forwards.length }).map((_, i) => (
            <div key={`empty-f-${i}`} className="w-20 h-16 rounded-lg border-2 border-dashed border-muted-foreground/30 flex items-center justify-center">
              <span className="text-xs text-muted-foreground">Empty</span>
            </div>
          ))}
        </div>

        {/* Midfield */}
        <div className="flex justify-center gap-2 flex-wrap flex-1 items-center">
          {midfielders.map((article) => (
            <ArticleNode
              key={article.id}
              article={article}
              onClick={() => onArticleClick(article)}
              swapMode={swapMode}
            />
          ))}
          {Array.from({ length: formation.positions.midfielders - midfielders.length }).map((_, i) => (
            <div key={`empty-m-${i}`} className="w-20 h-16 rounded-lg border-2 border-dashed border-muted-foreground/30 flex items-center justify-center">
              <span className="text-xs text-muted-foreground">Empty</span>
            </div>
          ))}
        </div>

        {/* Defense */}
        <div className="flex justify-center gap-2 flex-wrap">
          {defenders.map((article) => (
            <ArticleNode
              key={article.id}
              article={article}
              onClick={() => onArticleClick(article)}
              swapMode={swapMode}
            />
          ))}
          {Array.from({ length: formation.positions.defenders - defenders.length }).map((_, i) => (
            <div key={`empty-d-${i}`} className="w-20 h-16 rounded-lg border-2 border-dashed border-muted-foreground/30 flex items-center justify-center">
              <span className="text-xs text-muted-foreground">Empty</span>
            </div>
          ))}
        </div>

        {/* Goalkeeper (Bottom) */}
        <div className="flex justify-center">
          {goalkeeper ? (
            <ArticleNode
              article={goalkeeper}
              onClick={() => onArticleClick(goalkeeper)}
              swapMode={swapMode}
              isGoalkeeper
            />
          ) : (
            <div className="w-20 h-16 rounded-lg border-2 border-dashed border-muted-foreground/30 flex items-center justify-center">
              <span className="text-xs text-muted-foreground">GK</span>
            </div>
          )}
        </div>
      </div>

      {/* Desktop Layout (Horizontal) */}
      <div className="hidden md:grid grid-cols-4 gap-6 p-6 min-h-[320px]">
        {/* Goalkeeper (Left) */}
        <div className="flex items-center justify-center">
          {goalkeeper ? (
            <ArticleNode
              article={goalkeeper}
              onClick={() => onArticleClick(goalkeeper)}
              swapMode={swapMode}
              isGoalkeeper
            />
          ) : (
            <div className="w-24 h-20 rounded-lg border-2 border-dashed border-muted-foreground/30 flex items-center justify-center">
              <span className="text-sm text-muted-foreground">GK</span>
            </div>
          )}
        </div>

        {/* Defense */}
        <div className="flex flex-col justify-around items-center">
          {defenders.map((article) => (
            <ArticleNode
              key={article.id}
              article={article}
              onClick={() => onArticleClick(article)}
              swapMode={swapMode}
            />
          ))}
          {Array.from({ length: formation.positions.defenders - defenders.length }).map((_, i) => (
            <div key={`empty-d-${i}`} className="w-24 h-16 rounded-lg border-2 border-dashed border-muted-foreground/30 flex items-center justify-center">
              <span className="text-sm text-muted-foreground">DEF</span>
            </div>
          ))}
        </div>

        {/* Midfield */}
        <div className="flex flex-col justify-around items-center">
          {midfielders.map((article) => (
            <ArticleNode
              key={article.id}
              article={article}
              onClick={() => onArticleClick(article)}
              swapMode={swapMode}
            />
          ))}
          {Array.from({ length: formation.positions.midfielders - midfielders.length }).map((_, i) => (
            <div key={`empty-m-${i}`} className="w-24 h-16 rounded-lg border-2 border-dashed border-muted-foreground/30 flex items-center justify-center">
              <span className="text-sm text-muted-foreground">MID</span>
            </div>
          ))}
        </div>

        {/* Forwards (Right) */}
        <div className="flex flex-col justify-around items-center">
          {forwards.map((article) => (
            <ArticleNode
              key={article.id}
              article={article}
              onClick={() => onArticleClick(article)}
              swapMode={swapMode}
            />
          ))}
          {Array.from({ length: formation.positions.forwards - forwards.length }).map((_, i) => (
            <div key={`empty-f-${i}`} className="w-24 h-16 rounded-lg border-2 border-dashed border-muted-foreground/30 flex items-center justify-center">
              <span className="text-sm text-muted-foreground">FWD</span>
            </div>
          ))}
        </div>
      </div>

      {/* Chemistry Legend */}
      <div className="flex flex-wrap gap-3 p-4 border-t border-primary/20 bg-background/50 text-xs md:text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-1 rounded bg-primary" />
          <span className="text-muted-foreground">Mutual (+20%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-1 rounded bg-[hsl(var(--wiki-gold))]" />
          <span className="text-muted-foreground">One-way (+10%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-1 rounded bg-orange-500" />
          <span className="text-muted-foreground">Weak (+5%)</span>
        </div>
      </div>
    </div>
  );
}
