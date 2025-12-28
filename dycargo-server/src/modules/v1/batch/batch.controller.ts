import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { BatchService } from './batch.service';
import {
  CreateBatchDto,
  UpdateBatchDto,
  UpdateTrackingNumberDto,
} from './dto/batch.dto';

@Controller('batch')
export class BatchController {
  constructor(private readonly batchService: BatchService) {}

  @Post()
  async createBatch(@Body() dto: CreateBatchDto) {
    return await this.batchService.createBatch(dto);
  }

  @Post('/updateTrackingNumber')
  async updateShipmentTrackingNumber(@Body() dto: UpdateTrackingNumberDto) {
    return await this.batchService.updateShipmentTrackingNumber(dto.batchId);
  }

  @Get()
  async getAllBatches() {
    return await this.batchService.getAllBatches();
  }

  @Get(':id')
  async getBatch(@Param('id') id: string) {
    return await this.batchService.getBatchById(id);
  }

  @Get(':batchId/flight-position')
  async getFlightPosition(@Param('batchId') batchId: string) {
    return await this.batchService.updateBatchFlightPosition(batchId);
  }

  @Get(':batchId/location')
  async getBatchLocation(@Param('batchId') batchId: string) {
    return await this.batchService.getBatchLocation(batchId);
  }
  @Patch(':id')
  async updateBatch(@Param('id') id: string, @Body() dto: UpdateBatchDto) {
    return await this.batchService.updateBatch(id, dto);
  }
}
