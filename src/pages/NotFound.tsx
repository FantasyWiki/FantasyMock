import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { BookOpen, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center max-w-md px-4">
        <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-primary/10 mb-6">
          <BookOpen className="h-10 w-10 text-primary" />
        </div>
        <h1 className="mb-2 text-6xl font-serif font-bold text-primary">404</h1>
        <p className="mb-6 text-xl text-muted-foreground">
          Oops! This article doesn't exist in our encyclopedia.
        </p>
        <Button asChild size="lg" className="gap-2">
          <a href="/">
            <ArrowLeft className="h-4 w-4" />
            Return to Home
          </a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
