async function fetchBalanceForDate(date:Date){
    console.log(date);
    // fetch balance for a given date and return the data.
    const requestOptions = {
        method: 'GET'
    };

    const resp = await fetch(`${import.meta.env.VITE_SERVER_URL}balance?date=${date.toISOString()}`, requestOptions)
    const respParsed = await resp.json();
    return respParsed;
}

export {fetchBalanceForDate};