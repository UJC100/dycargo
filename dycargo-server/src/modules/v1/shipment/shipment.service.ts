import { Injectable, NotFoundException } from '@nestjs/common';
import { Status } from '@prisma/client';
import { PrismaDatabaseService } from '../prisma-database/prisma-database.service';
import {
  CreateShipmentDto,
  UpdateShipmentLocationDto,
} from './dto/shipment.dto';

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

        statusLogs: {
          create: {
            status: Status.PENDING,
            message: 'Shipment received and awaiting flight assignment',
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

    if (!shipment) {
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

  /**
   * Update shipment location (used later for map tracking)
   */
  async updateShipmentLocation(
    shipmentId: string,
    dto: UpdateShipmentLocationDto,
  ) {
    return this.prisma.shipment.update({
      where: { id: shipmentId },
      data: {
        currentLat: dto.lat,
        currentLng: dto.lng,
      },
    });
  }
}
