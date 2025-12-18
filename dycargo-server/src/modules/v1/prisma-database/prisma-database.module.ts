import { Global, Module } from '@nestjs/common';
import { PrismaDatabaseService } from './prisma-database.service';

@Global()
@Module({
  providers: [PrismaDatabaseService],
  exports: [PrismaDatabaseService],
})
export class PrismaDatabaseModule {}
