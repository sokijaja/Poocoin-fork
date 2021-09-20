/* eslint-disable import/first */
/* eslint-disable no-loop-func */
const ethers = require("ethers");
const Web3 = require("web3");
const BigNumber = require("bignumber.js");
import erc20_abi from '../config/abi/erc20.json';
import router_abi from '../config/abi/router.json';
import { getOwnToken, getPriceByTime, getTransactionListData } from './bitquery';
import DefaultTokens from '../config/default_tokens.json';
import { numberWithCommas } from './util';

const topHolderAddress = "0x1ecd8ed7ffd03f38863f3b86ef3b9807a1999ff8";
const profileAddress = "0xba90d15d6384e8223bb4d96fe9efb0f06194fb39";
const unvettedAddress = "0x3a05d30f7428fe2333fb23afa9a2bf2dc012316b";
const poocoinAddress = "0xb27adaffb9fea1801459a1a81b17218288c097cc";
const myAccount = "0x50796F695484b29ba8b14881a516428FA7A58581";
const getLogsAddress = "0xca143ce32fe78f1f7019d7d551a6402fc5350c73";
const topics =
  "0x0d3648bd0f6ba80134a33ba9275ac585d9d315f0ad8355cddefde31afa28d0e9";
// pancakeswap v2 router addresss
const pancakeswap_router = "0x10ED43C718714eb63d5aA57B78B54704E256024E";

const provider = new ethers.providers.JsonRpcProvider("https://bsc-dataseed.binance.org");
// const provider = new ethers.providers.WebSocketProvider(
//   "wss://bsc-ws-node.nariox.org:443"
// );
// var web3 = new Web3(
//   new Web3.providers.WebsocketProvider("wss://bsc-ws-node.nariox.org:443")
// );
var web3 = new Web3(
  new Web3.providers.HttpProvider("https://bsc-dataseed.binance.org")
);

const abi = [
  "function holderInfo(uint256, uint256) public view returns (address, uint256)",
  "function topHolderSize() public view returns (uint256)",
  "function userInfo(address) public view returns (string, address, string)",

  // symbol and name of token
  "function symbol() public pure returns (string)",
  "function name() public pure returns (string)",

  //get balance
  "function balanceOf(address) public view returns (uint256)",

  // get amount out
  "function getAmountsOut(uint amountIn, address[] memory path) public view returns (uint[] memory amounts)",

  // swap
  "function swapExactTokensForTokens(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)",
  "function getAmountIn(uint amountOut, uint reserveIn, uint reserveOut) internal pure returns (uint amountIn)",
  "function getAmountOut(uint amountIn, uint reserveIn, uint reserveOut) internal pure returns (uint amountOut)",

  // totalSupply
  "function totalSupply() public view returns (uint256)",
  //get reserve
  "function getReserves() public view returns (uint112 _reserve0, uint112 _reserve1, uint32 _blockTimestampLast) ",
];

const unvettedAbi = [
  "function messages(uint256) public view returns (address, string)",
  "function messageLength() public view returns (uint256)",
];

const contract = new ethers.Contract(topHolderAddress, abi, provider);
const profile_contract = new ethers.Contract(profileAddress, abi, provider);
const unvetted_contract = new ethers.Contract(
  unvettedAddress,
  unvettedAbi,
  provider
);
const poocoint_contract = new ethers.Contract(poocoinAddress, abi, provider);

const pancakeRouterContract = new ethers.Contract(pancakeswap_router, abi, provider);
// get pair
export const getRate = async (tokenIn, tokenOut, setRate) => {
  try {

    await pancakeRouterContract
      .getAmountsOut(ethers.utils.parseUnits("1", 18), [tokenIn, tokenOut])
      .then((res) => {
        setRate(parseInt(res[1]) / 1000000000000000000);
      }).catch((err) => {
        console.log(err);
      })
  } catch (err) {
    console.log(err);
  }
}

const pancakeswapRouterContract = new web3.eth.Contract(router_abi, pancakeswap_router);
// get Amount out
export const getAmountsOut = async (amount, tokenIn, tokenOut, updateAmountsOut) => {
  try {

    if (tokenIn == DefaultTokens.BNB.address) {
      tokenIn = DefaultTokens.WBNB.address;
    }

    if (tokenOut == DefaultTokens.BNB.address) {
      tokenOut = DefaultTokens.WBNB.address;
    }

    const tokenInContract = new web3.eth.Contract(erc20_abi, tokenIn);
    const tokenIn_decimals = await tokenInContract.methods.decimals().call();
    const tokenOutContract = new web3.eth.Contract(erc20_abi, tokenOut);
    const tokenOut_decimals = await tokenOutContract.methods.decimals().call();

    const amount_in = toBigNum(amount, tokenIn_decimals);
    pancakeswapRouterContract.methods
      .getAmountsOut(amount_in, [tokenIn, tokenOut])
      .call().then((result) => {
        const amount_out = toHuman(result[1], tokenOut_decimals);
        updateAmountsOut(amount_out);
      }).catch((err) => {
        console.log(err);
      })
  } catch (err) {
    console.log(err)
  }
};

