import { Controller, Get, Query } from '@nestjs/common';
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
  async getWorkCount(@Query() query: { id: number }) {
    return await this.countService.getWorkCount(query.id);
  }

  @Get('articleCount')
  async getArticleCount(@Query() query: { id: number }) {
    return await this.countService.getArticleCount(query.id);
  }

  @Get('activityCount')
  async getActivityCount(@Query() query: { id: number }) {
    return await this.countService.getActivityCount(query.id);
  }
}
