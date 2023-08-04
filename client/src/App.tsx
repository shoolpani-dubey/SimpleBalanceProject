import { useEffect, useState } from 'react';
import DatePicker from './components/date-picker';
import MonthlyBalance from './components/monthly-balance';
import CumulativeBalance from './components/cumulative-balance';
import ResultComp from './components/result-component';
import { fetchBalanceForDate } from './service/fetchService';
interface BalanceDataIntf{
  monthlyBalance: number,
  cumulativeBalance: number
}
function App() {
  const [selectedDate, setSelectedDate]=useState(new Date());
  const [monthlyBalance, setMonthlyBalance] = useState(0);
  const [cumulativeBalance, setCumulativeBalance] = useState(0);

  const fetchBalance = async (date: Date) => {
    const balanceData:BalanceDataIntf = await fetchBalanceForDate(date);
    balanceData?.cumulativeBalance
    && balanceData?.cumulativeBalance > 0
    ? setCumulativeBalance(balanceData.cumulativeBalance)
    : setCumulativeBalance(0);

    balanceData?.monthlyBalance
    && balanceData?.monthlyBalance > 0
    ? setMonthlyBalance(balanceData.monthlyBalance)
    : setMonthlyBalance(0);
  }
  const onDateSelect = (date:Date) => {
    if(!date){
      return;
    }
    setSelectedDate(date);
    fetchBalance(date);
  };
  useEffect(()=>{
    fetchBalance(selectedDate);
  },[]);
  return (
    <>
      <DatePicker
        defaultValue={selectedDate}
        value={selectedDate}
        onDateSelect={onDateSelect} />
      <ResultComp>
        <MonthlyBalance value={monthlyBalance}/>
        <CumulativeBalance value={cumulativeBalance}/>
      </ResultComp>
    </>
  );
}

export default App


