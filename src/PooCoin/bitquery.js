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

export const getTransactionListData = async (tokenAddress) => {
  const QUERY = `{
    ethereum(network: bsc) {
      dexTrades(
        options: {limit: 10, desc: "block.height"}
        exchangeName: {in: ["Pancake", "Pancake v2"]}
        any: {baseCurrency: {is: "0x580dE58c1BD593A43DaDcF0A739d504621817c05"}}
      ) {
        transaction {
          hash
        }
        block {
          height
        }
        buyCurrency {
          symbol
          address
        }
        sellCurrency {
          symbol
          address
        }
        buyAmount(calculate: maximum)
        sellAmount(calculate: maximum)
        any(of: time)
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
  const currency = data.data.ethereum.dexTrades;
  return currency;
}

export const getPriceByTime = async (tokenAddress) => {
  const QUERY = `{
    ethereum(network: bsc) {
      dexTrades(
        options: {desc: ["block.height", "tradeIndex"], limit: 1}
        exchangeName: {in: ["Pancake", "Pancake v2"]}
        baseCurrency: {is: "0x580dE58c1BD593A43DaDcF0A739d504621817c05"}
        quoteCurrency: {is: "0xe9e7cea3dedca5984780bafc599bd69add087d56"}
        date: {since: "2019-07-17T35:04+00:00"}
      ) {
        transaction {
          hash
        }
        tradeIndex
        smartContract {
          address {
            address
          }
          contractType
          currency {
            name
          }
        }
        tradeIndex
        quoteCurrency {
          symbol
          address
        }
        quotePrice
        block {
          height
        }
        baseCurrency {
          address
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
  const currency = data.data.ethereum.dexTrades[0].quotePrice;
  return currency;
}