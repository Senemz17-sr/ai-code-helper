import { motion } from "framer-motion";
import { Code2, Users, Zap } from "lucide-react";
import { useEffect, useState } from "react";

interface StatItem {
  icon: React.ReactNode;
  value: number;
  label: string;
  suffix?: string;
  color: string;
}

function CountUpNumber({
  target,
  duration = 2,
  suffix = "",
}: {
  target: number;
  duration?: number;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = (currentTime - startTime) / (duration * 1000);

      if (progress < 1) {
        setCount(Math.floor(target * progress));
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [target, duration]);

  return (
    <span>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function StatsSection() {
  const stats: StatItem[] = [
    {
      icon: <Code2 className="w-6 h-6" />,
      value: 10000,
      label: "Code Snippets Generated",
      suffix: "+",
      color: "from-emerald-500 to-cyan-500",
    },
    {
      icon: <Users className="w-6 h-6" />,
      value: 5000,
      label: "Active Developers",
      suffix: "+",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      value: 99,
      label: "Uptime Guaranteed",
      suffix: "%",
      color: "from-yellow-500 to-orange-500",
    },
  ];

  return (
    <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="group relative p-8 rounded-2xl border border-gray-800/50 bg-gradient-to-br from-gray-900/50 to-gray-950/50 backdrop-blur-xl hover:border-gray-700/50 transition-all duration-300"
            >
              {/* Gradient Background on Hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="relative z-10">
                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${stat.color} p-3 mb-6 shadow-lg shadow-emerald-500/20 group-hover:shadow-lg group-hover:shadow-emerald-500/40 transition-all`}
                >
                  <div className="text-white">{stat.icon}</div>
                </motion.div>

                {/* Stats Number */}
                <div className="mb-2">
                  <motion.h3
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    viewport={{ once: true }}
                    className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-emerald-300 via-cyan-300 to-blue-400 bg-clip-text text-transparent"
                  >
                    <CountUpNumber
                      target={stat.value}
                      duration={2}
                      suffix={stat.suffix}
                    />
                  </motion.h3>
                </div>

                {/* Label */}
                <p className="text-sm sm:text-base text-gray-400 font-medium">
                  {stat.label}
                </p>

                {/* Animated Line */}
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="mt-4 h-1 bg-gradient-to-r from-emerald-500 via-cyan-500 to-transparent rounded-full"
                ></motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
