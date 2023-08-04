import { Injectable, Logger } from "@nestjs/common";
import { ITrdPartyReturnedTransaction } from "./balance.types";
import { mockTransactionData } from "./mockThirdPartyJson";

@Injectable()
export class BalanceServiceImpl {
  getTransactionsForUser = (userid: number, date: Date) => {
    // ideally you to a httpmodule/axio api call here.
    return mockTransactionData;
  };

    calculateMonthlyBalance = (
        trans: ITrdPartyReturnedTransaction[],
        date: Date,
    ) => {
    Logger.log('--DD:' + date.toISOString());
        Logger.log("--DD1:"+date.getMonth());
        // First we filter the entries for the required month.
        const givenMonth = date.getMonth();
        const filteredTrans = trans.filter((value:ITrdPartyReturnedTransaction)=>{
            return givenMonth === value.date.getMonth();
        });
        // Next we do the summation.
        const sum = filteredTrans.reduce(
            (total: number, currentval: ITrdPartyReturnedTransaction) =>{
                return total + currentval.amountTransfered;
            },
            0,
        );
        return sum;
    }
    
    calculateCumulativeBalance = (trans:ITrdPartyReturnedTransaction[]) => {
        const sum:number = trans.reduce(
            (total: number, currentval: ITrdPartyReturnedTransaction) =>{
                return total + currentval.amountTransfered;
            },
            0,
        );
        return sum || 0;
    };
}
