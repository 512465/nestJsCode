import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Activity } from './entities/activity.entity';
@Injectable()
export class ActivityService {
  constructor(
    @InjectRepository(Activity)
    private readonly ActivityRepository: Repository<Activity>,
  ) {}
  async getactivityWithPagination(page: number = 1, pageSize: number = 10) {
    const [data, total] = await this.ActivityRepository.findAndCount({
      skip: (page - 1) * pageSize,
      take: pageSize,
      select: {
        id: true,
        title: true,
        picture: true,
        creator: true,
        intro: true,
        // 明确排除 content 字段
      },
    });
    return {
      data,
      total,
    };
  }

  async create(createActivityDto: any) {
    if (!createActivityDto) {
      throw new Error('参数错误');
    }
    if (!createActivityDto.creator) {
      createActivityDto.creator = 'CodePaint';
    }
    return this.ActivityRepository.save(createActivityDto);
  }

  async getDetail(id: number) {
    if (!id) {
      throw new Error('参数错误');
    }
    const data = await this.ActivityRepository.findOneBy({ id });
    if (!data) {
      return {
        code: 500,
        message: '没有找到该活动',
        data: null,
      };
    } else {
      data.activityLookCount += 1;
      await this.ActivityRepository.save({
        ...data,
        activityLookCount: data.activityLookCount,
      });
      return {
        code: 200,
        message: '查询成功',
        data: data,
      };
    }
  }

  async getRecent() {
    const recentActivity = await this.ActivityRepository.find({
      order: { createdAt: 'DESC' }, // 按照 createdAt 字段降序排列
      take: 4, // 只取一条记录
      select: {
        id: true,
        title: true,
        picture: true,
        // 明确排除 content 字段
      },
    });

    return recentActivity; // 返回近期4个活动
  }

  async delete(id: number) {
    if (!id) {
      throw new Error('参数错误');
    }
    return this.ActivityRepository.delete(id);
  }

  async findAll() {
    return this.ActivityRepository.find({
      order: { createdAt: 'DESC' }, // 按照 createdAt 字段降序排列
    });
  }
}
