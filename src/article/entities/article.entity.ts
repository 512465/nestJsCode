import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  articleId: number;

  @Column()
  articleTitle: string;

  @Column({ type: 'text' })
  articleContent: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  articleCreatedTime: Date;

  @Column()
  aritcleAuthor: string;

  @Column({ type: 'int', default: 0 })
  atictleLookCount: number;

  @Column()
  articleType: string;
}
