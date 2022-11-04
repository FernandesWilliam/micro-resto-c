import { ApiProperty } from '@nestjs/swagger';
import { OrderingLine } from './ordering-line.schema';
import { Prop } from '@nestjs/mongoose';

export class TableSubOrder {
  @ApiProperty()
  @Prop({ required: true })
  tablePartitionNumber: number;

  @ApiProperty()
  @Prop({ default: [] })
  lines: OrderingLine[];

  @ApiProperty()
  @Prop({ default: null })
  opened: Date;

  @ApiProperty()
  @Prop({ default: null })
  billed: Date;
}
