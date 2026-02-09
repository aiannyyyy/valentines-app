export default function FlipCard() {
  return (
    <div className="w-72 h-44 perspective">
      <div className="relative w-full h-full transition-transform duration-700 transform-style-preserve-3d hover:rotate-y-180">
        {/* Front */}
        <div className="absolute inset-0 bg-pink-500 text-white rounded-xl flex items-center justify-center backface-hidden">
          <h2 className="text-xl font-bold">Open Me 💖</h2>
        </div>

        {/* Back */}
        <div className="absolute inset-0 bg-white dark:bg-gray-800 rounded-xl p-4 rotate-y-180 backface-hidden">
          <p className="text-pink-600 dark:text-pink-400 text-center">
            Just like this flower, my love for you grows every day 🌸
          </p>
        </div>
      </div>
    </div>
  );
}
