import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Work {
  @PrimaryGeneratedColumn()
  workId: number;

  @Column({ default: '' })
  workTitle: string;

  @Column({ type: 'text', default: null })
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

  @Column('simple-array') // simple-array 需要设置为空字符串
  workTags: string[] = []; // 初始化为空数组

  formattedCreateTime?: string;
}
