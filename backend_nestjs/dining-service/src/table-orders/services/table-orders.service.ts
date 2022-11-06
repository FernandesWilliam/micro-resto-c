import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Table } from '../../tables/schemas/table.schema';
import { TableOrder, TableOrderDocument } from '../schemas/table-order.schema';
import { OrderingItem } from '../schemas/ordering-item.schema';
import { OrderingLine } from '../schemas/ordering-line.schema';

import { StartOrderingDto } from '../dto/start-ordering.dto';
import { AddMenuItemDto } from '../dto/add-menu-item.dto';
import { PreparationDto } from '../dto/preparation.dto';

import { OrderingLinesWithPreparations } from '../interfaces/ordering-lines-with-preparations.interface';

import { TablesService } from '../../tables/services/tables.service';
import { MenuProxyService } from './menu-proxy.service';
import { KitchenProxyService } from './kitchen-proxy.service';

import { TableOrderIdNotFoundException } from '../exceptions/table-order-id-not-found.exception';
import { AddMenuItemDtoNotFoundException } from '../exceptions/add-menu-item-dto-not-found.exception';
import { TableOrderAlreadyBilledException } from '../exceptions/table-order-already-billed.exception';
import { DeleteMenuItemNotFoundException } from '../exceptions/delete-menu-item-not-found.exception';
import { TableSubOrder } from '../schemas/table-sub-order.schema';

@Injectable()
export class TableOrdersService {
  constructor(
    @InjectModel(TableOrder.name)
    private tableOrderModel: Model<TableOrderDocument>,
    private readonly tablesService: TablesService,
    private readonly menuProxyService: MenuProxyService,
    private readonly kitchenProxyService: KitchenProxyService,
  ) {}

  async findAll(): Promise<TableOrder[]> {
    return this.tableOrderModel.find().lean();
  }

  async findOne(tableOrderId: string): Promise<TableOrder> {
    const foundItem = await this.tableOrderModel
      .findOne({ _id: tableOrderId })
      .lean();

    if (foundItem === null) {
      throw new TableOrderIdNotFoundException(tableOrderId);
    }

    return foundItem;
  }

  private async takeTableForKioskOrder() {
    const tables = await this.tablesService.findAll();
    let tableNumber = tables.length + 1;
    for (let i = 1; i < tables.length; i++) {
      if (!tables.find((table) => table.number === i)) {
        tableNumber = i;
        break;
      }
    }

    const table = await this.tablesService.create({
      number: tableNumber,
    });
    return await this.tablesService.takeTable(table.number);
  }

  async startOrdering(startOrderingDto: StartOrderingDto): Promise<TableOrder> {
    let tableOrder: TableOrder = await this.tableOrderModel
      .findOne({tableNumber: startOrderingDto.tableNumber, billed: null})
      .lean();

    let toCreate = true;
    if (tableOrder === null)
      tableOrder = new TableOrder();
    else
      toCreate = false

    let table: Table;
    if (startOrderingDto.kioskOrder) {
      table = await this.takeTableForKioskOrder();
      tableOrder.customersCount = startOrderingDto.customersCount;
    } else {
      const subOrders = [];
      if (toCreate) {
        table = await this.tablesService.takeTable(startOrderingDto.tableNumber);
        tableOrder.customersCount = startOrderingDto.customersCount;
      } else {
        subOrders.push(...tableOrder.sub_orders);
        table = { _id: undefined, number: tableOrder.tableNumber, taken: true };
        tableOrder.customersCount += 1;
      }

      const subOrder: TableSubOrder = {
        tablePartitionNumber: startOrderingDto.tablePartitionNumber,
        lines: [], billed: null
      }

      if (!subOrders.find((s) => s.tablePartitionNumber === subOrder.tablePartitionNumber))
        subOrders.push(subOrder);

      tableOrder.sub_orders = subOrders;
    }

    tableOrder.tableNumber = table.number;
    tableOrder.opened = new Date();
    tableOrder.kioskOrder = startOrderingDto.kioskOrder;

    if (toCreate)
      return await this.tableOrderModel.create(tableOrder);
    else
      return this.tableOrderModel.findByIdAndUpdate(
        tableOrder._id,
        { $set: { sub_orders: tableOrder.sub_orders, customersCount: tableOrder.customersCount }},
        { returnDocument: 'after' }
      );
  }

