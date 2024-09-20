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
  findAll() {
    return this.ActivityRepository.find();
  }

  create(createActivityDto: any) {
    if (!createActivityDto) {
      throw new Error('参数错误');
    }
    if (!createActivityDto.creator) {
      createActivityDto.creator = 'CodePaint';
    }
    return this.ActivityRepository.save(createActivityDto);
  }
}
