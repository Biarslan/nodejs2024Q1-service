import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule } from '@nestjs/swagger';
import { getSwaggerDoc } from './utils/getSwaggerDocs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  const apiDoc = await getSwaggerDoc();
  SwaggerModule.setup('doc', app, apiDoc);

  const PORT = config.get('PORT') || 4000;
  await app.listen(PORT);
}
bootstrap();
