import { ChangeEventHandler } from "react";
import style from "./index.module.scss";

interface InputIntf {
  label?: string;
  type: "text" | "password";
  value: string;
  defaultValue: string;
  placeholder?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}
export default function Input(props: InputIntf) {
  return (
    <div className={style.wrapper}>
      <label>{props.label}</label>
      <input
        placeholder={props.placeholder || ""}
        defaultValue={props.defaultValue}
        value={props.value}
        onChange={props.onChange}
        type={props.type}
      />
    </div>
  );
}
