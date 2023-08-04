import { Injectable, Logger } from '@nestjs/common';
import { BalanceServiceImpl } from './balance.service.impl';
import { FindByDateOutputDTO } from './dto/FindByDateOutputDTO';

@Injectable()
export class BalanceService {

  constructor(private bServiceImpl: BalanceServiceImpl) {}

  findByDate(userid: number, date: Date = new Date()): FindByDateOutputDTO {
    if (!userid) {
      return null;
    }
    // This is where we write the business logic.
    const transactions = this.bServiceImpl.getTransactionsForUser(userid, date);
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
