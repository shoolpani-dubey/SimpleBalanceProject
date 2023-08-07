import { Injectable, Logger } from '@nestjs/common';
import { BalanceServiceImpl } from './balance.service.impl';
import { FindByDateOutputDTO } from './dto/FindByDateOutputDTO';

@Injectable()
export class BalanceService {
  constructor(private bServiceImpl: BalanceServiceImpl) {}

  async findByDate(
    userid: number,
    date: Date = new Date(),
  ): Promise<FindByDateOutputDTO> {
    if (!userid) {
      return null;
    }
    // This is where we write the business logic.
    const transactions = await this.bServiceImpl.getTransactionsForUser(userid);
    Logger.log('T :' + JSON.stringify(transactions[0]));
    Logger.log('T len:' + transactions.length);
    const monthlyBalance = this.bServiceImpl.calculateMonthlyBalance(
      transactions,
      date,
    );
    const cumulativeBalance =
      this.bServiceImpl.calculateCumulativeBalance(transactions);
    const result: FindByDateOutputDTO = {
      monthlyBalance,
      cumulativeBalance,
    };
    return result;
  }
}
