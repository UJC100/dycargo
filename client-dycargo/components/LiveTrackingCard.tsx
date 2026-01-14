import { Cable, Copy, MapPinHouse } from 'lucide-react';
import { Badge } from './ui/badge';
import { cn } from '@/lib/utils';
import LiveTrackingProgressBar from './LiveTrackingProgressBar';

export function LiveTrackingCard() {
  return (
    <div className="max-w-[720px] w-full bg-white h-[400px] rounded-2xl shadow-md p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="h-10 w-10 rounded-full bg-amber-50 flex items-center justify-center">
          <Cable  className="text-amber-600" size={20} />
        </div>
        <h2 className="text-lg font-bold text-gray-900">
          Live Cargo Tracking
        </h2>
      </div>

      {/* Shipping ID + Status */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Shipping ID:</span>
          <span className="text-sm font-semibold text-amber-600">
            #SP9876543210
          </span>
          <Copy size={14} className="text-gray-400 cursor-pointer" />
        </div>

          <Badge  className={cn(
                  "cursor-pointer border py-1 px-3 transition-all",
                "border-blue-400  bg-blue-300/30 text-blue-500"
                )}>In Transit</Badge>
      </div>

      {/* Route */}
      <div className="flex justify-between mb-6">
        <div>
          <p className="text-xs text-gray-400 mb-1">Departure</p>
          <p className="text-lg font-bold text-gray-900">
            Manila
          </p>
        </div>

        <div className="text-right">
          <p className="text-xs text-gray-400 mb-1">Destination</p>
          <p className="text-lg font-bold text-gray-900">
            Douala
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative flex items-center mb-6">
        {/* Left dot */}
        <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
          <MapPinHouse size={18} className="text-amber-600" />
        </div>

        {/* Line */}
        {/* <div className="flex-1 h-[3px] bg-gray-200 mx-2 relative">
          <div className="absolute h-[3px] bg-emerald-600 w-[60%]" />
        */}
        
        <LiveTrackingProgressBar progress={20}/>

        {/* Truck icon */}
        <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
          <MapPinHouse size={18} className="text-amber-600" />
        </div>
      </div>

      {/* Dates */}
      <div className="flex justify-between text-sm">
        <div>
          <p className="text-gray-400 mb-1">Package Shipped</p>
          <p className="font-medium text-gray-900">
            23-11-2023, 11:20
          </p>
        </div>

        <div className="text-right">
          <p className="text-gray-400 mb-1">
            Estimated Package Received
          </p>
          <p className="font-medium text-gray-900">
            23-11-2023, 18:40
          </p>
        </div>
      </div>
    </div>
  );
}
