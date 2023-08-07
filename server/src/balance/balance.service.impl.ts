import { ForbiddenException, Injectable, Logger } from '@nestjs/common';
import { ITrdPartyReturnedTransaction } from './balance.types';
import { mockTransactionData } from './mockThirdPartyJson';
import { HttpService } from '@nestjs/axios';
import { catchError, lastValueFrom, map } from 'rxjs';

@Injectable()
export class BalanceServiceImpl {
  constructor(private readonly httpService: HttpService) {}

  getTransactionsForUser = async (userid: number) => {
    const result = this.httpService
      .get(`${process.env.TRANSACTION_SERVER}/users/${userid}/transactions`, {
        method: 'GET',
        headers: {
          'X-Jsio-Token': process.env.TRANSACTION_SERVER_TOKEN,
        },
      })
      .pipe(map((res) => res.data))
      .pipe(
        catchError(() => {
          throw new ForbiddenException('API not available');
        }),
      );
    return await lastValueFrom(result);
  };

  calculateMonthlyBalance = (
    trans: ITrdPartyReturnedTransaction[],
    date: Date,
  ) => {
    // First we filter the entries for the required month.
    const givenMonth = date.getMonth();
    const filteredTrans = trans.filter(
      (value: ITrdPartyReturnedTransaction) => {
        const dateObj = new Date(value.date);
        return givenMonth === dateObj.getMonth();
      },
    );
    // Next we do the summation.
    const sum = filteredTrans.reduce(
      (total: number, currentval: ITrdPartyReturnedTransaction) => {
        return total + currentval.amountTransfered;
      },
      0,
    );
    return sum;
  };

  calculateCumulativeBalance = (trans: ITrdPartyReturnedTransaction[]) => {
    const sum: number = trans.reduce(
      (total: number, currentval: ITrdPartyReturnedTransaction) => {
        return total + currentval.amountTransfered;
      },
      0,
    );
    return sum || 0;
  };
}
