import { Module } from '@nestjs/common';
import { CustomersService } from "../customers.service";
import { CatsController } from "../cats.controller";
import { AppController } from '../app.controller';
import { AppService } from '../app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customers } from 'entities/Customers';
import { Users } from 'entities/Users';
import { UsersController } from 'src/users/users.controller';
import { UsersService } from 'src/users/users.service';
import { AuthController } from 'src/auth/auth.controller';
import { AuthService } from 'src/auth/auth.service';

@Module({
    imports: [TypeOrmModule.forFeature([Customers, Users])],
    controllers: [CatsController, UsersController, AuthController],
    providers: [CustomersService, UsersService, AuthService],
    exports:[TypeOrmModule]
})
export class GlobalModule {

}
