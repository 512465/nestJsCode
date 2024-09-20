import { Controller, Get, Post, Body, Query, Delete } from '@nestjs/common';
import { DetailsService } from './details.service';
import { Detail } from './entities/detail.entity';

@Controller('details')
export class DetailsController {
  constructor(private readonly detailsService: DetailsService) {}

  @Post('add')
  async createDetail(
    @Body('content') content: string,
    @Body('type') type: string,
    @Body('contact') contact: string,
  ): Promise<Detail> {
    return this.detailsService.create(content, type, contact);
  }

  @Get()
  async getDetailsWithPagination(
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
  ): Promise<{ data: Detail[]; total: number }> {
    return this.detailsService.getDetailsWithPagination(page, pageSize);
  }

  @Get('/get')
  async getDetailById(@Query('id') id: number): Promise<Detail> {
    return this.detailsService.getDetailById(id);
  }
  // @Post('update')
  // async updateDetail(
  //   @Query('id') id: number,
  //   @Body('name') name: string,
  //   @Body('grade') grade: string,
  //   @Body('department') department: string,
  // ): Promise<Detail> {
  //   return this.detailsService.updateDetail(id, name, grade, department);
  // }

  @Delete('delete')
  async deleteDetail(@Query('id') id: number): Promise<void> {
    return this.detailsService.deleteDetail(id);
  }
}
