import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Work {
  @PrimaryGeneratedColumn()
  workId: number;

  @Column()
  workTitle: string;

  @Column({ type: 'text' })
  workDescription: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  workCreateTime: Date;

  @Column({ default: 'CodePaint' })
  workAuthor: string;

  @Column({
    type: 'int',
    default: 0,
  })
  workLookCount: number;

  @Column({ default: '交互设计' })
  workType: string;

  @Column()
  workCover: string;
}
