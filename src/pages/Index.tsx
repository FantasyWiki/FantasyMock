import { useState } from "react";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { HowItWorks } from "@/components/HowItWorks";
import { FeaturesSection } from "@/components/FeaturesSection";
import { LeaderboardPreview } from "@/components/LeaderboardPreview";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { AuthModal } from "@/components/AuthModal";

const Index = () => {
  const [authModalOpen, setAuthModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header onSignInClick={() => setAuthModalOpen(true)} />
      <main>
        <HeroSection />
        <HowItWorks />
        <FeaturesSection />
        <LeaderboardPreview />
        <CTASection />
      </main>
      <Footer />
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </div>
  );
};

export default Index;
