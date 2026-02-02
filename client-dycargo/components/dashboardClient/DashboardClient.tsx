"use client";
import { useEffect, useLayoutEffect, useState } from "react";

import { TrackingItem } from "@/types/trackingItem.types";
import { TrackingEvent } from "@/types/trackingEvent";
import Mapview from "../Mapview";
import { useLiveShipment } from "@/hooks/useLiveTracking";
import dynamic from "next/dynamic";
import { LiveTrackingCard } from "../LiveTrackingCard";
import { ToggleMapview } from "../ToggleMapview";
import MapcnMapView from "../MapcnMapView";
import { BriefcaseBusiness, MapPinCheck, PackagePlus } from "lucide-react";
import { CargoDetailsCard } from "../CargoDetailsCard";

const TrackingSidebar = dynamic(() => import("../TrackingSidebar"), {
  ssr: false,
});
export const mockTrackingResults: TrackingItem[] = [
  {
    id: "401905a3-d1b6-4403-9522-700d29bedd42",
    trackingNumber: "DYCARGO-QTR-3569-46D299",
    origin: "Manila, PH",
    destination: "Doha, QA",
    status: "Pending",
    lastUpdatedAt: "2 mins ago",
  },
];

const mockTrackingEvents: TrackingEvent[] = [
  {
    id: "evt-1",
    date: "23 Nov 2023, 09:13",
    title: "Package has been picked up",
    location: "Frauengrabengasse, Nuremberg",
  },
  {
    id: "evt-2",
    date: "23 Nov 2023, 10:17",
    title: "Package in transit",
    location: "Würzburg, Ludwigsbrücke",
  },
  {
    id: "evt-3",
    date: "23 Nov 2023, 10:42",
    title: "Package in transit",
    location: "Schlossgasse, Aschaffenburg",
  },
  {
    id: "evt-4",
    date: "23 Nov 2023, 11:20",
    title: "Package is in transit to its final destination",
    location: "Zeil, Frankfurt",
    isCurrent: true,
  },
];

type ViewMode = "map" | "tracking";

const DashboardClient = () => {
  const [trackingResults, setTrackingResults] = useState<TrackingItem[]>(() => {
    if (typeof window === "undefined") return [];
    const stored = localStorage.getItem("trackingResults");
    return stored ? JSON.parse(stored) : [];
  });
  const [trackingEvent, setTrackingEvent] =
    useState<TrackingEvent[]>(mockTrackingEvents);
  const [activeTrackingId, setActiveTrackingId] = useState<string | null>(
    () => {
      if (typeof window === "undefined") return null;
      return localStorage.getItem("activeBatchId");
    },
  );

  const [viewMode, setViewMode] = useState<ViewMode>("map");

   const activeShipment = trackingResults.find(
    (item) => item.trackingNumber === activeTrackingId,
  );

  const { data: liveShipment } =  useLiveShipment(activeShipment?.batchId, {
    enabled: !!activeShipment?.batchId,
  });
  console.log(activeTrackingId, 'hey there')
  const livePosition = liveShipment
    ? { lat: liveShipment.lat, lng: liveShipment.lng }
    : { lat: 0, lng: 0 };

 

  useEffect(() => {
    localStorage.setItem("trackingResults", JSON.stringify(trackingResults));
  }, [trackingResults]);

  useEffect(() => {
    if (activeTrackingId) {
      localStorage.setItem("activeBatchId", activeTrackingId);
    }
  }, [activeTrackingId]);

  const [mounted, setMounted] = useState(false);

  useLayoutEffect(() => {
    setMounted(true);
  }, []);

  console.log(livePosition)

  return (
    <main className="grid grid-cols-1 gap-3">
      <div className="bg-primary-foreground p-4 rounded-lg font-bold text-2xl">
        Hello, Yannick
      </div>

      <div className="p-4 rounded-lg grid grid-cols-3 text-white gap-4 border">
        <div className="bg-secondary-foreground p-4 rounded-lg flex flex-col space-y-2 cursor-pointer">
          <p className="flex items-center gap-1 text-amber-500">
            Active Bookings{" "}
            <span>
              <PackagePlus />
            </span>
          </p>
          <p className="font-bold text-2xl text-amber-">3</p>
        </div>
        <div className="bg-secondary-foreground p-4 rounded-lg flex flex-col space-y-2 cursor-pointer">
          <p className="flex items-center gap-1 text-amber-500">
            completed Bookings{" "}
            <span>
              <MapPinCheck />
            </span>
          </p>
          <p className="font-bold text-2xl text-amber-">17</p>
        </div>
        <div className="bg-secondary-foreground p-4 rounded-lg flex flex-col space-y-2 cursor-pointer">
          <p className="flex items-center gap-1 text-amber-500">
            All Bookings{" "}
            <span>
              <BriefcaseBusiness />
            </span>
          </p>
          <p className="font-bold text-2xl text-amber-">20</p>
        </div>
      </div>

      <div className="bg-primary-foreground p-4 rounded-lg grid grid-cols-6 text-white gap-4 border items-start">
        <div className="bg-secondary-foregroun rounded-lg col-span-2">
          <TrackingSidebar
            liveShipment={liveShipment}
            trackingEvent={trackingEvent}
            trackingResults={trackingResults}
            activeTrackingId={activeTrackingId}
            onSearchResult={(shipment) => {
              setTrackingResults((prev) => {
                const exists = prev.some((item) => item.id === shipment.id);
                return exists ? prev : [shipment, ...prev];
              });

              setActiveTrackingId(shipment.trackingNumber);
            }}
            onSelectTracking={setActiveTrackingId}
          />
        </div>

        <div className="relative rounded-lg col-span-4 h-[546px] flex items-center justify-center">
          <ToggleMapview value={viewMode} onChange={setViewMode} />
          {viewMode === "map" ? (
            <MapcnMapView position={livePosition} />
          ) : (
            <LiveTrackingCard />
          )}
        </div>
      </div>

      <div className="bg-primary-foreground p-4 rounded-lg">
        {mounted && activeShipment && <CargoDetailsCard shipment={activeShipment} />}
      </div>
    </main>
  );
};

export default DashboardClient;
