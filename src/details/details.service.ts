import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Detail } from './entities/detail.entity';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class DetailsService {
  constructor(
    @InjectRepository(Detail)
    private readonly detailRepository: Repository<Detail>,
  ) {}
  async create(
    content: string,
    type: string,
    contact: string,
  ): Promise<Detail> {
    const detail = this.detailRepository.create({
      content,
      type,
      contact,
      updateTime: new Date(),
    });

    return this.detailRepository.save(detail);
  }

  async getDetailsWithPagination(
    page: number,
    pageSize: number,
  ): Promise<{ data: Detail[]; total: number }> {
    // 假设 Detail 是一个类型或接口，并且您知道所有字段，除了 content
    // 这里我们构建一个字段数组，除了 'content' 之外
    interface aDetail {
      id: number;
      type: string;
      contact: string;
      updateTime: Date;
      // 假设还有其他字段，但你想排除 content
    }

    const fieldsToSelect: Array<keyof aDetail> = [
      'id',
      'type',
      'contact',
      'updateTime',
    ];
    const [data, total] = await this.detailRepository.findAndCount({
      skip: (page - 1) * pageSize,
      take: pageSize,
      select: fieldsToSelect, // 这里指定要选择的字段
    });

    return { data, total };
  }

  getDetailById(id: number): Promise<Detail> {
    if (!id) {
      throw new NotFoundException(`无id查询不到`);
    }
    return this.detailRepository.findOne({
      where: { id },
      select: ['id', 'content'],
    });
  }
  //   // Update Detail
  //   async updateDetail(
  //     id: number,
  //     name: string,
  //     grade: string,
  //     department: string,
  //   ): Promise<Detail> {
  //     const detail = await this.detailRepository.findOne({ where: { id } });

  //     if (!detail) {
  //       throw new NotFoundException(`Detail with id ${id} not found`);
  //     }

  //     detail.name = name;
  //     detail.grade = grade;
  //     detail.department = department;

  //     return this.detailRepository.save(detail);
  //   }

  //   // Delete Detail
  async deleteDetail(id: number): Promise<void> {
    const result = await this.detailRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Detail with id ${id} not found`);
    }
  }
}
