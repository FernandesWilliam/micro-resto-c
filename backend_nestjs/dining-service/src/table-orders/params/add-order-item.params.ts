import { IsNumberString, IsOptional } from 'class-validator';

export class TablePartitionQueryParams {
	@IsOptional()
	@IsNumberString()
	tablePartitionNumber: number;
}