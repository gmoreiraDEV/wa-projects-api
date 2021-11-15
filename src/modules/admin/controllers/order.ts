import { Controller, Get, Post, Body, Param, Delete, Query, ParseIntPipe, Put } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { IOrder } from 'modules/database/interfaces/order';
import { Order } from 'modules/database/models/order';
import { OrderRepository } from '../repositories/order';
import { OrderService } from '../services/order';
import { ListValidator } from '../validators/order/list';
import { UpdateValidator } from '../validators/order/update';

@ApiTags('Admin: Order')
@Controller('/order')
export class OrderController {
  constructor(private orderRespository: OrderRepository, private orderService: OrderService) {}

  @Post()
  @ApiResponse({ status: 201, type: Order })
  public async create(@Body() createOrderDto: IOrder) {
    return this.orderService.create(createOrderDto);
  }

  @Get()
  @ApiResponse({ status: 200, type: [Order] })
  public async findAll(@Query() model: ListValidator) {
    return await this.orderRespository.findAll(model);
  }

  @Get(':orderId')
  @ApiResponse({ status: 200, type: Order })
  public async findById(@Param('orderId', ParseIntPipe) orderId: number) {
    return await this.orderService.findById(orderId);
  }

  @Put(':orderId')
  @ApiResponse({ status: 200, type: Order })
  public async update(@Body() model: UpdateValidator) {
    return await this.orderService.update(model);
  }

  @Delete(':orderId')
  @ApiResponse({ status: 200, type: Order })
  public async remove(@Param('orderId', ParseIntPipe) orderId: string) {
    return await this.orderService.remove(orderId);
  }
}
