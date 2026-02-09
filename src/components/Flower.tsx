interface Props {
  grown: boolean;
}

export default function Flower({ grown }: Props) {
  return (
    <div className="relative h-64 w-32 flex items-end justify-center">
      {/* Stem */}
      <div
        className={`w-2 bg-green-600 dark:bg-green-500 rounded-full transition-all duration-1000 ${
          grown ? "h-48" : "h-0"
        }`}
      />

      {/* Bloom */}
      <div
        className={`absolute -top-6 transition-all duration-700 ${
          grown ? "scale-100 opacity-100" : "scale-0 opacity-0"
        }`}
      >
        <div className="relative">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="
                absolute w-8 h-8 rounded-full
                bg-pink-400 dark:bg-pink-500
                dark:shadow-[0_0_20px_rgba(236,72,153,0.9)]
              "
              style={{
                transform: `rotate(${i * 60}deg) translate(16px)`,
              }}
            />
          ))}
          <div className="w-8 h-8 bg-yellow-400 dark:bg-yellow-300 rounded-full relative z-10" />
        </div>
      </div>
    </div>
  );
}
