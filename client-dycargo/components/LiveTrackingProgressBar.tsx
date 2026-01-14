import { Plane } from 'lucide-react';

const LiveTrackingProgressBar = ({ progress }: { progress: number }) => {
  // Clamp progress to prevent overflow
  const safeProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <div className="relative w-full">
      {/* Track */}
      <div className="relative h-[3px] bg-gray-200 rounded-full">
        {/* Filled */}
        <div
          className="h-[3px] bg-amber-500 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${safeProgress}%` }}
        />
      </div>

      {/* Plane */}
      <div
        className="absolute -top-4 transition-all duration-500 ease-out"
        style={{
          left: `calc(${safeProgress}% - 16px)`, // 16px = half of 32px plane container
        }}
      >
        <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center">
          <Plane
            size={16}
            className="text-amber-600 rotate-45"
          />
        </div>
      </div>
    </div>
  );
};

export default LiveTrackingProgressBar;
