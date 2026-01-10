"use client";

import mapboxgl from "mapbox-gl";
import { useEffect, useRef } from "react";
import bearing from "@turf/bearing";
import { point } from "@turf/helpers";

// Types for production safety
interface TrackingMapProps {
  position: { lat: number; lng: number } | null;
}

export default function MapView({ position }: TrackingMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const isLoaded = useRef(false);

  // 1. Map Initialization (Runs ONLY ONCE)
  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12", // Updated for 2026
      center: position ? [position.lng, position.lat] : [0, 0],
      zoom: 2.3,
      pitch: 0, // Grab-style 3D tilt
    });

    mapRef.current = map;

    map.on("load", () => {
      map.loadImage("/airplane-icon-png-2510.png", (error, image) => {
        if (error) {
          console.error("Error loading image:", error);
          return;
        }
        if (!image || !mapRef.current) return;

        // 2. Add image INSIDE the callback
        mapRef.current.addImage("airport-15", image);

        // Create an empty GeoJSON source for the tracking icon
        mapRef.current.addSource("driver-source", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [],
          },
        });

        // Add a symbol layer (uses GPU instead of DOM markers)
        mapRef.current.addLayer({
          id: "driver-layer",
          type: "symbol",
          source: "driver-source",
          layout: {
            "icon-image": "airport-15", // Standard Mapbox icon or your own
            "icon-size": 0.05,
            "icon-allow-overlap": true,
            "icon-ignore-placement": true,
          },
        });

        isLoaded.current = true;
      });
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []); // Empty dependency array ensures it never "disappears"

  // 2. Data Update Logic (Updates Source, Not Component)
  useEffect(() => {
    if (!mapRef.current || !isLoaded.current || !position) return;

    const source = mapRef.current.getSource(
      "driver-source"
    ) as mapboxgl.GeoJSONSource;
    if (!source) return;

    // Get current position to calculate bearing
    const features = (source as any)._data?.features;
    let rotation = 0;

    if (features && features.length > 0) {
      const oldCoords = features[0].geometry.coordinates;
      const start = point([oldCoords[0], oldCoords[1]]);
      const end = point([position.lng, position.lat]);
      rotation = bearing(start, end);
    }

    // Update the source data (WebGL efficient update)
    source.setData({
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [position.lng, position.lat],
          },
          properties: { bearing: rotation },
        },
      ],
    });

    // Tell the layer to use the bearing property
    mapRef.current.setLayoutProperty("driver-layer", "icon-rotate", [
      "get",
      "bearing",
    ]);

    // Smoothly pan camera to follow (Grab/Move It style)
    mapRef.current.easeTo({
      center: [position.lng, position.lat],
      duration: 2000, // 2s glide for 3s data updates
      essential: true,
    });
  }, [position]);

  return <div ref={mapContainer} className="h-full w-full rounded-xl" />;
}
