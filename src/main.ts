import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { config } from 'aws-sdk';
import { AppModule } from './app.module';
// import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const PORT = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  // const configService = app.get(ConfigService);
  config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  });

  const configDoc = new DocumentBuilder()
    .setTitle('CMS')
    .setDescription('The CMS API description')
    .setVersion('1.0')
    .addTag('cms')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, configDoc);
  SwaggerModule.setup('api', app, document);

  await app.listen(PORT, () => {
    console.log(`Server running on PORT:${PORT}`);
  });
}
bootstrap();
