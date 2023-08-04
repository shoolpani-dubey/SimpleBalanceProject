import { ReactNode } from "react"
import style from './index.module.scss';

interface ResultCompIntf{
    children: ReactNode
}
export default function ResultComp(props:ResultCompIntf){
    return <div className={style.wrapper}>
        {props.children}
    </div>
}