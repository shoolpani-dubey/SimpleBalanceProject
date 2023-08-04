import { Test, TestingModule } from '@nestjs/testing';
import { BalanceController } from './balance.controller';
import { BalanceService } from './balance.service';
import {
  ArgumentMetadata,
  BadRequestException,
  ValidationPipe,
} from '@nestjs/common';
import { FindByDateInputDTO } from './dto/FindByDateInputDTO';

describe('BalanceController', () => {
  let controller: BalanceController;

  const mockBalanceService = {
    findByDate:()=>{
      return {
        cumulativeBalance:0,
        monthlyBalance:0,
      }
    }
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BalanceController],
      providers: [BalanceService],
    })
      .overrideProvider(BalanceService)
      .useValue(mockBalanceService)
      .compile();

    controller = module.get<BalanceController>(BalanceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('if valid date as input then should return the balance',()=>{
    expect( controller.findByDate({
        date: new Date(),
      }),
    ).toEqual({
      cumulativeBalance: expect.any(Number),
      monthlyBalance: expect.any(Number),
    });
  });

  it('inputValidationTest: if not date supplied then should throw error',async ()=>{
    const validation: ValidationPipe = new ValidationPipe({
      transform: true,
      whitelist: true,
    });
    const metadata: ArgumentMetadata = {
      type: 'query',
      metatype: FindByDateInputDTO,
      // data: 'date',
    };
    const input = {
      date: 'asdf',
    };
    try {
      await validation.transform(input, metadata);
    } catch (err) {
      expect(err).toBeInstanceOf(BadRequestException);
    }
  });

  it('inputValidationTest: if date is supplied then should not throw error', async () => {
    const validation: ValidationPipe = new ValidationPipe({
      transform: true,
      whitelist: true,
    });
    const metadata: ArgumentMetadata = {
      type: 'query',
      metatype: FindByDateInputDTO,
      // data: 'date',
    };
    const input = {
      date: '2023-08-03T14:37:27.609Z',
    };
    expect(await validation.transform(input, metadata as any)).toBeInstanceOf(
      FindByDateInputDTO,
    );
    expect(await validation.transform(input, metadata as any)).toEqual({
      date: expect.any(Date),
    });
  });
});
