import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Count {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  pageCount: number;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  accessTime: Date;
}
