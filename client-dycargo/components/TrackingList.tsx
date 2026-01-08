import { TrackingItem } from "@/types/trackingItem.types";
import { TrackingListItem } from "./TrackingListItem";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";
import { CircleCheckBig, PlaneTakeoff } from "lucide-react";
import { TrackingEvent } from "@/types/trackingEvent";



type TrackingListProps = {
  trackingEvent: TrackingEvent[];
  results: TrackingItem[];
  activeTrackingId: string | null;
  onSelect: (trackingId: string) => void;
};

export function TrackingList({
  trackingEvent,
  results,
  activeTrackingId,
  onSelect,
}: TrackingListProps) {
  
  return (
    <Accordion
  type="single"
  collapsible
  value={activeTrackingId ?? undefined}
  onValueChange={onSelect}
  className="space-y-3"
>
  {results.map((item) => {
   
   return  <AccordionItem
      key={item.trackingCode}
      value={item.trackingCode}
      className="rounded-xl border"
    >
      {/* HEADER */}
      <AccordionTrigger className="px-4 py-3 hover:no-underline">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Truck icon */}
            <div className="h-10 w-10 rounded-full border flex items-center justify-center bg-black">
              <PlaneTakeoff className='text-amber-500'/>
            </div>

            <div className="text-left">
              <p className="text-sm text-muted-foreground">Shipping ID</p>
              <p className="font-semibold text-black">#{item.trackingCode}</p>
            </div>
          </div>

          <Badge  className={cn(
                  "cursor-pointer border py-1 px-3 transition-all",
                  item.status === "Pending"
                    ? "border-amber-400  bg-amber-300/30 text-amber-500"
                    : "border-blue-400  bg-blue-300/30 text-blue-500"
                )}>{item.status}</Badge>
        </div>
      </AccordionTrigger>

      {/* DROPDOWN CONTENT */}
      <AccordionContent className="px-4 pb-4">
        <div className="relative pl-6 space-y-6">
      {/* vertical line */}
      <div className="absolute left-[9px] top-0 h-full w-px bg-border" />

      {trackingEvent.map((event) => (
        <div key={event.id} className="">

          <div className="flex items-center gap-2">
          <CircleCheckBig size={20} className={cn(
            event.isCurrent ? "text-emerald-500" : "text-black",
          )}/>
          <p className="text-xs text-muted-foreground">{event.date}</p>
          </div>
          <p className="font-medium text-black ">{event.title}</p>
          <p className="text-sm text-muted-foreground">{event.location}</p>
        </div>
      ))}
    </div>
      </AccordionContent>
    </AccordionItem>
})}
</Accordion>

  );
}


{/* <div className="flex-1 overflow-y-auto p-2 space-y-2">
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
    </div> */}