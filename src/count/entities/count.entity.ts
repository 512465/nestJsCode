import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Count {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  pageCount: number;

  @CreateDateColumn()
  accessTime: Date;
}
