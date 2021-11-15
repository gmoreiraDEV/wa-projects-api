import { Injectable, NotFoundException } from '@nestjs/common';
import { IOrder } from 'modules/database/interfaces/order';
import { Order } from 'modules/database/models/order';
import { OrderRepository } from '../repositories/order';

@Injectable()
export class OrderService {
  constructor(private orderRepository: OrderRepository) {}

  public async create(model: IOrder): Promise<Order> {
    const order = await this.orderRepository.insert(model);

    return order;
  }

  public async findById(orderId: number): Promise<Order> {
    const order = await this.orderRepository.findById(orderId);

    return order;
  }

  public async update(model: IOrder): Promise<Order> {
    const orderToUpdate = await this.orderRepository.findById(model.id);

    if (!orderToUpdate) throw new NotFoundException('not-found');

    return this.orderRepository.update({ ...orderToUpdate, ...model });
  }

  public async remove(orderId: string): Promise<void> {
    await this.orderRepository.remove(orderId);
  }
}
