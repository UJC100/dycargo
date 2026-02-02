import { Type } from 'class-transformer';
import {
  IsArray,
  IsEmail,
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
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

  @IsArray()
  @ValidateNested({ each: true }) // Validates each object in the array
  @Type(() => ShipmentItemDto) // Required for class-transformer to recognize the type
  shipmentItems: ShipmentItemDto[];
}

export class ShipmentItemDto {
  @IsString()
  name: string;

  @IsNumber()
  quantity: number;

  @IsOptional()
  @IsNumber()
  weightKg?: number;
}

export class UpdateShipmentLocationDto {
  @IsLatitude()
  lat: number;

  @IsLongitude()
  lng: number;
}
