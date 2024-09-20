import { Injectable } from '@nestjs/common';
import * as path from 'path';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class UploadService {
  constructor(private readonly userService: UserService) {}

  // upload上传头像
  async handleFileUpload(file: Express.Multer.File) {
    const new2path = `uploads${path.sep}${file.filename}`;
    console.log(new2path);
    const user: User = await this.userService.create('CodePaint');
    console.log(user);
    await this.userService.save({
      ...user,
      url: new2path.replace(/\\/g, '/'),
    });

    return {
      code: 200,
      data: new2path.replace(/\\/g, '/'),
      msg: '上传成功',
    };
  }

  // upload上传图片(通用)
  async handleFileUpload2(file: Express.Multer.File) {
    const newpath = `uploads${path.sep}${file.filename}`;
    console.log(newpath);
    return {
      code: 200,
      data: newpath.replace(/\\/g, '/'),
      msg: '上传成功',
    };
  }
}
