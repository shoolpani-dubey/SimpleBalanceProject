import style from './index.module.scss';

interface MonthlyBalanceIntf{
    value:number
}
export default function MonthlyBalance(props:MonthlyBalanceIntf){
    return <div
        data-testid="monthly-bal-div"
        className={style.wrapper}>
        <label className={style.label}>Monthly Balance</label>
        <label
            data-testid="monthly-bal-val-div"
            className={style.value}>{props.value}</label>
    </div>
}