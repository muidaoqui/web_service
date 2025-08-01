import React from "react";
import bg4 from "../assets/bg4.png";
const RotatingDots = () => {
  const dotCount = 8;
  const radius = 250;

  return (
    <div className="relative w-full mx-auto">
      {/* Hình trung tâm */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="w-1/3 bg-pink-500 rounded-full shadow-2xl ring-4 ring-pink-300 transition-all duration-300 hover:scale-105 hover:ring-pink-400">
          <img src={bg4} alt="Background" className="w-full h-full object-cover rounded-full" />
        </div>
      </div>

      {/* Vòng quay các chấm */}
      <div className="absolute inset-0 animate-[spin_12s_linear_infinite]">
        {Array.from({ length: dotCount }).map((_, i) => {
          const angle = (i * 360) / dotCount;
          const x = radius * Math.cos((angle * Math.PI) / 180);
          const y = radius * Math.sin((angle * Math.PI) / 180);

          return (
            <div
              key={i}
              className={`
                absolute w-4 h-4 rounded-full
                bg-gradient-to-br from-fuchsia-400 to-purple-500
                shadow-[0_0_10px_rgba(255,255,255,0.6)]
                transition-all duration-300
                hover:scale-125 hover:shadow-[0_0_15px_rgba(255,255,255,0.9)]
              `}
              style={{
                top: `calc(50% + ${y}px - 0.5rem)`,
                left: `calc(50% + ${x}px - 0.5rem)`,
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default RotatingDots;
