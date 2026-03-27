import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Trophy,
  Plus,
  KeyRound,
  Search,
  ArrowLeft,
  Users,
  Globe,
  Calendar,
  Copy,
  Check,
  Crown,
  Shield,
  Star,
} from "lucide-react";
import { useLeague, leagues } from "@/contexts/LeagueContext";
import { leagueInfo } from "@/data/leagueData";
import { useToast } from "@/hooks/use-toast";

type ViewMode = "browse" | "join" | "create" | "detail";

const wikipediaDomains = [
  { value: "en.wikipedia", label: "English (en.wikipedia)" },
  { value: "it.wikipedia", label: "Italian (it.wikipedia)" },
  { value: "es.wikipedia", label: "Spanish (es.wikipedia)" },
  { value: "fr.wikipedia", label: "French (fr.wikipedia)" },
  { value: "de.wikipedia", label: "German (de.wikipedia)" },
  { value: "pt.wikipedia", label: "Portuguese (pt.wikipedia)" },
  { value: "ja.wikipedia", label: "Japanese (ja.wikipedia)" },
  { value: "zh.wikipedia", label: "Chinese (zh.wikipedia)" },
  { value: "ru.wikipedia", label: "Russian (ru.wikipedia)" },
  { value: "ko.wikipedia", label: "Korean (ko.wikipedia)" },
  { value: "ar.wikipedia", label: "Arabic (ar.wikipedia)" },
  { value: "nl.wikipedia", label: "Dutch (nl.wikipedia)" },
  { value: "sv.wikipedia", label: "Swedish (sv.wikipedia)" },
  { value: "pl.wikipedia", label: "Polish (pl.wikipedia)" },
];

const durationOptions = [
  { value: "2w", label: "2 Weeks" },
  { value: "1m", label: "1 Month" },
  { value: "2m", label: "2 Months" },
  { value: "3m", label: "3 Months" },
  { value: "6m", label: "6 Months" },
];

const featuredLeagues = [
  { id: "fl-1", name: "World News Championship", icon: "🌍", domain: "en.wikipedia", participants: 2340, endsIn: "3 weeks" },
  { id: "fl-2", name: "Serie A Fantasy", icon: "⚽", domain: "it.wikipedia", participants: 890, endsIn: "5 weeks" },
  { id: "fl-3", name: "Tech & Science Cup", icon: "🔬", domain: "en.wikipedia", participants: 1560, endsIn: "2 months" },
  { id: "fl-4", name: "La Liga del Conocimiento", icon: "📚", domain: "es.wikipedia", participants: 670, endsIn: "6 weeks" },
  { id: "fl-5", name: "Bundesliga Wissen", icon: "🇩🇪", domain: "de.wikipedia", participants: 430, endsIn: "1 month" },
  { id: "fl-6", name: "Premier Knowledge League", icon: "🏆", domain: "en.wikipedia", participants: 3100, endsIn: "4 weeks" },
];

