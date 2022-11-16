import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

import { OrderingLine } from './ordering-line.schema';
import { TableSubOrder } from './table-sub-order.schema';

export type TableOrderDocument = TableOrder & Document;

@Schema({
  versionKey: false,
})
export class TableOrder {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  @Prop({ required: true, min: 0 })
  tableNumber: number;

  @ApiProperty()
  @Prop({ required: true, min: 0 })
  customersCount: number;

  @ApiProperty()
  @Prop({ required: true, default: new Date() })
  opened: Date;

  @ApiProperty()
  @Prop({ default: [] })
  lines: OrderingLine[];

  @ApiProperty()
  @Prop({ default: null })
  billed: Date;

  @ApiProperty()
  @Prop({ default: [] })
  sub_orders: TableSubOrder[];

  @ApiProperty()
  @Prop({ default: false })
  kioskOrder: boolean;
}

export const TableOrderSchema = SchemaFactory.createForClass(TableOrder);
