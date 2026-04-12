import { motion } from "framer-motion";
import { Send, Copy, Check, Sparkles } from "lucide-react";
import { useState } from "react";

export default function MockAIChatUI() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.6 }}
      className="relative"
    >
      {/* Glowing Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-2xl blur-3xl -z-10"></div>

      {/* Card Container */}
      <div className="bg-gradient-to-br from-gray-900/80 to-gray-950/80 backdrop-blur-2xl rounded-2xl border border-gray-800/50 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-gray-800/50 to-gray-900/50 px-6 py-4 border-b border-gray-800/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
            </div>
            <span className="text-xs font-medium text-gray-400">CodeHelper AI</span>
          </div>
        </div>

        {/* Chat Area */}
        <div className="h-96 flex flex-col overflow-hidden">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin">
            {/* User Message */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="flex justify-end"
            >
              <div className="max-w-xs rounded-2xl rounded-tr-none bg-emerald-600/90 text-white px-4 py-3 text-sm">
                Generate a Python function to solve the Fibonacci sequence
              </div>
            </motion.div>

            {/* AI Response */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="flex justify-start"
            >
              <div className="max-w-xs space-y-2">
                <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                  <Sparkles className="w-3 h-3 text-emerald-400" />
                  <span>AI Response</span>
                </div>
                <div className="rounded-2xl rounded-tl-none bg-gray-800/50 border border-gray-700/50 px-4 py-3">
                  <div className="text-sm text-gray-200 space-y-2">
                    <p>Here's an optimized solution:</p>
                    <div className="bg-gray-900/80 rounded-lg p-3 border border-gray-700/30 font-mono text-xs text-emerald-300">
                      <div className="line-clamp-4">
{`def fib(n, memo={}):
    if n in memo:
        return memo[n]
    if n ≤ 1:
        return n
    memo[n] = fib(...)
    return memo[n]`}
                      </div>
                    </div>
                    <p className="text-xs text-gray-400">✨ Uses memoization for O(n) complexity</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Code Copy Action */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex justify-start"
            >
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-emerald-300 transition-all border border-gray-700/30"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    Copy Code
                  </>
                )}
              </button>
            </motion.div>
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-800/50 bg-gray-900/30 p-4">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-2 px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700/50 focus-within:border-emerald-500/50 transition-colors"
            >
              <input
                type="text"
                placeholder="Ask for code help..."
                readOnly
                className="flex-1 bg-transparent text-white text-sm placeholder-gray-500 outline-none"
              />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg bg-gradient-to-r from-emerald-500 to-cyan-400 text-white hover:shadow-lg hover:shadow-emerald-500/30 transition-all"
              >
                <Send className="w-4 h-4" />
              </motion.button>
            </motion.div>
            <p className="text-xs text-gray-500 text-center mt-2">
              Press Enter to send
            </p>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <motion.div
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute -top-4 -right-4 w-12 h-12 bg-emerald-500/20 rounded-full blur-xl"
      ></motion.div>
      <motion.div
        animate={{ y: [10, -10, 10] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute -bottom-4 -left-4 w-16 h-16 bg-cyan-500/20 rounded-full blur-xl"
      ></motion.div>
    </motion.div>
  );
}
