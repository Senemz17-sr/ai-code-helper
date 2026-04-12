import { motion } from "framer-motion";
import { ArrowRight, Code2, Bug, Zap, BookOpen, Award, Users, Github, Twitter, Linkedin, Mail, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Gradient Background */}
      <div className="fixed inset-0 -z-50 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-blue-500/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Navbar */}
      <nav className="relative z-50 border-b border-emerald-900/20 bg-black/80 backdrop-blur-md sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-lg flex items-center justify-center">
                <Code2 className="w-5 h-5 text-black" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                CodeHelper AI
              </span>
            </motion.div>
            <div className="flex items-center gap-4">
              <Link
                to="/auth"
                className="px-4 py-2 rounded-lg text-gray-300 hover:text-white transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/dashboard"
                className="px-6 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-cyan-500 text-black font-semibold hover:shadow-lg hover:shadow-emerald-500/50 transition-all"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        <motion.div
          {...fadeInUp}
          className="text-center mb-12"
        >
          <div className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-900/10">
            <Zap className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-semibold text-emerald-300">AI-Powered Code Assistant</span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Write Better Code
            <br />
            <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              With AI Assistance
            </span>
          </h1>

          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
            Generate, debug, explain, and optimize code instantly. Support for Python, JavaScript, C++, and more. Transform your coding workflow.
          </p>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/dashboard"
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-black font-bold hover:shadow-2xl hover:shadow-emerald-500/50 transition-all flex items-center gap-2 group"
            >
              Try For Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="#features"
              className="px-8 py-3 rounded-xl border border-emerald-500/30 hover:border-emerald-500 hover:bg-emerald-900/10 transition-all text-white font-semibold"
            >
              Learn More
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-16 grid grid-cols-3 gap-8 max-w-md mx-auto"
          >
            <div>
              <div className="text-3xl font-bold text-emerald-400">10K+</div>
              <div className="text-sm text-gray-400">Code Generated</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-cyan-400">5K+</div>
              <div className="text-sm text-gray-400">Active Users</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-400">99%</div>
              <div className="text-sm text-gray-400">Uptime</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Hero Image - Code Editor Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-20 relative"
        >
          <div className="bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-2xl p-1">
            <div className="bg-black/50 backdrop-blur rounded-xl p-6 border border-emerald-900/20">
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
              </div>
              <pre className="text-sm text-gray-300 font-mono overflow-auto max-h-60">
{`# Generate a fibonacci function with AI
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

# AI Response:
# ✅ Optimized & Explained
# Consider memoization for performance...`}
              </pre>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Everything you need to become a better programmer
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group p-6 rounded-xl border border-emerald-900/20 bg-emerald-900/5 hover:border-emerald-500/50 hover:bg-emerald-900/10 transition-all"
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 flex items-center justify-center mb-4 group-hover:from-emerald-500/40 group-hover:to-cyan-500/40 transition-all">
                <feature.icon className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Loved by Developers</h2>
          <p className="text-gray-400">Join thousands of developers using CodeHelper AI</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-xl border border-emerald-900/20 bg-emerald-900/5"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <span key={j} className="text-yellow-400">★</span>
                ))}
              </div>
              <p className="text-gray-300 mb-4">{testimonial.quote}</p>
              <div>
                <p className="font-semibold">{testimonial.author}</p>
                <p className="text-sm text-gray-400">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Simple Pricing</h2>
          <p className="text-gray-400">Choose the plan that fits your needs</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pricingPlans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`p-8 rounded-xl border transition-all ${
                plan.popular
                  ? "border-emerald-500 bg-emerald-900/20 scale-105"
                  : "border-emerald-900/20 bg-emerald-900/5 hover:border-emerald-500/50"
              }`}
            >
              {plan.popular && (
                <div className="mb-4 inline-block px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300">
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p className="text-gray-400 text-sm mb-6">{plan.desc}</p>
              <div className="mb-6">
                <span className="text-4xl font-bold">${plan.price}</span>
                <span className="text-gray-400">/month</span>
              </div>
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button className={`w-full py-2 rounded-lg font-semibold transition-all ${
                plan.popular
                  ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-black hover:shadow-lg hover:shadow-emerald-500/50"
                  : "border border-emerald-500/30 text-emerald-300 hover:border-emerald-500"
              }`}>
                Get Started
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-2xl p-12 border border-emerald-500/30 text-center"
        >
          <h2 className="text-4xl font-bold mb-4">Ready to Level Up Your Coding?</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Start using CodeHelper AI today and write better code in less time.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-black font-bold hover:shadow-2xl hover:shadow-emerald-500/50 transition-all inline-flex items-center gap-2"
          >
            Start Free Trial
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-emerald-900/20 bg-black/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-semibold mb-4 text-emerald-400">Product</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-emerald-400 transition">Features</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition">Pricing</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition">API Docs</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-emerald-400">Company</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-emerald-400 transition">About</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition">Blog</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-emerald-400">Legal</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-emerald-400 transition">Privacy</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition">Terms</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition">Security</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-emerald-400">Follow</h3>
              <div className="flex gap-4">
                <a href="#" className="text-gray-400 hover:text-emerald-400 transition">
                  <Github className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-emerald-400 transition">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-emerald-400 transition">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-emerald-900/20 pt-8 flex flex-col sm:flex-row items-center justify-between">
            <p className="text-gray-400 text-sm">&copy; 2024 CodeHelper AI. All rights reserved.</p>
            <div className="mt-4 sm:mt-0 flex gap-4">
              <a href="#" className="text-gray-400 hover:text-emerald-400 text-sm transition">Status</a>
              <a href="#" className="text-gray-400 hover:text-emerald-400 text-sm transition">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

const features = [
  {
    icon: Code2,
    title: "Generate Code",
    desc: "Write code descriptions and let AI generate production-ready code instantly."
  },
  {
    icon: Bug,
    title: "Debug Code",
    desc: "Paste your buggy code and get instant fixes with detailed explanations."
  },
  {
    icon: Zap,
    title: "Optimize",
    desc: "Improve performance and reduce complexity automatically."
  },
  {
    icon: BookOpen,
    title: "Explain Code",
    desc: "Get line-by-line explanations of any code snippet."
  },
  {
    icon: Award,
    title: "Refactor",
    desc: "Restructure your code to follow best practices."
  },
  {
    icon: Users,
    title: "Collaborate",
    desc: "Share projects and collaborate with your team in real-time."
  },
];

const testimonials = [
  {
    quote: "This tool saved me hours of debugging. The explanations are incredibly clear and helpful.",
    author: "Alex Johnson",
    role: "Full-stack Developer"
  },
  {
    quote: "Finally, an AI assistant that actually understands code. Highly recommended!",
    author: "Sarah Chen",
    role: "Senior Engineer at Tech Corp"
  },
  {
    quote: "The code generation is spot-on. It's like having a senior dev sitting next to me.",
    author: "Mike Rodriguez",
    role: "Startup Founder"
  },
];

const pricingPlans = [
  {
    name: "Starter",
    desc: "Perfect for learning",
    price: 0,
    popular: false,
    features: ["Up to 50 requests/month", "Python & JavaScript", "Basic explanations", "Community support"]
  },
  {
    name: "Pro",
    desc: "For professional developers",
    price: 19,
    popular: true,
    features: ["Unlimited requests", "All 5 languages", "Advanced analysis", "Priority support", "API access"]
  },
  {
    name: "Enterprise",
    desc: "For teams",
    price: 99,
    popular: false,
    features: ["Everything in Pro", "Team collaboration", "Custom models", "Dedicated support", "API SLA"]
  },
];
