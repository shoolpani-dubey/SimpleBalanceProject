import { MockFactory, Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { Repository } from 'typeorm';
import User from './user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { string } from '@hapi/joi';

describe('UsersService', () => {
  let service: UsersService;
  let service1: UsersService;

  const repositoryMockFactory: () => any = jest.fn(() => ({
    findOne: jest.fn((entity: any) => {
      return Promise.resolve({
        username: 'demo',
      });
    }),
    // ...
  }));

  const repositoryMockFactory1: () => any = jest.fn(() => ({
    findOne: jest.fn((entity: any) => {
      return;
    }),
    save: jest.fn((entity: any) => {
      return 'done';
    }),
    // ...
  }));

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        // Provide your mock instead of the actual repository
        {
          provide: getRepositoryToken(User),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);

    const module1: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        // Provide your mock instead of the actual repository
        {
          provide: getRepositoryToken(User),
          useFactory: repositoryMockFactory1,
        },
      ],
    }).compile();

    service1 = module1.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('if demo user exists then should return undefined', async () => {
    expect(await service.createDemoUser()).toBeUndefined;
  });
  it('if the findone doesnt return a user then it should create that user.', async () => {
    expect(await service1.createDemoUser()).toEqual('done');
  });
});
