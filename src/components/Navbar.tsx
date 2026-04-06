import { Link, useLocation } from "react-router-dom";
import { Code2, History, Home, Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

export default function Navbar() {
  const { dark, toggle } = useTheme();
  const { pathname } = useLocation();

  const links = [
    { to: "/", icon: Home, label: "Home" },
    { to: "/dashboard", icon: Code2, label: "Dashboard" },
    { to: "/history", icon: History, label: "History" },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-heading text-lg font-bold">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary">
            <Code2 className="h-4 w-4 text-primary-foreground" />
          </div>
          <span>CodeHelper</span>
        </Link>

        <div className="flex items-center gap-1">
          {links.map(({ to, icon: Icon, label }) => (
            <Link
              key={to}
              to={to}
              className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                pathname === to
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span className="hidden sm:inline">{label}</span>
            </Link>
          ))}
          <button
            onClick={toggle}
            className="ml-2 flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            aria-label="Toggle theme"
          >
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </nav>
  );
}
