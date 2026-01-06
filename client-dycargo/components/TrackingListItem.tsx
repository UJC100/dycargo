import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { TrackingItem } from "@/types/trackingItem.types";


type TrackingListItemProps = {
  item: TrackingItem;
  isActive: boolean;
  onClick: (trackingId: string) => void;
};

export function TrackingListItem({ item, isActive, onClick }: TrackingListItemProps) {
  return (
    <div
      onClick={() => onClick(item.id)}
      className={cn(
        "cursor-pointer rounded-lg border p-3 transition-all",
        isActive
          ? "border-primary bg-primary/5"
          : "hover:bg-muted"
      )}
    >
      <div className="flex items-center justify-between">
        <p className="font-medium text-sm">
          {item.trackingCode}
        </p>
        <Badge variant="outline">
          {item.status}
        </Badge>
      </div>

      <p className="text-xs text-muted-foreground mt-1">
        {item.origin} → {item.destination}
      </p>
    </div>
  );
}
