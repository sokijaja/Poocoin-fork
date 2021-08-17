/* eslint-disable no-loop-func */
const ethers = require('ethers');

const topHolderAddress = "0x1ecd8ed7ffd03f38863f3b86ef3b9807a1999ff8";
const profileAddress = "0xba90d15d6384e8223bb4d96fe9efb0f06194fb39";
const unvettedAddress = "0x3a05d30f7428fe2333fb23afa9a2bf2dc012316b";
const poocoinAddress = "0xb27adaffb9fea1801459a1a81b17218288c097cc";
const myAccount = "0x50796F695484b29ba8b14881a516428FA7A58581";

// const provider = new ethers.providers.JsonRpcProvider("https://bsc-dataseed.binance.org");
const provider = new ethers.providers.WebSocketProvider('wss://bsc-ws-node.nariox.org:443');

const abi = [
  'function holderInfo(uint256, uint256) public view returns (address, uint256)',
  'function topHolderSize() public view returns (uint256)',
  'function userInfo(address) public view returns (string, address, string)'
]

const unvettedAbi = [
  'function messages(uint256) public view returns (address, string)',
  'function messageLength() public view returns (uint256)'
]

const poocoinAbi = [
  'function balanceOf(address) public view returns (uint256)'
]

const contract = new ethers.Contract(topHolderAddress, abi, provider);
const profile_contract = new ethers.Contract(profileAddress, abi, provider);
const unvetted_contract = new ethers.Contract(unvettedAddress, unvettedAbi, provider);
const poocoint_contract = new ethers.Contract(poocoinAddress, poocoinAbi, provider);

const vettedValues = async (setVettedData) => {
  let results = [];
  try {
    await contract.topHolderSize().then(count => {
      for(var i = 0; i < parseInt(count); i++) {
        let item = {};
        contract.holderInfo(0, i).then(address => {
          profile_contract.userInfo(address[0]).then(res => {
            item.name = res[0];
            item.address = address[0];
            item.linkAddress = res[1];
            item.amount = parseInt(address[1]) / 1000000000000000000;

            if(res[0] !== '')
              results.push(item);
          })
        });
      }

      setTimeout(() => {
        results.sort((a, b) => {
          let keyA = a.amount;
          let keyB = b.amount;
          if(keyA > keyB) return -1;
          if(keyA < keyB) return 1;
          return 0;
        });

        setVettedData(results);
      }, 8000);
    });
  } catch(e) {
    console.log(e);
  }
}

const unvettedValues = async (setUnvettedData) => {
  let unvettedArray = [];
  unvetted_contract.messageLength().then(count => {
    for(var i = parseInt(count) - 1; i > parseInt(count) - 11; i--) {
      unvetted_contract.messages(i).then(address => {
        unvettedArray.push(address);
      });
    }

    setTimeout(() => {
      setUnvettedData(unvettedArray);
    }, 8000);
  });
}

const poocoinBalance = async (setPoocoinBalanceData) => {
  poocoint_contract.balanceOf(myAccount).then(balance => {
    setPoocoinBalanceData(parseInt(balance));
  })
}

module.exports = { vettedValues, unvettedValues, poocoinBalance };