export default function FloatingHearts() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <span
          key={i}
          className="absolute bottom-0 text-pink-400 dark:text-pink-500 animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            fontSize: `${12 + Math.random() * 20}px`,
            animationDelay: `${Math.random() * 10}s`,
            animationDuration: `${8 + Math.random() * 10}s`,
          }}
        >
          ❤️
        </span>
      ))}
    </div>
  );
}
