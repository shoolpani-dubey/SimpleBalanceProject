import style from './index.module.scss';

interface CumulativeBalanceIntf{
    value: number
}
export default function CumulativeBalance(props:CumulativeBalanceIntf){
    return <div className={style.wrapper}>
        <label className={style.label}>Cumulative Balance</label>
        <label className={style.value}>{props.value}</label>
    </div>
}