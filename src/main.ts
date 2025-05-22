import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Se TRUE (padrão), somente propriedades listadas no DTO serão validadas ao enviar dados.
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
