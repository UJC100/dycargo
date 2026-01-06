import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { TrackingItem } from "@/types/trackingItem.types";

type TrackingSearchProps = {
  onSearchResult: (results: TrackingItem[]) => void;
};

export function TrackingSearch({ onSearchResult }: TrackingSearchProps) {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSearch() {
    if (!value.trim()) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/track/${value}`);
      const data = await res.json();
      onSearchResult(data);
      setValue("");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-2">
      <Input
        placeholder="Enter tracking ID"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      <Button
        className="w-full"
        onClick={handleSearch}
        disabled={loading}
      >
        {loading ? "Tracking…" : "Track shipment"}
      </Button>
    </div>
  );
}
