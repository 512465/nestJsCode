import { Injectable } from '@nestjs/common';
import { CreateWorkDto } from './dto/create-work.dto';
import { UpdateWorkDto } from './dto/update-work.dto';
import { Work } from './entities/work.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { UploadService } from 'src/upload/upload.service';

@Injectable()
export class WorkService {
  constructor(
    @InjectRepository(Work)
    private readonly workRepository: Repository<Work>,
    private readonly uploadService: UploadService,
  ) {}

  async create(createWorkDto: CreateWorkDto) {
    const work = new Work();
    // console.log(work);
    work.workTitle = createWorkDto.workTitle;
    work.workDescription = createWorkDto.workDescription;
    work.workAuthor = createWorkDto.workAuthor;
    work.workLookCount = createWorkDto.workLookCount;
    work.workType = createWorkDto.workType;
    work.workCover = createWorkDto.workCover;
    work.workTags = createWorkDto.workTags;
    await this.workRepository.save(work);
    return {
      code: 200,
      message: '创建成功',
      data: work,
    };
  }

  async findAll(query: { page?: number; pageSize?: number }) {
    query.page = query.page || 1;
    query.pageSize = query.pageSize || 10;
    const [data, total] = await this.workRepository.findAndCount({
      skip: (query.page - 1) * query.pageSize,
      take: query.pageSize,
      order: { workId: 'DESC' },
      select: {
        workId: true,
        workTitle: true,
        workAuthor: true,
        workLookCount: true,
        workType: true,
        workTags: true,
      },
    });
    return {
      code: 200,
      message: '查询成功',
      data: data,
      total: total,
    };
    // return await this.workRepository.find().then((data) => {
    //   data.forEach((item) => {
    //     delete item.workDescription;
    //     delete item.workCover;
    //   });
    //   return {
    //     code: 200,
    //     message: '查询成功',
    //     data: data,
    //   };
    // });
  }

  async findOne(id: number) {
    const data = await this.workRepository.find({ where: { workId: id } });
    if (data.length === 0) {
      return {
        code: 500,
        message: '通过id查询作品失败',
        data: null,
      };
    } else {
      data[0].workLookCount += 1;
      await this.workRepository.save({
        ...data[0],
        workLookCount: data[0].workLookCount,
      });
      return {
        code: 200,
        message: '查询成功',
        data: data,
      };
    }
  }

  async findByKeyword(query: {
    workTitle?: string;
    workAuthor?: string;
    page: number;
    pageSize: number;
  }) {
    query.page = query.page || 1;
    query.pageSize = query.pageSize || 10;

    const whereClause: any = {};
    if (query.workTitle) {
      whereClause.workTitle = Like(`%${query.workTitle}%`);
    }
    if (query.workAuthor) {
      whereClause.workAuthor = Like(`%${query.workAuthor}%`);
    }

    const data = await this.workRepository.find({
      where: whereClause,
      order: {
        workId: 'DESC',
      },
      skip: (query.page - 1) * query.pageSize,
      take: query.pageSize,
    });

    const total = await this.workRepository.count({
      where: whereClause,
    });

    // data.forEach((item) => {
    //   const data = new Date(item.workCreateTime);
    //   const newDate = data.toISOString().replace('T', ' ').slice(0, 19);
    //   item.formattedCreateTime = newDate;
    // });

    return {
      code: 200,
      message: '查询成功',
      data: data,
      total: total,
    };
  }

  async update(id: number, updateWorkDto: UpdateWorkDto) {
    return await this.workRepository.update(id, updateWorkDto).then(() => {
      return {
        code: 200,
        message: '更新成功',
        data: updateWorkDto,
      };
    });
  }

  async remove(id: number) {
    const data = await this.findOne(id);
    const result = await this.workRepository.delete(id);
    if (result.affected === 0) {
      return {
        code: 500,
        message: '作品未找到或删除失败',
        data: null,
      };
    }
    return {
      code: 200,
      message: '删除成功',
      data: data,
    };
  }

  async findAll2() {
    const data = await this.workRepository.find({
      order: {
        workId: 'DESC',
      },
      select: {
        workDescription: false,
        workCover: false,
      },
    });
    return {
      code: 200,
      message: '查询成功',
      data: data,
    };
  }
}
