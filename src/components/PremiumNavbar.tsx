import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  Code2,
  ChevronDown,
  Github,
  Twitter,
} from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Learn", href: "/courses" },
  { label: "CodeHelper AI", href: "/assistant" },
];

const resources = [
  { label: "Documentation", href: "#" },
  { label: "API Reference", href: "#" },
  { label: "Blog", href: "#" },
];

export default function PremiumNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const location = useLocation();

  const isActive = (href: string) => location.pathname === href;

  return (
    <nav className="fixed top-0 w-full z-50 bg-gradient-to-b from-gray-950/95 via-gray-950/80 to-transparent backdrop-blur-md border-b border-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-3"
          >
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 via-cyan-400 to-blue-500 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-500/30 group-hover:shadow-emerald-500/50 transition-all">
                <Code2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-emerald-300 via-cyan-300 to-blue-400 bg-clip-text text-transparent hidden sm:inline">
                CodeTutor
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(link.href)
                    ? "text-emerald-300 bg-emerald-500/10 border border-emerald-500/30"
                    : "text-gray-300 hover:text-white hover:bg-gray-800/50"
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Resources Dropdown */}
            <div className="relative group">
              <button className="px-4 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-200 flex items-center gap-1">
                Resources <ChevronDown className="w-3 h-3" />
              </button>
              <div className="absolute left-0 mt-0 w-48 bg-gray-900/95 backdrop-blur-xl border border-gray-800/50 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                {resources.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="block px-4 py-2.5 text-sm text-gray-300 hover:text-emerald-300 hover:bg-emerald-500/10 first:rounded-t-lg last:rounded-b-lg transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/auth"
              className="px-4 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-200"
            >
              Sign In
            </Link>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/dashboard"
                className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-emerald-500 to-cyan-400 text-white font-semibold hover:shadow-lg hover:shadow-emerald-500/40 transition-all duration-200"
              >
                Get Started
              </Link>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 hover:bg-gray-800/50 rounded-lg transition-colors"
          >
            {mobileOpen ? (
              <X className="w-5 h-5 text-gray-300" />
            ) : (
              <Menu className="w-5 h-5 text-gray-300" />
            )}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-gray-800/50 bg-gray-900/80 backdrop-blur-lg"
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    isActive(link.href)
                      ? "text-emerald-300 bg-emerald-500/10 border border-emerald-500/30"
                      : "text-gray-300 hover:text-white hover:bg-gray-800/50"
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              {/* Mobile Resources */}
              <button
                onClick={() => setResourcesOpen(!resourcesOpen)}
                className="w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all flex items-center justify-between"
              >
                Resources
                <ChevronDown
                  className={`w-3 h-3 transition-transform ${
                    resourcesOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {resourcesOpen && (
                <div className="pl-4 space-y-1">
                  {resources.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      className="block px-4 py-2 rounded-lg text-sm text-gray-400 hover:text-emerald-300 hover:bg-emerald-500/10 transition-colors"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              )}

              <div className="border-t border-gray-800/50 pt-4 mt-4 space-y-2">
                <Link
                  to="/auth"
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-2.5 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all"
                >
                  Sign In
                </Link>
                <Link
                  to="/dashboard"
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-2.5 rounded-lg bg-gradient-to-r from-emerald-500 to-cyan-400 text-white font-semibold text-center transition-all"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
