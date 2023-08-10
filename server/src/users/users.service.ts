import { Injectable, OnModuleInit } from '@nestjs/common';
import User from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  onModuleInit() {
    // We are going to add dummy data to db if it doesnt exist.
    this.createDemoUser();
  }
  async createDemoUser() {
    const user = await this.userRepository.findOne({
      where: { username: 'demo' },
    });
    if (!user) {
      const demoUser = new User();
      demoUser.username = 'demo';
      const saltOrRounds = 10;
      demoUser.password = await bcrypt.hash('demo', saltOrRounds);
      await this.userRepository.save(demoUser);
    }
  }
  async createUser(username: string, password: string): Promise<User> {
    const userObj = new User();
    userObj.username = username;
    userObj.password = password;
    await this.userRepository.save(userObj);
    return userObj;
  }
  async getUser(query: object): Promise<User> {
    console.log('Q:', query);
    return await this.userRepository.findOne(query);
  }
}
