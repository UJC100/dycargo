import { Body, Controller, Get, Param, Post, Patch } from '@nestjs/common';
import { ShipmentService } from './shipment.service';
import {
  CreateShipmentDto,
  UpdateShipmentLocationDto,
} from './dto/shipment.dto';

@Controller('shipments')
export class ShipmentController {
  constructor(private readonly shipmentService: ShipmentService) {}

  /**
   * Create a shipment (Admin / Staff)
   * Tracking number NOT generated yet
   */
  @Post()
  async createShipment(@Body() dto: CreateShipmentDto) {
    return this.shipmentService.createShipment(dto);
  }

  /**
   * Public tracking endpoint
   * Customers use this to track shipments
   */
  @Get('track/:trackingNumber')
  async trackShipment(@Param('trackingNumber') trackingNumber: string) {
    return this.shipmentService.getShipmentByTracking(trackingNumber);
  }

  /**
   * Get all shipments in a batch (Admin)
   */
  @Get('batch/:batchId')
  async getShipmentsByBatch(@Param('batchId') batchId: string) {
    return this.shipmentService.getShipmentsByBatch(batchId);
  }

  @Patch(':shipmentId/location')
  async updateShipmentLocation(
    @Param('shipmentId') shipmentId: string,
    @Body() dto: UpdateShipmentLocationDto,
  ) {
    return this.shipmentService.updateShipmentLocation(shipmentId, dto);
  }
}
