import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v2');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,

      // transforma los querys parameters de tipo number
      transform: true,
      transformOptions: {
        enableImplicitConversion: true
      }
    }),
  );
  await app.listen(process.env.PORT);
  console.log(`app running on port ${process.env.PORT}`)
}
bootstrap();
