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
    const user = await this.loginService.findOne(name);
    // console.log(user);
    return user;
  }

  async update(password: string, newPassword: string) {
    const user = await this.loginService.findOne(password);
    // console.log(user);
    if (user && user.password) {
      user.password = newPassword;
    }
    // console.log(user);
    await this.loginService.save(user);
    return user;
  }
}
