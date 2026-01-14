'use client';

import { Map, MapMarker, MarkerContent, useMap, } from '@/components/ui/map';
import { useEffect } from 'react';
import FlyToMarker from './FlyToMarker';

interface TrackingMapProps {
  position: { lat: number; lng: number };
}

export default function MapcnMapView({ position}: TrackingMapProps) {
   
  return (
    <div className="h-full w-full">
        
      <Map
        
        zoom={2}
        // className="h-full w-full rounded-none"
      >
        <FlyToMarker position={position}/>
        <MapMarker longitude={position.lng} latitude={position.lat}>
          <MarkerContent>
              <div className="size-4 rounded-full bg-primary border-2 border-white shadow-lg" />
            </MarkerContent>
        </MapMarker>
      </Map>
    </div>
  );
}
