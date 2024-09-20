import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
} from 'typeorm';
@Entity()
export class Activity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  creator: string;

  @Column()
  picture: string;

  @Column()
  intro: string;

  @Column()
  content: string;

  @UpdateDateColumn()
  updateTime: Date;
}
