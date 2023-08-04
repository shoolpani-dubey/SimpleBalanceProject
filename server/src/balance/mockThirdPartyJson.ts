import { ITrdPartyReturnedTransaction } from './balance.types';

export const mockTransactionData: ITrdPartyReturnedTransaction[] = [
    {
        amountTransfered: 300,
        date: new Date('2023-08-01T11:10:12.539Z')
    },
    {
        amountTransfered: 500,
        date: new Date('2023-08-05T11:10:12.539Z')
    },
    {
        amountTransfered: 200,
        date: new Date('2023-07-01T11:10:12.539Z')
    },
    {
        amountTransfered: -100,
        date: new Date('2023-07-04T11:10:12.539Z')
    },
    {
        amountTransfered: 50,
        date: new Date('2023-06-01T11:10:12.539Z')
    }
];