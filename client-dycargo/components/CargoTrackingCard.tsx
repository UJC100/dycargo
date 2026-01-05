import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Truck } from "lucide-react"

type TrackingCardProps = {
  trackingId: string
  status: string
  from: string
  to: string
}

export default function CargoTrackingCard({
  trackingId,
  status,
  from,
  to,
}: TrackingCardProps) {
  return (
    <Card className="rounded-xl border shadow-sm hover:shadow-md transition">
      <CardHeader>
        <CardTitle className="text-sm text-muted-foreground">
          Tracking ID
        </CardTitle>
        <p className="text-lg font-semibold">{trackingId}</p>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm">
          <Truck className="text-orange-500" size={18} />
          <span className="font-medium">{status}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin size={16} />
          <span>{from}</span>
          <span>→</span>
          <span>{to}</span>
        </div>
      </CardContent>
    </Card>
  )
}
