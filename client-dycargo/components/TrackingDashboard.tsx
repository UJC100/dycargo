// components/tracking-dashboard.tsx
"use client"

import { useLiveShipment } from "@/hooks/useLiveTracking"
import Mapview from "./Mapview"



type Props = {
  trackingCode: string
}

export default function TrackingDashboard({ trackingCode }: Props) {
  const liveData = useLiveShipment(trackingCode)

  return (
      <div className="grid gap-4">
      <div className="rounded-xl border p-4">
        {liveData ? (
          <>
            <p><strong>Status:</strong> {liveData.status}</p>
            <p><strong>Batch:</strong> {liveData.batchId}</p>
          </>
        ) : (
          <p className="text-muted-foreground">Waiting for live data…</p>
        )}
      </div>

      <div className="h-[420px] overflow-hidden">
        <Mapview
          lat={liveData?.lat ?? 14.5995}
          lng={liveData?.lng ?? 120.9844}
        />
      </div>
    </div>
  )
}
