import { Injectable, NotFoundException } from '@nestjs/common';
import { BatchStatus, Status } from '@prisma/client';
import { PrismaDatabaseService } from '../prisma-database/prisma-database.service';
import { CreateShipmentDto } from './dto/shipment.dto';
import { generateTrackingId } from 'src/common/utils/tracking.utils';

@Injectable()
export class ShipmentService {
  constructor(private readonly prisma: PrismaDatabaseService) {}

  /**
   * Create a shipment (NO tracking number yet)
   */
  async createShipment(dto: CreateShipmentDto) {
    // 1️⃣ Validate batch
    const batch = await this.prisma.batch.findUnique({
      where: { id: dto.batchId },
    });

    if (!batch) {
      throw new NotFoundException('Batch not found');
    }

    // 3️⃣ Create shipment + initial status log
    const shipment = await this.prisma.shipment.create({
      data: {
        batchId: dto.batchId,

        senderName: dto.senderName,
        senderEmail: dto.senderEmail,

        receiverName: dto.receiverName,
        receiverEmail: dto.receiverEmail,
        receiverPhone: dto.receiverPhone,

        description: dto.description,

        currentStatus: Status.PENDING,
        trackingNumber: batch.flightNumber
          ? generateTrackingId({ flightNumber: batch.flightNumber })
          : null,

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
      },
    });

    return shipment;
  }

  /**
   * Get shipment by tracking number (public endpoint later)
   */
  async getShipmentByTracking(trackingNumber: string) {
    const shipment = await this.prisma.shipment.findUnique({
      where: { trackingNumber },
      include: {
        statusLogs: {
          orderBy: { createdAt: 'asc' },
        },
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
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}
