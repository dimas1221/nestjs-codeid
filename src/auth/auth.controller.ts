import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Users } from 'entities/Users';
// interface CreateUsersTo{
//     username: string,
//     password: string,
// }

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  login(@Body() body): Promise<any> {
    return this.authService.login(body.username, body.password);
  }
}
