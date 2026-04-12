export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none">
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-500/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
    </div>
  );
}

export interface AnimatedTextProps {
  text: string;
  className?: string;
  speed?: number;
}

export function AnimatedText({ text, className = "", speed = 50 }: AnimatedTextProps) {
  return (
    <span className={className}>
      {text.split("").map((char, i) => (
        <span
          key={i}
          style={{
            animation: `fadeIn ${speed}ms ease-in forwards`,
            animationDelay: `${i * (speed / 10)}ms`,
          }}
        >
          {char}
        </span>
      ))}
    </span>
  );
}

export function LoadingSpinner({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <div className={`${sizeClasses[size]} relative`}>
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full animate-spin"></div>
      <div className="absolute inset-1 bg-black rounded-full"></div>
    </div>
  );
}
