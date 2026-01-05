"use client";

import mapboxgl from "mapbox-gl";
import { useEffect, useRef } from "react";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

type TrackingMapProps = {
  lat: number;
  lng: number;
};

export default function Mapview({ lat, lng }: TrackingMapProps) {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markerRef = useRef<mapboxgl.Marker | null>(null);

  // Initialize map once
  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;

    mapRef.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: 14,
    });

    mapRef.current.on("load", () => {
      mapRef.current?.resize();
    });

    markerRef.current = new mapboxgl.Marker({
      color: "#f97316",
      scale: 1.2,
      anchor: "center",
    })
      .setLngLat([lng, lat])
      .addTo(mapRef.current);

    return () => mapRef.current?.remove();
  }, []);

  // Update marker position
  useEffect(() => {
    if (!mapRef.current || !markerRef.current) return;

    markerRef.current.setLngLat([lng, lat]);

    mapRef.current.easeTo({
      center: [lng, lat],
      duration: 1000,
      essential: true,
    });
  }, [lat, lng]);

  return (
    <div
      ref={mapContainer}
      className="h-[50vh] w-full rounded-xl overflow-hidden"
    />
  );
}
