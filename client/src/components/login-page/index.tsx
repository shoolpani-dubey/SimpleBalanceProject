import { useState } from "react";
import Input from "../input-wrapper";
import style from "./index.module.scss";
import { login } from "../../service/fetchService";
interface LoginPageIntf {
  onLogin: (username: string, loginResp: { access_token: string }) => void;
}
export default function LoginPage(props: LoginPageIntf) {
  const [username, setUsername] = useState<string | "">("");
  const [password, setPassword] = useState<string | "">("");
  const [loginError, setLoginError] = useState(false);

  const resetError = () => {
    setLoginError(false);
  };

  const onUsernameChange = (event: React.FormEvent<HTMLInputElement>) => {
    resetError();
    const val = event.currentTarget.value;
    setUsername(val);
  };
  const onPasswordChange = (event: React.FormEvent<HTMLInputElement>) => {
    resetError();
    const val = event.currentTarget.value;
    setPassword(val);
  };

  const displayLoginError = () => {
    setLoginError(true);
    setUsername("");
    setPassword("");
  };

  const handleLogin = async (username: string, password: string) => {
    const loginResp: { access_token: string } = await login(username, password);
    if (!loginResp?.access_token) {
      displayLoginError();
    }
    props.onLogin(username, loginResp);
  };

  return (
    <div className={style.wrapper}>
      <div className={style.loginBox}>
        <h2 className={style.loginBoxLabel}>Login Form</h2>
        {loginError && (
          <label className={style.loginError}>
            Invalid Username or Password
          </label>
        )}
        <Input
          label="Username"
          type="text"
          value={username}
          defaultValue={username}
          onChange={onUsernameChange}
        />
        <Input
          label="Password"
          type="password"
          value={password}
          defaultValue={password}
          onChange={onPasswordChange}
        />
        <button
          className={style.buttonEle}
          onClick={() => handleLogin(username, password)}
          type="submit"
        >
          Login
        </button>
        <label>Hint: For demo use username: demo ,password: demo</label>
      </div>
    </div>
  );
}
