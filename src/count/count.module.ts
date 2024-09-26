import { Module } from '@nestjs/common';
import { CountService } from './count.service';
import { CountController } from './count.controller';
import { Count } from './entities/count.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkModule } from 'src/work/work.module';
import { ArticleModule } from 'src/article/article.module';
import { ActivityModule } from 'src/activity/activity.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    TypeOrmModule.forFeature([Count]),
    ScheduleModule.forRoot(),
    WorkModule,
    ArticleModule,
    ActivityModule,
  ],
  controllers: [CountController],
  providers: [CountService],
})
export class CountModule {}
