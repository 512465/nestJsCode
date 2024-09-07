import { Controller, Get, Body, Patch } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // 获取用户 id username password
  @Get()
  async create(@Body() body) {
    const { name } = body;
    return this.userService.create(name);
  }

  // 修改密码
  @Patch('/NewPassword')
  async update(@Body() body) {
    // console.log(body);
    const { name, newPassword } = body;
    return this.userService.update(name, newPassword);
  }
}
