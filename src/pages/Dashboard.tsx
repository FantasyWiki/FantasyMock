import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { DashboardSummary } from "@/components/dashboard/DashboardSummary";
import { OwnedArticles } from "@/components/dashboard/OwnedArticles";
import { LeagueLeaderboard } from "@/components/dashboard/LeagueLeaderboard";
import { TeamPortfolio } from "@/components/dashboard/TeamPortfolio";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 pt-24">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Player Dashboard
          </h1>
          <p className="text-muted-foreground">
            Manage your team, track performance, and climb the leaderboard
          </p>
        </div>

        {/* Summary Cards */}
        <DashboardSummary />

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          {/* Portfolio & Articles - Takes 2 columns on large screens */}
          <div className="lg:col-span-2 space-y-6">
            <TeamPortfolio />
            <OwnedArticles />
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