import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

const PORT = Number(process.env.PORT) || 3001;
const MICROSERVICE_HOST = process.env.MICROSERVICE_HOST || '::';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: MICROSERVICE_HOST,
        port: PORT,
      },
    },
  );
  await app.listen();
  Logger.log(`Movies microservice is running on port ${PORT}`);
}
bootstrap();
