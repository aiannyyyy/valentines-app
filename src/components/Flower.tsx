interface Props {
  grown: boolean;
}

interface TulipProps {
  grown: boolean;
  color: string;
  darkColor: string;
  delay: number;
  height: number;
}

function Tulip({ grown, color, darkColor, delay, height }: TulipProps) {
  return (
    <div className="relative flex items-end justify-center" style={{ height: `${height}px` }}>
      {/* Stem */}
      <div
        className={`w-2 bg-green-600 dark:bg-green-500 rounded-t-sm transition-all duration-1000 ease-out origin-bottom`}
        style={{
          height: grown ? `${height - 40}px` : "0px",
          transitionDelay: `${delay}ms`,
        }}
      />

      {/* Leaf Left */}
      <div
        className={`absolute bg-green-500 dark:bg-green-400 rounded-full transition-all duration-700 ease-out`}
        style={{
          width: grown ? "30px" : "0px",
          height: grown ? "15px" : "0px",
          bottom: `${height * 0.4}px`,
          left: "-8px",
          transform: grown ? "rotate(-30deg)" : "rotate(0deg)",
          transitionDelay: `${delay + 400}ms`,
        }}
      />

      {/* Leaf Right */}
      <div
        className={`absolute bg-green-500 dark:bg-green-400 rounded-full transition-all duration-700 ease-out`}
        style={{
          width: grown ? "30px" : "0px",
          height: grown ? "15px" : "0px",
          bottom: `${height * 0.5}px`,
          right: "-8px",
          transform: grown ? "rotate(30deg)" : "rotate(0deg)",
          transitionDelay: `${delay + 500}ms`,
        }}
      />

      {/* Tulip Bloom */}
      <div
        className={`absolute transition-all duration-700 ease-out`}
        style={{
          bottom: `${height - 45}px`,
          transitionDelay: `${delay + 800}ms`,
          transform: grown ? "scale(1) rotate(0deg)" : "scale(0) rotate(-45deg)",
          opacity: grown ? 1 : 0,
        }}
      >
        {/* Outer petals */}
        <div className="relative w-12 h-16">
          {/* Left petal */}
          <div
            className={`absolute w-8 h-14 ${color} ${darkColor} rounded-t-full rounded-b-lg 
              dark:shadow-[0_0_15px_rgba(236,72,153,0.6)] transition-all duration-500`}
            style={{
              left: "-6px",
              top: "2px",
              transform: grown ? "rotate(-15deg)" : "rotate(0deg)",
              transitionDelay: `${delay + 1000}ms`,
            }}
          />
          
          {/* Right petal */}
          <div
            className={`absolute w-8 h-14 ${color} ${darkColor} rounded-t-full rounded-b-lg 
              dark:shadow-[0_0_15px_rgba(236,72,153,0.6)] transition-all duration-500`}
            style={{
              right: "-6px",
              top: "2px",
              transform: grown ? "rotate(15deg)" : "rotate(0deg)",
              transitionDelay: `${delay + 1000}ms`,
            }}
          />
          
          {/* Center petal */}
          <div
            className={`absolute w-8 h-16 ${color} ${darkColor} rounded-t-full rounded-b-lg 
              dark:shadow-[0_0_20px_rgba(236,72,153,0.8)] z-10`}
            style={{
              left: "8px",
              top: "0px",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default function Flower({ grown }: Props) {
  const tulips = [
    { color: "bg-pink-400", darkColor: "dark:bg-pink-500", delay: 0, height: 180 },
    { color: "bg-red-400", darkColor: "dark:bg-red-500", delay: 200, height: 160 },
    { color: "bg-purple-400", darkColor: "dark:bg-purple-500", delay: 400, height: 170 },
    { color: "bg-pink-500", darkColor: "dark:bg-pink-600", delay: 100, height: 165 },
    { color: "bg-rose-400", darkColor: "dark:bg-rose-500", delay: 300, height: 175 },
  ];

  return (
    <div className="flex gap-6 items-end justify-center">
      {tulips.map((tulip, index) => (
        <Tulip
          key={index}
          grown={grown}
          color={tulip.color}
          darkColor={tulip.darkColor}
          delay={tulip.delay}
          height={tulip.height}
        />
      ))}
    </div>
  );
}