import { IsNumberString, IsOptional } from 'class-validator';

export class AddOrderItemQueryParams {
	@IsOptional()
	@IsNumberString()
	tablePartitionNumber: number;
}