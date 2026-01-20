import { TrackingGateway } from './../tracking/tracking.gateway';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaDatabaseService } from '../prisma-database/prisma-database.service';
import { CreateBatchDto, UpdateBatchDto } from './dto/batch.dto';
import { BatchStatus } from 'generated/prisma/enums';
import { FlightService } from '../flight/flight.service';
import { generateTrackingId } from 'src/common/utils/tracking.utils';

@Injectable()
export class BatchService {
  constructor(
    private readonly prisma: PrismaDatabaseService,
    private readonly flightService: FlightService,
    private readonly trackingGateway: TrackingGateway,
  ) {}
  private readonly logger = new Logger(BatchService.name);

  async createBatch(dto: CreateBatchDto) {
    const batchCode = `BATCH-${Date.now()}`;

    return await this.prisma.batch.create({
      data: {
        batchCode,
        batchName: dto.batchName,
      },
    });
  }

  async getAllBatches() {
    return await this.prisma.batch.findMany({
      include: {
        shipments: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getBatchById(batchId: string) {
    const batch = await this.prisma.batch.findUnique({
      where: { id: batchId },
      include: {
        shipments: true,
      },
    });

    if (!batch) {
      throw new NotFoundException('Batch not found');
    }

    return batch;
  }

  async updateBatch(batchId: string, dto: UpdateBatchDto) {
    const batch = await this.prisma.batch.findUnique({
      where: { id: batchId },
    });

    if (!batch) {
      throw new NotFoundException('Batch not found');
    }

    return this.prisma.batch.update({
      where: { id: batchId },
      data: {
        ...dto,
        status: BatchStatus.IN_TRANSIT,
      },
    });
  }

  async updateBatchFlightPosition(batchId: string) {
    const batch = await this.prisma.batch.findUnique({
      where: { id: batchId },
    });

    if (!batch || !batch.flightNumber) {
      return null;
    }

    const flightData = await this.flightService.getFlightPosition(
      batch.flightNumber,
    );

    if (!flightData) {
      return null;
    }

    // Use a Transaction to ensure both the Batch and the History are updated together
    const updatedBatch = await this.prisma.$transaction(async (tx) => {
      // 1. Update the main Batch coordinates
      const batchUpdate = await tx.batch.update({
        where: { id: batchId },
        data: {
          currentLat: flightData.latitude,
          currentLng: flightData.longitude,
          status: BatchStatus.IN_TRANSIT,
        },
      });

      // 2. Create a history record in BatchLocation
      await tx.batchLocation.create({
        data: {
          batchId: batchId,
          // Converting coordinates to string for your 'currentLoction' field
          currentLoction: `${flightData.latitude.toFixed(4)}, ${flightData.longitude.toFixed(4)}`,
          // Prisma handles DateTime, but your schema uses String for createdAt/updatedAt
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      });

      return batchUpdate;
    });

    // 3. Emit the update to the frontend via WebSocket
    this.trackingGateway.emitShipmentUpdate({
      batchId: batchId,
      lat: updatedBatch.currentLat!,
      lng: updatedBatch.currentLng!,
      status: BatchStatus.IN_TRANSIT,
    });

    return updatedBatch;
  }

  async updateAllActiveFlightPositions(): Promise<void> {
    // Fetch all batches that are IN_TRANSIT and have a flight number
    const activeBatches = await this.prisma.batch.findMany({
      where: {
        status: BatchStatus.IN_TRANSIT,
        flightNumber: { not: null },
      },
      select: {
        id: true,
        flightNumber: true,
      },
    });

    for (const batch of activeBatches) {
      try {
        await this.updateBatchFlightPosition(batch.id);
      } catch (error: unknown) {
        // Type-safe error handling
        const message =
          error instanceof Error ? error.message : 'Unknown error';
        this.logger.error(
          `Failed to update flight for batch ${batch.id}`,
          message,
        );
      }
    }
  }

  async getBatchLocation(batchId: string) {
    return this.prisma.batch.findUnique({
      where: { id: batchId },
      select: {
        id: true,
        currentLat: true,
        currentLng: true,
        status: true,
        updatedAt: true,
      },
    });
  }

  async updateShipmentTrackingNumber(batchId: string) {
    const batch = await this.prisma.batch.findUnique({
      where: { id: batchId },
      include: { shipments: true },
    });

    if (!batch) {
      throw new Error('Batch not found');
    }

    // Filter shipments without tracking IDs
    const shipmentsWithoutTracking = batch.shipments.filter(
      (shipment) => !shipment.trackingNumber,
    );

    if (shipmentsWithoutTracking.length === 0) {
      return {
        message: 'All shipments already have tracking IDs',
      };
    }

    // Update each shipment
    await this.prisma.$transaction(
      shipmentsWithoutTracking.map((shipment) =>
        this.prisma.shipment.update({
          where: { id: shipment.id },
          data: {
            trackingNumber: batch.flightNumber
              ? generateTrackingId({
                  flightNumber: batch.flightNumber,
                })
              : null,
          },
        }),
      ),
    );

    return {
      message: 'Tracking IDs generated successfully',
      count: shipmentsWithoutTracking.length,
    };
  }
}
