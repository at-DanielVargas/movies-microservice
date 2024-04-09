import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

const PORT = Number(process.env.PORT) || 3001;

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: 'movies-microservice.internal',
        port: PORT,
      },
    },
  );
  await app.listen();
  Logger.log(`Movies microservice is running on port ${PORT}`);
}
bootstrap();
