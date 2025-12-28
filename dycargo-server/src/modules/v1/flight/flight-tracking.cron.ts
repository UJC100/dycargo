import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { BatchService } from '../batch/batch.service';

@Injectable()
export class FlightTrackingCron {
  private readonly logger = new Logger(FlightTrackingCron.name);

  constructor(private readonly batchService: BatchService) {}

  // Runs every 5 minutes
  @Cron('*/5 * * * *')
  async trackFlights() {
    this.logger.log('Running flight tracking cron');

    await this.batchService.updateAllActiveFlightPositions();
  }
}
