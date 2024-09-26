import { Controller, Get } from '@nestjs/common';
import { CountService } from './count.service';

@Controller('count')
export class CountController {
  constructor(private readonly countService: CountService) {}

  // @Post()
  // create(@Body() createCountDto: CreateCountDto) {
  //   return this.countService.create(createCountDto);
  // }

  @Get()
  async addCount() {
    const accessTime = new Date().toLocaleString();
    // console.log(accessTime);
    return await this.countService.addCount(accessTime);
  }

  @Get('getCount')
  async getCount() {
    return await this.countService.getCount();
  }

  @Get('workCount')
  async getWorkCount() {
    return await this.countService.getWorkCount();
  }

  @Get('articleCount')
  async getArticleCount() {
    return await this.countService.getArticleCount();
  }

  @Get('activityCount')
  async getActivityCount() {
    return await this.countService.getActivityCount();
  }
}
