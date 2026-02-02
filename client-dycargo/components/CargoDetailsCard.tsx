"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { TrackingItem } from "@/types/trackingItem.types";

type CargoDetailsCardProps = {
  shipment: TrackingItem;
};



export function CargoDetailsCard( {shipment} : CargoDetailsCardProps) {
    
  const totalWeight = shipment.shipmentItems ? shipment.shipmentItems.reduce(
    (sum, item) => sum + (item.weightKg ?? 0) * item.quantity,
    0
  ) : null;

  return (
    <Card className="bg-primary-foreground">
      <CardHeader className="space-y-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">
            Cargo Details
          </CardTitle>

          <Badge
            className={cn(
              shipment.currentStatus === "PENDING" &&
                "bg-amber-100 text-amber-600",
              shipment.currentStatus === "IN_TRANSIT" &&
                "bg-blue-100 text-blue-600",
              shipment.currentStatus === "DELIVERED" &&
                "bg-emerald-100 text-emerald-600"
            )}
          >
            {shipment.currentStatus}
          </Badge>
        </div>

        <p className="text-sm text-muted-foreground">
          Tracking No:{" "}
          <span className="font-medium text-black">
            {shipment.trackingNumber}
          </span>
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Sender / Receiver */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="font-medium">Sender</p>
            <p>{shipment.senderName}</p>
            <p className="text-muted-foreground">{shipment.senderEmail}</p>
          </div>

          <div>
            <p className="font-medium">Receiver</p>
            <p>{shipment.receiverName}</p>
            <p className="text-muted-foreground">{shipment.receiverEmail}</p>
            {shipment.receiverPhone && (
              <p className="text-muted-foreground">
                {shipment.receiverPhone}
              </p>
            )}
          </div>
        </div>

        {/* Cargo Items */}
        <div className="space-y-2">
          <p className="font-medium text-sm">Cargo Items</p>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead className="text-center">Quantity</TableHead>
                <TableHead className="text-right">Weight (kg)</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {shipment.shipmentItems && shipment.shipmentItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">
                    {item.name}
                  </TableCell>
                  <TableCell className="text-center">
                    {item.quantity}
                  </TableCell>
                  <TableCell className="text-right">
                    {item.weightKg
                      ? `${item.weightKg * item.quantity} kg`
                      : "—"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Total */}
        <div className="flex justify-end">
          <p className="text-sm">
            Total Weight:{" "}
            <span className="font-semibold">{totalWeight} kg</span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
