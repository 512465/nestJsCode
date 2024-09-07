import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity()
export class Detail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  grade: string;

  @Column()
  department: string;
}
