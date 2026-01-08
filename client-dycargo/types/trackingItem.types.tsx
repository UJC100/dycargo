export type TrackingItem = {
  id: string;
  status: "Pending" | "In Transit" | "delivered";
  origin?: string;
  destination?: string;
  lastUpdatedAt?: string;
  trackingCode: string;
};