import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './login/login.module';
import { ArticleModule } from './article/article.module';
import { UserModule } from './user/user.module';
import { DetailsModule } from './details/details.module';
import { ActivityModule } from './activity/activity.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    LoginModule,
    ArticleModule,
    UserModule,
    DetailsModule,
    ActivityModule,
    TypeOrmModule.forRoot({
      type: 'mysql', // 数据库类型
      host: 'localhost', // 数据库地址
      port: 3306, // 数据库端口
      username: 'root', // 数据库用户名
      password: '123456', // 数据库密码
      database: 'codepaint', // 数据库名称
      synchronize: true, // 是否自动创建数据库表
      retryDelay: 500, // 重试间隔时间
      retryAttempts: 10, // 重试次数
      autoLoadEntities: true, // 自动加载实体,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
