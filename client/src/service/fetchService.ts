async function fetchBalanceForDate(jwt: string, date: Date) {
  // fetch balance for a given date and return the data.
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer " + jwt);
  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };
  const resp = await fetch(
    `${import.meta.env.VITE_SERVER_URL}balance?date=${date.toISOString()}`,
    requestOptions
  );
  if (resp.status != 200) {
    throw new Error("Login Error");
    return;
  }
  const respParsed = await resp.json();
  return respParsed;
}

async function login(
  username: string,
  password: string
): Promise<{ access_token: string }> {
  const data = JSON.stringify({
    username,
    password,
  });
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const requestOptions = {
    method: "POST",
    body: data,
    headers: myHeaders,
  };
  const resp = await fetch(
    `${import.meta.env.VITE_SERVER_URL}auth/login`,
    requestOptions
  );
  return await resp.json();
}

export { fetchBalanceForDate, login };
