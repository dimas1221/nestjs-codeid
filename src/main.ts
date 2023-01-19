import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { MainModule } from './main.module';

async function bootstrap() {
  const app = await NestFactory.create(MainModule);
  const server = await NestFactory.create(MainModule);
  server.enableCors;
  const port = process.env.PORT;
  await app.listen(port, () => {
    console.log('listening' + port);
  });
}
bootstrap();
// cekkk
