import { Injectable, Body } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Users } from 'entities/Users';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    //  private userRepository:Repository<UsersInterface>,
    private readonly usersService: UsersService,
  ) {}
  async login(username, password) {
    const items = await this.usersService.findByUsername(username);
    if (items.username) {
      if (await bcrypt.compare(password, items.password)) {
        delete items.password;

        let token = jwt.sign({ items }, process.env.SECRET_KEY, {
          expiresIn: '2m', //kadaluarsa 2menit
        });
        return {
          message: 'berhasil',
          token: token,
        };
      } else {
        return 'password wrong';
      }
    } else {
      return 'username not found';
    }
  }
}
