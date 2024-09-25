import { Injectable } from '@nestjs/common';
import { CreateCountDto } from './dto/create-count.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Count } from './entities/count.entity';
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

  async create(createCountDto: CreateCountDto) {
    const data = new Count();
    data.pageCount = createCountDto.pageCount;
    const accessTime = new Date();
    await this.countRepository.save({
      ...data,
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
    const [year, month, day, ,] = accessTime2.split('/');
    // console.log(year, month, day);

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

  async getWorkCount(id: number) {
    const data = await this.workService.findOne(id);
    data.data[0].workLookCount -= 1;
    // console.log(data.data[0].workLookCount);
    await this.workService.saveCount(data.data[0]);
    return {
      code: 200,
      message: '成功',
      data: data.data[0].workLookCount,
    };
  }

  async getArticleCount(id: number) {
    const data = await this.articleService.findOne(id);
    data.data[0].articleLookCount -= 1;
    console.log(data.data[0].articleLookCount);
    await this.articleService.saveCount(data.data[0]);
    return {
      code: 200,
      message: '成功',
      data: data.data[0].articleLookCount,
    };
  }

  async getActivityCount(id: number) {
    const data = await this.activityService.getDetail(id);
    data.data.activityLookCount -= 1;
    console.log(data.data.activityLookCount);
    await this.activityService.saveCount(data.data);
    return {
      code: 200,
      message: '成功',
      data: data.data.activityLookCount,
    };
  }
}
