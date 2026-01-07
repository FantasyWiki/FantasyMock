import { Article } from "@/pages/Team";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArticleNode } from "./ArticleNode";
import { Users } from "lucide-react";

interface BenchSectionProps {
  articles: Article[];
  onArticleClick: (article: Article) => void;
  swapMode: boolean;
  onDragStart?: (article: Article) => void;
  onDragOver?: (article: Article) => void;
  onDrop?: (article: Article) => void;
  onDragEnd?: () => void;
  dragOverArticle?: Article | null;
}

export function BenchSection({ 
  articles, 
  onArticleClick, 
  swapMode,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd,
  dragOverArticle
}: BenchSectionProps) {
  return (
    <Card onDragEnd={onDragEnd}>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-muted-foreground" />
          <CardTitle className="text-lg">Bench</CardTitle>
          <span className="text-sm text-muted-foreground">({articles.length} articles)</span>
        </div>
      </CardHeader>
      <CardContent>
        {articles.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>No articles on the bench</p>
            <p className="text-sm">Purchase articles from the market to add them here</p>
          </div>
        ) : (
          <div className="flex flex-wrap gap-3">
            {articles.map((article) => (
              <ArticleNode
                key={article.id}
                article={article}
                onClick={() => onArticleClick(article)}
                swapMode={swapMode}
                onDragStart={(e) => onDragStart?.(article)}
                onDragOver={(e) => onDragOver?.(article)}
                onDrop={(e) => onDrop?.(article)}
                isDragOver={dragOverArticle?.id === article.id}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
