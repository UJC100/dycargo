import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaDatabaseService } from '../prisma-database/prisma-database.service';
import { CreateBatchDto, UpdateBatchDto } from './dto/batch.dto';

@Injectable()
export class BatchService {
  constructor(private readonly prisma: PrismaDatabaseService) {}

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
    return this.prisma.batch.update({
      where: { id: batchId },
      data: {
        flightNumber: dto.flightNumber,
        status: dto.status,
      },
    });
  }
}
