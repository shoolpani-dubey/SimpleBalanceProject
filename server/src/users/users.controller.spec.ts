import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { string } from '@hapi/joi';

describe('UsersController', () => {
  let controller: UsersController;
  const userService = {
    createUser: (pass: string, user: string) => {
      return Promise.resolve({
        username: 'demo',
      });
    },
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    })
      .overrideProvider(UsersService)
      .useValue(userService)
      .compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('createUser should be defined', () => {
    expect(controller.createUser).toBeDefined();
  });
  it('createUser should return created user', async () => {
    expect(await controller.createUser('demo', 'demo')).toEqual({
      username: 'demo',
    });
  });
});
