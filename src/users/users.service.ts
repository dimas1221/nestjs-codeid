import { Injectable, Body } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Users } from 'entities/Users';
import * as bcrypt from 'bcrypt';

// export interface UsersInterface{
//     username: string,
//     password: string,
// }

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ) {}

  async create(users: Users): Promise<Users> {
    const salt = await bcrypt.genSalt(10);
    const passHash = await bcrypt.hashSync(users.password, salt);
    users.password = passHash;
    return this.userRepository.save(this.userRepository.create(users));
  }

  async findByUsername(username: any): Promise<any> {
    return await this.userRepository.findOneBy({ username: username });
  }

  async findOne(idUser: any): Promise<any> {
    return await this.userRepository.findOneBy(idUser);
  }

  async findAll(): Promise<any> {
    return await this.userRepository.find();
  }
}
