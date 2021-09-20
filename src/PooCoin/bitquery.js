import defaultToken from '../config/default_tokens.json'

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
        options: {limit: 20, desc: "block.height"}
        exchangeName: {in: ["Pancake", "Pancake v2"]}
        any: {baseCurrency: {is: "${tokenAddress}"}}
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
        exchange {
          fullName
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
  const currency = data.data.ethereum.dexTrades;
  return currency;
}

export const getPriceByTime = async (tokenAddress, time) => {
  const QUERY = `{
    ethereum(network: bsc) {
      dexTrades(
        options: {desc: ["block.height", "tradeIndex"], limit: 1}
        exchangeName: {in: ["Pancake", "Pancake v2"]}
        baseCurrency: {is: "${tokenAddress}"}
        quoteCurrency: {is: "${defaultToken.BUSD.address}"}
        time: {before: "${time}"}
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