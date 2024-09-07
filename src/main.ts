import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 设置跨域
  app.enableCors({
    origin: '*', // 允许任何域名访问
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // 允许的方法
    allowedHeaders: 'Content-Type, Authorization', // 允许的头部
  });
  // 设置文档
  const options = new DocumentBuilder()
    .setTitle('工作室接口文档')
    .setDescription('工作室后端接口测试文档')
    .setVersion('1')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
