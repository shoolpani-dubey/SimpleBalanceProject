import { Test, TestingModule } from '@nestjs/testing';
import { BalanceServiceImpl } from './balance.service.impl';

describe('BalanceServiceImpl', () => {
  let service: BalanceServiceImpl;
  const transactions = [
    {
        amountTransfered: -100,
      date: new Date('2023-07-04T11:10:12.539Z'),
    },
    {
        amountTransfered: 50,
        date: new Date('2023-06-01T11:10:12.539Z')
    },
  ];
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BalanceServiceImpl],
    })
      .compile();

    service = module.get<BalanceServiceImpl>(BalanceServiceImpl);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('calculateMonthlyBalance:given set of transactions and a date, it should return monthly bal.',()=>{
    expect(
      service.calculateMonthlyBalance(
        transactions,
        new Date('2023-06-06T11:10:12.539Z'),
      ),
    ).toEqual(50);
  });
  it('calculateMonthlyBalance:given set of transactions, it should return cumulative bal.', () => {
    expect(service.calculateCumulativeBalance(transactions)).toEqual(-50);
  });
});
