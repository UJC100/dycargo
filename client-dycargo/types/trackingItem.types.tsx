export type TrackingStatus =
  | "PENDING"
  | "IN_TRANSIT"
  | "DELIVERED";

export type StatusLog = {
  id: string;
  status: TrackingStatus;
  description?: string;
  location?: string;
  createdAt: string;
};

export type BatchInfo = {
  id: string;
  batchCode: string;
  batchName: string;
  airline: string;
  flightNumber: string;
  currentLat: number;
  currentLng: number;
  status: TrackingStatus;
  createdAt: string;
  updatedAt: string;
};

export type TrackingItem = {
  id: string;

  // Tracking identifiers
  trackingNumber: string;
  batchId: string;

  // Shipment info
  description: string;

  senderName: string;
  senderEmail: string;

  receiverName: string;
  receiverEmail: string;
  receiverPhone: string;

  // Status
  currentStatus: TrackingStatus;
  statusLogs: StatusLog[];

  // Batch / flight
  batch: BatchInfo;

  // Timestamps
  createdAt: string;
  updatedAt: string;
};
