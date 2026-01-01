import { BookOpen, Trophy, Users, LayoutDashboard, LogIn } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageSelector } from "./LanguageSelector";

interface HeaderProps {
  onSignInClick?: () => void;
}

export function Header({ onSignInClick }: HeaderProps) {
  const location = useLocation();
  
  // TODO: Replace with actual auth check
  const isAuthenticated = false;

  const navLinks = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard, isRoute: true, requiresAuth: true },
    { name: "How It Works", href: "#how-it-works", icon: BookOpen, isRoute: false, requiresAuth: false },
    { name: "Leagues", href: "#leagues", icon: Trophy, isRoute: false, requiresAuth: false },
    { name: "Community", href: "#community", icon: Users, isRoute: false, requiresAuth: false },
  ];

  const handleNavClick = (link: typeof navLinks[0], e: React.MouseEvent) => {
    if (link.requiresAuth && !isAuthenticated) {
      e.preventDefault();
      onSignInClick?.();
    }
  };

  const isActiveRoute = (href: string) => {
    if (href.startsWith('#')) return false;
    return location.pathname === href;
  };

  return (
    <>
      {/* Top Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <nav className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="relative">
                <BookOpen className="h-8 w-8 text-primary transition-transform group-hover:scale-110" />
                <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-wiki-gold animate-pulse" />
              </div>
              <span className="font-serif text-xl font-bold">
                Fantasy<span className="text-primary">Wiki</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => 
                link.isRoute ? (
                  <Link
                    key={link.name}
                    to={link.href}
                    onClick={(e) => handleNavClick(link, e)}
                    className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                  >
                    <link.icon className="h-4 w-4" />
                    {link.name}
                  </Link>
                ) : (
                  <a
                    key={link.name}
                    href={link.href}
                    className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                  >
                    <link.icon className="h-4 w-4" />
                    {link.name}
                  </a>
                )
              )}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              <LanguageSelector />
              <ThemeToggle />
              <Button 
                variant="default" 
                size="sm" 
                className="hidden sm:flex"
                onClick={onSignInClick}
              >
                Sign In
              </Button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-t border-border safe-area-bottom">
        <div className="flex items-center justify-around h-16 px-2">
          {navLinks.map((link) => {
            const isActive = isActiveRoute(link.href);
            return link.isRoute ? (
              <Link
                key={link.name}
                to={link.href}
                onClick={(e) => handleNavClick(link, e)}
                className={`flex flex-col items-center justify-center gap-1 flex-1 py-2 transition-colors ${
                  isActive 
                    ? 'text-primary' 
                    : 'text-muted-foreground hover:text-primary'
                }`}
              >
                <link.icon className={`h-5 w-5 ${isActive ? 'scale-110' : ''} transition-transform`} />
                <span className="text-xs font-medium">{link.name}</span>
              </Link>
            ) : (
              <a
                key={link.name}
                href={link.href}
                className="flex flex-col items-center justify-center gap-1 flex-1 py-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <link.icon className="h-5 w-5" />
                <span className="text-xs font-medium">{link.name}</span>
              </a>
            );
          })}
          {/* Sign In button in bottom nav */}
          <button
            onClick={onSignInClick}
            className="flex flex-col items-center justify-center gap-1 flex-1 py-2 text-muted-foreground hover:text-primary transition-colors sm:hidden"
          >
            <LogIn className="h-5 w-5" />
            <span className="text-xs font-medium">Sign In</span>
          </button>
        </div>
      </nav>
    </>
  );
}
