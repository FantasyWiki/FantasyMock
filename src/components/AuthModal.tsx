import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BookOpen, Chrome, X } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleAuth = () => {
    setIsLoading(true);
    // TODO: Implement Google OAuth logic
    console.log("Google OAuth");
    setTimeout(() => setIsLoading(false), 1000);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="absolute inset-0 bg-background/60 backdrop-blur-md" />

      <div className="relative w-full max-w-sm animate-fade-in">
        <Button
          variant="ghost"
          size="icon"
          className="absolute -top-12 right-0 text-foreground hover:bg-secondary z-10"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </Button>

        <Card className="border-border shadow-lg p-8">
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-primary">
                <BookOpen className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold font-serif text-foreground">
                Fanta<span className="text-primary">Wiki</span>
              </span>
            </div>

            <p className="text-muted-foreground text-center text-sm">
              Sign in to manage your team and compete in leagues
            </p>

            <Button
              variant="outline"
              className="w-full gap-2 h-12 text-base mt-2"
              onClick={handleGoogleAuth}
              disabled={isLoading}
            >
              <Chrome className="h-5 w-5" />
              {isLoading ? "Signing in..." : "Continue with Google"}
            </Button>

            <p className="text-xs text-center text-muted-foreground mt-2">
              By continuing, you agree to our{" "}
              <button type="button" className="text-primary hover:underline">
                Terms of Service
              </button>{" "}
              and{" "}
              <button type="button" className="text-primary hover:underline">
                Privacy Policy
              </button>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
