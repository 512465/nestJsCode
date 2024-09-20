import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Login {
  @PrimaryColumn({ default: '123456' })
  id: string;

  @Column({ default: 'CodePaint', update: false })
  username: string;

  @Column({ default: '123456' })
  password: string;
}
