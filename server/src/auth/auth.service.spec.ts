import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './../users/users.service';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
  let service: AuthService;
  const userService = () => {};
  const jwtService = () => {};
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, UsersService, JwtService],
    })
      .overrideProvider(UsersService)
      .useValue(userService)
      .overrideProvider(JwtService)
      .useValue(jwtService)
      .compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('login function should be defined', () => {
    expect(service.login).toBeDefined();
  });
  it('validate user function should be defined', () => {
    expect(service.validateUser).toBeDefined();
  });
});
