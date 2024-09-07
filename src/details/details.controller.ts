import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { DetailsService } from './details.service';
import { Detail } from './entities/detail.entity';

@Controller('details')
export class DetailsController {
  constructor(private readonly detailsService: DetailsService) {}

  @Post('add')
  async createDetail(
    @Body('name') name: string,
    @Body('grade') grade: string,
    @Body('department') department: string,
  ): Promise<Detail> {
    return this.detailsService.create(name, grade, department);
  }

  @Get()
  async getDetailsWithPagination(
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
  ): Promise<{ data: Detail[]; total: number }> {
    return this.detailsService.getDetailsWithPagination(page, pageSize);
  }
}
