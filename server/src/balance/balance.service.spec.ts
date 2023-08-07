import { Test, TestingModule } from '@nestjs/testing';
import { BalanceService } from './balance.service';
import { BalanceServiceImpl } from './balance.service.impl';

describe('BalanceService', () => {
  let service: BalanceService;

  const balanceServiceImpl = {
    getTransactionsForUser: () => {
      return [
        {
          amountTransfered: 300,
          date: new Date(),
        },
      ];
    },
    calculateMonthlyBalance: () => 300,
    calculateCumulativeBalance: () => 300,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BalanceService, BalanceServiceImpl],
    })
      .overrideProvider(BalanceServiceImpl)
      .useValue(balanceServiceImpl)
      .compile();

    service = module.get<BalanceService>(BalanceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return null data if user is not defined.', async () => {
    expect(await service.findByDate(null, new Date())).toBe(null);
  });
  it('should return balance for current month and cumulative balance, if date is not defined', async () => {
    expect(await service.findByDate(123, null)).toEqual({
      monthlyBalance: 300,
      cumulativeBalance: 300,
    });
  });
});
