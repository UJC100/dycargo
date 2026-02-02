import { Injectable, NotFoundException } from '@nestjs/common';
import { BatchStatus, Status } from '@prisma/client';
import { PrismaDatabaseService } from '../prisma-database/prisma-database.service';
import { CreateShipmentDto } from './dto/shipment.dto';
import { generateTrackingId } from 'src/common/utils/tracking.utils';

@Injectable()
export class ShipmentService {
  constructor(private readonly prisma: PrismaDatabaseService) {}

  /**
   * Create a shipment WITH cargo items
   */
  async createShipment(dto: CreateShipmentDto) {
    // 1️⃣ Validate batch
    const batch = await this.prisma.batch.findUnique({
      where: { id: dto.batchId },
    });

    if (!batch) {
      throw new NotFoundException('Batch not found');
    }

    // 2️⃣ Create shipment + cargo items + initial status log
    const shipment = await this.prisma.shipment.create({
      data: {
        batchId: dto.batchId,

        senderName: dto.senderName,
        senderEmail: dto.senderEmail,

        receiverName: dto.receiverName,
        receiverEmail: dto.receiverEmail,
        receiverPhone: dto.receiverPhone,

        currentStatus: Status.PENDING,

        trackingNumber: batch.flightNumber
          ? generateTrackingId({ flightNumber: batch.flightNumber })
          : null,

        shipmentItems: {
          create: dto.shipmentItems.map((item) => ({
            name: item.name,
            quantity: item.quantity,
            weightKg: item.weightKg,
          })),
        },

        statusLogs: {
          create: {
            status: batch.flightNumber
              ? BatchStatus.READY
              : BatchStatus.PENDING,
            message: batch.flightNumber
              ? 'Shipment ready for delivery'
              : 'Shipment received and awaiting flight assignment',
          },
        },
      },
      include: {
        statusLogs: true,
        shipmentItems: true, // 👈 IMPORTANT
      },
    });

    return shipment;
  }

  /**
   * Get shipment by tracking number (public endpoint)
   */
  async getShipmentByTrackingId(trackingNumber: string) {
    const shipment = await this.prisma.shipment.findUnique({
      where: { trackingNumber },
      include: {
        statusLogs: {
          orderBy: { createdAt: 'asc' },
        },
        shipmentItems: true, // 👈 INCLUDE CARGO
        batch: true,
      },
    });

    if (!shipment || !shipment.batch) {
      throw new NotFoundException('Shipment not found');
    }

    return shipment;
  }

  /**
   * Get all shipments in a batch (admin use)
   */
  async getShipmentsByBatch(batchId: string) {
    return this.prisma.shipment.findMany({
      where: { batchId },
      include: {
        statusLogs: true,
        shipmentItems: true, // 👈 INCLUDE CARGO
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}
