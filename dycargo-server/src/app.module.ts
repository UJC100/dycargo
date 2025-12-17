import { Module } from '@nestjs/common';
import { AuthModule } from './modules/v1/auth/auth.module';
import { UsersModule } from './modules/v1/users/users.module';
import { BatchModule } from './modules/v1/batch/batch.module';
import { PrismaDatabaseModule } from './modules/v1/prisma-database/prisma-database.module';
import { ConfigModule } from '@nestjs/config';
import { ShipmentModule } from './modules/v1/shipment/shipment.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes the variables available throughout the app
    }),
    AuthModule,
    UsersModule,
    BatchModule,
    PrismaDatabaseModule,
    ShipmentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
