import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { DashboardSummary } from "@/components/dashboard/DashboardSummary";
import { OwnedArticles } from "@/components/dashboard/OwnedArticles";
import { LeagueLeaderboard } from "@/components/dashboard/LeagueLeaderboard";
import { TeamPortfolio } from "@/components/dashboard/TeamPortfolio";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Plus } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 pt-24">
        {/* Page Header */}
        <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Player Dashboard
            </h1>
            <p className="text-muted-foreground">
              Manage your team, track performance, and climb the leaderboard
            </p>
          </div>
          <Button
            onClick={() => navigate("/market")}
            className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
          >
            <ShoppingCart className="h-4 w-4" />
            Buy Articles
          </Button>
        </div>

        {/* Summary Cards */}
        <DashboardSummary />

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          {/* Portfolio & Articles - Takes 2 columns on large screens */}
          <div className="lg:col-span-2 space-y-6">
            <TeamPortfolio />
            <OwnedArticles onBuyArticles={() => navigate("/market")} />
          </div>

          {/* Leaderboard Sidebar */}
          <div className="lg:col-span-1">
            <LeagueLeaderboard />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
