import { 
  Clock, 
  Zap, 
  Shield, 
  BarChart3, 
  Users, 
  Award,
  Link2,
  Calendar
} from "lucide-react";

const features = [
  {
    icon: Clock,
    title: "24/7 Live Markets",
    description: "Buy, sell, and trade articles anytime. The market never sleeps.",
  },
  {
    icon: Zap,
    title: "Real-Time Scoring",
    description: "Points calculated daily from actual Wikipedia pageview data.",
  },
  {
    icon: Link2,
    title: "Chemistry Bonuses",
    description: "Link related articles for bonus multipliers, FIFA-style.",
  },
  {
    icon: BarChart3,
    title: "Dynamic Pricing",
    description: "Article prices adjust based on trending topics and demand.",
  },
  {
    icon: Users,
    title: "Private Leagues",
    description: "Create private leagues and compete with friends.",
  },
  {
    icon: Calendar,
    title: "Weekly Tournaments",
    description: "Join automatic weekly competitions for bonus rewards.",
  },
  {
    icon: Award,
    title: "Power Tournaments",
    description: "Monthly elite competitions for the top performers.",
  },
  {
    icon: Shield,
    title: "Fair Play",
    description: "Transparent scoring system based on public data.",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Powerful Features
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need for the ultimate fantasy knowledge experience.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group p-5 rounded-xl bg-card border border-border hover:border-primary/50 hover:shadow-md transition-all duration-300"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
