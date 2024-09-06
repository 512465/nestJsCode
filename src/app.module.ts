import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './login/login.module';
import { ArticleModule } from './article/article.module';
import { UserModule } from './user/user.module';
import { DetailsModule } from './details/details.module';
import { ActivityModule } from './activity/activity.module';

@Module({
  imports: [
    LoginModule,
    ArticleModule,
    UserModule,
    DetailsModule,
    ActivityModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
