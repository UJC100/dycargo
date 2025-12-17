import {
  IsEmail,
  IsLatitude,
  IsLongitude,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateShipmentDto {
  @IsString()
  batchId: string;

  @IsString()
  senderName: string;

  @IsEmail()
  senderEmail: string;

  @IsString()
  receiverName: string;

  @IsEmail()
  receiverEmail: string;

  @IsString()
  receiverPhone?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  origin?: string;

  @IsString()
  @IsOptional()
  destination?: string;
}

export class UpdateShipmentLocationDto {
  @IsLatitude()
  lat: number;

  @IsLongitude()
  lng: number;
}
