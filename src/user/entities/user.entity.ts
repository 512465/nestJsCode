import { Entity, Column, PrimaryColumn, ManyToOne } from 'typeorm';
import { Login } from '../../login/entities/login.entity';

@Entity()
export class User {
  @PrimaryColumn({ default: '123456' })
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => Login, (login) => login.users)
  login: Login;
}
