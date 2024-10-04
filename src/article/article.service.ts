import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article) private readonly article: Repository<Article>,
  ) {}

  async create(createArticleDto: CreateArticleDto) {
    const data = new Article();
    data.articleTitle = createArticleDto.articleTitle;
    data.articleContent = createArticleDto.articleContent;
    data.articleAuthor = createArticleDto.articleAuthor;
    data.articleLookCount = createArticleDto.articleLookCount;
    data.articleType = createArticleDto.articleType;
    data.articleImgUrl = createArticleDto.articleImgUrl;
    data.articleInfo = createArticleDto.articleInfo;
    data.articleIntro = createArticleDto.articleIntro;
    return await this.article.save(data).then(() => {
      return { code: 200, message: '创建成功', data: data };
    });
  }

  async findAll() {
    const data = await this.article.find();
    return { code: 200, message: '查询成功', data: data };
  }

  async findAllList(query: { page?: number; pageSize?: number }) {
    query.page = query.page || 1;
    query.pageSize = query.pageSize || 10;
    const data = await this.article.find({
      skip: (query.page - 1) * query.pageSize,
      take: query.pageSize,
      order: {
        articleId: 'DESC',
      },
    });
    data.forEach((item) => {
      delete item.articleContent;
    });
    const total = await this.article.count();
    return { code: 200, message: '查询成功', data: data, total: total };

    // return await this.article.find().then((data) => {
    //   data.forEach((item) => {
    //     delete item.articleContent;
    //   });
    //   return { code: 200, message: '查询成功', data: data };
    // });
  }

  async findOne(id: number) {
    const data = await this.article.find({ where: { articleId: id } });
    if (data.length === 0) {
      return { code: 500, message: '文章未找到', data: null };
    }
    // console.log(data[0].articleLookCount);
    data[0].articleLookCount += 1;
    await this.article.save({
      ...data[0],
      articleLookCount: data[0].articleLookCount,
    });
    return { code: 200, message: '查询成功', data: data };
  }

  async findByCondition(query: {
    keyWord?: string;
    type?: string;
    author?: string;
    page: number;
    pageSize: number;
  }) {
    query.page = query.page || 1;
    query.pageSize = query.pageSize || 10;

    const whereClause: any = {};

    if (query.keyWord) {
      whereClause.articleTitle = Like(`%${query.keyWord}%`);
    }

    if (query.type) {
      whereClause.articleType = Like(`%${query.type}%`);
    }
    if (query.author) {
      whereClause.articleAuthor = Like(`%${query.author}%`);
    }

    const data = await this.article.find({
      where: whereClause,
      order: {
        articleId: 'DESC',
      },
      skip: (query.page - 1) * query.pageSize,
      take: query.pageSize,
    });

    const total = await this.article.count({
      where: whereClause,
    });

    data.forEach((item) => {
      delete item.articleContent;
      // const date = new Date(item.articleCreatedTime);
      // const newDate = date.toISOString().replace('T', ' ').substring(0, 19);
      // item.articleCreatedTime = new Date(newDate);
    });
    return {
      code: 200,
      message: '查询成功',
      total: total,
      data: data,
    };
  }

  async update(id: number, updateArticleDto: UpdateArticleDto) {
    return await this.article.update(id, updateArticleDto).then(() => {
      return { code: 200, message: '更新成功', data: updateArticleDto };
    });
  }

  async remove(id: number) {
    const data = await this.findOne(id);
    const result = await this.article.delete(id);
    if (result.affected === 0) {
      return { code: 400, message: '文章未找到或删除失败' };
    }
    return { code: 200, message: '删除成功', data: data };
  }

  async findTypeList() {
    const data = await this.article.find({ select: ['articleType'] });
    const typelist = data.map((item) => item.articleType).join(',');
    const list = Array.from(new Set(typelist.split(','))).join(',');
    const listArr = list.split(',');

    // console.log(data);s

    return {
      code: 200,
      message: '查询成功',
      data: listArr,
      // console.log();
    };
  }
}
