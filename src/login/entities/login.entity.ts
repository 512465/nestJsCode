import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Login {
  @PrimaryColumn({ default: '123456' })
  id: string;

  @Column({ default: 'CodePaint', update: false })
  username: string;

  @Column({ default: '123456' })
  password: string;

  @OneToMany(() => User, (user) => user.login)
  users: User[];
}
