export const getOwnToken = async (accountAddress) => {
    const QUERY = `{
  ethereum(network: bsc) {
    address(address: {is: "${accountAddress}"}) {
      balances {
        currency {
          address
          symbol
          tokenType
        }
        value
      }
    }
  }
}`;

    // -------- Endpoint ----------------------
    const endpoint = "https://graphql.bitquery.io/";

    // Function which fetches the data from the API
    const response = await fetch(endpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query: QUERY
        })
    });

    const data = await response.json();
    const currency = data.data.ethereum.address[0].balances;
    return currency;
}