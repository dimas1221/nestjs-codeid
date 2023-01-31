import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import { Users } from 'entities/Users';
import { AuthGuard } from 'src/auth/auth.guard';

// interface CreateUsersTo{
//     username: string,
//     password: string,
// }

@Controller('users')
// @UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profil')
  findAll() {
    return this.usersService.findAll();
  }

  @Post('createuser')
  async create(@Body() createUsersTo: Users) {
    const user = await this.usersService.create(createUsersTo);
    if (!user) {
      return 'error in creating user';
    }
    return 'users created';
  }

  // @Post('createuser')
  // async create(@Res() res:Response){
  //     const user = await this.usersService.create(res)
  //     if (!user) {
  //         res.status(HttpStatus.CREATED).send();
  //     }
  //     return 'users created'
  // }

  @Get('findByUsername')
  async findByUsername(@Param() params) {
    return await this.usersService.findByUsername(params.username);
  }
  @Get(':id')
  async findOne(@Param() params) {
    return await this.usersService.findOne(params.idUser);
  }
}
