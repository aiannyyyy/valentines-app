import './FloatingHearts.css';

export default function FloatingHearts() {
  const hearts = Array.from({ length: 20 });

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((_, i) => {
        const left = Math.random() * 100;
        const size = 12 + Math.random() * 20;
        const delay = Math.random() * 10;
        const duration = 8 + Math.random() * 10;

        return (
          <span
            key={i}
            className="floating-heart"
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