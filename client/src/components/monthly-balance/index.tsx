import style from './index.module.scss';

interface MonthlyBalanceIntf{
    value:number
}
export default function MonthlyBalance(props:MonthlyBalanceIntf){
    return <div className={style.wrapper}>
        <label className={style.label}>Monthly Balance</label>
        <label className={style.value}>{props.value}</label>
    </div>
}