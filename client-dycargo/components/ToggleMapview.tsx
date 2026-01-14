import {
  ToggleGroup,
  ToggleGroupItem,
} from '@/components/ui/toggle-group';
import { Cable, MapPin } from 'lucide-react';

type ViewMode = 'map' | 'tracking';

export function ToggleMapview({
  value,
  onChange,
}: {
  value: ViewMode;
  onChange: (v: ViewMode) => void;
}) {
  return (
    <div className="absolute top-2 right-4 z-50 text-black">
      <ToggleGroup
        type="single"
        value={value}
        onValueChange={(v) => v && onChange(v as ViewMode)}
        className="rounded-lg bg-white shadow-md"
      >
        <ToggleGroupItem
          value="map"
          className="px-4 py-2 data-[state=on]:bg-amber-600 data-[state=on]:text-white"
        >
            <MapPin/>
          Map View
        </ToggleGroupItem>

        <ToggleGroupItem
          value="tracking"
          className="px-4 py-2 data-[state=on]:bg-amber-600 data-[state=on]:text-white"
        >
            <Cable/>
          Live Tracking
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}
