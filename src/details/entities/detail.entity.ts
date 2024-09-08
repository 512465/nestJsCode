import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity()
export class Detail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column()
  type: string;

  @Column()
  contact: string;

  @Column()
  updateTime: Date;
}