//get total supply
export const getTotalSupply = async (tokenAddress) => {
  const getTotalSupply_contract = new ethers.Contract(
    tokenAddress,
    abi,
    provider
  );

  const decimals = await getDecimals(tokenAddress)

  const ts = await getTotalSupply_contract.totalSupply()
  let totalSupply = toHuman(ts, decimals);
  return totalSupply;
};

const getDecimals = (tokenAddress) => {
  let MyContract1 = new web3.eth.Contract(erc20_abi, tokenAddress);
  return MyContract1.methods.decimals().call()
}

//get reserve
export const getReserve = async (lpAddress, tokenNo) => {
  const getReserves_contract = new ethers.Contract(lpAddress, abi, provider);
  const reserves = await getReserves_contract.getReserves();
  if (tokenNo == 0) {
    let ret = web3.utils.fromWei(reserves[1].toString(), "ether");
    return ret.toString()
  } else {
    let ret = web3.utils.fromWei(reserves[0].toString(), "ether");
    return ret.toString()
  }
};

// async function getPriceBySymbol(symbol) {

//   await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${symbol}&vs_currencies=usd`)
//     .then(res => res.json())
//     .then(data => {
//       // console.log(data.thoreum.usd);
//       return data.symbol.usd;
//     })
//     .catch(err => {

//     })
// }

export const vettedValues = async (setVettedData) => {
  let results = [];
  try {
    await contract.topHolderSize().then((count) => {
      for (var i = 0; i < parseInt(count); i++) {
        let item = {};
        contract.holderInfo(0, i).then((address) => {
          profile_contract.userInfo(address[0]).then((res) => {
            // item.price = getPriceBySymbol(res[0]);
            item.name = res[0];
            item.address = address[0];
            item.linkAddress = res[1]; // token address, symbol address
            item.amount = parseInt(address[1]) / 1000000000000000000;

            if (res[0] !== "") results.push(item);
          });
        });
      }

      setTimeout(() => {
        results.sort((a, b) => {
          let keyA = a.amount;
          let keyB = b.amount;
          if (keyA > keyB) return -1;
          if (keyA < keyB) return 1;
          return 0;
        });
        setVettedData(results);
      }, 8000);
    });
  } catch (e) {
    console.log(e);
  }
};

export const unvettedValues = async (setUnvettedData) => {
  let unvettedArray = [];
  unvetted_contract.messageLength().then((count) => {
    for (var i = parseInt(count) - 1; i > parseInt(count) - 11; i--) {
      unvetted_contract.messages(i).then((address) => {
        unvettedArray.push(address);
      });
    }

    setTimeout(() => {
      setUnvettedData(unvettedArray);
    }, 8000);
  });
};

export const poocoinBalance = async (account, setPoocoinBalanceData) => {
  if (account == null) account = myAccount;
  poocoint_contract.balanceOf(account).then((balance) => {
    setPoocoinBalanceData(parseInt(balance));
  });
};

let fromBlock = 0;
let apeArray = [];

export const apeLists = async (setApeLists) => {
  web3.eth.getBlockNumber().then((blockNumber) => {
    fromBlock = (blockNumber - 1000).toString(16);

    web3.eth
      .subscribe(
        "logs",
        {
          address: getLogsAddress,
          fromBlock: "0x" + fromBlock,
          toBlock: "latest",
          topics: [topics],
        },
        function (error, result) {
          //   if (!error)
          //       console.log(result);
        }
      )
      .on("connected", function (subscriptionId) {
        console.log("subcriptionID === " + subscriptionId);
      })
      .on("data", function (log) {
        let item = web3.eth.abi.decodeLog(
          [
            {
              type: "string",
              name: "topicsAddress",
              indexed: true,
            },
            {
              type: "address",
              name: "from",
              indexed: true,
            },
            {
              type: "address",
              name: "to",
            },
          ],
          log.data,
          log.topics
        );

        if (item.from !== "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c") {
          // WBNB
          let temp = {};
          temp.from = item.from;
          temp.to = item.to;

          const symbol_contract = new ethers.Contract(item.from, abi, provider);
          symbol_contract.symbol().then((symbol) => {
            temp.symbol = symbol;
            symbol_contract.name().then((name) => {
              temp.name = name;
            });
          });

          apeArray.push(temp);
        }
      })
      .on("changed", function (log) { });

    setTimeout(() => {
      setApeLists(apeArray.reverse());
    }, 8000);
  });
};

