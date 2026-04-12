import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Github, Twitter, Linkedin, Mail, ArrowRight, CheckCircle } from "lucide-react";
import PremiumNavbar from "@/components/PremiumNavbar";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import { Code2, Bug, Zap, BookOpen, Award, Users } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const features = [
  {
    icon: Code2,
    title: "Generate Code",
    desc: "Write code descriptions and let AI generate production-ready code instantly.",
    color: "from-emerald-500 to-cyan-500",
  },
  {
    icon: Bug,
    title: "Debug Code",
    desc: "Paste your buggy code and get instant fixes with detailed explanations.",
    color: "from-red-500 to-orange-500",
  },
  {
    icon: BookOpen,
    title: "Explain Code",
    desc: "Get line-by-line explanations of any code snippet.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Zap,
    title: "Optimize Performance",
    desc: "Improve performance and reduce complexity automatically.",
    color: "from-yellow-500 to-orange-500",
  },
  {
    icon: Award,
    title: "Refactor Code",
    desc: "Restructure your code to follow best practices and design patterns.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Users,
    title: "Collaborate",
    desc: "Share projects and collaborate with your team in real-time.",
    color: "from-indigo-500 to-blue-500",
  },
];

const testimonials = [
  {
    quote: "This tool saved me hours of debugging. The explanations are incredibly clear and helpful.",
    author: "Alex Johnson",
    role: "Full-stack Developer",
    avatar: "AJ",
  },
  {
    quote: "Finally, an AI assistant that actually understands code. Highly recommended!",
    author: "Sarah Chen",
    role: "Senior Engineer at Tech Corp",
    avatar: "SC",
  },
  {
    quote: "The code generation is spot-on. It's like having a senior dev sitting next to me.",
    author: "Mike Rodriguez",
    role: "Startup Founder",
    avatar: "MR",
  },
];

const pricingPlans = [
  {
    name: "Starter",
    price: 0,
    desc: "Perfect for beginners",
    popular: false,
    features: [
      "50 API calls/month",
      "Basic code generation",
      "5 code reviews",
      "Community support",
    ],
  },
  {
    name: "Professional",
    price: 29,
    desc: "For serious developers",
    popular: true,
    features: [
      "Unlimited API calls",
      "Advanced code generation",
      "Unlimited code reviews",
      "Priority support",
      "Team collaboration",
      "Custom integrations",
    ],
  },
  {
    name: "Enterprise",
    price: 99,
    desc: "For large teams",
    popular: false,
    features: [
      "Everything in Pro",
      "Dedicated support",
      "Custom AI training",
      "SLA guarantee",
      "Advanced analytics",
      "On-premise option",
    ],
  },
];

