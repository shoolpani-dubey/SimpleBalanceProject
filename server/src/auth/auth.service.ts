import { Injectable, NotAcceptableException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const query = { where: { username } };
    const user = await this.userService.getUser(query);
    if (!user) {
      throw new NotAcceptableException('User not found.');
    }
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      throw new NotAcceptableException('Incorrect Username or password');
    }
    return user;
  }
  async login(username: string) {
    const payload = { username: username, sub: new Date().getTime() };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
