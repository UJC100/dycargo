export type TrackingItem = {
  id: string;
  status: "pending" | "in_transit" | "delivered";
  origin?: string;
  destination?: string;
  lastUpdatedAt?: string;
  trackingCode: string;
};