const daiAbi = [
  {
    inputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "from", type: "address" },
      { indexed: true, internalType: "address", name: "to", type: "address" },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    constant: true,
    inputs: [],
    name: "_decimals",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "_name",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "_symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "address", name: "spender", type: "address" },
    ],
    name: "allowance",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [{ internalType: "uint256", name: "amount", type: "uint256" }],
    name: "burn",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "decimals",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "subtractedValue", type: "uint256" },
    ],
    name: "decreaseAllowance",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "getOwner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "addedValue", type: "uint256" },
    ],
    name: "increaseAllowance",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [{ internalType: "uint256", name: "amount", type: "uint256" }],
    name: "mint",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "name",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "totalSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { internalType: "address", name: "recipient", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { internalType: "address", name: "sender", type: "address" },
      { internalType: "address", name: "recipient", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
];
const token_address = "0x8076c74c5e3f5852037f31ff0093eeb8c8add8d3"; // Safemoon token

const ownerAbi = [
  "function owner() public view returns (address)",
  "function totalSupply() public view returns (uint256)",
];

const myContract = new web3.eth.Contract(daiAbi, token_address);
const ownerContract = new ethers.Contract(token_address, ownerAbi, provider);

export const devActivity = async (setDevActivityData) => {
  ownerContract.owner().then((res) => {
    let wallet_address = res;

    web3.eth.getBlockNumber().then((blockNumber) => {
      let options = {
        filter: {
          value: [],
        },
        fromBlock: 9876000,
        toBlock: 9881000,
      };

      let transfers = [];

      myContract
        .getPastEvents("Transfer", options)
        .then((results) => {
          for (var i = 0; i < results.length; i++) {
            if (wallet_address === results[i].returnValues.from) {
              var myobj = {
                from: results[i].address, // token Address
                from_address: results[i].returnValues.from,
                to: results[i].returnValues.to,
                amount: results[i].returnValues.value,
                block_number: results[i].blockNumber,
                tx: results[i].transactionHash,
                // symbol: ''
              };

              // const symbol_contract = new ethers.Contract(results[i].address, abi, provider);
              // symbol_contract.symbol().then(symbol => {
              //   myobj.symbol = symbol;

              // })

              transfers.push(myobj);
            }
          }

          // setTimeout(() => {
          setDevActivityData(transfers);
          // }, 8000)
        })
        .catch((err) => console.log(err));
    });
  });
};

const totalSupply = async (setTotalSupplyData) => {
  let temp = {};

  ownerContract.owner().then((res) => {
    let owner_address = res;
    temp.owner = owner_address;

    ownerContract.totalSupply().then((tSupply) => {
      let totalSupply = tSupply;

      temp.totalSupply = web3.utils.toBN(totalSupply).toString();

      // console.log(temp);
      setTotalSupplyData(temp);
    });
  });
};

export const tokenBalance = async (wallet_address, token_address, setTokenBalanceData) => {

  try {
    const contract = new web3.eth.Contract(erc20_abi, token_address);
    const decimals = await contract.methods.decimals().call({ from: wallet_address });
    contract.methods.balanceOf(wallet_address)
      .call({ from: wallet_address }).then((balance) => {
        setTokenBalanceData(toHuman(balance, decimals));
      }).catch((err) => {
        console.log(err);
      })
  } catch (err) {
    console.log(err);
  }
};

export const bnbBalance = (wallet_address, setBnbBalanceData) => {

  try {
    web3.eth.getBalance(wallet_address).then(balance => {
      setBnbBalanceData(web3.utils.fromWei(balance.toString(), "ether"));
    }).catch(err => {
      console.log(err);
    })
  } catch (e) {
    console.log(e);
  }

}

