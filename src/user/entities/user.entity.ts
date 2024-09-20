import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn({ default: '123456' })
  id: string;

  @Column({ default: 'CodePaint' })
  name: string;

  @Column()
  password: string;

  @Column({ default: 'uploads/1726828478736-工作室头像.png' })
  url: string;
}
