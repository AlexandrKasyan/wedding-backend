import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      process.env.FRONT_URL,  // URL фронтенда
      'http://localhost:3000',               // Для локальной разработки
    ],
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
