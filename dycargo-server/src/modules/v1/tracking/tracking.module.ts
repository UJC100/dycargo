import { Module } from '@nestjs/common';
import { TrackingGateway } from './tracking.gateway';
import { TrackingController } from './tracking.controller';

@Module({
  providers: [TrackingGateway],
  exports: [TrackingGateway],
  controllers: [TrackingController],
})
export class TrackingModule {}
