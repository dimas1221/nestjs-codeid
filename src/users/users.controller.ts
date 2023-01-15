import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { UsersService} from './users.service';
import { Request } from 'express';
import * as bcrypt from "bcrypt";
import { Users } from 'entities/Users';
import { AuthGuard } from 'src/auth/auth.guard';

// interface CreateUsersTo{
//     username: string,
//     password: string,
// }

@Controller('users')
@UseGuards(AuthGuard)
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

    @Get('findByUsername')
    async findByUsername( @Param() params){
        return await this.usersService.findByUsername(params.username)
    }
}
