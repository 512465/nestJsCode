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
    name: string,
    grade: string,
    department: string,
  ): Promise<Detail> {
    const detail = this.detailRepository.create({
      name,
      grade,
      department,
    });

    return this.detailRepository.save(detail);
  }

  async getDetailsWithPagination(
    page: number,
    pageSize: number,
  ): Promise<{ data: Detail[]; total: number }> {
    const [data, total] = await this.detailRepository.findAndCount({
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return { data, total };
  }

  // Update Detail
  async updateDetail(
    id: number,
    name: string,
    grade: string,
    department: string,
  ): Promise<Detail> {
    const detail = await this.detailRepository.findOne({ where: { id } });

    if (!detail) {
      throw new NotFoundException(`Detail with id ${id} not found`);
    }

    detail.name = name;
    detail.grade = grade;
    detail.department = department;

    return this.detailRepository.save(detail);
  }

  // Delete Detail
  async deleteDetail(id: number): Promise<void> {
    const result = await this.detailRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Detail with id ${id} not found`);
    }
  }
}