export const tokenSwap = async (ethereum, amount, tokenIn, tokenOut, account, miniumAmountOut, callback) => {
  try {
    var mweb3 = new Web3(ethereum);
    var contract = new mweb3.eth.Contract(router_abi, pancakeswap_router);
    contract.setProvider(ethereum);

    if (tokenIn == DefaultTokens.BNB.address) {
      tokenIn = DefaultTokens.WBNB.address;
    }

    if (tokenOut == DefaultTokens.BNB.address) {
      tokenOut = DefaultTokens.WBNB.address;
    }

    const tokenInContract = new web3.eth.Contract(erc20_abi, tokenIn);
    const tokenIn_decimals = await tokenInContract.methods.decimals().call();
    const tokenOutContract = new web3.eth.Contract(erc20_abi, tokenOut);
    const tokenOut_decimals = await tokenOutContract.methods.decimals().call();

    const amount_in = toBigNum(amount, tokenIn_decimals);
    const amount_out = parseInt(toBigNum(miniumAmountOut, tokenOut_decimals)).toString();

    console.log(amount_out);
    if (tokenIn == DefaultTokens.WBNB.address) {
      var tx = await contract.methods.swapExactETHForTokens(amount_out, [tokenIn, tokenOut], account, Date.now() + 1000 * 60 * 10)
        .send({
          from: account,
          value: amount_in
        });
    } else if (tokenOut == DefaultTokens.WBNB.address) {
      var tx = await contract.methods.swapExactTokensForETH(amount_in, amount_out, [tokenIn, tokenOut], account, Date.now() + 1000 * 60 * 10)
        .send({
          from: account
        });
    } else {
      var tx = await contract.methods.swapExactTokensForTokens(amount_in, amount_out, [tokenIn, tokenOut], account, Date.now() + 1000 * 60 * 10)
        .send({
          from: account
        });
      console.log(tx);
      callback(tx);
    }

  } catch (err) {
    console.log(err);
  }
}

export const getAllowance = (ethereum, account, token, updateAllowance) => {
  try {
    const mweb3 = new Web3(ethereum);
    const contract = new mweb3.eth.Contract(erc20_abi, token);
    contract.setProvider(ethereum);
    const decimals = 18;
    contract.methods.allowance(account, pancakeswap_router).call().then((allowance) => {
      updateAllowance(toHuman(allowance, decimals))
    });
  } catch (err) {
    console.log(err);
  }
}

export const approveToken = async (ethereum, token, amount, account) => {
  try {
    const mweb3 = new Web3(ethereum);
    const contract = new mweb3.eth.Contract(erc20_abi, token);
    contract.setProvider(ethereum);

    const tx = await contract.methods.approve(pancakeswap_router, "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff").send({
      from: account
    });

    return {
      hash: tx.blockHash,
      status: tx.status,
    }
  } catch (err) {
    return {
      status: false
    }
  }
}

const toHuman = (num, decimals) => {
  const humanNum = new BigNumber(num).div(new BigNumber(10).pow(new BigNumber(decimals)));
  return humanNum.toNumber();
}

const toBigNum = (num, decimals) => {
  return new BigNumber(num).times(new BigNumber(10).pow(new BigNumber(decimals)));
}

export const getBuyersData = async (tokenAddress, currentTimeInfo, previousTimeInfo, setBuyersValues) => {
  const currentDate = currentTimeInfo.year + "-" + currentTimeInfo.fullmonth + "-" + currentTimeInfo.day + "T" + currentTimeInfo.fullhour + ":" + currentTimeInfo.minute + ":00.000Z"

  const previousDate = previousTimeInfo.year + "-" + previousTimeInfo.fullmonth + "-" + previousTimeInfo.day + "T" + previousTimeInfo.fullhour + ":" + previousTimeInfo.minute + ":00.000Z"

  await fetch(`https://api1.poocoin.app/top-trades?address=${tokenAddress}&from=${previousDate}&to=${currentDate}&type=buy`)
    .then(res => res.json())
    .then(data => { setBuyersValues(data) })
    .catch(err => console.log(err))
}

export const getSellersData = async (tokenAddress, currentTimeInfo, previousTimeInfo, setSellersValues) => {
  const currentDate = currentTimeInfo.year + "-" + currentTimeInfo.fullmonth + "-" + currentTimeInfo.day + "T" + currentTimeInfo.fullhour + ":" + currentTimeInfo.minute + ":00.000Z"

  const previousDate = previousTimeInfo.year + "-" + previousTimeInfo.fullmonth + "-" + previousTimeInfo.day + "T" + previousTimeInfo.fullhour + ":" + previousTimeInfo.minute + ":00.000Z"

  await fetch(`https://api1.poocoin.app/top-trades?address=${tokenAddress}&from=${previousDate}&to=${currentDate}&type=sell`)
    .then(res => res.json())
    .then(data => { setSellersValues(data) })
    .catch(err => console.log(err))
}

export const getWalletData = async (tokenAddress, account, setWalletValues) => {
  await fetch(`https://api1.poocoin.app/wallet-tx?address=${tokenAddress}&wallet=${account}`)
    .then(res => res.json())
    .then(data => { setWalletValues(data) })
    .catch(err => console.log(err))
}

