import { useRef, useState } from "react";

export default function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    if (!audioRef.current) return;
    playing ? audioRef.current.pause() : audioRef.current.play();
    setPlaying(!playing);
  };

  return (
    <>
      <audio ref={audioRef} loop src="/love.mp3" />
      <button
        onClick={toggle}
        className="absolute top-4 left-4 px-4 py-2 rounded-full bg-pink-500 text-white text-sm"
      >
        {playing ? "⏸ Music" : "🎵 Music"}
      </button>
    </>
  );
}
