import { TrackingItem } from "@/types/trackingItem.types";
import { TrackingList } from "./TrackingList";
import { TrackingSearch } from "./TrackingSearch";

type TrackingSidebarProps = {
  trackingResults: TrackingItem[];
  activeTrackingId: string | null;
  onSearchResult: (results: TrackingItem[]) => void;
  onSelectTracking: (trackingId: string) => void;
};


export default function TrackingSidebar({
  trackingResults,
  activeTrackingId,
  onSearchResult,
  onSelectTracking,
}: TrackingSidebarProps) {
  return (
    <aside className="w-full rounded-lg border-r bg-white flex flex-col">
      <div className="p-4 border-b">
        <TrackingSearch onSearchResult={onSearchResult} />
      </div>

      <TrackingList
        results={trackingResults}
        activeTrackingId={activeTrackingId}
        onSelect={onSelectTracking}
      />
    </aside>
  );
}