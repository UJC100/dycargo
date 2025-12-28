import { IsOptional, IsString } from 'class-validator';

export class CreateBatchDto {
  @IsString()
  batchName: string;
}

export class UpdateBatchDto {
  @IsOptional()
  @IsString()
  flightNumber?: string;

  @IsOptional()
  @IsString()
  airline?: string;
}

export class UpdateTrackingNumberDto {
  @IsString()
  batchId: string;
}
