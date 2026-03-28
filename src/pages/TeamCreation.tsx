import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, Sparkles } from "lucide-react";
import { useLeague } from "@/contexts/LeagueContext";
import { useToast } from "@/hooks/use-toast";

const TeamCreation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentLeague } = useLeague();
  const { toast } = useToast();

  // Use league from navigation state if available, otherwise fall back to context
  const leagueFromState = (location.state as any)?.league;
  const league = leagueFromState || currentLeague;
  const [teamName, setTeamName] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState("⚔️");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const teamAvatars = [
    "⚔️", "🛡️", "🦁", "🐉", "🦅", "🐺", "🔥", "⚡",
    "🌟", "👑", "🏰", "🎯", "🚀", "💎", "🦊", "🐻",
    "🦈", "🐍", "🦂", "🎭", "🗡️", "🏹", "⛵", "🌊",
  ];

  // Mock existing team names for uniqueness check
  const existingTeamNames = [
    "The Champions",
    "Wiki Warriors",
    "Page Turners",
    "Edit Masters",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = teamName.trim();

    if (!trimmed) {
      setError("Team name is required.");
      return;
    }

    if (trimmed.length < 3) {
      setError("Team name must be at least 3 characters.");
      return;
    }

    if (trimmed.length > 30) {
      setError("Team name must be 30 characters or less.");
      return;
    }

    if (existingTeamNames.some((n) => n.toLowerCase() === trimmed.toLowerCase())) {
      setError("This team name is already taken in this league. Please choose another.");
      return;
    }

    setError("");
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));
    setIsSubmitting(false);

    toast({
      title: "Team Created! 🎉",
      description: `"${trimmed}" is ready to compete in ${league.name}.`,
    });

    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center space-y-2">
            <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-3xl">
              {league.icon}
            </div>
            <CardTitle className="text-2xl font-bold">Create Your Team</CardTitle>
            <p className="text-muted-foreground text-sm">
              You're joining <span className="font-semibold text-foreground">{league.name}</span>. Choose a unique name for your team.
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="teamName" className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-primary" />
                  Team Name
                </Label>
                <Input
                  id="teamName"
                  placeholder="e.g. The Wiki Wizards"
                  value={teamName}
                  onChange={(e) => {
                    setTeamName(e.target.value);
                    setError("");
                  }}
                  maxLength={30}
                  autoFocus
                  className={error ? "border-destructive" : ""}
                />
                <div className="flex justify-between items-center">
                  {error ? (
                    <p className="text-destructive text-xs">{error}</p>
                  ) : (
                    <p className="text-muted-foreground text-xs">Must be unique within the league</p>
                  )}
                  <span className="text-muted-foreground text-xs">{teamName.length}/30</span>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full gap-2"
                disabled={isSubmitting || !teamName.trim()}
              >
                {isSubmitting ? (
                  "Creating..."
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    Create Team & Start Playing
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default TeamCreation;
