import { ArrowRight, TrendingUp, Users, Zap, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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

            {/* Search Bar */}
            <div className="relative max-w-md mx-auto lg:mx-0 animate-slide-up delay-200">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search articles... (e.g., Bitcoin, AI)"
                    className="pl-10 h-12 bg-card border-border/50 focus:border-primary"
                  />
                </div>
                <Button size="lg" className="h-12 px-6 gap-2 shadow-glow">
                  Get Started
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
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

          {/* Right - Dashboard Preview */}
          <div className="relative animate-fade-in delay-400">
            <div className="relative bg-card rounded-2xl border border-border shadow-lg p-4 md:p-6">
              {/* Mini Dashboard */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-serif font-bold text-lg">Your Portfolio</h3>
                <span className="text-sm text-wiki-gold font-medium">+12.5% today</span>
              </div>

              {/* Portfolio Items */}
              <div className="space-y-3">
                {[
                  { name: "Bitcoin", views: "45.2K", points: "+18.5", trend: "up", price: "150 Cr" },
                  { name: "Artificial Intelligence", views: "38.1K", points: "+15.2", trend: "up", price: "120 Cr" },
                  { name: "Climate Change", views: "22.8K", points: "+9.1", trend: "up", price: "85 Cr" },
                  { name: "SpaceX", views: "15.3K", points: "+6.1", trend: "down", price: "65 Cr" },
                ].map((item, i) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                    style={{ animationDelay: `${i * 100 + 500}ms` }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <TrendingUp className={`h-5 w-5 ${item.trend === 'up' ? 'text-primary' : 'text-destructive'}`} />
                      </div>
                      <div>
                        <div className="font-medium text-sm">{item.name}</div>
                        <div className="text-xs text-muted-foreground">{item.views} views/day</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-sm font-medium ${item.trend === 'up' ? 'text-primary' : 'text-destructive'}`}>
                        {item.points} pts
                      </div>
                      <div className="text-xs text-muted-foreground">{item.price}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Budget */}
              <div className="mt-4 pt-4 border-t border-border flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Remaining Budget</span>
                <span className="font-bold text-primary">580 Credits</span>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-wiki-gold text-foreground px-3 py-1.5 rounded-full text-sm font-medium shadow-md animate-float">
              🏆 Rank #4,523
            </div>
            <div className="absolute -bottom-4 -left-4 bg-primary text-primary-foreground px-3 py-1.5 rounded-full text-sm font-medium shadow-md animate-float delay-200">
              📈 +48.9 pts today
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
