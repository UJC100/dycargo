import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
})
export class TrackingGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private readonly logger = new Logger(TrackingGateway.name);

  @WebSocketServer()
  server!: Server;

  afterInit() {
    this.logger.log('Tracking WebSocket Gateway initialized');
  }

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  // 🔹 NEW: client joins a batch room
  @SubscribeMessage('join:batch')
  handleJoinBatch(
    @MessageBody() data: { batchId: string },
    @ConnectedSocket() client: Socket,
  ) {
    void client.join(data.batchId);
    this.logger.log(`Client ${client.id} joined batch room ${data.batchId}`);

    client.emit('joined:batch', { batchId: data.batchId });
  }

  /**
   * Emit shipment tracking update (ROOM-BASED)
   */
  emitShipmentUpdate(payload: {
    batchId: string;
    lat: number;
    lng: number;
    status: string;
  }) {
    this.server.to(payload.batchId).emit('shipment:update', payload);
  }
}
