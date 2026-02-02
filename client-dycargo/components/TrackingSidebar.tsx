'use client'
import { TrackingItem } from "@/types/trackingItem.types";
import { TrackingList } from "./TrackingList";
import { TrackingSearch } from "./TrackingSearch";
import { TrackingEvent } from "@/types/trackingEvent";
import { ScrollArea } from "./ui/scroll-area";

type TrackingSidebarProps = {
  trackingEvent: TrackingEvent[];
  trackingResults: TrackingItem[];
  activeTrackingId: string | null;
  onSearchResult: (shipment: TrackingItem) => void;
  onSelectTracking: (trackingId: string) => void;
};


export default function TrackingSidebar({
  
  trackingEvent,
  trackingResults,
  activeTrackingId,
  onSearchResult,
  onSelectTracking,
}: TrackingSidebarProps) {

  return (
    <aside className="w-full rounded-lg border bg-white flex flex-col space-y-2 p-3">
      <div className="p-4 border-b">
        <TrackingSearch onSearchResult={onSearchResult} />
      </div>
      <ScrollArea className="h-[400px]">

      <TrackingList
        trackingEvent={trackingEvent}
        results={trackingResults}
        activeTrackingId={activeTrackingId}
        onSelect={onSelectTracking}
      />
      </ScrollArea>
    </aside>
  );
}