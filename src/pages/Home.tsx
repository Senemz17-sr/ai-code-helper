import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Code2, Bug, Zap } from "lucide-react";

const features = [
  {
    icon: Code2,
    title: "Explain Code",
    desc: "Get clear, simple explanations of any code snippet in seconds.",
  },
  {
    icon: Bug,
    title: "Fix Errors",
    desc: "Paste your buggy code and get instant fixes with explanations.",
  },
  {
    icon: Zap,
    title: "Optimize Code",
    desc: "Make your code faster, cleaner, and more efficient.",
  },
];

export default function Home() {
  return (
    <div className="gradient-hero min-h-[calc(100vh-4rem)]">
      <div className="container flex flex-col items-center px-4 pt-20 pb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
            <Zap className="h-3.5 w-3.5" />
            AI-Powered Coding Assistant
          </div>
          <h1 className="font-heading text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl">
            AI Code Helper
          </h1>
          <p className="mt-4 text-lg text-muted-foreground sm:text-xl">
            Understand, Debug, and Improve Your Code Instantly
          </p>
          <Link
            to="/dashboard"
            className="mt-8 inline-flex items-center gap-2 rounded-xl gradient-primary px-6 py-3 font-heading text-sm font-semibold text-primary-foreground shadow-elevated transition-transform hover:scale-105 active:scale-100"
          >
            Start Coding
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-20 grid w-full max-w-4xl gap-6 sm:grid-cols-3"
        >
          {features.map((f) => (
            <div
              key={f.title}
              className="group rounded-xl border border-border bg-card p-6 shadow-card transition-shadow hover:shadow-elevated"
            >
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:gradient-primary group-hover:text-primary-foreground">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="font-heading text-base font-semibold">{f.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
