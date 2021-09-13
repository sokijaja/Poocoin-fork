import networkInfo from '../constants/networkInfo.json';
import BigNumber from 'bignumber.js';

function dec2hexString(dec) {
    return '0x' + (parseInt(dec)).toString(16);
}

export function switchNetwork(chainId_) {
    let chainName;
    if (chainId_ == 321) {
        chainName = 'Kuchain'
    } else if (chainId_ == 137) {
        chainName = 'Polygon'
    } else if (chainId_ == 56) {
        chainName = 'BSC'
    }
    let rpcUrl;
    networkInfo.forEach(network => {
        if (network.chainId == chainId_) {
            rpcUrl = network.rpc;
        }
    });
    let chainId = dec2hexString(chainId_);

    window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `${chainId}` }],
    })
        .catch((error) => {
            if (error.code === 4902) {
                // window.ethereum.request({
                //     method: 'wallet_addEthereumChain',
                //     params: [{ chainName: { chainName }, chainId: `${chainId}`, rpcUrl: `${rpcUrl}` }],
                // })
                //     .catch((error) => {
                //         console.log(error);
                //     })
                alert('Please add network')
            }
        })
}

export function numberWithCommas(x) {
    if (x != undefined) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}
export const toHuman = (num, decimals) => {
    const humanNum = new BigNumber(num).div(new BigNumber(10).pow(new BigNumber(decimals)));
    return humanNum.toNumber();
}

export const toBigNum = (num, decimals) => {
    return new BigNumber(num).times(new BigNumber(10).pow(new BigNumber(decimals)));
}