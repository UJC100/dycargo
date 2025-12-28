import { forwardRef, Module } from '@nestjs/common';
import { FlightService } from './flight.service';
import { FlightTrackingCron } from './flight-tracking.cron';
import { BatchModule } from '../batch/batch.module';

@Module({
  imports: [forwardRef(() => BatchModule)],
  providers: [FlightService, FlightTrackingCron],
  exports: [FlightService, FlightTrackingCron],
})
export class FlightModule {}