export default function PremiumLandingPage() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <PremiumNavbar />

      {/* Hero Section */}
      <HeroSection />

      {/* Stats Section */}
      <StatsSection />

      {/* Features Section */}
      <section id="features" className="relative z-10 py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-white">
              Powerful Features
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Everything you need to become a better programmer and ship code faster
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {features.map((feature, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className="group relative p-8 rounded-2xl border border-gray-800/50 bg-gradient-to-br from-gray-900/50 to-gray-950/50 backdrop-blur-xl hover:border-gray-700/50 overflow-hidden transition-all duration-300"
              >
                {/* Gradient Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="relative z-10">
                  {/* Icon */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} p-3 mb-6 shadow-lg shadow-emerald-500/20 group-hover:shadow-lg group-hover:shadow-emerald-500/40 transition-all`}
                  >
                    <feature.icon className="w-full h-full text-white" />
                  </motion.div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold mb-3 text-white group-hover:text-emerald-300 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                    {feature.desc}
                  </p>

                  {/* Accent Line */}
                  <motion.div
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                    className="mt-6 h-1 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full"
                  ></motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative z-10 py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Three simple steps to supercharge your coding
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                number: "01",
                title: "Write Your Prompt",
                description: "Describe what you want to code, or paste existing code you need help with.",
              },
              {
                number: "02",
                title: "AI Analyzes",
                description: "Our advanced AI engine processes your request using latest technology.",
              },
              {
                number: "03",
                title: "Get Results",
                description: "Receive production-ready code, explanations, and optimization suggestions.",
              },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="p-8 rounded-2xl border border-gray-800/50 bg-gradient-to-br from-gray-900/50 to-gray-950/50">
                  <div className="text-5xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                  <p className="text-gray-400">{step.description}</p>
                </div>

                {/* Connector Arrow */}
                {i < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-8 h-8 text-emerald-500/50" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative z-10 py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Loved by Developers
            </h2>
            <p className="text-lg text-gray-400">
              Join thousands of developers building better code with CodeTutor AI
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className="p-8 rounded-2xl border border-gray-800/50 bg-gradient-to-br from-gray-900/50 to-gray-950/50 backdrop-blur-xl"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <span key={j} className="text-yellow-400 text-lg">
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 flex items-center justify-center font-bold text-white">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-white">
                      {testimonial.author}
                    </p>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="relative z-10 py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg text-gray-400">
              Choose the perfect plan for your needs
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {pricingPlans.map((plan, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className={`relative p-8 rounded-2xl border backdrop-blur-xl transition-all duration-300 ${
                  plan.popular
                    ? "border-emerald-500/50 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 md:scale-105 shadow-2xl shadow-emerald-500/20"
                    : "border-gray-800/50 bg-gradient-to-br from-gray-900/50 to-gray-950/50 hover:border-gray-700/50"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-cyan-400 text-white text-sm font-bold rounded-full">
                    Most Popular
                  </div>
                )}

                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-gray-400 text-sm mb-6">{plan.desc}</p>

                <div className="mb-8">
                  <span className="text-5xl font-bold text-white">
                    ${plan.price}
                  </span>
                  <span className="text-gray-400 ml-2">/month</span>
                </div>

                <Link
                  to="/dashboard"
                  className={`w-full py-3 rounded-xl font-bold text-center transition-all duration-300 mb-8 block ${
                    plan.popular
                      ? "bg-gradient-to-r from-emerald-500 to-cyan-400 text-white hover:shadow-lg hover:shadow-emerald-500/40"
                      : "border border-gray-700 text-gray-300 hover:border-emerald-500/50 hover:text-emerald-300"
                  }`}
                >
                  Get Started
                </Link>

                <ul className="space-y-4">
                  {plan.features.map((feature, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-3 text-gray-300"
                    >
                      <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl border border-gray-800/50 bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-blue-500/20 p-12 sm:p-16 text-center backdrop-blur-xl"
          >
            <div className="absolute inset-0 -z-10">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10"></div>
            </div>

            <h2 className="text-4xl sm:text-5xl font-bold mb-4 leading-tight">
              Ready to Code Smarter?
            </h2>
            <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
              Start using CodeTutor AI today and transform the way you write code.
              No credit card required.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 px-10 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-400 text-white font-bold text-lg hover:shadow-2xl hover:shadow-emerald-500/40 transition-all duration-300"
              >
                Start Free Trial
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-gray-800/50 bg-gradient-to-b from-gray-950 to-black/80 backdrop-blur-xl py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-lg flex items-center justify-center">
                  <Code2 className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-bold bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">
                  CodeTutor
                </span>
              </div>
              <p className="text-gray-400 text-sm">
                Master coding with AI superpowers
              </p>
            </div>

            {/* Product */}
            <div>
              <h3 className="font-semibold mb-4 text-white">Product</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#features"
                    className="text-gray-400 hover:text-emerald-300 transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-emerald-300 transition-colors"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-emerald-300 transition-colors"
                  >
                    API Docs
                  </a>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="font-semibold mb-4 text-white">Company</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-emerald-300 transition-colors"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-emerald-300 transition-colors"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-emerald-300 transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Connect */}
            <div>
              <h3 className="font-semibold mb-4 text-white">Connect</h3>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-emerald-300 transition-colors"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-emerald-300 transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-emerald-300 transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-emerald-300 transition-colors"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-800/50 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm">
              © 2024 CodeTutor. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a
                href="#"
                className="text-gray-400 hover:text-emerald-300 text-sm transition-colors"
              >
                Privacy
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-emerald-300 text-sm transition-colors"
              >
                Terms
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-emerald-300 text-sm transition-colors"
              >
                Security
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
