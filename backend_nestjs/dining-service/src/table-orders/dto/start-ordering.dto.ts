import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsPositive } from 'class-validator';

export class StartOrderingDto {
  @IsNotEmpty()
  @IsNumber()
  tableNumber: number;

  @IsNotEmpty()
  @IsPositive()
  customersCount: number;

  @IsNotEmpty()
  @IsBoolean()
  kioskOrder: boolean;

  @IsOptional()
  @IsNumber()
  tablePartitionNumber: number;
}
