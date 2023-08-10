import { useEffect, useState } from "react";
import CumulativeBalance from "../cumulative-balance";
import DatePicker from "../date-picker";
import MonthlyBalance from "../monthly-balance";
import ResultComp from "../result-component";
import { fetchBalanceForDate } from "../../service/fetchService";
interface BalanceDataIntf {
  monthlyBalance: number;
  cumulativeBalance: number;
}
interface BalancePagePropsIntf {
  accessToken: string;
}
export function BalancePage(props: BalancePagePropsIntf) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [monthlyBalance, setMonthlyBalance] = useState(0);
  const [cumulativeBalance, setCumulativeBalance] = useState(0);
  const [error, setError] = useState(false);

  const fetchBalance = async (date: Date) => {
    try {
      const balanceData: BalanceDataIntf = await fetchBalanceForDate(
        props.accessToken,
        date
      );

      balanceData?.cumulativeBalance && balanceData?.cumulativeBalance > 0
        ? setCumulativeBalance(balanceData.cumulativeBalance)
        : setCumulativeBalance(0);

      balanceData?.monthlyBalance && balanceData?.monthlyBalance > 0
        ? setMonthlyBalance(balanceData.monthlyBalance)
        : setMonthlyBalance(0);
    } catch (e) {
      // Error fetching balance.
      setError(true);
    }
  };
  const onDateSelect = (date: Date) => {
    if (!date) {
      return;
    }
    setSelectedDate(date);
    fetchBalance(date);
  };
  useEffect(() => {
    fetchBalance(selectedDate);
  }, []);

  if (error) {
    return (
      <div>
        Server sent some error. Please relogin <a href="/">here</a>
      </div>
    );
  }

  return (
    <>
      <DatePicker
        defaultValue={selectedDate}
        value={selectedDate}
        onDateSelect={onDateSelect}
      />
      <ResultComp>
        <MonthlyBalance value={monthlyBalance} />
        <CumulativeBalance value={cumulativeBalance} />
      </ResultComp>
    </>
  );
}
