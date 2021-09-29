import axios from 'axios';

//Get all info about current token from lpaddress and token table
export const getLpinfo = (tokenId) => {
    return axios
        .get("http://192.168.112.98:5000/token/getLpinfo", {
            params: { foo: tokenId },
        }).then((res) => { return res.data })
}

//Get Lpaddress from current token address and BNB token address
export const getLpaddress = async (currentTokenAddress, coinAddress) => {
    return await axios
        .get("http://192.168.112.98:5000/token/getLpaddress", {
            params: { tokenAddress: currentTokenAddress, coinAddress: coinAddress },
        })
}

//Get tokenName from current token address 
export const getSymbolName = async (currentTokenAddress) => {
    return await axios
        .get("http://192.168.112.98:5000/token/getSymbol", {
            params: { tokenAddress: currentTokenAddress },
        })
}
