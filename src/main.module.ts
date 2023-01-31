import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { GlobalModule } from './global/global.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { Customers } from 'entities/Customers';
import { UsersService } from './users/users.service';
import { UsersController } from './users/users.controller';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { AuthMiddleware } from './auth/auth.middleware';
import { RegionsService } from './regions/regions.service';
import { RegionsController } from './regions/regions.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE,
      entities: ['dist/entities/**/*.js'],
      synchronize: false,
    }),
    GlobalModule,
  ],

  controllers: [
    AppController,
    UsersController,
    AuthController,
    RegionsController,
  ],
  providers: [AppService, UsersService, AuthService, RegionsService],
})
export class MainModule implements NestModule {
  // implement midlleware
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes();
  }
}