const BrowseLeagues = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { currentLeague, setCurrentLeague } = useLeague();
  const [viewMode, setViewMode] = useState<ViewMode>("browse");
  const [searchQuery, setSearchQuery] = useState("");

  // Join league state
  const [inviteCode, setInviteCode] = useState("");
  const [isJoining, setIsJoining] = useState(false);

  // Create league state
  const [leagueName, setLeagueName] = useState("");
  const [leagueDomain, setLeagueDomain] = useState("");
  const [leagueDuration, setLeagueDuration] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [createdLeague, setCreatedLeague] = useState<{ code: string; link: string } | null>(null);
  const [copiedField, setCopiedField] = useState<"code" | "link" | null>(null);

  const joinedLeagues = leagues.map((l) => ({
    ...l,
    participants: leagueInfo[l.id]?.totalPlayers || 0,
    language: leagueInfo[l.id]?.language || "English",
  }));

  const filteredFeatured = featuredLeagues.filter((l) =>
    l.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleJoinLeague = async () => {
    if (!inviteCode.trim()) return;
    setIsJoining(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1200));
    setIsJoining(false);

    if (inviteCode.trim().length >= 4) {
      toast({
        title: "League Joined!",
        description: "You've successfully joined the league. Set up your team now!",
      });
      // Would redirect to team creation page
      navigate("/team");
    } else {
      toast({
        title: "Invalid Code",
        description: "The invitation code you entered is not valid. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleCreateLeague = async () => {
    if (!leagueName.trim() || !leagueDomain || !leagueDuration) return;
    setIsCreating(true);
    await new Promise((r) => setTimeout(r, 1500));
    setIsCreating(false);

    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    const link = `${window.location.origin}/leagues/join?code=${code}`;

    setCreatedLeague({ code, link });
    toast({
      title: "League Created!",
      description: `"${leagueName}" has been created successfully.`,
    });
  };

  const handleCopy = (value: string, field: "code" | "link") => {
    navigator.clipboard.writeText(value);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  if (viewMode === "join") {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8 pt-24 max-w-lg">
          <Button variant="ghost" onClick={() => setViewMode("browse")} className="mb-6 gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Leagues
          </Button>

          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center mb-2">
                <KeyRound className="h-7 w-7 text-primary" />
              </div>
              <CardTitle className="text-2xl">Join Private League</CardTitle>
              <p className="text-muted-foreground text-sm mt-1">
                Enter the invitation code you received to join a private league.
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="invite-code">Invitation Code</Label>
                <Input
                  id="invite-code"
                  placeholder="e.g. AB3F9K"
                  value={inviteCode}
                  onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
                  className="text-center text-lg tracking-widest font-mono"
                  maxLength={8}
                />
              </div>
              <Button
                className="w-full"
                onClick={handleJoinLeague}
                disabled={!inviteCode.trim() || isJoining}
              >
                {isJoining ? "Joining..." : "Join League"}
              </Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  if (viewMode === "create") {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8 pt-24 max-w-lg">
          <Button variant="ghost" onClick={() => { setViewMode("browse"); setCreatedLeague(null); }} className="mb-6 gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Leagues
          </Button>

          {createdLeague ? (
            <Card>
              <CardHeader className="text-center">
                <div className="mx-auto h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center mb-2">
                  <Check className="h-7 w-7 text-primary" />
                </div>
                <CardTitle className="text-2xl">League Created!</CardTitle>
                <p className="text-muted-foreground text-sm mt-1">
                  Share the code or link below with players you want to invite.
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Invitation Code</Label>
                  <div className="flex gap-2">
                    <Input
                      value={createdLeague.code}
                      readOnly
                      className="text-center text-lg tracking-widest font-mono"
                    />
                    <Button variant="outline" size="icon" onClick={() => handleCopy(createdLeague.code, "code")}>
                      {copiedField === "code" ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Invitation Link</Label>
                  <div className="flex gap-2">
                    <Input
                      value={createdLeague.link}
                      readOnly
                      className="text-xs"
                    />
                    <Button variant="outline" size="icon" onClick={() => handleCopy(createdLeague.link, "link")}>
                      {copiedField === "link" ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <Button className="w-full" onClick={() => navigate("/team")}>
                  Set Up Your Team
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader className="text-center">
                <div className="mx-auto h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center mb-2">
                  <Plus className="h-7 w-7 text-primary" />
                </div>
                <CardTitle className="text-2xl">Create New League</CardTitle>
                <p className="text-muted-foreground text-sm mt-1">
                  Set up a private league and invite your friends to compete.
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="league-name">League Name</Label>
                  <Input
                    id="league-name"
                    placeholder="e.g. My Fantasy League"
                    value={leagueName}
                    onChange={(e) => setLeagueName(e.target.value)}
                    maxLength={50}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Wikipedia Domain</Label>
                  <Select value={leagueDomain} onValueChange={setLeagueDomain}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select domain..." />
                    </SelectTrigger>
                    <SelectContent>
                      {wikipediaDomains.map((d) => (
                        <SelectItem key={d.value} value={d.value}>
                          {d.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Duration</Label>
                  <Select value={leagueDuration} onValueChange={setLeagueDuration}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select duration..." />
                    </SelectTrigger>
                    <SelectContent>
                      {durationOptions.map((d) => (
                        <SelectItem key={d.value} value={d.value}>
                          {d.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  className="w-full"
                  onClick={handleCreateLeague}
                  disabled={!leagueName.trim() || !leagueDomain || !leagueDuration || isCreating}
                >
                  {isCreating ? "Creating..." : "Create League"}
                </Button>
              </CardContent>
            </Card>
          )}
        </main>
        <Footer />
      </div>
    );
  }

  // Browse view (default)
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8 pt-24">
        {/* Hero Section */}
        <div className="mb-10">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              🏆 Your Leagues
            </h1>
            <p className="text-muted-foreground max-w-md mx-auto">
              Manage your leagues, join private competitions, or create your own.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
            <Button onClick={() => setViewMode("join")} variant="outline" className="gap-2">
              <KeyRound className="h-4 w-4" />
              Join Private League
            </Button>
            <Button onClick={() => setViewMode("create")} className="gap-2">
              <Plus className="h-4 w-4" />
              Create New League
            </Button>
          </div>

          {/* Joined Leagues */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {joinedLeagues.map((league) => (
              <Card
                key={league.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  currentLeague.id === league.id ? "border-primary bg-primary/5" : "bg-card"
                }`}
                onClick={() => {
                  setCurrentLeague(league);
                  navigate("/league");
                }}
              >
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-xl shrink-0">
                    {league.icon}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-foreground truncate">{league.name}</p>
                      {currentLeague.id === league.id && (
                        <Badge variant="secondary" className="text-xs shrink-0">Active</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {league.participants.toLocaleString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Globe className="h-3 w-3" />
                        {league.language}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Featured Public Leagues */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <Star className="h-5 w-5 text-[hsl(var(--wiki-gold))]" />
            <h2 className="text-xl font-bold text-foreground">Featured Public Leagues</h2>
          </div>

          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search public leagues..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredFeatured.map((league) => (
              <Card key={league.id} className="bg-card hover:shadow-md transition-all">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-10 w-10 rounded-lg bg-[hsl(var(--wiki-gold))]/10 flex items-center justify-center text-xl shrink-0">
                      {league.icon}
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-foreground truncate">{league.name}</p>
                      <p className="text-xs text-muted-foreground">{league.domain}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {league.participants.toLocaleString()} players
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      Ends in {league.endsIn}
                    </span>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    Join League
                  </Button>
                </CardContent>
              </Card>
            ))}
            {filteredFeatured.length === 0 && (
              <div className="col-span-full text-center py-8 text-muted-foreground">
                No leagues found matching "{searchQuery}"
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BrowseLeagues;
