import { useEffect, useRef, useState } from "react";

export default function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  // Auto play on mount (muted first for browser policy)
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.5; // optional
    audio
      .play()
      .then(() => {
        setPlaying(true);
      })
      .catch(() => {
        // Autoplay blocked (normal on some browsers)
        setPlaying(false);
      });
  }, []);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
    } else {
      audio.play().catch(() => {});
    }

    setPlaying(!playing);
  };

  return (
    <>
      <audio ref={audioRef} loop src="/love.mp3" />
      <button
        onClick={toggleMusic}
        className="px-4 py-2 rounded-full 
                   bg-pink-500 text-white text-sm 
                   shadow-md hover:scale-105 transition"
      >
        {playing ? "⏸ Music" : "🎵 Music"}
      </button>
    </>
  );
}
