import { useState } from "react";

export default function FlipCard() {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="w-72 h-96 cursor-pointer"
      style={{ perspective: '1000px' }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div 
        className="relative w-full h-full transition-transform duration-700"
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
        }}
      >
        {/* Front */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-pink-500 to-rose-500 text-white rounded-xl flex flex-col items-center justify-center shadow-xl"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="text-5xl mb-4 animate-bounce">💖</div>
          <h2 className="text-2xl font-bold">Open Me</h2>
          <p className="text-sm mt-2 opacity-90">Click to flip</p>
        </div>

        {/* Back */}
        <div 
          className="absolute inset-0 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-xl flex flex-col justify-between"
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          <div className="flex-1 flex flex-col justify-center">
            <div className="text-center space-y-4">
              <p className="text-pink-600 dark:text-pink-400 font-semibold text-lg">
                Hi! Happy Valentine's Day! 💝
              </p>
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                Just like this flower, my love for you grows every day. 
                Wishing you all the happiness and love you deserve! 🌸
              </p>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-pink-200 dark:border-pink-900">
            <p className="text-gray-600 dark:text-gray-400 text-sm italic">From,</p>
            <p className="text-pink-600 dark:text-pink-400 font-bold text-base mt-1">
              Aian
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}