import { Injectable } from '@nestjs/common';
import { CreateLoginDto } from './dto/create-login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Login } from './entities/login.entity';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(Login)
    private readonly loginRepository: Repository<Login>,
  ) {}

  async login(createLoginDto: CreateLoginDto) {
    // console.log(createLoginDto);
    const { username, password } = createLoginDto;
    if (username === 'CodePaint' && password === '123456') {
      return {
        code: 200,
        message: '登录成功',
        data: createLoginDto,
      };
    } else {
      return {
        code: 500,
        message: '用户名或密码错误',
        data: createLoginDto,
      };
    }
  }

  async findOne(password: string) {
    return await this.loginRepository.findOne({ where: { password } });
  }

  async save(login: Login) {
    // console.log(login);
    return await this.loginRepository.save(login);
  }
}
