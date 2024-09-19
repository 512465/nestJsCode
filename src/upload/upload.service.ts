import { Injectable } from '@nestjs/common';
import * as path from 'path';

@Injectable()
export class UploadService {
  async handleFileUpload(file: Express.Multer.File) {
    const new2path = `uploads${path.sep}${file.filename}`;
    console.log(new2path);

    return { new2path };
  }
}
