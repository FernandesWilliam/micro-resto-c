import { IsBoolean, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class StartOrderingDto {
  @IsNotEmpty()
  @IsPositive()
  tableNumber: number;

  @IsNotEmpty()
  @IsPositive()
  customersCount: number;

  @IsNotEmpty()
  @IsBoolean()
  kioskOrder: boolean;

  @IsNumber()
  tablePartitionNumber: number;
}
