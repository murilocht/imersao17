import { Products } from 'src/products/entities/products.entity';
import { Orders } from './order.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum OrdersStatus {
  PENDIND = 'pending',
  PAID = 'paid',
  FAILED = 'failed',
}

@Entity()
export class OrderItems {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @ManyToOne(() => Products)
  @JoinColumn({ name: 'product_id' })
  product: Products;

  @Column()
  product_id: string;

  @ManyToOne(() => Orders)
  order: Orders;
}
