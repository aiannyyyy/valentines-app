import { useRef, useState } from "react";

export default function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState<boolean>(false);

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
        className="absolute top-4 left-4 px-4 py-2 rounded-full bg-pink-500 text-white text-sm"
      >
        {playing ? "⏸ Music" : "🎵 Music"}
      </button>
    </>
  );
}
