import { ArrowRight, TrendingUp, TrendingDown, Zap, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

const trendingArticles = [
  { name: "Bitcoin", todayViews: 145200, avgViews: 98500 },
  { name: "Artificial Intelligence", todayViews: 138100, avgViews: 125000 },
  { name: "Climate Change", todayViews: 72800, avgViews: 85000 },
  { name: "SpaceX", todayViews: 95300, avgViews: 62000 },
];

function formatViews(views: number): string {
  if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
  if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
  return views.toString();
}

export function HeroSection() {
  return (
    <section className="relative min-h-screen pt-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-hero-gradient opacity-5" />
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23198754' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="container relative mx-auto px-4 py-12 md:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium animate-fade-in">
              <Zap className="h-4 w-4" />
              Fantasy Sports meets Wikipedia
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight animate-slide-up">
              Build Your
              <span className="block text-primary">Knowledge Empire</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 animate-slide-up delay-100">
              Draft Wikipedia articles, earn points from real search trends, and compete in weekly tournaments. The ultimate fantasy game for the curious mind.
            </p>

            {/* CTA Button */}
            <div className="animate-slide-up delay-200">
              <Button size="lg" className="h-12 px-8 gap-2 shadow-glow">
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Button>
              <p className="text-xs text-muted-foreground mt-2">
                Start with 1,000 credits • No credit card required
              </p>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 pt-4 animate-slide-up delay-300">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary">50K+</div>
                <div className="text-sm text-muted-foreground">Active Players</div>
              </div>
              <div className="h-12 w-px bg-border hidden sm:block" />
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary">1M+</div>
                <div className="text-sm text-muted-foreground">Articles Available</div>
              </div>
              <div className="h-12 w-px bg-border hidden sm:block" />
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary">24/7</div>
                <div className="text-sm text-muted-foreground">Live Markets</div>
              </div>
            </div>
          </div>

          {/* Right - Trending Articles Preview */}
          <div className="relative animate-fade-in delay-400">
            <div className="relative bg-card rounded-2xl border border-border shadow-lg p-4 md:p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-serif font-bold text-lg">🔥 Trending Today</h3>
                <span className="text-sm text-muted-foreground">Most searched</span>
              </div>

              {/* Trending Articles */}
              <div className="space-y-3">
                {trendingArticles.map((item, i) => {
                  const isTrending = item.todayViews > item.avgViews;
                  const percentChange = ((item.todayViews - item.avgViews) / item.avgViews * 100).toFixed(0);
                  
                  return (
                    <div
                      key={item.name}
                      className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                      style={{ animationDelay: `${i * 100 + 500}ms` }}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${isTrending ? 'bg-primary/10' : 'bg-destructive/10'}`}>
                          {isTrending ? (
                            <TrendingUp className="h-5 w-5 text-primary" />
                          ) : (
                            <TrendingDown className="h-5 w-5 text-destructive" />
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-sm">{item.name}</div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Eye className="h-3 w-3" />
                            <span>Avg: {formatViews(item.avgViews)}/day</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold">{formatViews(item.todayViews)}</div>
                        <div className={`text-xs font-medium ${isTrending ? 'text-primary' : 'text-destructive'}`}>
                          {isTrending ? '+' : ''}{percentChange}%
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Footer */}
              <div className="mt-4 pt-4 border-t border-border text-center">
                <span className="text-sm text-muted-foreground">Updated in real-time from Wikipedia</span>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-wiki-gold text-foreground px-3 py-1.5 rounded-full text-sm font-medium shadow-md animate-float">
              ⚡ Live data
            </div>
            <div className="absolute -bottom-4 -left-4 bg-primary text-primary-foreground px-3 py-1.5 rounded-full text-sm font-medium shadow-md animate-float delay-200">
              📊 451K views today
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
