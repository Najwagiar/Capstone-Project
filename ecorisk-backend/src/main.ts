
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Mengizinkan akses dari frontend localhost
  app.enableCors({
    origin: /^http:\/\/localhost:\d+$/,
  });

  // Menjalankan backend pada port 3000
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
