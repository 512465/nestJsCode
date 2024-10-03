import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Count } from './entities/count.entity';
import { Cron } from '@nestjs/schedule';
import { Repository } from 'typeorm';
import { WorkService } from 'src/work/work.service';
import { ArticleService } from 'src/article/article.service';
import { ActivityService } from 'src/activity/activity.service';

@Injectable()
export class CountService {
  constructor(
    @InjectRepository(Count)
    private readonly countRepository: Repository<Count>,
    private readonly workService: WorkService,
    private readonly articleService: ArticleService,
    private readonly activityService: ActivityService,
  ) {}

  @Cron('10 0 * * *') // 每天凌晨4点
  handleCron() {
    this.create();
  }

  async create() {
    const data = new Count();
    data.pageCount = 0;
    const accessTime = new Date().toLocaleDateString();
    await this.countRepository.save({
      ...data,
      accessTime: accessTime,
    });
    return {
      code: 200,
      message: '创建成功',
      data: {
        ...data,
        accessTime,
      },
    };
  }

  async addCount(accessTime: string) {
    const [accessTime2] = accessTime.split(' ');
    console.log(accessTime);
    const [year, month, day, ,] = accessTime2.split('/');
    console.log(year, month, day);

    const data = await this.countRepository
      .createQueryBuilder('entity')
      .where('entity.accessTime BETWEEN :start AND :end', {
        start: new Date(Number(year), Number(month) - 1, Number(day), 0, 0, 0), // 当天开始
        end: new Date(
          Number(year),
          Number(month) - 1,
          Number(day) + 1,
          0,
          0,
          0,
        ), // 下一天开始
      })
      .getMany();

    if (!data[0]) {
      return {
        code: 500,
        message: '查找失败',
        data: null,
      };
    } else {
      data[0].pageCount += 1;
      await this.countRepository.save({
        ...data[0],
        pageCount: data[0].pageCount,
      });
      return {
        code: 200,
        message: '成功',
        data: data[0].pageCount,
      };
    }
  }

  async getCount() {
    const data = await this.countRepository.find({
      order: {
        accessTime: 'DESC',
      },
      take: 7,
    });
    return {
      code: 200,
      message: '成功',
      data: data,
    };
  }

  async getWorkCount() {
    const data = await this.workService.findAll2();
    // console.log(data.data.length);
    return {
      code: 200,
      message: '成功',
      data: data.data.length,
    };
  }

  async getArticleCount() {
    const data = await this.articleService.findAll();
    // console.log(data.data.length);
    return {
      code: 200,
      message: '成功',
      data: data.data.length,
    };
  }

  async getActivityCount() {
    const data = await this.activityService.findAll();
    // console.log(data.length);
    return {
      code: 200,
      message: '成功',
      data: data.length,
    };
  }
}
