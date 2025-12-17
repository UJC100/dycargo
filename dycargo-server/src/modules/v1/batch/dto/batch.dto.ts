import { IsEnum, IsOptional, IsString } from 'class-validator';
import { BatchStatus } from '@prisma/client';

export class CreateBatchDto {
  @IsString()
  batchName: string;
}

export class UpdateBatchDto {
  @IsOptional()
  @IsString()
  flightNumber?: string;

  @IsOptional()
  @IsEnum(BatchStatus)
  status?: BatchStatus;
}
