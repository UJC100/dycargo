import { Module } from '@nestjs/common';
import { AuthModule } from './modules/v1/auth/auth.module';
import { UsersModule } from './modules/v1/users/users.module';
import { V1Module } from './batch/modules/v1/v1.module';
import { BatchModule } from './modules/v1/batch/batch.module';

@Module({
  imports: [AuthModule, UsersModule, V1Module, BatchModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
