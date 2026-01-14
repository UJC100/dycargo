import { useEffect } from 'react';
import { useMap } from '@/components/ui/map';

export default function FlyToMarker({ position }: { position: { lat: number; lng: number } }) {
  const { map } = useMap();

  useEffect(() => {
    if (!map) return;

    map.flyTo({
      center: [position.lng, position.lat],
      zoom: 2,
      speed: 0.3,
      essential: true,
    });
  }, [map, position]);

  return null;
}
