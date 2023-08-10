import { useState } from "react";
import { BalancePage } from "./components/balance-page";
import LoginPage from "./components/login-page";
interface User {
  username: string;
  jwt: string;
}
export default function App() {
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (
    username: string,
    loginResp: { access_token: string }
  ) => {
    if (!loginResp?.access_token) {
      return;
    }
    setUser({ username, jwt: loginResp.access_token });
  };

  if (!user?.jwt) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return <BalancePage accessToken={user.jwt} />;
}
