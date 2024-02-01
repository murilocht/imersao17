import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderItems } from './order-item.entity';

export enum OrdersStatus {
  PENDIND = 'pending',
  PAID = 'paid',
  FAILED = 'failed',
}

export type CreateOrderCommand = {
  client_id: number;
  items: {
    product_id: string;
    quantity: number;
    price: number;
  }[];
};

@Entity()
export class Orders {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total: number;

  @Column()
  client_id: number;

  @Column()
  status: OrdersStatus = OrdersStatus.PENDIND;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => OrderItems, (item) => item.order, { cascade: ['insert'] })
  items: OrderItems[];

  static create(input: CreateOrderCommand) {
    const order = new Orders();
    order.client_id = input.client_id;
    order.items = input.items.map((item) => {
      const orderItem = new OrderItems();
      orderItem.product_id = item.product_id;
      orderItem.quantity = item.quantity;
      orderItem.price = item.price;

      return orderItem;
    });
    order.total = order.items.reduce((sum, item) => {
      return sum + item.price * item.quantity;
    }, 0);
    return order;
  }
}