  async addOrderingLineToTableOrder(
    tableOrderId: string,
    addMenuItemDto: AddMenuItemDto,
  ): Promise<TableOrder> {
    const tableOrder: TableOrder = await this.findOne(tableOrderId);

    if (tableOrder.billed !== null) {
      throw new TableOrderAlreadyBilledException(tableOrder);
    }

    const orderingItem: OrderingItem =
      await this.menuProxyService.findByShortName(
        addMenuItemDto.menuItemShortName,
      );

    if (orderingItem === null) {
      throw new AddMenuItemDtoNotFoundException(addMenuItemDto);
    }

    if (addMenuItemDto.menuItemId !== orderingItem._id) {
      throw new AddMenuItemDtoNotFoundException(addMenuItemDto);
    }

    const orderLines = tableOrder.lines;
    const lineIndex = orderLines.findIndex(
      (line) => line.item?._id === addMenuItemDto.menuItemId,
    );

    if (lineIndex !== -1) {
      orderLines[lineIndex].howMany += addMenuItemDto.howMany;
    } else {
      const orderingLine: OrderingLine = new OrderingLine();
      orderingLine.item = orderingItem;
      orderingLine.howMany = addMenuItemDto.howMany;
      orderLines.push(orderingLine);
    }

    return this.tableOrderModel.findByIdAndUpdate(
      tableOrder._id,
      { $set: { lines: orderLines } },
      { returnDocument: 'after' },
    );
  }

  async deleteOrderingLineFromTableOrder(
    tableOrderId: string,
    menuItemId: string,
  ) {
    const tableOrder: TableOrder = await this.findOne(tableOrderId);

    if (tableOrder.billed !== null) {
      throw new TableOrderAlreadyBilledException(tableOrder);
    }

    const orderingLine: OrderingLine = tableOrder.lines.find(
      (line) => line.item._id === menuItemId,
    );
    if (orderingLine === undefined)
      throw new DeleteMenuItemNotFoundException(menuItemId);
    orderingLine.howMany === 1
      ? (tableOrder.lines = tableOrder.lines.filter(
          (orderingLine) => orderingLine.item._id !== menuItemId,
        ))
      : orderingLine.howMany--;

    return this.tableOrderModel.findByIdAndUpdate(
      tableOrder._id,
      { lines: tableOrder.lines },
      { new: true },
    );
  }

  async manageOrderingLines(
    tableNumber: number,
    orderingLines: OrderingLine[],
  ): Promise<OrderingLinesWithPreparations> {
    const orderingLinesToSend: OrderingLine[] = [];

    const newOrderingLines: OrderingLine[] = orderingLines.map(
      (orderingLine) => {
        if (!orderingLine.sentForPreparation) {
          orderingLinesToSend.push(orderingLine);
          orderingLine.sentForPreparation = true;
        }

        return orderingLine;
      },
    );

    const preparations: PreparationDto[] =
      await this.kitchenProxyService.sendItemsToCook(
        tableNumber,
        orderingLinesToSend,
      );

    return {
      orderingLines: newOrderingLines,
      preparations,
    };
  }

  async sendItemsForPreparation(
    tableOrderId: string,
  ): Promise<PreparationDto[]> {
    const tableOrder: TableOrder = await this.findOne(tableOrderId);

    if (tableOrder.billed !== null) {
      throw new TableOrderAlreadyBilledException(tableOrder);
    }

    const managedLines: OrderingLinesWithPreparations =
      await this.manageOrderingLines(tableOrder.tableNumber, tableOrder.lines);

    tableOrder.lines = managedLines.orderingLines;

    await this.tableOrderModel.findByIdAndUpdate(tableOrder._id, tableOrder, {
      returnDocument: 'after',
    });

    return managedLines.preparations;
  }

  async billOrder(tableOrderId: string): Promise<TableOrder> {
    const tableOrder: TableOrder = await this.findOne(tableOrderId);

    if (tableOrder.billed !== null) {
      throw new TableOrderAlreadyBilledException(tableOrder);
    }

    tableOrder.billed = new Date();

    // TODO: Send payment for the table order

    // TODO: Move next line when billing is managed
    await this.tablesService.releaseTable(tableOrder.tableNumber);
    if (tableOrder.kioskOrder) {
      await this.tablesService.delete(tableOrder.tableNumber);
    }

    return this.tableOrderModel.findByIdAndUpdate(tableOrder._id, tableOrder, {
      returnDocument: 'after',
    });
  }
}
