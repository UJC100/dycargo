import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { BatchService } from './batch.service';
import { CreateBatchDto, UpdateBatchDto } from './dto/batch.dto';

@Controller('batch')
export class BatchController {
  constructor(private readonly batchService: BatchService) {}

  @Post()
  createBatch(@Body() dto: CreateBatchDto) {
    return this.batchService.createBatch(dto);
  }

  @Get()
  getAllBatches() {
    return this.batchService.getAllBatches();
  }

  @Get(':id')
  getBatch(@Param('id') id: string) {
    return this.batchService.getBatchById(id);
  }

  @Patch(':id')
  updateBatch(@Param('id') id: string, @Body() dto: UpdateBatchDto) {
    return this.batchService.updateBatch(id, dto);
  }
}
