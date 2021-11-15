import { Get, Injectable } from '@nestjs/common';
import { IPaginationParams } from 'modules/common/interfaces/pagination';
import { IOrder } from 'modules/database/interfaces/order';
import { Order } from 'modules/database/models/order';
import { Transaction } from 'objection';

@Injectable()
export class OrderRepository {
  @Get()
  public async findAll(params: IPaginationParams, transaction?: Transaction): Promise<any> {
    let query = Order.query(transaction)
      .select('*')
      .page(params.page, params.pageSize);

    if (params.orderBy) {
      if (params.orderBy !== 'name') {
        query = query.orderBy(params.orderBy, params.orderDirection);
      } else {
        query = query.orderBy('name', params.orderDirection);
      }
    }

    if (params.term) {
      query = query.where(query => {
        return query.where('name', 'ilike', `%${params.term}%`).orWhere('description', 'ilike', `%${params.term}%`);
      });
    }

    return query;
  }

  public async findById(orderId: number, transaction: Transaction = null): Promise<Order> {
    return Order.query(transaction).findById(orderId);
  }

  public async insert(model: IOrder, transaction: Transaction = null): Promise<Order> {
    return Order.query(transaction).insertAndFetch(model as any);
  }

  public async update(model: IOrder, transaction?: Transaction): Promise<Order> {
    return Order.query(transaction).updateAndFetchById(model.id, <Order>model);
  }

  public async remove(orderId: string, transaction: Transaction = null): Promise<void> {
    await Order.query(transaction).deleteById(orderId);
  }
}
