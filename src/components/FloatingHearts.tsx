export default function FloatingHearts() {
  const hearts = Array.from({ length: 20 });

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {hearts.map((_, i) => {
        const left = Math.random() * 100;
        const size = 12 + Math.random() * 20;
        const delay = Math.random() * 10;
        const duration = 8 + Math.random() * 10;

        return (
          <span
            key={i}
            className="absolute bottom-0 animate-float text-pink-400 dark:text-pink-500"
            style={{
              left: `${left}%`,
              fontSize: `${size}px`,
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
            }}
          >
            ❤️
          </span>
        );
      })}
    </div>
  );
}
