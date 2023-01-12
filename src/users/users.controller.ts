import { Body, Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import { UsersService} from './users.service';
import { Request } from 'express';
import * as bcrypt from "bcrypt";
import { Users } from 'entities/Users';

// interface CreateUsersTo{
//     username: string,
//     password: string,
// }

@Controller('users')
export class UsersController {
    constructor (private readonly usersService: UsersService){}
    @Post('createuser')
    async create(@Body()  createUsersTo: Users){
        const user = await this. usersService.create(createUsersTo)
        if (!user) {
            return 'error in creating user'
        }
        return 'users created'
    }
}
