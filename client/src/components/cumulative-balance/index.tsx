import style from './index.module.scss';

interface CumulativeBalanceIntf{
    value: number
}
export default function CumulativeBalance(props:CumulativeBalanceIntf){
    return <div
        data-testid="cum-bal-div"
        className={style.wrapper}>
        <label className={style.label}>Cumulative Balance</label>
        <label data-testid="cum-bal-val-div" className={style.value}>{props.value}</label>
    </div>
}