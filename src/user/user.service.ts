import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginService } from '../login/login.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly loginService: LoginService,
  ) {}

  async create(name: string) {
    const user = await this.loginService.findUser(name);
    const data = await this.userRepository.findOne({ where: { name } });
    // console.log(user);
    const user2 = await this.userRepository.save({
      ...user,
      url: data?.url,
    });
    return user2;
  }

  async update(password: string, newPassword: string) {
    const user = await this.loginService.findOne(password);
    // console.log(user);
    if (!user) {
      return {
        code: 500,
        message: '原密码错误',
      };
    }
    if (user && user.password) {
      user.password = newPassword;
    }
    // console.log(user);
    await this.loginService.save(user);
    await this.userRepository.save(user);
    return user;
  }

  async save(user: User) {
    return this.userRepository.save(user);
  }
}
