import { TrackingItem } from "@/types/trackingItem.types";
import { TrackingListItem } from "./TrackingListItem";



type TrackingListProps = {
  results: TrackingItem[];
  activeTrackingId: string | null;
  onSelect: (trackingId: string) => void;
};

export function TrackingList({
  results,
  activeTrackingId,
  onSelect,
}: TrackingListProps) {
  return (
    <div className="flex-1 overflow-y-auto p-2 space-y-2">
      {results.length === 0 && (
        <p className="text-sm text-muted-foreground text-center mt-6">
          No shipments tracked yet
        </p>
      )}

      {results.map((item) => (
        <TrackingListItem
          key={item.trackingCode}
          item={item}
          isActive={item.trackingCode === activeTrackingId}
          onClick={() => onSelect(item.trackingCode)}
        />
      ))}
    </div>
  );
}