export const getOwnToken_wallet = async (accountAddress, setWalletTokenData) => {
  const currencies = await getOwnToken(accountAddress);
  for (let i = 0; i < currencies.length; i++) {
    const currencyAddress = currencies[i].currency.address;
    if (currencyAddress != '-') {
      try {
        //own token contract
        const tokenIn_decimals = await getDecimals(currencyAddress)
        //BUSD token contract
        const tokenOut_decimals = await getDecimals(DefaultTokens.USDT.address)

        const amount_in = toBigNum(1, tokenIn_decimals);
        const amount_out = await pancakeswapRouterContract.methods
          .getAmountsOut(amount_in, [currencyAddress, DefaultTokens.USDT.address])
          .call();
        const tokenRate = toHuman(amount_out[1], tokenOut_decimals)
        currencies[i]['rate'] = tokenRate.toFixed(4);

      } catch (err) {
        const tokenRate = 0;
        currencies[i]['rate'] = tokenRate.toFixed(4);
        continue;
      }
    } else {
      //own token contract
      const tokenIn_decimals = await getDecimals(DefaultTokens.WBNB.address)
      //BUSD token contract
      const tokenOut_decimals = await getDecimals(DefaultTokens.USDT.address)

      const amount_in = toBigNum(1, tokenIn_decimals);
      const amount_out = await pancakeswapRouterContract.methods
        .getAmountsOut(amount_in, [DefaultTokens.WBNB.address, DefaultTokens.USDT.address])
        .call();
      const tokenRate = toHuman(amount_out[1], tokenOut_decimals)

      currencies[i]['rate'] = tokenRate.toFixed(4);
      currencies[i].currency['address'] = DefaultTokens.WBNB.address;
    }
  }
  setWalletTokenData(currencies);
}

export const getTransactionList = async (tokenAddress, setTransactionListData) => {
  if (tokenAddress != null) {
    const transactionLists = await getTransactionListData(tokenAddress);
    const transaction = [];
    for (let i = 0; i < transactionLists.length; i++) {
      try {
        let time = new Date(transactionLists[i].any);
        let time_str = time.toISOString().split('.')
        let hour = time.getHours()
        let minute = time.getMinutes()
        let second = time.getSeconds()

        var sAMPM = "AM";
        var iHourCheck = parseInt(hour);
        if (iHourCheck > 12) {
          sAMPM = "PM";
          hour = iHourCheck - 12;
        }
        else if (iHourCheck === 0) {
          hour = "12";
        }
        const transactionTime = hour + ":" + minute + ":" + second

        const tokenPrice = await getPriceByTime(tokenAddress, time_str[0]);

        let exchangeName = transactionLists[i].exchange.fullName;
        if (exchangeName == "Pancake") {
          exchangeName = "Pc v1"
        } else if (exchangeName == "Pancake v2") {
          exchangeName = "Pc v2"
        }

        if (transactionLists[i].buyCurrency.address == tokenAddress.toLowerCase()) {
          transaction.push({
            "tokenNum": numberWithCommas(parseInt(transactionLists[i].buyAmount)),
            "tokenSymbol": transactionLists[i].buyCurrency.symbol,
            "coinNum": transactionLists[i].sellAmount,
            "coinSymbol": transactionLists[i].sellCurrency.symbol,
            "tokenPrice": tokenPrice,
            "transactionTime": transactionTime,
            "AMPM": sAMPM,
            "coinPrice": parseInt(transactionLists[i].buyAmount) * tokenPrice,
            "status": "buy",
            "txHash": transactionLists[i].transaction.hash,
            "exchangeName": exchangeName
          })
        } else if (transactionLists[i].sellCurrency.address == tokenAddress.toLowerCase()) {
          transaction.push({
            "tokenNum": numberWithCommas(parseInt(transactionLists[i].sellAmount)),
            "tokenSymbol": transactionLists[i].sellCurrency.symbol,
            "coinNum": transactionLists[i].buyAmount,
            "coinSymbol": transactionLists[i].buyCurrency.symbol,
            "tokenPrice": tokenPrice,
            "transactionTime": transactionTime,
            "AMPM": sAMPM,
            "coinPrice": parseInt(transactionLists[i].sellAmount) * tokenPrice,
            "status": "sell",
            "txHash": transactionLists[i].transaction.hash,
            "exchangeName": exchangeName
          })
        }
      } catch (err) {
        console.log(err);
      }
    }
    setTransactionListData(transaction)
  }
}