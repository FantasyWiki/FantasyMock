import { Search, ShoppingCart, TrendingUp, Trophy, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Search Articles",
    description: "Explore millions of Wikipedia articles. Find trending topics, hidden gems, or your favorite subjects.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: ShoppingCart,
    title: "Build Your Portfolio",
    description: "Buy articles with your 1,000 starting credits. Choose contract durations from 3 to 90 days.",
    color: "bg-wiki-gold/20 text-wiki-gold",
  },
  {
    icon: TrendingUp,
    title: "Earn Points Daily",
    description: "Score points based on real Wikipedia pageviews. Trending articles = more points!",
    color: "bg-accent text-accent-foreground",
  },
  {
    icon: Trophy,
    title: "Compete & Win",
    description: "Climb the leaderboard, join weekly tournaments, and earn bonus rewards.",
    color: "bg-primary/10 text-primary",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            How Fantasy<span className="text-primary">Wiki</span> Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of players competing in the ultimate knowledge-based fantasy game.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="relative group"
            >
              <div className="bg-card rounded-xl p-6 border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300 h-full">
                {/* Step Number */}
                <div className="absolute -top-3 -left-3 h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shadow-md">
                  {index + 1}
                </div>

                {/* Icon */}
                <div className={`h-14 w-14 rounded-xl ${step.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <step.icon className="h-7 w-7" />
                </div>

                <h3 className="font-serif font-bold text-lg mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Arrow (hide on last item and mobile) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:flex absolute top-1/2 -right-3 -translate-y-1/2 z-10">
                  <ArrowRight className="h-6 w-6 text-muted-foreground/50" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
