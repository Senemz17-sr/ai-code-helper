import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Zap } from "lucide-react";
import MockAIChatUI from "./MockAIChatUI";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function HeroSection() {
  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden pt-20 pb-10 px-4 sm:px-6 lg:px-8">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-50 overflow-hidden">
        {/* Gradient Blobs */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-500/30 rounded-full mix-blend-multiply filter blur-3xl"
        ></motion.div>
        <motion.div
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-cyan-500/30 rounded-full mix-blend-multiply filter blur-3xl"
        ></motion.div>
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/3 left-1/3 w-80 h-80 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-3xl"
        ></motion.div>

        {/* Grid Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-950/50 to-black/50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          {/* Left Column - Text & CTA */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 hover:border-emerald-500/50 hover:bg-emerald-500/15 transition-all duration-300">
                <Zap className="w-4 h-4 text-emerald-400" />
                <span className="text-sm font-semibold text-emerald-300">
                  Introducing CodeTutor AI
                </span>
              </div>
            </motion.div>

            {/* Main Heading */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="text-white">Master Coding with</span>
                <br />
                <motion.span
                  initial={{ opacity: 0, backgroundPosition: "200% center" }}
                  animate={{ opacity: 1, backgroundPosition: "0% center" }}
                  transition={{ delay: 0.3, duration: 1 }}
                  className="bg-gradient-to-r from-emerald-300 via-cyan-300 to-blue-400 bg-clip-text text-transparent block"
                >
                  AI Superpowers
                </motion.span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-400 max-w-xl leading-relaxed">
                Generate, debug, explain, and optimize code in seconds. Support for Python, JavaScript, C++, and more with production-ready suggestions.
              </p>
            </motion.div>

            {/* Description */}
            <motion.div variants={itemVariants} className="space-y-6">
              {/* Features List */}
              <div className="space-y-3">
                {[
                  "⚡ Instant code generation & debugging",
                  "🧠 AI-powered explanations & optimization",
                  "🚀 Support for 20+ programming languages",
                ].map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="flex items-center gap-3 text-gray-300"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                    {feature}
                  </motion.div>
                ))}
              </div>

              {/* CTA Buttons */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4 pt-4"
              >
                {/* Primary CTA */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/dashboard"
                    className="group px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-400 text-white font-bold text-lg hover:shadow-2xl hover:shadow-emerald-500/40 transition-all duration-300 flex items-center gap-2 justify-center sm:justify-start"
                  >
                    Try For Free
                    <motion.span
                      groupHover={{ x: 5 }}
                      className="group-hover:translate-x-1 transition-transform"
                    >
                      <ArrowRight className="w-5 h-5" />
                    </motion.span>
                  </Link>
                </motion.div>

                {/* Secondary CTA */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <a
                    href="#features"
                    className="px-8 py-4 rounded-xl border-2 border-gray-700 hover:border-emerald-500/50 text-white font-bold text-lg hover:bg-emerald-500/10 transition-all duration-300 flex items-center gap-2 justify-center"
                  >
                    Learn More
                  </a>
                </motion.div>
              </motion.div>

              {/* Trust Signals */}
              <motion.div
                variants={itemVariants}
                className="pt-2 text-sm text-gray-500 flex items-center gap-2"
              >
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-6 h-6 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 border-2 border-gray-950"
                    ></div>
                  ))}
                </div>
                <span>Trusted by 5K+ developers worldwide</span>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Column - Mock UI */}
          <motion.div
            variants={itemVariants}
            className="hidden lg:block"
          >
            <MockAIChatUI />
          </motion.div>
        </motion.div>

        {/* Mobile Mock UI */}
        <motion.div
          variants={itemVariants}
          className="lg:hidden mt-12"
        >
          <MockAIChatUI />
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-1 h-2 bg-emerald-400 rounded-full mt-2"
          ></motion.div>
        </div>
      </motion.div>
    </section>
  );
}
