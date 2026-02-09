import { useEffect, useState } from "react";
import Flower from "./components/Flower";
import FlipCard from "./components/FlipCard";
import FloatingHearts from "./components/FloatingHearts";
import MusicToggle from "./components/MusicToggle";

export default function App() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <div className="min-h-screen bg-pink-100 dark:bg-gray-900 transition-colors duration-500 flex flex-col items-center justify-center px-4 text-center relative">
      <FloatingHearts />
      <MusicToggle />

      {/* Theme toggle */}
      <button
        onClick={() => setDark(!dark)}
        className="absolute top-4 right-4 px-4 py-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
      >
        {dark ? "☀️ Light" : "🌙 Dark"}
      </button>

      <h1 className="text-3xl sm:text-4xl font-bold text-pink-600 dark:text-pink-400 mb-8">
        Happy Valentine's Day 💖
      </h1>

      <Flower />

      <div className="mt-12 animate-fadeIn">
        <FlipCard />
      </div>
    </div>
  );
}