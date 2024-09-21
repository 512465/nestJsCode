import { Controller, Get, Post, Body, Query, Delete } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { Activity } from './entities/activity.entity';
import { UploadService } from 'src/upload/upload.service';
@Controller('activity')
export class ActivityController {
  constructor(
    private readonly activityService: ActivityService,
    private readonly uploadService: UploadService,
  ) {}

  @Get()
  async getDetailsWithPagination(
    @Query('page') page,
    @Query('pageSize') pageSize,
  ): Promise<{ data: Activity[]; total: number }> {
    return this.activityService.getactivityWithPagination(page, pageSize);
  }
  @Post()
  async create(
    @Body('title') title: string,
    @Body('content') content: string,
    @Body('intro') intro: string,
    @Body('picture') picture: string,
    @Body('creator') creator: string,
  ) {
    const createActivityDto = {
      title,
      content,
      intro,
      picture, // 使用上传后的文件路径
      creator,
    };
    return this.activityService.create(createActivityDto);
  }

  @Get('detail')
  getDetails(@Query('id') id: number) {
    return this.activityService.getDetail(id);
  }

  @Get('recent')
  getRecent() {
    return this.activityService.getRecent();
  }
  @Delete()
  delete(@Query('id') id: number) {
    return this.activityService.delete(id);
  }
}
