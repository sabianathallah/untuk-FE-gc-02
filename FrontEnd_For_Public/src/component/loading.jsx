export default function Loading() {
  return (
    <div className="flex flex-col justify-center items-center w-full min-h-[60vh]">
      {/* Jeep Loading Animation */}
      <div className="relative">
        {/* Animated Jeep Icon */}
        <svg
          className="w-32 h-32 animate-bounce"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Jeep Body */}
          <rect x="20" y="40" width="60" height="30" fill="#b6c867" rx="4" />
          <rect x="25" y="35" width="15" height="15" fill="#232f24" rx="2" />
          <rect x="60" y="35" width="15" height="15" fill="#232f24" rx="2" />
          
          {/* Wheels */}
          <circle cx="32" cy="75" r="8" fill="#232f24">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 32 75"
              to="360 32 75"
              dur="1s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="68" cy="75" r="8" fill="#232f24">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 68 75"
              to="360 68 75"
              dur="1s"
              repeatCount="indefinite"
            />
          </circle>
          
          {/* Wheel Details */}
          <circle cx="32" cy="75" r="4" fill="#f8f8f8" />
          <circle cx="68" cy="75" r="4" fill="#f8f8f8" />
          
          {/* Grill */}
          <rect x="45" y="42" width="2" height="8" fill="#232f24" />
          <rect x="50" y="42" width="2" height="8" fill="#232f24" />
          <rect x="55" y="42" width="2" height="8" fill="#232f24" />
        </svg>

        {/* Animated Road */}
        <div className="mt-4 w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-[#b6c867] rounded-full animate-[road_1.5s_ease-in-out_infinite]"></div>
        </div>
      </div>

      {/* Loading Text */}
      <p className="mt-6 text-xl font-bold text-[#232f24] animate-pulse">
        Loading Products...
      </p>
      
      {/* Animated Dots */}
      <div className="flex gap-2 mt-2">
        <span className="w-2 h-2 bg-[#b6c867] rounded-full animate-[bounce_1s_ease-in-out_0s_infinite]"></span>
        <span className="w-2 h-2 bg-[#b6c867] rounded-full animate-[bounce_1s_ease-in-out_0.2s_infinite]"></span>
        <span className="w-2 h-2 bg-[#b6c867] rounded-full animate-[bounce_1s_ease-in-out_0.4s_infinite]"></span>
      </div>

      <style jsx>{`
        @keyframes road {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
}
