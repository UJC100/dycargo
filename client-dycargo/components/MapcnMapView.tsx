'use client';

import { Map, MapMarker, MarkerContent } from '@/components/ui/map';
import { useEffect, useRef, useState } from 'react';
import FlyToMarker from './FlyToMarker';
import { AirplaneIcon } from '@phosphor-icons/react';

interface TrackingMapProps {
  position: { lat: number; lng: number };
}

// Bearing calculator
function getBearing(
  from: { lat: number; lng: number },
  to: { lat: number; lng: number }
) {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const toDeg = (rad: number) => (rad * 180) / Math.PI;

  const lat1 = toRad(from.lat);
  const lat2 = toRad(to.lat);
  const dLng = toRad(to.lng - from.lng);

  const y = Math.sin(dLng) * Math.cos(lat2);
  const x =
    Math.cos(lat1) * Math.sin(lat2) -
    Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng);

  return (toDeg(Math.atan2(y, x)) + 360) % 360;
}

export default function MapcnMapView({ position }: TrackingMapProps) {
  const prevPositionRef = useRef<{ lat: number; lng: number } | null>(null);
  const [bearing, setBearing] = useState(0);

  useEffect(() => {
    if (!prevPositionRef.current) {
      prevPositionRef.current = position;
      return;
    }

    const newBearing = getBearing(prevPositionRef.current, position);
    setBearing(newBearing);
    prevPositionRef.current = position;
  }, [position]);

  
  
useEffect(() => {
  console.log('📍 Map position update:', position)
}, [position])

  return (
    <div className="h-full w-full">
      <Map zoom={2}>
        <FlyToMarker position={position} />

        <MapMarker longitude={position.lng} latitude={position.lat}>
          <MarkerContent>
            <div className="relative flex items-center justify-center">
              {/* Pulse ring */}
              <span className="absolute h-10 w-10 animate-ping-slow rounded-full bg-amber-400/40" />

              {/* Soft base ring */}
              <span className="absolute h-10 w-10 rounded-full bg-amber-400/20" />

              {/* Plane icon */}
              <AirplaneIcon
                size={20}
                weight="fill"
                className="relative z-10 text-amber-500 transition-transform duration-700 ease-out"
                style={{
                  // Plane icons usually face RIGHT → subtract 90°
                  transform: `rotate(${bearing - 90}deg)`,
                }}
              />
            </div>
          </MarkerContent>
        </MapMarker>
      </Map>
    </div>
  );
}
