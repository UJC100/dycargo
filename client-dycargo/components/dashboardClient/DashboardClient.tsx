"use client";
import TrackingDashboard from "../TrackingDashboard";
import CargoTrackingCard from "../CargoTrackingCard";
import StatCard from "../StatCard";
import { useState } from "react";
import TrackingSidebar from "../TrackingSidebar";
import { TrackingItem } from "@/types/trackingItem.types";
import { TrackingEvent } from "@/types/trackingEvent";

export const mockTrackingResults: TrackingItem[] = [
  {
    id: '1',
    trackingCode: "QTR-9999",
    origin: "Manila, PH",
    destination: "Doha, QA",
    status: "Pending",
    lastUpdatedAt: "2 mins ago",
  },
  {
    id: '2',
    trackingCode: "AFR-2041",
    origin: "Paris, FR",
    destination: "Lagos, NG",
    status: "In Transit",
    lastUpdatedAt: "18 mins ago",
  },
]

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
]


const DashboardClient = () => {
  const [trackingResults, setTrackingResults] = useState<TrackingItem[]>(mockTrackingResults);
  const [trackingEvent, setTrackingEvent] = useState<TrackingEvent[]>(mockTrackingEvents);
  const [activeTrackingId, setActiveTrackingId] = useState<string | null>(mockTrackingResults[0].trackingCode);
  const [livePosition, setLivePosition] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  return (
    <main className="grid grid-cols-1 gap-3">
      <div className="bg-primary-foreground p-4 rounded-lg">test 1</div>

      <div className="bg-primary-foreground p-4 rounded-lg grid grid-cols-4 text-white gap-4 border">
        <div className="bg-secondary-foreground p-4 rounded-lg">sub test 1</div>
        <div className="bg-secondary-foreground p-4 rounded-lg">sub test 2</div>
        <div className="bg-secondary-foreground p-4 rounded-lg lg:col-span-2">
          sub test 3
        </div>
      </div>

      <div className="bg-primary-foreground p-4 rounded-lg grid grid-cols-6 text-white gap-4 border">
        <div className="bg-secondary-foreground rounded-lg col-span-2 flex items-center justify-center">
          <TrackingSidebar
          trackingEvent={trackingEvent}
            trackingResults={trackingResults}
            activeTrackingId={activeTrackingId}
            onSearchResult={(data) =>
              setTrackingResults((prev) => [...prev, ...data])
            }
            onSelectTracking={setActiveTrackingId}
          />
        </div>

        <div className="bg-secondary-foreground p-4 rounded-lg col-span-4">
          map view
        </div>
      </div>

      <div className="bg-primary-foreground p-4 rounded-lg">test 4</div>
    </main>
  );
};

export default DashboardClient;

//  <div className="space-y-6 ">
//       <div className="grid grid-cols-4 gap-6">
//         <StatCard title="Active bookings" value={0} />
//         <StatCard title="Total bookings" value={0} />
//         <StatCard title="Requests" value={0} />
//         <div className="bg-white rounded-lg border p-4">
//           <div className="text-sm text-muted-foreground mb-2">
//             Get instant, competitive rates for your shipments.
//           </div>
//           <button className="bg-orange-500 text-white px-4 py-2 rounded shadow-sm">
//             Request a quote
//           </button>
//         </div>
//       </div>

//       <div className="bg-white p-4  h-full">
//         <CargoTrackingCard
//           trackingId="TRK-9X2A8K"
//           status="In Transit"
//           from="Manila, PH"
//           to="Douala, CM"
//         />
//         <TrackingDashboard trackingCode="b6b2caf0-9f6f-46c0-847f-8fe884c73b33"/>
//       </div>

//       <div className="grid grid-cols-3 gap-6">
//         <div className="bg-white rounded-lg border p-4">Bookings overview</div>
//         <div className="bg-white rounded-lg border p-4">Recent activity</div>
//         <div className="bg-white rounded-lg border p-4">Notifications</div>
//       </div>
//     </div>
