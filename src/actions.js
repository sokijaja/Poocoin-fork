import axios from 'axios';

//Get all info about current token from lpaddress and token table
export const getLpinfo = (tokenId) => {
    return axios
        .get("/token/getLpinfo", {
            params: { foo: tokenId },
        }).then((res) => { return res.data })
}

//Get Lpaddress from current token address and BNB token address
export const getBNBLpaddress = (currentTokenAddress) => {
    return axios
        .get("/token/getBNBLpaddress", {
            params: { tokenAddress: currentTokenAddress },
        }).then((res) => {
            return res.data
        })
}
