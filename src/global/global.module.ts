import { Module } from '@nestjs/common';
import { CustomersService } from '../customers/customers.service';
import { CatsController } from '../customers/cats.controller';
import { AppController } from '../app.controller';
import { AppService } from '../app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customers } from 'entities/Customers';
import { Users } from 'entities/Users';
import { Regions } from 'entities/Regions';
import { RegionsService } from 'src/regions/regions.service';
import { RegionsController } from 'src/regions/regions.controller';
import { UsersController } from 'src/users/users.controller';
import { UsersService } from 'src/users/users.service';
import { AuthController } from 'src/auth/auth.controller';
import { AuthService } from 'src/auth/auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([Customers, Users, Regions])],
  controllers: [
    CatsController,
    UsersController,
    AuthController,
    RegionsController,
  ],
  providers: [CustomersService, UsersService, AuthService, RegionsService],
  exports: [TypeOrmModule],
})
export class GlobalModule {}
