import { Controller, Param, Post } from '@nestjs/common';
import { TrackingGateway } from './tracking.gateway';

@Controller('test-tracking')
export class TrackingController {
  constructor(private readonly trackingGateway: TrackingGateway) {}

  @Post(':batchId')
  sendTestUpdate(@Param('batchId') batchId: string) {
    // This simulates a batch moving
    this.trackingGateway.emitShipmentUpdate({
      batchId,
      lat: 14.5123, // test latitude
      lng: 121.0321, // test longitude
      status: 'IN_TRANSIT',
    });
    return { message: 'Test batch update sent!' };
  }
}
