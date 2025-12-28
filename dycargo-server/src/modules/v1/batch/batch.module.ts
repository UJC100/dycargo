import { forwardRef, Module } from '@nestjs/common';
import { BatchController } from './batch.controller';
import { BatchService } from './batch.service';
import { FlightModule } from '../flight/flight.module';
import { TrackingModule } from '../tracking/tracking.module';

@Module({
  imports: [forwardRef(() => FlightModule), TrackingModule],
  controllers: [BatchController],
  providers: [BatchService],
  exports: [BatchService],
})
export class BatchModule {}
